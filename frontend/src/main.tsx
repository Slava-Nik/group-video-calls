import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './pages/AppRoutes.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<AppRoutes />
	</BrowserRouter>,
);
