import React from "react";
import { Link } from "react-router-dom";

export default class Navbar extends React.Component {
  render() {
    return (
      <div>
        <header className="navbar">
          
          <div className="navbar__item" id="applyLoan">
            <Link to="/user/AddLoan">Apply Loan</Link>
          </div>
          <div className="navbar__item" id="loanStatus">
            <Link to="/user/ViewLoan">Loan Status</Link>
          </div>
          <div className="navbar__item" id="profile">
            <Link to="/user/ViewProfile">Profile</Link>
          </div>
          <div className="navbar__item" id="logout">
            <Link to="/" onClick={() => sessionStorage.removeItem("login-info")}>Logout</Link>
          </div>
        </header>
      </div>
    );
  }
}