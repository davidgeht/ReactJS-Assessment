import React,{ useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { useHistory} from"react-router-dom";
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import "./addUser.css"
import { api } from '../../utils/api';
import AuthService from'../../service/auth.service';
import {useConContext} from "../../context/contactContext";

const AddUserForm =()=>{
    const history =useHistory();
    const { setContactId } = useConContext();
    const [contactOptions,setContactOptions]=useState([])
    const authToken=AuthService.getAuthToken();
    const [checkbox1, setCheckbox1]=useState(0)
    const [checkbox2, setCheckbox2]=useState(0)
    useEffect(()=>{
        api.readContacts(authToken)
        .then(data=>{
            let conNames=[];
            data.data.map(item=>{
                let fullName=item.first_name+" "+item.last_name;
                conNames.push(fullName)
                console.log(item)
            })
           setContactOptions(conNames)
        })
    },[])
    const [selectedFile,setSelectedFile]=useState("")
    const handleFileChange=(e)=>{
        setSelectedFile(
          e.target.files[0],
            )
    }
    const[newUser,setNewUser]=useState({
        date_of_birth:"1111-11-11",
        support_end_date:"1111-11-11",
        support_start_date:"1111-11-11"
    });
    function handleChange(evt) {
        evt.preventDefault();
        setNewUser({ ...newUser, [evt.target.name]: evt.target.value });
      }
    function handleSubmit(e){
        e.preventDefault();
        let address= newUser.street_add+", "+newUser.city+", "+newUser.province+", "+newUser.country+", "+newUser.postal_code;
        const data = new FormData()
        data.append("profile_pic",selectedFile)
        data.append("first_name",newUser.first_name)
        data.append("last_name", newUser.last_name)
        data.append("date_of_birth", newUser.date_of_birth)
        data.append("organization_name",newUser.org_name)
        data.append("address_details",address)
        data.append("assigned_to",newUser.assigned_to)
        data.append("reports_to",newUser.reports_to)
        data.append("sla_name",newUser.sla_name)
        data.append("support_end_date",newUser.support_end_date)
        data.append("support_start_date",newUser.support_start_date)
        data.append("twitter_username",newUser.twitter_user)
        data.append("primary_email", newUser.primary_email)
        data.append("language",newUser.langauge)
        data.append("email_opt_out",checkbox1)
        data.append("do_not_call", checkbox2)
        console.log(selectedFile)
       api.addContact(data,authToken)
       .then(data=>{
         setContactId(data.data.id)
         localStorage.setItem("CON_ID",data.data.id)
         history.push('/viewuser')
       })
       setNewUser(
        {date_of_birth:"1111-11-11",
        support_end_date:"1111-11-11",
        support_start_date:"1111-11-11"}
       ); 
    }
    const listContacts = contactOptions && contactOptions.map(contact=>{
        return(
            <option>{contact}</option>
        )
    })
    const handleCheckBox1=(e)=>{
        e.preventDefault();
        if(checkbox1===0){
            setCheckbox1(1)
        }else{
            setCheckbox1(0)
        }

    }
    const handleCheckBox2=(e)=>{
        e.preventDefault();
        if(checkbox2===0){
            setCheckbox2(1)
        }else{
            setCheckbox2(0)
        }
    }
    return(
        <div className="main-view">
            <div className="page-title">
                <text>Add Contact</text>
            </div>
            <Form onSubmit={handleSubmit} id="addCon-form">
            <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control onChange={handleChange} type="first_name" name="first_name" placeholder="First Name" required/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Last Name</Form.Label>
                <Form.Control onChange={handleChange} type="last_name" name="last_name"placeholder="Last Name" required />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Date Of Birth</Form.Label>
                <Form.Control onChange={handleChange}type="date" name="date_of_birth" placeholder="Date Of Birth" />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Organization Name</Form.Label>
                <Form.Control  onChange={handleChange} type="name" name="org_name" placeholder="Organization Name" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control onChange={handleChange} type="email" name="primary_email"  placeholder="Email Address" required />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Langauge Preference</Form.Label>
                <Form.Control onChange={handleChange} type="name" name="langauge" placeholder="Langauge"/>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group  as={Col} controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control onChange={handleChange} name="street_add" placeholder="1234 Main St" />
                </Form.Group>
                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control onChange={handleChange} name="city"placeholder='City'/>
                </Form.Group>
                
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Province</Form.Label>
                <Form.Control onChange={handleChange} as="select" defaultValue="Choose..." name="province">
                    <option>Choose...</option>
                    <option>ON</option>
                    <option>QC</option>
                    <option>NL</option>
                    <option>PE</option>
                    <option>NS</option>
                    <option>MB</option>
                    <option>SK</option>
                    <option>AB</option>
                    <option>BC</option>
                    <option>YT</option>
                    <option>NT</option>
                    <option>NU</option>
                </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Country</Form.Label>
                <Form.Control onChange={handleChange} as="select" defaultValue="Choose..." name="country">
                    <option>Choose...</option>
                    <option>Canada</option>
                    <option>United States</option>
                </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip" name="postal_code">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control onChange={handleChange} name="postal_code" placeholder="Postal Code" />
                </Form.Group>
            </Form.Row>
            <hr className="addCon-line"></hr>
            <Form.Row>
                <Form.Group as={Col} >
                    <Form.Label>Reports To:</Form.Label>
                    <Form.Control  onChange={handleChange} as="select" defaultValue="Choose..." name="reports_to">
                        <option>Choose...</option>
                        <option>n/a</option>
                        {listContacts}
                </Form.Control>

                </Form.Group>
                <Form.Group as={Col} >
                    <Form.Label>Assigned To:</Form.Label>
                    <Form.Control onChange={handleChange} as="select" defaultValue="Choose..." name="assigned_to">
                        <option>Choose...</option>
                        <option>User 1</option>
                        <option>User 2</option>
                        <option>User 3</option>
                </Form.Control>

                </Form.Group>
                <Form.Group as={Col} >
                    <Form.Label>Service Level Aggreement</Form.Label>
                    <Form.Control onChange={handleChange} placeholder="SLA Name" name="sla_name"></Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Row>
            <Form.Group as={Col} >
                    <Form.Label>Support Start Date: </Form.Label>
                    <Form.Control onChange={handleChange}  type="date" name="support_start_date"></Form.Control>
                </Form.Group>
                <Form.Group as={Col} >
                    <Form.Label>Support End Date: </Form.Label>
                    <Form.Control onChange={handleChange}   type="date" name="support_end_date"></Form.Control>
                </Form.Group>
            </Form.Row>
            <hr className="addCon-line"></hr>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Twitter Username</Form.Label>
                    <Form.Control onChange={handleChange} name="twitter_user" placeholder="Username"/>
                </Form.Group>
                <Form.Group as={Col}>
                <Form.Label>Profile Picture</Form.Label>
                <Form.File 
                    accept="image/gif, image/jpeg, image/png"
                    id="custom-file"
                    label="Profile Picture"
                    name="profile_pic"
                    onChange={handleFileChange}
                    custom
  />
                </Form.Group>
            </Form.Row>
            <Form.Row className="addCon-Checkbox-row">
            <Form.Group as={Col} id="formGridCheckbox">
                <Form.Check onChange={handleCheckBox1}  type="checkbox" label="Email Opt Out" name="email_opt_out" id="emailbox"/>
            </Form.Group>

            <Form.Group as={Col} id="formGridCheckbox" >
                <Form.Check onChange={handleCheckBox2}  size='lg' type="checkbox"  label="Do Not Call" name="do_not_call" id="phonebox"/>
            </Form.Group>
            </Form.Row>
            <Form.Row>
                <Button variant="secondary" block size="lg" type="submit"  className="btn-addCon">
                    Add Contact
                </Button>
            </Form.Row>
            </Form>
        </div>
    )
}

export default AddUserForm;