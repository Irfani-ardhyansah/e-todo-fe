import {RouterProvider, createBrowserRouter, createBworserRouter} from "react-router-dom"
import {useAuth} from "../provider/authProvider"
import {ProtectedRoute} from "./ProtectedRoute"
import Home from '../components/home/Home'
import Login from "../components/login/Login";

const Routes = () => {
    const {token} = useAuth();

    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
            children: [
                {
                    path: "/",
                    element: < Home />
                }
            ]
        }
    ]

    const routesForNotAuthenticatedOnly = [
        {
            path: "/login",
            element: < Login />
        }
    ]
    
    const router = createBrowserRouter([
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
      ]);

    return <RouterProvider router={router} />;
};

export default Routes;
