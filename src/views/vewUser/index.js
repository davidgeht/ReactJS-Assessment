import React, {useState} from 'react';
import Navbar from '../../components/nav/index';
import Sidebar from '../../components/sidebar/index';
import { CheckedContactsContext } from'../../context/checkContexts';
import ViewUserTable from"../../components/viewUserTable/index";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ConContext} from'../../context/contactContext';

const ViewUser =(props)=>{
    const [checkedContacts,setCheckedContacts]=useState([]);

    return(
        <>
        <Navbar/>
        <main>
            <Router>
            <CheckedContactsContext.Provider value={{checkedContacts,setCheckedContacts}} >
                <Sidebar/>
                <ViewUserTable/>
            </CheckedContactsContext.Provider>
            </Router>
        </main>
    </>
    )
}

export default ViewUser;