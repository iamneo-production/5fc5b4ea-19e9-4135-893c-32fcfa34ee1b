import Dashboard from "./Dashboard";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function GetLoans() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [, setData] = useState([]);
  const [loans, setLoans] = useState([]);
  

  useEffect(() => {
  fetchAppliedLoans();
  }, []);
  
  useEffect(() => {
    const loginInfo = sessionStorage.getItem("login-info");
    if (loginInfo) {
      setIsLoggedIn(true);
    } else {
      alert("Please login first");
      navigate("/");
    }
  }, [navigate]);

  const fetchAppliedLoans = () => {
    axios
      .get('https://8080-cecfabafbfbdaedabdacfdafeabdcdceeeeaf.project.examly.io/api/admin/getAllLoans')
      .then((res) => {
        if (res.data.length > 0) {
          setData(res.data.Result);
        } else {
          alert('Error');
        }
      })
      .catch((err) => console.log(err));
  };
  const handleReject = (e,loan) => {
    loan.status=2
    console.log(loan);
    axios.put(`https://8080-cecfabafbfbdaedabdacfdafeabdcdceeeeaf.project.examly.io/api/user/editLoan/${loan.loanId}`, loan).then((res) => {
      window.location.reload(true);
      })
      .catch((err) => console.log(err));
  };

  const handleApprove = (e,loan) => {
    loan.status=1
    console.log(loan);
    axios.put(`https://8080-cecfabafbfbdaedabdacfdafeabdcdceeeeaf.project.examly.io/api/user/editLoan/${loan.loanId}`, loan)
    .then((res) => {
      axios.put(`https://8080-cecfabafbfbdaedabdacfdafeabdcdceeeeaf.project.examly.io/api/admin/generateEmi/${loan.loanId}`).then((res)=>console.log(res))
      window.location.reload(true);
    })
    .catch((err) => console.log(err));
  };
  

  useEffect(() => {
    fetch("https://8080-cecfabafbfbdaedabdacfdafeabdcdceeeeaf.project.examly.io/api/admin/getAllLoans", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem("loan", JSON.stringify(result));
        setLoans(result);
      })
      .catch((err) => console.log(err));
  }, []);
  
  const renderLoanStatus = (loan) => {
    if (loan.status === "approved") {
      return <span className="status approved">Approved</span>;
    } else if (loan.status === "rejected") {
      return <span className="status rejected">Rejected</span>;
    } else {
      return (
        <>
          <button
            onClick={(e) => handleApprove(e, loan)}
            className={`approve-btn ${loan.status === "rejected" ? "disabled" : ""}`}
            disabled={loan.status === "rejected"}
            style={{ marginRight: "10px", marginBottom: "10px" }}
          >
            Approve
          </button>
          <button
            onClick={(e) => handleReject(e, loan)}
            className={`reject-btn ${loan.status === "approved" ? "disabled" : ""}`}
            disabled={loan.status === "approved"}
            style={{ marginBottom: "10px" }}
          >
            Reject
          </button>
        </>
      );
    }
  };

  return (
    <Fragment>
      <Dashboard/>
      {isLoggedIn?(
        <div>
      <div className="display_users_wrapper">
        <div className="count_of_applications">
          <p id="count_number"> <br></br>
            <strong>{loans.length}</strong> applicant(s) to verify
          </p>
        </div>
      </div>
      {loans.length !== 0 ? (
        <div className="card-container" >
          <div className='grid-container'>
        <div className='grid-item'>
          {loans.map((loan) => (
            <div className='image-container' key={loan.loanId } style={{ backgroundColor: '#f0f0f0', padding: '20px', margin: '20px auto 20px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', width: '90%', display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
              <table>
                <tbody style={{paddingTop:'20px',width:'250%'}}>
                <tr >
                 <td style={{paddingLeft:'20px', paddingRight: '15px' }}>Applicant Name:</td>
                <td>{loan.applicantName}</td>
                <td style={{ paddingLeft: '20px', paddingRight: '15px'}}>Applicant Address:</td>
                <td>{loan.applicantAddress}</td>
                <td style={{ paddingLeft: '20px', paddingRight: '15px' }}>Applicant Email:</td>
                <td>{loan.applicantEmail}</td >
               </tr>


               <tr>
                 <td style={{paddingLeft:'20px', paddingRight: '15px'}}>Applicant Phone No:</td>
                 <td>{loan.applicantMobile}</td>
                 <td style={{ paddingLeft: '20px', paddingRight: '15px'}}>Applicant Aadhar Number:</td>
                 <td>{loan.applicantAadhaar}</td>
                 <td style={{ paddingLeft: '20px', paddingRight: '15px' }}>Applicant Pan Number:</td>
                 <td>{loan.applicantPan}</td>
               </tr>

                 
               <tr>
                <td style={{paddingLeft:'20px', paddingRight: '10px',marginBottom:'15px'}}>Loan Amount:</td><td>{loan.loanAmountRequired}</td>
                <td style={{ paddingLeft: '20px', paddingRight: '10px',marginBottom:'15px' }}>Loan ID:</td><td>{loan.loanId}</td>
                <td colSpan="2" style={{ paddingLeft: "20px" }}>
                              {renderLoanStatus(loan)}
                            </td>
                </tr>

                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
        </div>
      ) : (
        <h1 style={{ textAlign: "center" }}>No Loan Yet</h1>
      )}
      </div>
      ):null}
    </Fragment>
  );
}