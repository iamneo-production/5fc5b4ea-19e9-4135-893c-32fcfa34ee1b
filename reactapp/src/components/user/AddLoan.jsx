import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

function AddLoan() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email] = useState(sessionStorage.getItem("login-info"));
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [aadharError, setAadharError] = useState("");
  const [pan, setPan] = useState("");
  const [panError, setPanError] = useState("");
  const [salary, setSalary] = useState("");
  const [salaryError, setSalaryError] = useState("");
  const [loanId] = useState("");
  const [loanAmountRequired, setLoanAmount] = useState("");
  const [loanAmountError, setLoanAmountError] = useState("");
  const [loanRepaymentMonths, setRepaymentMonths] = useState("");
  const [repaymentMonthsError, setRepaymentMonthsError] = useState("");
  const [documentUpload, setDoc] = useState([]);
  const [documentType, setLoanType] = useState();
  
  const [formdata, setFormData] = useState({
    loantype: "BikeLoan",
    applicantName: name,
    applicantAddress: address,
    applicantMobile: mobile,
    applicantEmail: email,
    applicantAadhaar: aadhar,
    applicantPan: pan,
    applicantSalary: salary,
    loanAmountRequired: loanAmountRequired,
    loanRepaymentMonths: loanRepaymentMonths,
    status: 0,
  });

  const [formdata2, setFormData2] = useState({
    username: name,
    applicantAddress: address,
    mobileNumber: mobile,
    email: email,
    loanId: sessionStorage.getItem("loanid"),
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

  useEffect(() => {
    setFormData2({
      ...formdata2,
      mobileNumber: mobile,
      username: name,
      email: email,
      applicantAddress: address,
    });
  }, [name, email, mobile, address]);

  const handlepage1 = (e) => {
    document.querySelector("#box5").classList.remove("pages2");
    document.querySelector("#box5").classList.add("addloan_form");
    document.querySelector("#page2").classList.add("pages2");
  };

  const handlepage2 = (e) => {
    document.querySelector("#box5").classList.remove("addloan_form");
    document.querySelector("#box5").classList.add("pages2");
    document.querySelector("#page2").classList.remove("pages2");
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
    event.target.value = value;
    setFormData({ ...formdata, applicantName: value });

    if (value.trim() === "") {
        setNameError("Name is required");
      } else {
        setNameError("");
      }
  };

  const handleAadharChange = (event) => {
    const value = event.target.value;
    setAadhar(value);
  };
  
  const handleAadharBlur = () => {
    if (aadhar.match(/^\d{12}$/)) {
      setFormData({ ...formdata, applicantAadhaar: aadhar });
      setAadharError("");
    } else {
        setAadharError("Invalid Aadhaar number"); 
    }
  };
  const handleMobilenumberChange = (event) => {
    const value = event.target.value;
    setMobile(value);
  };
  
  const handleMobilenumberBlur = () => {
    if (mobile.match(/^[6-9]\d{9}$/)) {
      setFormData({ ...formdata, applicantMobile: mobile });
      setMobileError("");
    } else {
        setMobileError("Invalid mobile number");
    }
  };
  const handleAddressChange = (event) => {
    const value = event.target.value;
    setAddress(value);
  };
  
  const handleAddressBlur = () => {
    if (address.length!==0) {
      setFormData({ ...formdata, applicantAddress: address });
      setAddressError("");
    } else {
        setAddressError("Invalid address");
    }
  };
  const handlePanChange = (event) => {
    const value = event.target.value;
    setPan(value);
  };
  
  const handlePanBlur = () => {
    if (pan.match(/[A-Z]{5}\d{4}[A-Z]$/)) {
      setFormData({ ...formdata, applicantPan: pan });
      setPanError("");
    } else {
        setPanError("Invalid PAN");
    }
  };
  
  const handleMonthlySalaryChange = (event) => {
    const value = event.target.value;
    setSalary(value);
  };
  
  const handleMonthlySalaryBlur = () => {
    if (parseInt(salary) > 0) {
      setFormData({ ...formdata, applicantSalary: salary });
      setSalaryError("");
    } else {
        setSalaryError("Invalid salary");
    }
  };

  const handleLoanamountChange = (event) => {
    const value = event.target.value;
    setLoanAmount(value);
  };
  
  const handleLoanamountBlur = () => {
    if (loanAmountRequired.match(/^\d{6}$/)) {
      setFormData({ ...formdata, loanAmountRequired: loanAmountRequired });
      setLoanAmountError("");
    } else {
        setLoanAmountError("Please enter a valid loan amount");
    }
  };
  const handleRepaymentChange = (event) => {
    const value = event.target.value;
    setRepaymentMonths(value);
  };
  
  const handleRepaymentBlur = () => {
    if (parseInt(loanRepaymentMonths) > 0) {
      setFormData({ ...formdata, loanRepaymentMonths: loanRepaymentMonths });
      setRepaymentMonthsError("");
    } else {
        setRepaymentMonthsError("Please enter a valid number of months");
    }
  };

  
  const addloan = () => {
    console.log("adding");
    console.log(loanId);
    console.log(formdata2);
    axios
      .post("https://8080-bbafeefeaedabdacfdafeabdcdceeeeaf.project.examly.io/api/user/addProfile", formdata2)
      .then(() => {
        console.log("added");
        navigate("/user/ApplySuccess");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleapply = (e) => {
    e.preventDefault();
        if (name.trim() === "") {
            setNameError("Name is required");
            return;
          }
      
          if (!aadhar.match(/^\d{12}$/)) {
            setAadharError("Invalid Aadhaar number");
            return;
          }
      
          if (!mobile.match(/^[6-9]\d{9}$/)) {
            setMobileError("Invalid mobile number");
            return;
          }
      
          if (address.trim() === "") {
            setAddressError("Address is required");
            return;
          }
      
          if (!pan.match(/[A-Z]{5}\d{4}[A-Z]$/)) {
            setPanError("Invalid PAN");
            return;
          }
      
          if (parseInt(salary) <= 0) {
            setSalaryError("Invalid salary");
            return;
          }
      
          if (!loanAmountRequired.match(/^\d{6}$/)) {
            setLoanAmountError("Please enter a valid loan amount");
            return;
          }
      
          if (parseInt(loanRepaymentMonths) <= 0) {
            setRepaymentMonthsError("Please enter a valid number of months");
            return;
          }

    axios
      .post("https://8080-bbafeefeaedabdacfdafeabdcdceeeeaf.project.examly.io/api/user/addLoan", formdata)
      .then((result) => {
        if (result.data === "Loan Application Added") {
          console.log(formdata2);
          axios
            .get("https://8080-bbafeefeaedabdacfdafeabdcdceeeeaf.project.examly.io/api/user/getLoanId")
            .then((res) => {
              sessionStorage.setItem("loanid", res.data);
              console.log(sessionStorage.getItem("loanid"));
              addloan();
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addDoc = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const file = documentUpload;
    if (file && file.size > 2 * 1024 * 1024) {
      alert("File size should be less than 2MB.");
      return;
    }

    formData.append("file", file);
    formData.append("documentType", documentType);

    axios
      .post("https://8080-bbafeefeaedabdacfdafeabdcdceeeeaf.project.examly.io/api/user/addDocuments", formData)
      .then((res) => {
        axios
          .get("https://8080-bbafeefeaedabdacfdafeabdcdceeeeaf.project.examly.io/api/user/getDocumentId")
          .then((res) => {
            sessionStorage.setItem("docid", res.data);
            console.log(res.data);
          });
      })
      .catch((error) => {
        console.log(error);
        alert("Could not add document");
      });

    if (file) {
      console.log(file);
    } else {
      alert("No file selected.");
    }
  };

  return (
    <Fragment>
      <Navbar />
      {isLoggedIn ? (
        <div>
      <div>
        <center>
          <div id="box4" className="addloan_wrapper">
            <form id="box6">
              <div id="box5" className="addloan_form">
                   
              <input
                  type="text"
                  id="enterName"
                  placeholder="Enter Applicant Name"
                  value={name}
                  onChange={(e) => handleNameChange(e)}
                  className={nameError ? "error" : ""}
                  required
                />
                {nameError && <p className="error">{nameError}</p>}

                <input
                  type="email"
                  id="enterEmail"
                  placeholder="Enter Email"
                  value={sessionStorage.getItem("login-info")}
                  disabled
                />

                <input
                  type="tel"
                  id="enterMobile"
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={(e) => handleMobilenumberChange(e)}
                  onBlur={handleMobilenumberBlur}
                  className={mobileError ? "error" : ""}
                  required
                />
             {mobileError && <p className="error">{mobileError}</p>}


                <input
                  type="text"
                  id="enterAddress"
                  placeholder="Enter Address"
                  value={address}
                  onChange={(e) => handleAddressChange(e)}
                  className={addressError ? "error" : ""}
                  onBlur={handleAddressBlur}
                  required
                />
            {addressError && <p className="error">{addressError}</p>}


                <input
                  type="text"
                  id="enterAadharNo"
                  placeholder="Enter Aadhar number"
                  value={aadhar}
                  onChange={(e) => handleAadharChange(e)}
                  onBlur={handleAadharBlur}
                  className={aadharError ? "error" : ""}
                  required
                />
                {aadharError && <p className="error">{aadharError}</p>}

                <input
                  type="text"
                  id="enterPanNo"
                  placeholder="Enter PAN number"
                  value={pan}
                  onChange={(e) => handlePanChange(e)}
                  onBlur={handlePanBlur}
                  className={panError ? "error" : ""}
                  required
                />
                {panError && <p className="error">{panError}</p>}

                <input
                  type="number"
                  id="enterSalary"
                  placeholder="Enter monthly salary"
                  value={salary}
                  onChange={(e) => handleMonthlySalaryChange(e)}
                  
                  onBlur={handleMonthlySalaryBlur}
                  className={salaryError ? "error" : ""}
                  required
                />
                {salaryError && <p className="error">{salaryError}</p>}

                <input
                  type="number"
                  id="enterAmount"
                  placeholder="Enter loan amount required"
                  value={loanAmountRequired}
                  onChange={(e) => handleLoanamountChange(e)}
                  onBlur={handleLoanamountBlur}
                  className={loanAmountError ? "error" : ""}
                  required
                />
                {loanAmountError && (
                      <p className="error">{loanAmountError}</p>
                    )}
                <input
                  type="number"
                  id="enterMonths"
                  placeholder="Enter loan repayment months"
                  value={loanRepaymentMonths}
                  onChange={(e) => handleRepaymentChange(e)}
                  onBlur={handleRepaymentBlur}
                  className={repaymentMonthsError ? "error" : ""}
                  required
                />
                {repaymentMonthsError && (
                      <p className="error">{repaymentMonthsError}</p>
                    )}
              </div>
            </form>
          </div>
        </center>
      </div>

      <div>
        <center>
          <div className="pages2" id="page2">
            <div className="addloan_form">
            <form onSubmit={handleapply} encType="multipart/form-data">
            <div >
              <div>
                <label>Upload documents(Mandatory*)</label>
                <select name="file_type" id="selectDocumentType" onChange={e => setLoanType(e.target.value)}>
                  <option value="aadhar">Aadhar</option>
                  <option value="pan">PAN</option>
                  <option value="drivers_license">Driver's License</option>
                </select>
              </div>
              <div className="doc_button">
                <label className="heading" >Images or Documents (upload below 2 mb) :</label>
                
                <input  type="file" name="myfile" required onChange={(e) => {
                  setDoc(e.target.files[0]);
                  
                }} />
                <p id="text">{name}</p>
                
                <br/>
                <button className="btn btn-primary" id= "chooseFile" onClick={(e)=>addDoc(e)}>Upload documents  </button>

               
              </div>
              <div className="submit_documents">
                <button type="submit" id="applyLoanButton">Apply for loan</button>
              </div>

            </div>
          </form>
            </div>
          </div>
        </center>
      </div>

      <center>
        <button id="pagechange1" onClick={handlepage1}>
          1
        </button>&nbsp;&nbsp;
        <button id="pagechange2" onClick={handlepage2}>
          2
        </button>
      </center>
      </div>
      ):null}
    </Fragment>
      
  );
}

export default AddLoan;
