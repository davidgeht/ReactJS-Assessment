import React,{useEffect,useState} from "react";
import {useSelContacts} from '../../context/checkContexts';
import Table from "react-bootstrap/Table";
import QRcode from 'qrcode.react'
const PrintContacts=React.forwardRef((props, ref) => {
    const {checkedContacts,setCheckedContacts} = useSelContacts();
    let checkDate=(date)=>{
        if(date===null || date==="1111-11-11"){
            return ""
        }else{
            return date
        }
    }
    let checkMark=(status)=>{
        if(status==="1"){
            return <p>&#10004;</p>
        }else{
            return <p>&#10006;</p>
        }

    }
    let checkValue=(value)=>{
        if(value==="undefined"){
            return""
        }else{
            return value
        }
    }
    let checkAddress=(value)=>{
        if(value==="undefined, undefined, undefined, undefined, undefined"){
            return""
        }else{
            return value
        }
    }
    const printContent = checkedContacts && checkedContacts.map((contact)=>{
        return(
            <Table >
            <tbody>
                <tr>
                    <td>First Name:</td>
                    <td>{contact.first_name}</td>
                    <td>Last Name:</td>
                    <td>{contact.last_name}</td>
                </tr>
            </tbody>
            <tbody>
                <tr>
                    <td>Address:</td>
                    <td>{checkAddress(contact.address_details)}</td>
                    <td>Date of Birth:</td>
                    <td>{checkDate(contact.date_of_birth)}</td>
                </tr>
            </tbody>
           
            <tbody>
                <tr>
                <td>Email Address:</td>
                <td>{contact.primary_email}</td>
                <td>Twitter Username:</td>
                <td>{checkValue(contact.twitter_username)}</td>
                </tr>
            </tbody>
            <tbody>
                <tr>
                    <td>Contact ID:</td>
                    <td>{contact.id}</td>
                    <td>Reports To:</td>
                    <td>{checkValue(contact.reports_to)}</td>
                </tr>
            </tbody>
            <tbody>
                <tr>
                    <td>Assigned To:</td>
                    <td>{checkValue(contact.assigned_to)}</td>
                    <td>Support End Date:</td>
                    <td>{checkDate(contact.support_end_date)}</td>
                </tr>
            </tbody>
            <tbody>
                <tr>
                    <td>Support Start Date:</td>
                    <td>{checkDate(contact.support_start_date)}</td>
                    <td>Service Level Agreement:</td>
                    <td>{checkValue(contact.sla_name)}</td>
                </tr>
            </tbody>
            <tbody>
                <tr>
                    <td>Do Not Call:</td>
                    <td>{checkMark(contact.do_not_call)}</td>
                    <td>Email Opt Out:</td>
                    <td>{checkMark(contact.email_opt_out)}</td>
                </tr>
            </tbody>
            <tbody>
                <QRcode value={contact.id}/>
            </tbody>
            
        </Table> 
        )
    })
    return(

       <div ref={ref}>
           {printContent}
       </div> 
    )
}
)

export default PrintContacts;
    


