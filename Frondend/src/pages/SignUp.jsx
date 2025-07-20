import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSignup = async (e) => {
        e.preventDefault();

        const user = { email, password, name, role: 'user' }
        console.log(user, "user");
        try {
            await axios.post('http://localhost:3000/api/auth/register', user);
            alert("Registered successfully");
            navigate('/login');
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
                            <h4>Sign Up</h4>
                            <form onSubmit={handleSignup}>
                                <div className="mb-3">
                                    <label for="exampleInputName" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
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

                                <button type="submit" className="btn w-100">SignUp</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SignUp