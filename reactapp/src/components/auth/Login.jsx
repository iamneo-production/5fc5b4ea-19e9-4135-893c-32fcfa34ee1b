import { useNavigate, Link } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';



export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };
  const login = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password
    };

   
  const url1 = 'http://localhost:5230/api/user/login';
    const url2 = 'http://localhost:5230/api/admin/login';

    
      const userLoginResult = await axios.post(url1, data);
      if (userLoginResult.data === true) {
        sessionStorage.setItem("login-info", data.email);
      sessionStorage.setItem("role", userLoginResult);
        alert('User Logged in Successfully');
        setTimeout(() => {
          navigate('/user/ViewProfile');
        },1000);
      } else {
        const adminLoginResult = await axios.post(url2, data);
        if (adminLoginResult.data === true) {
            sessionStorage.setItem("login-info", data.email);
            sessionStorage.setItem("role", adminLoginResult);
          alert('Admin Logged in Successfully');
          setTimeout(() => {
            navigate('/admin/getAllLoans');
          }, 1000);
        } else {
          alert('An error occurred. Try again later!');
        }
      }
    
  };


  return (
    <div className="wrapper">
      <div className="squeeze_wrapper">
        <div className="squeeze_header">
          <h2 id="main_title">
            <Link to="/">Bike Loan</Link>
          </h2>
          <br />
          
        </div>
        <div className="squeeze_form">
          <div className="login">
            <form onSubmit={login}>
              
              
              <input type="email" id="email" placeholder="Enter email" required className="email" onChange={(e) => handleEmailChange(e.target.value)}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title='Enter valid email address'/>
              <br/><br/>
              <input type="password" id="password" placeholder="Enter Password" required onChange={(e) => handlePasswordChange(e.target.value)} /><br /><br />
              <button type="submit" id="loginButton">Login</button>
            </form>
          </div>
          <br />
          <div className="not_a">
            <p >
              New User/admin? &nbsp;
              <Link to="/Signup" id="signupLink">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  
  );
}

