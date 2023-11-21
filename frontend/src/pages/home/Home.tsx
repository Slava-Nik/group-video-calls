import { ChangeEvent, useEffect, useState } from 'react';
import CreateCallRoom from '../../components/containers/calls/createCallRoom/CreateCallRoom.tsx';
import Input from '../../components/reusable/input/Input.tsx';
import s from './index.module.scss';
import { ws } from '../../ws.ts';
import { useNavigate } from 'react-router-dom';
import { saveToLocalStorage } from '../../utils/localstorage.ts';

const Home = () => {
	const navigate = useNavigate();
	const [name, setName] = useState('');

	useEffect(() => {
		ws.on('room-created', enterRoom);

		return () => {
			ws.off('room-created', enterRoom);
		};
	}, [name]);

	const enterRoom = ({ roomId }: { roomId: string }) => {
		navigate(`/room/${roomId}`);
	};

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
		saveToLocalStorage({ key: 'username', value: e.target.value });
	};

	return (
		<div className={s.homeWrapper}>
			<div className={s.homeContent}>
				<h1 className={s.homeTitle}>WebRTC Video Chat</h1>
				<Input
					placeholder='Your name'
					value={name}
					onChange={handleNameChange}
					className={s.usernameInput}
				/>
				<div className={s.homeControls}>
					<CreateCallRoom />
				</div>
			</div>
		</div>
	);
};

export default Home;
