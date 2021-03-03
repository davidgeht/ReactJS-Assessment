import React, {useEffect, useState} from"react";
import Modal from "react-awesome-modal";
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { api } from'../../utils/api';
import {useConContext} from "../../context/contactContext";
import AuthSerice from '../../service/auth.service';
import placeholder from"../../images/profile-pic.png";
import './usertable.css';
import QRcode from 'qrcode.react';

const ViewUserTable =()=>{
    const [checkbox1, setCheckbox1]=useState(0)
    const [selectedFile,setSelectedFile]=useState("")
    const [checkbox2, setCheckbox2]=useState(0)
    const [modal, setModal] = useState(false);
    const { contactId,setContactId } = useConContext();
    const [contact,setContact]=useState({});
    const [editUser, setEditUser]=useState({
        date_of_birth:"1111-11-11",
        support_end_date:"1111-11-11",
        support_start_date:"1111-11-11"
    });
    const handleFileChange=(e)=>{
        setSelectedFile(
          e.target.files[0],
            )
    }
    const [contactOptions,setContactOptions]=useState([])
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
    const authToken = AuthSerice.getAuthToken();
    useEffect(()=>{
        let id;
        if(!contactId){
            id=localStorage.getItem("CON_ID")
        }else{id=contactId};
        api.readContact(id, authToken)
        .then(data=>{
            setContact(data.data)
        })

    },[contactId])
    let checkdate=(date)=>{
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
    let open = () => {
        setModal(true);
      };
    let close=()=>{
        setModal(false)
    }
    const handleCheckBox1=(e)=>{
        e.preventDefault();
        if(checkbox1===0){
            setCheckbox1(1)
        }else{
            setCheckbox1(0)
        }

    }
    const listContacts = contactOptions && contactOptions.map(contact=>{
        return(
            <option>{contact}</option>
        )
    })
    const handleCheckBox2=(e)=>{
        e.preventDefault();
        if(checkbox2===0){
            setCheckbox2(1)
        }else{
            setCheckbox2(0)
        }
    }
    let handleChange=(evt)=>{
        evt.preventDefault();
        setEditUser({ ...editUser, [evt.target.name]:evt.target.value, });
    
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        let address= editUser.street_add+", "+editUser.city+", "+editUser.province+", "+editUser.country+", "+editUser.postal_code;
        const data = new FormData()
        data.append("profile_pic",selectedFile)
        data.append("first_name",editUser.first_name)
        data.append("last_name", editUser.last_name)
        data.append("date_of_birth", editUser.date_of_birth)
        data.append("organization_name",editUser.org_name)
        data.append("address_details",address)
        data.append("assigned_to",editUser.assigned_to)
        data.append("reports_to",editUser.reports_to)
        data.append("sla_name",editUser.sla_name)
        data.append("support_end_date",editUser.support_end_date)
        data.append("support_start_date",editUser.support_start_date)
        data.append("twitter_username",editUser.twitter_user)
        data.append("primary_email", editUser.primary_email)
        data.append("language",editUser.langauge)
        data.append("email_opt_out",checkbox1)
        data.append("do_not_call", checkbox2)
        data.append("id",contact.Id)
        console.log(selectedFile)
       api.updateContact(data,authToken)
     
       setEditUser(
        {date_of_birth:"1111-11-11",
        support_end_date:"1111-11-11",
        support_start_date:"1111-11-11"}
       ); 
        close()
    }
    
    return(
        <div className="main-view">
            <div className="profile">
                <div className="profile-info">
                    <img src={placeholder} className="user-pic"/>
                    <h2 className="name">{contact.first_name+" "+contact.last_name}</h2>
                    <QRcode className="qr-code" value={contactId}/>
                </div>
                <div className="profile-info-personal">
                    <Form id="view-user-form">
                        <Form.Row>
                            <Form.Group className="profile-group" as={Col} controlId="formGridEmail">
                                <Form.Label className="profile-label">Email:</Form.Label>
                                <p>{contact.primary_email}</p>
                            </Form.Group>
                        
                            <Form.Group  as={Col} controlId="formGridAddress1">
                                <Form.Label className="profile-label">Address:</Form.Label>
                                <p>{checkAddress(contact.address_details)}</p>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label className="profile-label">Date Of Birth:</Form.Label>
                                <p>{checkdate(contact.date_of_birth)}</p>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group className="profile-group" as={Col} controlId="formGridEmail">
                                <Form.Label className="profile-label">Organization Name</Form.Label>
                                <p>{checkValue(contact.org_name)}</p>
                            </Form.Group>
                        
                            <Form.Group as={Col}>
                                <Form.Label className="profile-label">Twitter Username</Form.Label>
                                <p>{checkValue(contact.twitter_username)}</p>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label className="profile-label">Language Preference</Form.Label>
                                <p>{checkValue(contact.language)}</p>
                            </Form.Group>

                        </Form.Row>

                        <hr className="addCon-line"></hr>

                        <Form.Row>
                            <Form.Group className="profile-group" as={Col} >
                                <Form.Label className="profile-label">Reports To:</Form.Label>
                                <p>{checkValue(contact.reports_to)}</p>
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label className="profile-label">Assigned To:</Form.Label>
                                <p>{checkValue(contact.assigned_to)}</p>
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label className="profile-label">Service Level Aggreement:</Form.Label>
                                <p>{checkValue(contact.sla_name)}</p>
                            </Form.Group>

                        </Form.Row>
                        
                        <Form.Row>

                            <Form.Group as={Col} className="profile-group" >
                                <Form.Label className="profile-label">Support Start Date: </Form.Label>
                                <p>{checkdate(contact.support_start_date)}</p>
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label className="profile-label">Support End Date: </Form.Label>
                                <p>{checkdate(contact.support_end_date)}</p>
                            </Form.Group>

                            <Form.Group as={Col}>
                            </Form.Group>

                        </Form.Row>
                        <hr className="addCon-line"></hr>
                        <Form.Row className="addCon-Checkbox-row">
                            <Form.Group className="profile-group" as={Col} id="formGridCheckbox">
                                <Form.Label className="profile-label">Do Not Call</Form.Label>
                                {checkMark(contact.do_not_call)}
                            </Form.Group>

                            <Form.Group as={Col} id="formGridCheckbox" >
                                <Form.Label className="profile-label">Email Opt Out</Form.Label>
                                {checkMark(contact.email_opt_out)}
                            </Form.Group>

                            <Form.Group as={Col}>
                            </Form.Group>

                        </Form.Row>
                    </Form>
                    <Button variant="secondary" block size="lg" type="submit" onClick={open} className="btn-viewuser">
                        Edit
                    </Button>
                </div>
            </div>
            {/* edit user modal */}
            <Modal effect="fadeInUp" visible={modal} onClickAway={close}>
                <section>
                    <div style={{padding: "45px 62px"}}>
                        <Row>
                            <h1>Edit {contact.first_name+" "+contact.last_name}</h1>
                        </Row>
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
                                Edit
                                </Button>
                            </Form.Row>
                        </Form>
                    </div>
                </section>
            </Modal>
        </div>

    )

}
export default ViewUserTable;