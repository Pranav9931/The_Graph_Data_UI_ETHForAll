import { ethers } from "ethers";
import React from "react";
import { useNavigate } from "react-router-dom";

import "./employee.css";

const Employee = ({ obj }) => {
  return (
    <div className="employee-card">
      <img src={obj.employeeAvatar} />
      <div className="employee-details">
        <div style={{ fontSize: ".9em" }} className="card-bottom-wrapper">
          <div style={{ fontSize: ".9em" }}>
            <span className="page-title">First Name</span>
            <div className="detail-box">{obj.fName}</div>
          </div>
          <div style={{ fontSize: ".9em" }}>
            <span className="page-title">Last Name</span>
            <div className="detail-box">{obj.lName}</div>
          </div>
          <div>
            <span className="page-title">Salary</span>
            <div className="detail-box">
              {Number(obj.salary) / 10 ** 18} Tokens
            </div>
          </div>
        </div>
        <div style={{ fontSize: ".9em" }} className="card-bottom-wrapper">
          <div>
            <span className="page-title">Address</span>
            <div className="detail-box">{obj.employeeAddress}</div>
          </div>
          <div>
            <span className="page-title">Vesting Period</span>
            <div className="detail-box">{obj.vestingPeriod} Seconds</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
