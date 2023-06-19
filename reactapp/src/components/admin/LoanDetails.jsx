import React, { useState, useEffect } from "react";
import Navbar from '../admin/Navbar';
import { ButtonGroup, Button } from "react-bootstrap";
import User from "./User";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function LoanDetails() {

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <ButtonGroup aria-label="Basic example">
          <Button variant="success"><Link style={{ textDecoration: "none", color: "white" }} to="/admin/Accepted">Accepted</Link></Button>
          <Button variant="danger"><Link style={{ textDecoration: "none", color: "white" }} to="/admin/Rejected">Rejected</Link></Button>
        </ButtonGroup>
      </div>
    </div>
  );
}