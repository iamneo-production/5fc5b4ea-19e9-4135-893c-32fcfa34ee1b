import React, {Fragment, useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ViewProfile() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({ "username": '', "applicantAddress": '', "mobileNumber": '', "loanId": '', "email": '', "emi": '' });
  const [editMode, setEditMode] = useState(false);
  const email = sessionStorage.getItem("login-info");

  useEffect(() => {
    fetchData();
    console.log(profile);
  },[]);

  useEffect(() => {
    const loginInfo = sessionStorage.getItem("login-info");
    if (loginInfo) {
      setIsLoggedIn(true);
    } else {
      alert("Please login first");
      navigate("/");
    }
  }, [navigate]);


    const fetchData =  () => {
      console.log("entered");
      console.log(email);
      axios.get(`https://8080-aaddebfbaaeaedabdacfdafeabdcdceeeeaf.project.examly.io/api/user/getProfile/${email}`)
        .then((result) => {
          console.log(result);
          setProfile({...profile,
          "loanId":result.data.loanId,
          "emi":result.data.emi,
          "applicantAddress":result.data.applicantAddress,
          "username":result.data.username,
          "mobileNumber":result.data.mobileNumber,
          "email":result.data.email
        })
        })
        .catch((err) => console.log(err));
    };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {

      console.log(profile)
      axios.put(`https://8080-aaddebfbaaeaedabdacfdafeabdcdceeeeaf.project.examly.io/api/user/editProfile/${email}`,profile).then((response)=>{
        console.log(response);
        if(response.data==="User updated"){
          window.location.reload(true);
        }
        else{
          alert("Not Updated")
        }
      })

    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    const originalProfile = { ...profile };
    setProfile(originalProfile);
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  return (
    <Fragment>
      <Navbar />
      {isLoggedIn?(
        <div>
      <div style={{ border: "2px solid black", height: '36rem', width: '90%', margin: 'auto', marginTop: "5rem" }}>
        <Container>
          <h3 style={{ textAlign: "center", color: "#0C2F4E" , marginTop: '10px'}}>Profile Information</h3>
          <Row style={{ marginTop: "4rem" }}>
            <Col>
              
                <strong style={{  fontSize: '16px', marginleft: '5px' }}>Name: </strong>
                {editMode ? (
                  <input
                    type="text"
                    name="username"
                    value={profile.username}
                    onChange={handleChange}
                    style={{ width: '50%', padding: '8px', marginleft: '10px' ,marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                  />
                ) : (
                <span>{ profile.username } </span>
                )}
            </Col>
            <Col xs={6}>
              
                <strong style={{ color: "black" }}>Address: </strong>
                {editMode ? (
                  <input
                    type="text"
                    name="applicantAddress"
                    value={profile.applicantAddress}
                    onChange={handleChange}
                    style={{ width: '50%', padding: '8px', marginleft: '10px' ,marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                  />
                ) : (
                  profile.applicantAddress
                )}
              
            </Col>
          </Row>
          <Row style={{ marginTop: "4rem" }}>
            <Col>
              
                <strong style={{ color: "black" }}>Mobile: </strong>
                {editMode ? (
                  <input
                    type="text"
                    name="mobileNumber"
                    value={profile.mobileNumber}
                    onChange={handleChange}
                    style={{ width: '50%', padding: '8px', marginleft: '10px' ,marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                  />
                ) : (
                  profile.mobileNumber
                )}
          
            </Col>
            <Col>
            
                <strong style={{ color: "black" }}>Loan Id: </strong>
                {profile.loanId} 
                
              
            </Col>
          </Row>
          <Row style={{ marginTop: "4rem" }}>
            <Col>
            
                <strong style={{ color: "black" }}>Email: </strong>
               
                  {profile.email}
              
              
            </Col>
            <Col>

                <strong style={{ color: "black" }}>Monthly emi: </strong>
                {profile.emi}  
                              
            
            </Col>
          </Row>
          <Row style={{ marginTop: "4rem" }}>
            <Col>
              {editMode ? (
                <div>
                <Button variant="success" onClick={handleSave} style={{ paddingLeft: '2px',width:'20%', marginLeft:'75px'}}>Save</Button> 
                <Button variant="secondary" onClick={handleCancel} style={{ paddingLeft: '5px', backgroundColor: '#dc3545',width:'20%', marginLeft: '250px',alignItems:'right'}}>Cancel</Button>
              </div>
              ) : (
                <Button variant="primary" onClick={handleEdit} style={{ marginLeft:"400px",alignItems:'center'}}>Edit Profile</Button>
              )}
            </Col>
            
          </Row>
        </Container>
      </div>
      </div>
      ):null}
    </Fragment>
  );
}