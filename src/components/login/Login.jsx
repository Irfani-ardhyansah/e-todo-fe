import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import useAxiosInstance from '../../services/ApiClient';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/authProvider";
import useAuthService from "../../services/useAuthService";
import ToastContainerError from "../alerts/ToasContainerError";
import { toast } from "react-toastify";

const initialValues = {
    email: "",
    password: ""
};

const Login = () => {
    const { accessToken, setAccessToken, refreshToken, setRefreshToken, userData, setUserData } = useAuth();
    const navigate = useNavigate();
    const { DoLogin } = useAuthService();

    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const formData = new FormData()   
            formData.append("email", values.email)
            formData.append("password", values.password)
            const result = await DoLogin(formData)

            if(result.code == 200) {
                setRefreshToken(result.data.refresh_token)
                setAccessToken(result.data.access_token)
                setUserData(result.data)
                navigate('/');
            }
        } catch(error) {
            console.error('error Login', error)
        }
    }

    const showErrorToast = (message) => {
        toast.error(message);
    };

    return (
        <>
            <div className="container h-100" style={{width: '50%'}}>
                <div className="card p-3 row h-100">
                    <div className="d-flex justify-content-center mb-4">
                        <h3 className="text-white">LOGIN</h3>
                        
                    </div>
                    <form className="col-12">
                        <div className="form-group mb-4">
                            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Email" name="email"
                                    onChange={handleInputChange} value={values.email}/>
                        </div>
                        <div className="form-group mb-4">
                            <input type="password" className="form-control" id="formGroupExampleInput2" placeholder="Password" name="password"
                                    onChange={handleInputChange} value={values.password}/>
                        </div>
                        <div className="form-group d-flex justify-content-center align-items-center">
                            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                        </div>
                    </form>   
                </div>
            </div>

            <ToastContainerError />
        </>
    )
}

export default Login;