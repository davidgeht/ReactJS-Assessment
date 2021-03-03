import React, {useState, useRef} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Logo from '../logo/index';
import "./login.css";
import AuthService from'../../service/auth.service';

const Login =(props)=>{
    const [loading, setLoading]=useState(false);
    const [error, setError]=useState("");
    const userRef=useRef();
    const passwordRef=useRef();
    
    const handleSubmit=async (e)=>{
        e.preventDefault();
        setLoading(true)
        AuthService.login(userRef.current.value,passwordRef.current.value)
        .then(data=>{
            console.log(data);
            if(data.status==="failed"){
                setError(data.errors[0])
            }else if(data.status==="Access Token Generated Successfully"){
                props.history.push("/adduser")
            }
        })
    }

    return(
        <div className="login-container">
           <div style={{ width: "324px", padding: "0rem 3rem" }}>
            <Logo />
            <br></br>
                <Form
                className="d-flex flex-column align-items-center"
                onSubmit={handleSubmit}
                >
                    <Form.Group className="form-group-login" controlId="formBasicEmail">
                            <Form.Control
                            className='form-control-login'
                            type="Username"
                            placeholder="Username"
                            ref={userRef}
                            required
                            />
                            <label required>Username</label>
                    </Form.Group>
                    <Form.Group
                        className="form-group-login"
                        controlId="formBasicPassword"
                    >
                        <Form.Control
                        className='form-control-login'
                        type="password"
                        placeholder="Password"
                        ref={passwordRef}
                        required
                         />
                        <label>Password</label>
                    </Form.Group>
                    <div style={{ height: "52px" }} className="login-error">
                        <p>{error}</p>
                    </div>
                    <Button
                        style={{ width: "162px"}}
                        variant="danger outline-danger"
                        className="btn-login"
                        block
                        type="submit"
                        value="Log In"
                    >
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    )

    

}
export default Login;