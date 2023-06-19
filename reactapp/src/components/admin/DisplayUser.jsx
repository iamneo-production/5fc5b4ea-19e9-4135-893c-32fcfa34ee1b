import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import User from '../admin/User';

export default function Dashboard() {

  const navigate = useNavigate();
  const [loan, setLoans] = useState([]);
  const [bool, setBool] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("login-info") == null || sessionStorage.getItem("role") != "Admin") {
      alert("Please login");
      navigate("/");
    }

    fetch("http://localhost:5018/admin/getAllLoans", {
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
        'Accept': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((result) => {
        if (result != '')
          localStorage.setItem("loan", JSON.stringify(result));
        setLoans(result);
        setBool(true);
        console.log(bool);
      })
      .catch((err) => console.log(err));
  }, []);

  const ar = JSON.parse(localStorage.getItem("loan"));

  return (
    <div>
      <div className="display_users_wrapper">
        <div className="count_of_applications">
          <p id="count_number"><strong>{loan.length}</strong> applicant(s) to verify</p>
        </div>
      </div>
      {loan.length !== 0 && loan.map((e) =>
        <User data={e} id={e.loanId} />
      )}
      {
        loan.length == 0 && <h1 style={{ textAlign: "center" }}>No Loan Yet</h1>
      }
    </div>
  );
}