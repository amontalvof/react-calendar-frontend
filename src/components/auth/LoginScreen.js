import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const [formLoginValues, handleLoginInputChange] = useForm({
        loginEmail: 'fernando@gmail.com',
        loginPassword: '123456',
    });

    const { loginEmail, loginPassword } = formLoginValues;

    const [formRegisterValues, handleRegisterInputChange] = useForm({
        registerName: 'Nando',
        registerEmail: 'nando@gmail.com',
        registerPassword1: '123456',
        registerPassword2: '123456',
    });

    const {
        registerName,
        registerEmail,
        registerPassword1,
        registerPassword2,
    } = formRegisterValues;

    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(startLogin(loginEmail, loginPassword));
    };

    const handleRegister = (event) => {
        event.preventDefault();
        if (registerPassword1 !== registerPassword2) {
            return Swal.fire('Error!', 'Passwords must be the same.', 'error');
        }
        dispatch(startRegister(registerEmail, registerPassword1, registerName));
    };

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Log in</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Sign in</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="registerName"
                                value={registerName}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="registerPassword1"
                                value={registerPassword1}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repeat password"
                                name="registerPassword2"
                                value={registerPassword2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Create account"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
