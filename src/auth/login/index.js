import react, {useState, useRef} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Logo from '../../components/logo/index';
import { api } from '../../utils/api';
import { useHistory } from "react-router-dom";
import "./login.css";

const Login =({setToken})=>{
    const [error, setError]=useState("");
    const userRef=useRef();
    const passwordRef=useRef();
    const history=useHistory();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        let formdata = new FormData();
        formdata.append("app_name", "CS-SPA-REACT");
        formdata.append("username", userRef.current.value);
        formdata.append("password", passwordRef.current.value);
        console.log(userRef,passwordRef);
        api.login(formdata)
        .then(data=>{
            console.log(data);
            if(data.status==="failed"){
                setError(data.errors[0])
            }else if(data.status==="Access Token Generated Successfully"){
                setToken(data.data.access_token)
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
                    <Form.Group controlId="formBasicEmail">
                            <Form.Control
                            type="Username"
                            placeholder="Username"
                            ref={userRef}
                            required
                            />
                            <label required>Username</label>
                    </Form.Group>
                    <Form.Group
                        
                        controlId="formBasicPassword"
                    >
                        <Form.Control
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
                        variant="primary outline-primary"
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