import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import Details from '../user/Details';
import { ListGroup } from "react-bootstrap";

export default function ViewLoan() {
  const [id, setId] = useState();
  const [loanId, setLoanId] = useState();
  const [loantype, setLoanType] = useState();
  const [applicantName, setName] = useState();
  const [applicantAddress, setAddress] = useState();
  const [applicantMobile, setMobile] = useState();
  const [applicantEmail, setEmail] = useState();
  const [applicantAadhar, setAadhar] = useState();
  const [applicantPan, setPan] = useState();
  const [applicantSalary, setSalary] = useState();
  const [loanAmount, setAmount] = useState();
  const [loanRepaymentMonths, setMonth] = useState();
  const [status, setStatus] = useState("Status");
  const [item, setItem] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("login-info") == null) {
      alert("please login first");
      navigate("/");
    }
  });

  const loan = (e) => {
    e.preventDefault();
    fetch(`http://localhost:54754/user/viewLoan?loanId=${id}`)
      .then((res) => res.json())
      .then((result) => {
        if (result == null) {
          alert("No loan found");
        }
        setLoanId(result.loanId);
        setLoanType(result.loantype);
        setName(result.applicantName);
        setAddress(result.applicantAddress);
        setMobile(result.applicantMobile);
        setEmail(result.applicantEmail);
        setAadhar(result.applicantAadhar);
        setPan(result.applicantPan);
        setAmount(result.loanAmount);
        setStatus(result.status);
      }).catch((err) => {
        alert("No loan found");
      });
    const item = { loanId, loantype, applicantName, applicantAddress, applicantMobile, applicantEmail, applicantAadhar, applicantPan, loanAmount, status };
    setItem(item);
  };

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <p id="track_application_text">
          Track your loan application
        </p>
        <form onSubmit={loan}>
          <label>Enter your Loan ID</label>
          <input type="text" id="enterLoanId" placeholder="9 digit ID" onChange={(e) => setId(e.target.value)}></input>
          <button type="submit" id="trackButton">Track</button>
        </form>
        <hr />
        <ListGroup>
          <ListGroup.Item><h4 style={{ textAlign: "center" }}>Loan Status</h4></ListGroup.Item>
          <ListGroup.Item><p><strong>Loan id : </strong> {loanId}</p></ListGroup.Item>
          <ListGroup.Item><p><strong>Loan Type : </strong> {loantype}</p></ListGroup.Item>
          <ListGroup.Item><p><strong>Applicant Name : </strong>{applicantName}</p></ListGroup.Item>
          <ListGroup.Item><p><strong>Applicant Email : </strong> {applicantEmail}</p></ListGroup.Item>
          <ListGroup.Item><p><strong>Applicant Phone No : </strong> {applicantMobile}</p></ListGroup.Item>
          <ListGroup.Item><p><strong>Applicant Address : </strong> {applicantAddress}</p></ListGroup.Item>
          <ListGroup.Item><p><strong>Applicant Aadhar No : </strong> {applicantAadhar}</p></ListGroup.Item>
          <ListGroup.Item><p><strong>Applicant PAN No : </strong> {applicantPan}</p></ListGroup.Item>
          <ListGroup.Item><p><strong>Applicant Loan Amount : </strong> {loanAmount}</p></ListGroup.Item>
          <ListGroup.Item><p><strong>Loan Status : </strong> {status}</p></ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
}