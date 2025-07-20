import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const user = { email, password };
        console.log(user, "user");

        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', user);
            console.log(res.data);
            // const { token, user } = res.data;
            localStorage.setItem('token', res?.data?.token);
            localStorage.setItem('userId', res?.data?.user?.userId);
            localStorage.setItem('role', res?.data?.user?.role);

            alert(`Logged in as success`)
            navigate("/")

        } catch (err) {
            alert(err)
        }

    }


    return (
        <>
            <section className='signup-section'>
                <div className="container my-5">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-4">
                            <h4>Login</h4>
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" value={password} required
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>

                                <button type="submit" className="btn w-100">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login