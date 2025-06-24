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
    const getUserData = () => {
        try {
            const data = localStorage.getItem("dataUser");
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error("Parsing dataUser gagal:", e);
            return null;
        }
    };
    const [userData, setUserData_] = useState(getUserData());

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

    useEffect(() => {
        if(userData) {
            localStorage.setItem('dataUser', JSON.stringify(userData));
        } else {
            localStorage.removeItem('dataUser');
        }
    }, [userData])

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