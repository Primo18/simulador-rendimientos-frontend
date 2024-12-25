import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router';
import { App } from '../App';
import { Home } from '../pages/Home';
import { Admin } from '../pages/Admin';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Simulate } from '../pages/Simulate';
import { ProtectedRoute } from './ProtectedRoute';

const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: 'simulate', element: <Simulate /> },
            {
                path: 'admin',
                element: <ProtectedRoute allowedRoles={['ADMIN']} />, // Ruta protegida
                children: [{ index: true, element: <Admin /> }],
            },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
        ],
    },
];

const router = createBrowserRouter(routes);

export const AppRouter = () => <RouterProvider router={router} />;
