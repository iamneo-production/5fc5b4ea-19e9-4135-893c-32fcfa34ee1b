import { Link, useNavigate} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from 'react-spinners';

export default function Signup() {
  const navigate = useNavigate();
  const [userRole, setAdminOrUser] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [mobileNumber, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(true);
  
  const handleAdminUserChange = (value) => {
    setAdminOrUser(value.toLowerCase());
}

const handleEmailChange = (value) => {
    setEmail(value.toLowerCase());
}
const handleUsernameChange = (value) => {
    setUserName(value);
}
const handleMobileChange = (value) => {
    setMobile(value);
}
const handlePasswordChange = (value) => {
    setPassword(value);
}

const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
}

  const registration = async (e) => {
    e.preventDefault();
    setLoading(true); 
    const data = { 
        email: email,
        password: password,
        username : username,
        mobileNumber: mobileNumber,
        userRole : userRole
    };
    
    if (password !== confirmPassword) {
        toast.warning("Passwords do not match");
        return;
    }

    if (userRole === "admin") {
      const url2 = 'https://8080-cecfabafbfbdaedabdacfdafeabdcdceeeeaf.project.examly.io/api/admin/signup';
      axios.post(url2, data).then((result) => {
          if (result.data === 'Admin added successfully'){
              toast.success("Admin added successfully!");
              navigate("/");
          } else {
              toast.warning("Admin already exists");
          }
      }).catch((error) => {
          toast.error(error);
      }
      );
      
  } else if (userRole === "user") {
                   
      const url1 = 'https://8080-cecfabafbfbdaedabdacfdafeabdcdceeeeaf.project.examly.io/api/user/signup';
      axios.post(url1, data).then((result) => {
          if (result.data === 'User added successfully'){
            toast.success("User added successfully!");
            navigate("/");
          }else{
              toast.warning("User already exists")
          }
      }).catch((error) => {
          toast.error(error);
      })
  }
}

useEffect(() => {
  setTimeout(() => {
    setLoading(false);
  }, 3000);
}, []);


  return (
    <div className="wrapper">
    <div className="squeeze_wrapper">
      <div className="squeeze_header">
        <h2 id="main_title">
          <Link to="/">Bike Loan</Link>
        </h2>
        <br />
        <p id="header_desc">Register here to apply loan!</p>
      </div>
      <div className="squeeze_form">
        <div className="register">
        <form onSubmit={registration}>
            <input type="text" id="admin/user" placeholder="Enter admin/user" required value={userRole}  onChange={(e) => handleAdminUserChange(e.target.value)} pattern="(admin|user)" title='Enter admin or user only'/>
            
              <input type="text" id="username" placeholder="Enter Username" required value={username} onChange={(e) =>  handleUsernameChange(e.target.value)} pattern='^[A-za-z]+$' title="Enter only alphabets" />
              <div className="username_email">
              <input type="email" id="email" placeholder="Enter email" required value={email} onChange={(e) => handleEmailChange(e.target.value)} 

            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Enter valid email" />
            </div>
            <input type="text" id="mobileNumber" placeholder="Enter Mobilenumber" required value={mobileNumber} onChange={(e) => handleMobileChange(e.target.value)} 
            pattern="^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$" title="Enter valid phone number"/>
            
            <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => handlePasswordChange(e.target.value)} 
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required />
             
            <input type="password" id="confirmPassword" placeholder="Confirm Password" onChange={(e) => handleConfirmPasswordChange(e.target.value)} required /><br /><br />
            <button type="submit" id="submitButton">{loading ? (
                  <BeatLoader color="#ffffff" size={8} /> 
                ) : (
                  'Submit'
                )}</button>
          </form>
        </div>
        <br />
        <div className="not_a">
          <p>
            Already a user? &nbsp;
            <Link id="signinLink" to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}