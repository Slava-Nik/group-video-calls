import { useContext } from 'react';
import { RoomContext } from '../../context/RoomContext.tsx';
import VideoPlayer from '../../components/containers/calls/videoPlayer/VideoPlayer.tsx';
import s from './index.module.scss';
import { getFromLocalStorage } from '../../utils/localstorage.ts';
const Room = () => {
	const { me, stream, peers } = useContext(RoomContext);

	const myPeerId = me?.id;
	const myUsername = getFromLocalStorage('username');

	return (
		<div className={s.room}>
			<div className={s.peersStream}>
				{Object.values(peers).map((peer) => (
					<div key={peer?.stream?.id}>
						<VideoPlayer stream={peer.stream} name={peer.username} />
					</div>
				))}
			</div>
			<div className={s.myStream}>
				<VideoPlayer key={myPeerId} stream={stream} name={myUsername} isMe />
			</div>
		</div>
	);
};

export default Room;
