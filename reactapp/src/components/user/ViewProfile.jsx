import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

export default function ViewProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ "username": '', "address": '', "mobile": '', "loanid": '', "email": '', "emi": '' });
  useEffect(() => {
    if (sessionStorage.getItem("login-info") == null) {
      alert("Please login first");
      navigate("/");
    }

    const fetchData = async () => {
      const email = sessionStorage.getItem("login-info");
      await fetch(`http://localhost:54754/user/getProfile?email=${email}`)
        .then(res => res.json())
        .then((result) => {
          setProfile(JSON.parse(result));
          console.log(result);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ border: "2px solid black", height: '30rem', width: '90%', margin: 'auto', marginTop: "5rem" }}>
        <Container>
          <h3 style={{ textAlign: "center", color: "#0C2F4E" }}>Profile Information</h3>
          <Row style={{ marginTop: "6rem" }}>
            <Col><p style={{ fontSize: "1.4rem", border: "1px solid black", textAlign: "center", borderRadius: "2px" }}><strong style={{ color: "black" }}>Name: </strong>{profile.username}</p></Col>
            <Col xs={6}><p style={{ fontSize: "1.4rem", border: "1px solid black", textAlign: "center", borderRadius: "2px" }}><strong style={{ color: "black" }}>Address: </strong> {profile.address}</p></Col>
            <Col><p style={{ fontSize: "1.4rem", border: "1px solid black", textAlign: "center", borderRadius: "2px" }}><strong style={{ color: "black" }}>Mobile: </strong> {profile.mobile}</p></Col>
          </Row>
          <Row style={{ marginTop: "6rem" }}>
            <Col><p style={{ fontSize: "1.4rem", border: "1px solid black", textAlign: "center", borderRadius: "2px" }}><strong style={{ color: "black" }}>Loan Id: </strong> {profile.loanid}</p></Col>
            <Col xs={5}><p style={{ fontSize: "1.4rem", border: "1px solid black", textAlign: "center", borderRadius: "2px" }}><strong style={{ color: "black" }}>Email: </strong>{profile.email}</p></Col>
            <Col><p style={{ fontSize: "1.4rem", border: "1px solid black", textAlign: "center", borderRadius: "2px" }}><strong style={{ color: "black" }}>Monthly EMI: </strong> {profile.emi}</p></Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}