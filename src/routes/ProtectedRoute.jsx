import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../provider/authProvider"

export const ProtectedRoute = () => {
    const { accessToken, setAccessToken, refreshToken, setRefreshToken } = useAuth();

    if(!accessToken) {
        return <Navigate to="/login" />
    }

    return <Outlet />
}