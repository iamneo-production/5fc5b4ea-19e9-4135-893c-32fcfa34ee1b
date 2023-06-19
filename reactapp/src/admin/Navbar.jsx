import React from "react";
import { Link } from "react-router-dom";

export default class Dashboard extends React.Component {

  render() {
    return (
      <div>
        <header className="navbar">
          <div className="navbar__title navbar__item">Bike Loan</div>
          <div className="navbar__item" id="adminAppliedLoans">
            <Link to="/admin/DisplayUser">Applied Loans</Link>
          </div>
          <div className="navbar__item" id="AdminLoanDetails">
            <Link to="/admin/LoanDetails">Loan Details</Link>
          </div>
          <div className="navbar__item" id="logout">
            <Link to="/" onClick={() => sessionStorage.removeItem("login-info")}>Logout</Link>
          </div>
        </header>
      </div>
    );
  }
}