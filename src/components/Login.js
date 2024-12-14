import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false); // State for loading animation
    const navigate = useNavigate();
    const { showAlert } = useOutletContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Show loading animation
        try {
            const response = await fetch("https://inotebook-server-hwch.onrender.com/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });

            const json = await response.json();
            console.log(json);

            if (json.success) {
                localStorage.setItem('token', json.authtoken);
                navigate('/');
                showAlert("Login successfully", "success");
            } else {
                showAlert("Invalid email or password", "danger");
            }
        } catch (error) {
            console.error("Error during login:", error);
            showAlert("Something went wrong. Please try again.", "danger");
        }
        setIsLoading(false); // Hide loading animation
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className='mt-3'>
            {/* Full-page loading animation */}
            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
            )}

            <h2>Login to use iNoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        value={credentials.email}
                        id="email"
                        name="email"
                        aria-describedby="emailHelp"
                        onChange={onChange}
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={credentials.password}
                        id="password"
                        name="password"
                        onChange={onChange}
                        minLength={6}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Login;
