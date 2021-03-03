import React, { useState } from "react";
import {useSelContacts} from '../../context/checkContexts';
const Checkbox =({contact})=>{
    const {checkedContacts,setCheckedContacts} = useSelContacts();
    const [isChecked,setIsChecked]=useState(false);
    const setChecked=()=>{
        if(isChecked===false){
            setIsChecked(true)
        }else{
            setIsChecked(false)
        }
    }
    const handleCheckbox=(contact)=>{
        if(isChecked===false){
            setCheckedContacts([...checkedContacts,contact])
        }else{
            handleRemoveContact(contact)
        }
    }
    const handleRemoveContact=(contact)=>{
            setCheckedContacts(checkedContacts.filter(item=>item.id !==contact.id))
        }
    return (
        <input input type="checkbox" className="checkbox"  onClick={()=>{
            setChecked();
            handleCheckbox(contact);
        }}/>
    )
}

export default Checkbox;