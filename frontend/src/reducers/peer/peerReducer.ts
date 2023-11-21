import { ADD_PEER_STREAM, REMOVE_PEER_STREAM } from './peerActions';

export type PeerState = Record<string, { stream?: MediaStream; username?: string }>;

type PeerAction =
	| {
			type: typeof ADD_PEER_STREAM;
			payload: { peerId: string; stream: MediaStream; username?: string };
	  }
	| {
			type: typeof REMOVE_PEER_STREAM;
			payload: { peerId: string };
	  };

export const peersReducer = (state: PeerState, action: PeerAction) => {
	switch (action.type) {
		case ADD_PEER_STREAM:
			return {
				...state,
				[action.payload.peerId]: {
					...state[action.payload.peerId],
					stream: action.payload.stream,
					username: action.payload.username,
				},
			};
		case REMOVE_PEER_STREAM:
			return {
				...state,
				[action.payload.peerId]: {
					...state[action.payload.peerId],
					stream: undefined,
				},
			};

		default:
			return { ...state };
	}
};
