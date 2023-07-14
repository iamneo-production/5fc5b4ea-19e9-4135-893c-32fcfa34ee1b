import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from 'react-spinners';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);  
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true); 

    const data = {
      email: email,
      password: password
    };

    const url1 = 'https://8080-bbafeefeaedabdacfdafeabdcdceeeeaf.project.examly.io/api/user/login';
    const url2 = 'https://8080-bbafeefeaedabdacfdafeabdcdceeeeaf.project.examly.io/api/admin/login';

    try {
      const userLoginResult = await axios.post(url1, data);
      console.log(userLoginResult);

      if (userLoginResult.data === true) {
        sessionStorage.setItem("login-info", data.email);
        sessionStorage.setItem("role", "user");
        toast.success('User Logged in Successfully');
        navigate('/user/AddLoan');
      } else {
        const adminLoginResult = await axios.post(url2, data);
        if (adminLoginResult.data === true) {
          sessionStorage.setItem("login-info", data.email);
          sessionStorage.setItem("role", "admin");
          toast.success("Admin Logged in Successfully");
          navigate('/admin/GetLoans');
        } else {
          toast.warning('An error occurred. Try again later!');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred. Try again later!');
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="spinner-container">
      {loading ? (
        <BeatLoader color="#007BFF" size={60} />
      ) : (
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
                  <input type="text" id="email" placeholder="Enter email" required className="email" onChange={(e) => handleEmailChange(e.target.value)}/>
                  <br/><br/>
                  <input type="password" id="password" placeholder="Enter Password" required onChange={(e) => handlePasswordChange(e.target.value)} /><br /><br />
                  <button type="submit" id="loginButton">Login</button>
                </form>
              </div>
              <br />
              <div className="not_a">
                <p>
                  New User/admin? &nbsp;
                  <Link to="/Signup" id="signupLink">Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}