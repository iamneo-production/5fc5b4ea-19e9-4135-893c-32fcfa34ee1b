import React from "react";
import Navbar from "./Navbar";

export default class ApplySuccess extends React.Component {
  loan_idx = {
    id: sessionStorage.getItem("loanid"),
    docid: sessionStorage.getItem('docid')
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="wrapper">
          <p id="loan_success_msg">
            You have applied for loan successfully!
          </p>
          <br />
          <p style={{ "color": "black", "fontFamily": "Helvetica", "fontSize": "18px" }}>
            <strong>Hangtight until your loan will be approved..</strong>
          </p>
          <br />
          <p id="loan_sucess_id">
            Your Loan id: <strong>{this.loan_idx.id}</strong>
          </p>
          <p id="loan_sucess_id">
            Your Document id: <strong>{this.loan_idx.docid}</strong>
          </p>
        </div>
      </div>
    );
  }
}