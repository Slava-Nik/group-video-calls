import { ws } from '../../../../ws.ts';
import Button from '../../../reusable/button/Button.tsx';

const CreateCallRoom = () => {
	const createRoom = () => {
		ws.emit('create-room');
	};

	return (
		<Button onClick={createRoom} size='large'>
			Create new meeting
		</Button>
	);
};

export default CreateCallRoom;
