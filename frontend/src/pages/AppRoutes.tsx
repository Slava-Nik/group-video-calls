import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home.tsx';
import Room from '../pages/room/Room.tsx';
import { RoomProvider } from '../context/RoomContext.tsx';

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route
				path='/room/:roomId'
				element={
					<RoomProvider>
						<Room />
					</RoomProvider>
				}
			/>
		</Routes>
	);
};
