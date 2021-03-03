import React, {useState} from 'react';
import Navbar from '../../components/nav/index';
import Sidebar from '../../components/sidebar/index';
import { CheckedContactsContext } from'../../context/checkContexts';
import AddUserForm from '../../components/addUserForm/index';
import { BrowserRouter as Router, Route }from'react-router-dom';
import ViewUserTable from '../../components/viewUserTable';



const AddUser =(props)=>{
    const [checkedContacts,setCheckedContacts]=useState([]);
    return(
        <>
        <Navbar/>
        <CheckedContactsContext.Provider value={{checkedContacts,setCheckedContacts}} >
        
        <main>
            <Sidebar/>
            <AddUserForm/>
        </main>
 
        </CheckedContactsContext.Provider>
          
    </>
    )
}

export default AddUser;