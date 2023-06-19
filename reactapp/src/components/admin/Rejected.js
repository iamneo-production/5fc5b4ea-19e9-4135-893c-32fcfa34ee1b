import React,{useEffect,useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import User from '../admin/User'
import { ButtonGroup,Button,ListGroup } from "react-bootstrap";
import Navbar from '../admin/Navbar'
import {Link} from 'react-router-dom'
export default function Rejected(){


  const navigate = useNavigate();
  const[loan,setLoans] = useState([]);


  useEffect(()=>{
    if(sessionStorage.getItem("login-info") == null || sessionStorage.getItem("role") != "Admin"){
      alert("Please login")
      navigate("/")
    }
    
    fetch(`http://localhost:5018/admin/getByStatus?status=${"Rejected"}`,{
      method : "GET",
        headers : {
          "Content-Type" : 'application/json',
          'Accept' : 'application/json'
        }
      })
      .then((res)=>res.json())
      .then((result)=>{
        
        localStorage.setItem("loan",JSON.stringify(result))
        setLoans(result);
        
      })
      .catch((err)=>console.log(err))
  },[])

  const ar = JSON.parse(localStorage.getItem("loan"));
  
    return (
      <div>
      <Navbar />
      <div style={{display : "flex",justifyContent : "center",marginTop : "2rem"}}>
        <ButtonGroup aria-label="Basic example">
          <Button variant="success"><Link style={{textDecoration:"none",color:"white"}} to="/admin/Accepted">Accepted</Link></Button>
          <Button variant="danger"><Link style={{textDecoration:"none",color:"white"}} to="/admin/Rejected">Rejected</Link></Button>
        </ButtonGroup>
        </div>
        {loan.map((e)=>
            <User data={e} id={e.loanId}/>
          )}
    </div>
    )
}
  