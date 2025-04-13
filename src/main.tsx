import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { PrivateRoute } from './routes/private-routes';

import './index.css'

import { LoginPage } from './pages/login/login-page';
import { ErrorPage } from './pages/err/error-page';
import { Networks } from './pages/networks/networks';
import { AdminPage } from './pages/admin/admin';
import { Home } from './pages/home/home';


const router = createBrowserRouter([
  {
    children:[
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/admin/social",
        element: <PrivateRoute><Networks/></PrivateRoute>
      },
      {
        path: "/login",
        element: <LoginPage/> ,
      },
      {
        path: "/admin",
        element: <PrivateRoute><AdminPage/></PrivateRoute>
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
      {
        path: "/detail/:new",
        /*element: */
      },
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

