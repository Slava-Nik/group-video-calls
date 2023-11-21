import { useEffect, useRef } from 'react';
import s from './index.module.scss';

interface VideoPlayerProps {
	stream: MediaStream | undefined;
	name?: string;
	isMe?: boolean;
}

const VideoPlayer = ({ stream, name, isMe }: VideoPlayerProps) => {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (!videoRef.current || !stream) return;
		videoRef.current.srcObject = stream;
	}, [videoRef, stream]);

	if (!stream) return null;

	const getUserName = () => {
		let username = name || 'Anonymous';
		if (isMe) username = `${username} (You)`;
		return username;
	};

	const username = getUserName();

	return (
		<div className={s.videoPlayer}>
			<video ref={videoRef} autoPlay></video>
			<p className={s.userName}>{username}</p>
		</div>
	);
};

export default VideoPlayer;
1;
