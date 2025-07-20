import React, { useState } from 'react'
import Button from './Button'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const user = localStorage.getItem('role');
    console.log(user);

    const handleLogout = () => {
        localStorage.clear();
        localStorage.setItem('isLoggedIn', 'false');
        alert('Logout successful');
        setIsLoggedIn(false);
        navigate('/');
    }
    const token = localStorage.getItem('token');
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg" className='img-fluid' alt="" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav m-auto">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="contact">Contact</Link>
                            </li>
                            {user === "user" && <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="products">Shop</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="cart">Cart</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="order">Order</Link>
                                </li>
                            </>
                            }
                            {user === "admin" && <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="admin/category">Manage Category</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="admin/product">Manage Product</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="admin/manage-order">Manage Order</Link>
                                </li>
                            </>
                            }
                        </ul>



                        {user === "admin"
                            ? <Link to="/admin/profile"><Button title="Profile" /></Link>
                            :
                            <Link to="/profile"><Button title="Profile" /></Link>
                        }
                        {!token ? (
                            <div>
                                <Link to="login"><Button title="Login" /></Link>
                                <Link to="signup"><Button title="Signup" /></Link>
                            </div>
                        ) : (
                            <div>
                                <Button title="Logout" onClick={handleLogout} />
                            </div>
                        )}


                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header