import {RouterProvider, createBrowserRouter, createBworserRouter} from "react-router-dom"
import {useAuth} from "../provider/authProvider"
import {ProtectedRoute} from "./ProtectedRoute"
import Home from '../components/home/Home'
import Login from "../components/login/Login";
import AdminDashboard from "../components/admin/Dashboard";
import AdminUser from "../components/admin/User";
import { Toaster } from "sonner";

const Routes = () => {
    const {token} = useAuth();

    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute />,
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
        },
        {
            path: "/admin", 
            element: < AdminDashboard />
        },
        {
            path: "/admin/users", 
            element: < AdminUser />
        }
    ]
    
    const router = createBrowserRouter([
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
    ]);

    return <>
        <RouterProvider router={router} />;
        <Toaster richColors position="top-center" />
    </> 
};

export default Routes;
