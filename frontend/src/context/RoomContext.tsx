import Peer from 'peerjs';
import { ws } from '../ws.ts';
import { v4 as uuidV4 } from 'uuid';
import { createContext, ReactElement, useEffect, useReducer, useState } from 'react';
import { peersReducer, PeerState } from '../reducers/peer/peerReducer.ts';
import {
	addPeerStreamAction,
	removePeerStreamAction,
} from '../reducers/peer/peerActions.ts';
import { getFromLocalStorage } from '../utils/localstorage.ts';
import { useParams } from 'react-router-dom';

interface RoomContextProps {
	me?: Peer;
	stream?: MediaStream;
	peers: PeerState;
}
export const RoomContext = createContext<RoomContextProps>({
	peers: {},
});

export const RoomProvider = ({ children }: { children: ReactElement }) => {
	const { roomId } = useParams();
	const [me, setMe] = useState<Peer>();
	const [stream, setStream] = useState<MediaStream>();
	const [peers, dispatch] = useReducer(peersReducer, {});

	const getUsers = ({ participants }: { participants: string[] }) => {
		console.log('participants', participants);
	};

	const removePeer = ({ peerId }: { peerId: string }) => {
		dispatch(removePeerStreamAction(peerId));
	};

	useEffect(() => {
		const meId = uuidV4();
		const myPeer = new Peer(meId, {
			host: 'localhost',
			port: 9001,
			path: '/',
		});
		setMe(myPeer);
	}, []);

	useEffect(() => {
		const myPeerId = me?.id;
		if (!myPeerId) return;

		const joinRoom = () => {
			const myUsername = getFromLocalStorage('username');
			if (myPeerId)
				ws.emit('join-room', { roomId, peerId: myPeerId, username: myUsername });
		};

		try {
			navigator.mediaDevices
				.getUserMedia({ video: true, audio: false })
				.then((stream) => {
					setStream(stream);
					joinRoom();
				});
		} catch (err) {
			console.error('Failed to get media stream', err);
		}

		ws.on('get-users', getUsers);
		ws.on('user-disconnected', removePeer);
	}, [me]);

	useEffect(() => {
		if (!me || !stream) return;

		ws.on('user-joined', ({ peerId, username }) => {
			const myUsername = getFromLocalStorage('username');
			const connectToNewUser = () => {
				const call = me.call(peerId, stream, { metadata: { caller: myUsername } });
				call.on('stream', (peerStream) => {
					dispatch(addPeerStreamAction({ peerId, stream: peerStream, username }));
				});
			};

			connectToNewUser();
		});
		me.on('call', (call) => {
			call.answer(stream);
			call.on('stream', (peerStream) => {
				dispatch(
					addPeerStreamAction({
						peerId: call.peer,
						stream: peerStream,
						username: call?.metadata?.caller,
					}),
				);
			});
		});
	}, [me, stream]);

	return (
		<RoomContext.Provider value={{ me, stream, peers }}>
			{children}
		</RoomContext.Provider>
	);
};
