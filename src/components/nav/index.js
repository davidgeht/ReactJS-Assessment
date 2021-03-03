import React, {useState} from 'react';
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'
import navlogo from '../../images/navlogo.png';
import "./nav.css";
import AuthService from'../../service/auth.service';

const Navbar =()=>{
    const handleLogout =(e)=>{
        AuthService.logout()
    }
    return(
        <Nav className="container-fluid" >
            <Nav.Item>
                <img className="nav-logo" src={navlogo}/>
            </Nav.Item>
            <Nav.Item>
                <h3 className="nav-title">Contact Manager</h3>
            </Nav.Item>
            <Nav.Item className="" >
                <Link className="nav-link" to="/adduser" >Add Contact</Link>
            </Nav.Item>
           <Nav.Item className="ml-auto nav-logout" >
                <Link to='/' className="nav-link" onClick={handleLogout}>Log Out</Link>
            </Nav.Item>
        </Nav>
    )
}

export default Navbar