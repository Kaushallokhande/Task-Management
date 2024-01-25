import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';


const NavBar = () => {
    const history = useHistory();
    const location = useLocation();
    const handleLogout = () => {
        localStorage.removeItem('token')
        history.push('/login')
    }
    const handleUser = () => {
        history.push('/user')
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className={`navbar-brand mb-0 h1 ${location.pathname === '/' ? 'active' : ''}`} to="/">iNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/newspaper' ? 'active' : ''}`} to="/newspaper">NewsPaper</Link>
                                                    </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} to="/contact">Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
                        </li>

                    </ul>
                    {!localStorage.getItem('token') ? <form className="d-flex" role="search">
                        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-1" to="/signup" role="button">Sign up</Link>
                    </form> : <form className="d-flex" role="search">
                        <i class="fa-solid fa-user mx-3" style={{ color: "#ffffff", padding: '10px 0 0 0' }} onClick={handleUser}></i>
                        <button className="btn btn-primary mx-1" onClick={handleLogout}>Logout</button></form>}
                </div>
            </div>
        </nav>
    )
}

export default NavBar
