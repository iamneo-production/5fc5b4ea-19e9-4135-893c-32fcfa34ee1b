import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export default function AddLoan() {
  const [documentupload, setDoc] = useState([]);
  const [name, setName] = useState("no document choosen");
  const [documentType, setLoanType] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("login-info") == null) {
      alert("Please login first");
      navigate("/");
    }
  });

  const addDoc = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', documentupload);
    formData.append('documentType', documentType);
    const res = await axios.post(
      'http://localhost:5018/user/addDocuments',
      formData
    );

    if (res != null) {
      sessionStorage.setItem('docid', res.data.id);
      navigate("/user/ApplySuccess");
    } else {
      alert("Could not add document");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="addloan_wrapper">
        <div className="addloan_form">
          <form onSubmit={addDoc}>
          </form>
          <form onSubmit={addDoc} encType="multipart/form-data">
            <div >
              <div>
                <label>Upload documents(Mandatory*)</label>
                <select name="file_type" id="chooseFile" onChange={e => setLoanType(e.target.value)}>
                  <option value="aadhar">Aadhar</option>
                  <option value="pan">PAN</option>
                  <option value="drivers_license">Driver's License</option>
                </select>
              </div>
              <div className="doc_button">
                <label className="heading">Supporting documents</label>
                <button className="btn btn-primary"><img src="https://icons-for-free.com/iconfiles/png/512/box+document+outline+share+top+upload+icon-1320195323221671611.png" style={{ height: "2rem", marginRight: "0rem" }}></img>Upload supporting documents</button>
                <p id="text">{name}</p>
                <input type="file" name="myfile" required onChange={(e) => {
                  setName(e.target.files[0].name);
                  setDoc(e.target.files[0]);
                }} />
              </div>
              <div className="submit_documents">
                <button type="submit" id="applyLoanButton">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}