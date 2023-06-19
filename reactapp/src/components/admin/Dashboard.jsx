import React from "react";
import DisplayUser from "./DisplayUser";
import Navbar from "./Navbar";

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard_content">
        <Navbar />
        <DisplayUser />
      </div>
    );
  }
}