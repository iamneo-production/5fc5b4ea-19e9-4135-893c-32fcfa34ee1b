import React, { useEffect } from 'react';

const User = (props) => {
  const approved = () => {
    fetch(`http://localhost:5018/admin/updateStatus?loanId=${props.data.loanId}&Status=${"Approved"}`, {
      method: "PUT",
      headers: {
        "Content-Type": 'application/json',
        'Accept': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((result) => {
        alert(props.data.applicantName + " : " + "Approved");
      })
      .catch((err) => console.log(err));
  };

  const reject = () => {
    fetch(`http://localhost:5018/admin/updateStatus?loanId=${props.data.loanId}&Status=${"Rejected"}`, {
      method: "PUT",
      headers: {
        "Content-Type": 'application/json',
        'Accept': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((result) => {
        alert(props.data.applicantName + " : " + "Rejected");
      })
      .catch((err) => console.log(err));
  };

  const Delete = () => {
    fetch(`http://localhost:5018/admin/deleteLoan?loanId=${props.data.loanId}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log("you are here");
  });

  return (
    <div>
      <div className="applicants_list">
        <div className="applicant_deets">
          <p id="applicant_name">
            {props.data.applicantName}
          </p>
          <p>
            Applicant email: {props.data.applicantEmail}
          </p>
          <p>
            Loan amount: {props.data.loanAmount}
          </p>
          <p>
            Status: {props.data.status}
          </p>
          <button className="download_files_btn">Download files</button> &nbsp;
          <button className="approve_btn" onClick={approved}>Approve</button> &nbsp;
          <button className="reject_btn" onClick={reject}>Reject</button> &nbsp;
          <button className="" style={{ backgroundColor: "yellow" }} onClick={Delete}>Delete</button> &nbsp;
        </div>
        <br />
      </div>
    </div>
  );
};

export default User;