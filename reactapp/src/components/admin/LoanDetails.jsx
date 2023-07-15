import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Dashboard from "../admin/Dashboard";

export default function LoanDetails() {
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loanId, setLoanId] = useState();
  const [applicantName, setName] = useState();
  const [applicantAddress, setAddress] = useState();
  const [applicantMobile, setMobile] = useState();
  const [applicantEmail, setEmail] = useState();
  const [applicantAadhaar, setAadhaar] = useState();
  const [applicantPan, setPan] = useState();
  const [applicantSalary, setSalary] = useState();
  const[loanAmountRequired,setLoanAmount]=useState();
  const [status, setStatus] = useState();
  const [, setItem] = useState({});

  useEffect(() => {
    const loginInfo = sessionStorage.getItem("login-info");
    if (loginInfo) {
      setIsLoggedIn(true);
    } else {
      alert("Please login first");
      navigate("/");
    }
  }, [navigate]);

  const loan = (e) => {
    e.preventDefault();
    fetch(`https://8080-cecfabafbfbdaedabdacfdafeabdcdceeeeaf.project.examly.io/api/user/viewLoan/${id}`)
      .then((res) => res.json())
      .then((result) => {
        if (result == null) {
          alert("No loan found");
        }
        console.log(result);
        setLoanId(result.loanId);
        setName(result.applicantName);
        setAddress(result.applicantAddress);
        setMobile(result.applicantMobile);
        setEmail(result.applicantEmail);
        setSalary(result.applicantSalary);
        setAadhaar(result.applicantAadhaar);
        setPan(result.applicantPan);
        setLoanAmount(result.loanAmountRequired);
        setStatus(result.status);
        const item = { loanId, applicantName, applicantAddress, applicantMobile, applicantEmail, applicantAadhaar, applicantPan, loanAmountRequired, status };
        setItem(item);
        setId("");

      }).catch((err) => {
        alert("No loan found");
      });

  
  };

  const renderButtonLabel = () => {
    if (status === 1) {
      return "Accepted";
    } else if (status === 2) {
      return "Rejected";
    } else {
      return "Pending";
    }
  };

  const renderButtonVariant = () => {
    if (status === 1) {
      return "success";
    } else if (status === 2) {
      return "danger";
    } else {
      return "warning";
    }
  };

  
  
  return (
    <Fragment>
      <Dashboard/>
      {isLoggedIn?(
        <div>
        <div>
      <div style={{  }}>
        <p className="text-center fw-bold fs-5 mt-5" style={{alignItems:"center",fontColor:"Balck"}}><strong>Track Your Loan Application</strong></p>
        <form className="d-flex flex-column" onSubmit={loan}>
          <input
            id="enterLoanId"
            type="text"
            placeholder="Enter Your Loan Id"
            className="m-5 text-center mx-auto fw-bold border-1 inpstyle"
            value={id}
            onChange={(e) => setId(e.target.value)}
            style={{width: '400px',
              height: '50px',
              borderRadius: '6px',
            }}
          />
          <button
            type="submit"
            id="trackButton"
            className="btn border bg-danger mx-auto text-white fw-bold trackbtn"
            style={{ width:'200px',fontSize:'20px',borderRadius: '15px'}}
          >
            Track
          </button>
        </form>
      </div>
        {loanId && (
         <table className="loan-table" style={{ backgroundColor: '#f0f0f0', padding: '20px', margin: '20px auto 20px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', width: '90%', display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
         <tbody>
           <tr>
             <td style={{ padding: '10px' }}>Applicant Name: {applicantName}</td>
             <td style={{ padding: '10px' }}>Applicant Address: {applicantAddress}</td>
             <td style={{ padding: '10px' }}>Applicant Phone no: {applicantEmail}</td>
           </tr>
           <tr>
             <td style={{ padding: '10px' }}>Applicant Salary: {applicantSalary}</td>
             <td style={{ padding: '10px' }}>Applicant PAN No: {applicantPan}</td>
             <td style={{ padding: '10px' }}>Applicant Aadhar: {applicantAadhaar}</td>
           </tr>
           <tr>
             <td style={{ padding: '10px' }}>Applicant Email: {applicantEmail}</td>
             <td style={{ padding: '10px' }}>Applicant Loan ID: {loanId}</td>
             <td></td>
           </tr>
           <tr>
             <td></td>
             <td></td>
             <td>
               <div className="loan-status">
                 <div>
                 <Button variant={renderButtonVariant()}>
                      {renderButtonLabel()}
                    </Button>
                 </div>
               </div>
             </td>
           </tr>
         </tbody>
       </table>
       
        )}
  </div>
  </div>
      ):null}
   </Fragment>
  );
}
