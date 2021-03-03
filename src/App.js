import React, { useEffect, useState } from "react";
import './App.css';
import Login from"./components/login/index";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AddUser from './views/adduser/index';
import ViewUser from './views/viewUser/index';
import AuthService from './service/auth.service';
import {ConContext} from'./context/contactContext';

function App(props) {
  
  const [contactId, setContactId]=useState()
  const[authToken,setAuthToken]=useState(undefined);
  const [isLoggedIn, setIsLoggedIn]=useState(false)
  useEffect(()=>{
    const token =AuthService.getAuthToken();
    if(token){
      setAuthToken(token)
      setIsLoggedIn(true)
    }
  },[authToken])
  return(
    <div>
        <Router>
          {!isLoggedIn ?(
            <Route exact path="/" component={Login}/>
          ):(
            <Switch>
               <ConContext.Provider value={{contactId,setContactId}}>
                <Route exact path="/" component={Login}/>
                <Route path="/adduser" component={AddUser}/>
                <Route path="/viewuser" component={ViewUser}/>
              </ConContext.Provider>
            </Switch>
          )}
          </Router>
   
    </div>
  )
  
  
}

export default App;
