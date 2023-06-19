/*import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate, Link } from "react-router-dom";
import AddDocument from '../user/AddDocument';

export default function AddLoan() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

 useEffect(() => {
    if (sessionStorage.getItem("login-info") == null) {
      alert("Please login first");
      navigate("/");
    }
  });
  useEffect(() => {
    const loginInfo = sessionStorage.getItem("login-info");
    if (loginInfo) {
      setIsLoggedIn(true);
    } else {
      alert("Please login first");
      navigate("/");
    }
  }, [navigate]);

  if (!isLoggedIn) {
    return null;
  }

  const [loanId, setLoanId] = useState();
  const [loantype, setLoanType] = useState();
  const [applicantName, setName] = useState();
  const [applicantAddress, setAddress] = useState();
  const [applicantMobile, setMobile] = useState();
  const [applicantEmail, setEmail] = useState();
  const [applicantAadhaar, setAadhar] = useState();
  const [applicantPan, setPan] = useState();
  const [applicantSalary, setSalary] = useState();
  const [loanAmountRequired, setAmount] = useState();
  const [loanRepaymentMonths, setMonth] = useState();

  const add = async (event) => {
    const status = "Submitted";
    event.preventDefault();
    let item = {
      loantype,
      applicantName,
      applicantAddress,
      applicantMobile,
      applicantEmail,
      applicantAadhaar,
      applicantPan,
      applicantSalary,
      loanAmountRequired,
      loanRepaymentMonths,
      status
    };

    try {
      let result = await fetch('https://localhost:5018/user/addLoan', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json'
        }
      });
      result = await result.json();
      console.warn("result", result);

      if (result) {
        sessionStorage.setItem("loanid", result);
        navigate("/user/AddDocument");
      } else {
        console.log(result);
        alert("Could not apply for loan");
      }
    } catch (err) {
      console.warn("sent", item);
      console.log(err);
      alert("Not possible.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="addloan_wrapper">
        <div className="addloan_form">
          <form >
            <div>
              <input type="text" id="enterName" placeholder="Enter Applicant Name" required onChange={e => setName(e.target.value)} />
              
              <input type="email" id="enterEmail" placeholder="Enter Applicant Email Id" required onChange={(e) => setEmail(e.target.value)} />
              
              <input type="text" id="enterSalary" placeholder="Enter Applicant Salary" required onChange={e => setSalary(e.target.value)} />
              
              <input type="text" id="enterAmount" placeholder="Enter Loan Amount Required" required onChange={e => setAmount(e.target.value)} />

              <label htmlFor="file_type">Please pick a type</label>
              <select name="file_type" id="chooseFile" onChange={e => setLoanType(e.target.value)}>
                <option value="aadhar">Aadhar</option>
                <option value="pan">PAN</option>
                <option value="drivers_license">Driver's License</option>
              </select>
            </div>
          </form>
          <form onSubmit={add}>
            <div >
              
              <input type="text" id="enterMobile" placeholder="Enter Applicant Mobile" required onChange={e => setMobile(e.target.value)} />
              
              <input type="text" id="enterAddress" placeholder="Enter Applicant Address" required onChange={e => setAddress(e.target.value)} />
            
              <input type="text" id="enterAadharNo" placeholder="Enter Applicant Aadhaar No" required onChange={(e) => { setAadhar(e.target.value); setLoanId(e.target.value.substring(5, 9)); }} />
              
              <input type="text" id="enterPanNo" placeholder="Enter Applicant PAN no" required onChange={e => setPan(e.target.value)} />
              
              <input type="text" id="enterMonths" placeholder="Enter Loan Repayment Months" required onChange={e => setMonth(e.target.value)} />
            </div>
            <div className="submit_documents" style={{ marginTop: "2rem" }}>
              <button type="submit" id="applyLoanButton">Apply for loan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
*/

import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function AddLoan() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loanId, setLoanId] = useState("");
  const [loantype, setLoanType] = useState("");
  const [applicantName, setName] = useState("");
  const [applicantAddress, setAddress] = useState("");
  const [applicantMobile, setMobile] = useState("");
  const [applicantEmail, setEmail] = useState("");
  const [applicantAadhaar, setAadhar] = useState("");
  const [applicantPan, setPan] = useState("");
  const [applicantSalary, setSalary] = useState("");
  const [loanAmountRequired, setAmount] = useState("");
  const [loanRepaymentMonths, setMonth] = useState("");

  useEffect(() => {
    const loginInfo = sessionStorage.getItem("login-info");
    if (loginInfo) {
      setIsLoggedIn(true);
    } else {
      alert("Please login first");
      navigate("/");
    }
  }, [navigate]);

  if (!isLoggedIn) {
    return null; 
  }

  const add = async (event) => {
    const status = "Submitted";
    event.preventDefault();
    let item = {
      loantype,
      applicantName,
      applicantAddress,
      applicantMobile,
      applicantEmail,
      applicantAadhaar,
      applicantPan,
      applicantSalary,
      loanAmountRequired,
      loanRepaymentMonths,
      status
  };

  return (
    <div>
      <Navbar />
      <div className="addloan_wrapper">
        <div className="addloan_form">
          <form >
            <div>
              <input type="text" id="enterName" placeholder="Enter Applicant Name" required onChange={e => setName(e.target.value)} />
              
              <input type="email" id="enterEmail" placeholder="Enter Applicant Email Id" required onChange={(e) => setEmail(e.target.value)} />
              
              <input type="text" id="enterSalary" placeholder="Enter Applicant Salary" required onChange={e => setSalary(e.target.value)} />
              
              <input type="text" id="enterAmount" placeholder="Enter Loan Amount Required" required onChange={e => setAmount(e.target.value)} />

              <label htmlFor="file_type">Please pick a type</label>
              <select name="file_type" id="chooseFile" onChange={e => setLoanType(e.target.value)}>
                <option value="aadhar">Aadhar</option>
                <option value="pan">PAN</option>
                <option value="drivers_license">Driver's License</option>
              </select>
            </div>
          </form>
          <form onSubmit={add}>
            <div >
              
              <input type="text" id="enterMobile" placeholder="Enter Applicant Mobile" required onChange={e => setMobile(e.target.value)} />
              
              <input type="text" id="enterAddress" placeholder="Enter Applicant Address" required onChange={e => setAddress(e.target.value)} />
            
              <input type="text" id="enterAadharNo" placeholder="Enter Applicant Aadhaar No" required onChange={(e) => { setAadhar(e.target.value); setLoanId(e.target.value.substring(5, 9)); }} />
              
              <input type="text" id="enterPanNo" placeholder="Enter Applicant PAN no" required onChange={e => setPan(e.target.value)} />
              
              <input type="text" id="enterMonths" placeholder="Enter Loan Repayment Months" required onChange={e => setMonth(e.target.value)} />
            </div>
            <div className="submit_documents" style={{ marginTop: "2rem" }}>
              <button type="submit" id="applyLoanButton">Apply for loan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
}
