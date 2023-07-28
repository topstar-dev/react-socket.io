import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = ({socket}) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = e => {
        if(username.trim() && password.trim()) {
            e.preventDefault();
            console.log({username, password});
            setPassword(prev => prev = "");
            setUsername(prev => prev = "")
        }
    };

    return (
        <div className="login">
            <h2 style={{ marginBottom: "30px" }}>Login</h2>
            <form className="login__form" method="POST" onSubmit={handleSignIn}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    className="input"
                    name="username"
                    id="username"
                    required
                    value={username}
                    onChange={e => setUsername(prev => prev = e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    className="input"
                    name="password"
                    id="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="loginBtn">LOG IN</button>
                <p style={{ textAlign: "center" }}>
                    Don't have an account?{""}
                    <Link className="link" to='/register'>
                        Create one
                    </Link>
                </p>
            </form>
        </div>
    )

}

export default Login;