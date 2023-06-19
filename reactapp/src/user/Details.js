import React from 'react';

const Details = (props) => {
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

          <button className="reject_btn">{props.data.status}</button> &nbsp;
        </div>
        <br />
      </div>
    </div>
  );
};

export default Details;