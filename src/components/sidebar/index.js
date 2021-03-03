import React,{useState,useEffect,useRef} from "react";
import { api } from"../../utils/api";
import "./sidebar.css";
import placeholder from"../../images/profile-pic.png";
import Button from "react-bootstrap/Button"
import Checkbox from "./checkbox";
import {useSelContacts} from '../../context/checkContexts';
import { useHistory } from "react-router-dom";
import AuthService from'../../service/auth.service';
import { useConContext } from'../../context/contactContext';
import { useReactToPrint } from 'react-to-print';
import PrintContacts from '../print/index';

const Sidebar =()=>{
    const componentRef = useRef();
    const { setContactId }= useConContext();
    const {checkedContacts,setCheckedContacts} = useSelContacts();
    const history=useHistory();
    const[contacts, setContacts]=useState([]);
    const [contactSearch, setContactSearch]=useState([]);
    const authToken=AuthService.getAuthToken();
    useEffect(()=>{
       updateContactList()
    },[checkedContacts])
    const updateContactList=()=>{
        api.readContacts(authToken)
        .then(data=>{
            setContacts(data.data);
        })
    }
    const handlePrint = useReactToPrint({
        content:()=> componentRef.current,
    })
    const handleViewUser=(id)=>{
        localStorage.setItem("CON_ID",id);
        setContactId(id);
        history.push("/viewuser");
    }
    
    const filteredContacts = contacts.filter((contact)=>{
        return contact.first_name
        .toString()
        .toLowerCase()
        .includes(contactSearch.toString().toLowerCase())
    })
    const sortedContacts = filteredContacts.sort((a,b)=>{
        return 1 * a.first_name.localeCompare(b.first_name)
    })
    const handleDelete=(e)=>{
        e.preventDefault();
        if(checkedContacts.length==0){
            alert("You must choose a contact to delete")
        }else if(checkedContacts.length==1){
            api.deleteContact(checkedContacts[0].id,authToken);
            setCheckedContacts([]);
            updateContactList();
           
        }else if(checkedContacts.length>1){
            let conIds=[];
            checkedContacts.map(item=>{conIds.push(item.id)})
            conIds.toString()
            let ids = conIds.toString()
            api.deleteContacts(ids,authToken)
            setCheckedContacts([]);
            updateContactList();
        }
        
        

    }
    
    const contactCards= sortedContacts && sortedContacts.map((contact)=>{
        return (

            <div className="card" >
                    <div className="card-info" >
                        <Checkbox contact={contact}/>
                        <img src={placeholder} className="card-pic"/>
                        <p className="card-name">{contact.first_name +" "+contact.last_name}</p> 
                        <Button variant="secondary" className="btn-card" onClick={(e)=>{
                            handleViewUser(contact.id)
                        }} >View</Button> 
                    </div>
            </div>
            
            
        )
    })
    return(
        <div className="sidebar">
            <div className="search">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search"
                    onChange={(e)=>setContactSearch(e.target.value)}
                />
            </div>
           
            <section className="card-section">
                {contactCards}
            </section>
    
            <div className="options">
                <Button className="btn-options" size="lg"onClick={handlePrint}>Print</Button>
                {" "}
                <Button className="btn-options" size="lg" onClick={handleDelete}>Delete</Button>
            </div>
            <div style={{display:"none"}}>
                <PrintContacts ref={componentRef}/>
            </div>
            
        </div>
        
    )
}

export default Sidebar;