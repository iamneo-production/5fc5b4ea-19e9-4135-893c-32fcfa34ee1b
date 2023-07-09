import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from '../admin/Dashboard';

const ReviewList = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
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

  const fetchReviews = async () => {
    try {
      const response = await fetch('https://8080-cecfabafbfbdaedabdacfdafeabdcdceeeeaf.project.examly.io/api/admin/getReviews'); // Replace with your actual API endpoint
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'left',
  };

  const nameStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '5px',
  };

  const commentStyle = {
    fontSize: '16px',
    marginBottom: '10px',
  };

  return (
    <Fragment>
      <Dashboard />
      {isLoggedIn?(
        <div>
      <center>
        <h2>Customer Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews available.</p>
        ) : (
          <ul>
            {reviews.map((review) => (
              <p style={cardStyle}>
                <h3 style={nameStyle}>{review.name}</h3>
                <p style={commentStyle}>{review.comment}</p>
              </p>
            ))}
          </ul>
        )}
      </center>
      </div>
      ):null}
    </Fragment>
  );
};

export default ReviewList;
