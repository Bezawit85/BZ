import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mainAPI } from "../mainAPI";
import axios from "axios";

const PasswordReset = ({ target, name }) => {
  console.log(target, name);
 
  const navigate = useNavigate();
  const [showSet, setShowSet] = useState(true);

  const apiOwners = `${mainAPI}/Api/Message/All`;
  const [message, setMessage] = useState('')
  const [tableData, setTableData] = useState('')
  const jwt = JSON.parse(localStorage.getItem("jwt"));
  const options = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
 

  const getMessage = async () => {

    try {
      const res = await fetch(apiOwners, options);
   
      const data = await res.json();
      if (data && res.ok) {
        console.log(data);
        setMessage(tableData);
      }
   
    } catch (e) {
      console.log(e);
    } 
  };


  useEffect(() => {
    getMessage();
    setTableData(tableData);
  
  }, []);
const handleClose = () => {
  setShowSet(false);
}

const [status, setStatus] = useState("");


  return (
    <div
      className="manage-modal"
      id="setting-manage"
    >
      {showSet && (
      <div className="manage-modal-content" style={{paddingTop: "30px", width: "100%", height: "200px"}}>
        <div className="modal-title">
          <p>Update {name} Status</p>
        </div>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="Enter new status"
        />

        <div style={{display: "flex", gap: "10%" }}>
        <button style={{backgroundColor: "Green", color: "white"}} className="btn" onClick={getMessage}>Reset</button>
       
            <button style={{backgroundColor: "Red", color: "white"}} className="btn" onClick={handleClose}> Cancel </button>
        
        </div>
      </div>
      )}
    </div>
  )
 
};

export default PasswordReset;