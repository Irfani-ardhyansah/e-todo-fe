import axios from "axios";
import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [accessToken, setAccessToken_] = useState(localStorage.getItem("accessToken"))
    const [refreshToken, setRefreshToken_] = useState(localStorage.getItem("refreshToken"))
    const [userData, setUserData_] = useState(localStorage.getItem("dataUser") ? JSON.parse(localStorage.getItem("dataUser")) : null)

    const setAccessToken = (newAccessToken) => {
        setAccessToken_(newAccessToken)
    }

    const setRefreshToken = (newRefreshToken) => {
        setRefreshToken_(newRefreshToken)
    }

    const setUserData = (newDataUser) => {
        setUserData_(newDataUser)
    }

    useEffect(() => {
        if(accessToken) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken
            localStorage.setItem('accessToken', accessToken);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('accessToken')
        }
    }, [accessToken])

    useEffect(() => {
        if(refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
        } else {
            localStorage.removeItem('refreshToken');
        }
    }, [refreshToken])

    const contextValue = useMemo(
        () => ({
            accessToken, 
            setAccessToken,
            refreshToken,
            setRefreshToken,
            userData,
            setUserData,
        }),
        [accessToken]
    )

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;