import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import axios from "axios";

const Review = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    const loginInfo = sessionStorage.getItem("login-info");
    if (loginInfo) {
      setIsLoggedIn(true);
    } else {
      alert("Please login first");
      navigate("/");
    }
  }, [navigate]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitReview = async() => {
    try {
        const reviewData = {
          name: name,
          comment: comment
        };
    
        const result = axios.post("https://8080-aeabadebfbebeddadcaedabdacfdafeabdcdceeeeaf.project.examly.io/api/user/addReview",reviewData).then((res)=>console.log(res));
    
        if (result) {
          console.log("Review submitted successfully");
        } else {
          console.log("Error submitting review");
        }
      } catch (error) {
        console.log(error);
      }
  
      setName("");
      setComment("");
    };
    

  return (
    
    <Fragment>
      <Navbar/>
      {isLoggedIn?(
        <div>
      <center>  
      <h2 style={{ fontSize: '24px', marginBottom: '10px' ,marginTop: '10px'}}>User Review</h2>
      <label htmlFor="name" style={{  fontSize: '16px', marginleft: '5px' }}>Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter your name"
        style={{ width: '20%', padding: '8px', marginleft: '10px' ,marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <br />
      <label htmlFor="comment" style={{ display: 'block', fontSize: '16px', marginBottom: '5px' }}>Comment:</label>
      <textarea
        id="comment"
        data-testid="comments"
        value={comment}
        onChange={handleCommentChange}
        placeholder="Enter your comment"
        style={{ width: '50%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', height: '100px' }}
      />
      <br />
      <button
        onClick={handleSubmitReview}
        data-testid="submitReview"
        style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Submit Review
      </button>
      </center>
      </div>
      ):null}
    </Fragment>
  );
};

export default Review;