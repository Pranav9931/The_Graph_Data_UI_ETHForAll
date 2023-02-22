import "./App.css";
import { useEffect, useState } from "react";
import Employee from "./employee.component.js";
import axios from "axios";


import { Logo, EthForAllBackground, TheGraphLogo } from "./assets/index";

function App() {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        setIsLoading(true);
        const val = await axios.post(
          "https://api.studio.thegraph.com/query/41880/ethforall/v0.0.1",
          {
            query: `
            {
              addEmployees(first: 100) {
                id
                employeeAddress
                fName
                lName
                salary
                employeeAvatar
                vestingPeriod
                department
                startTime
              }
            }
            `
          }
        );
        // const response = await val.json();
        // console.log(val.data.data.addEmployees);
        setData(() => val.data.data.addEmployees);
        setIsLoading(false);
        console.log(data);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };

    fetchAPI();
  }, []);
  return (
    
      <div className="App">
      <div className="navbar">
          <img src={Logo} className="logo-ethforall" />
          <div className="the-graph-main-logo">Powered by 
            <img src={TheGraphLogo} />
          </div>
      </div>
      <div className="emp-container">
        <div className="main-background-container">
          <img 
          src={EthForAllBackground}
          style={{width: '100%'}} 
          />
        </div>
        <div className="warning">
          <span style={{fontWeight: 400}}>The data is being retrieved from</span>
          <span>https://api.studio.thegraph.com/query/41880/ethforall/v0.0.1</span>
        </div>
        <div className="employee-wrapper">
          {isLoading ? 
          "Loading..."
           : data.map((item, i) => {
            return (
                <Employee obj = {item}/>
            )
          })}
        </div>
      </div>
  </div>
    
  );
}

export default App;
