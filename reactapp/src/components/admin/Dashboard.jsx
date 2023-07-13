import React from "react";
import { Link } from "react-router-dom";

export default class Dashboard extends React.Component {

  render() {
    return (
      <div>
        <header className="navbar">
          <div className="navbar_title navbar_item">Bike Loan</div>
          <div className="navbar__item" id="adminAppliedLoans">
            <Link to="/admin/GetLoans">Applied Loans</Link>
          </div>
          <div className="navbar__item" id="AdminLoanDetails">
            <Link to="/admin/LoanDetails">Loan Details</Link>
          </div>
          <div className="navbar__item" id="GetReviews">
            <Link to="/admin/GetReviews">Reviews</Link>
          </div>
          <div className="navbar__item" id="logout">
            <Link to="/" onClick={() => sessionStorage.removeItem("login-info")}>Logout</Link>
          </div>
        </header>
      </div>
    );
  }
}