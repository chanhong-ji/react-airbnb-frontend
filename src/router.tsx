import { createBrowserRouter } from 'react-router-dom';
import Root from './components/Root';
import ErrorPage from './routers/ErrorPage';
import Home from './routers/Home';
import RoomDetail from './routers/RoomDetail';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { path: '', element: <Home /> },
        { path: 'rooms/:roomPk', element: <RoomDetail /> },
      ],
    },
  ]
  //   { basename: '' }
);
