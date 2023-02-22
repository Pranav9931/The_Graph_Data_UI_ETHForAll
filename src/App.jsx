import "./App.css";
import { useEffect, useState } from "react";
import Employee from "./employee.component.js";
import axios from "axios";


import { Logo, EthForAllBackground, TheGraphLogo } from "./assets/index";

function App() {
  const [data, setData] = useState([]);
  const [transaction, setTransactions] = useState([]);

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
              payments(first: 100) {
                id
                employeeAddress
                amount
                blockNumber
                blockTimestamp
                transactionHash
              }
            }
            `
          }
        );
        // const response = await val.json();
        console.log(val.data.data.payments);
        setData(() => val.data.data.addEmployees);
        setTransactions(() => val.data.data.payments);
        setIsLoading(false);
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
        <div style={{padding: '20px 10px', fontWeight: 700}}>Employee Details</div>
        <div className="employee-wrapper">
          {isLoading ? 
          "Loading..."
           : data.map((item, i) => {
            return (
                <Employee obj = {item}/>
            )
          })}
        </div>

        
        <div style={{padding: '20px 10px', fontWeight: 700}}>Transactions on-chain</div>
        <div className="employee-wrapper">
        <div className="transactions-table">
              
          <table>
              <thead className='tHead'>
                  <tr>
                      <th>Paid To</th>
                      <th>Total Amount</th>
                      <th>BlockNumber</th>
                      <th>Timestamp</th>
                      <th>TransactionHash</th>
                  </tr>
              </thead>
              <tbody>

          {isLoading ? 
          "Loading..."
            : transaction.map((item, i) => {
              return (       
                  <tr key={i} onClick={() => window.location.href=`https://goerli.etherscan.io/tx/${item.transactionHash}`}>
                      <td>{`${(item.employeeAddress).slice(0, 4)}...${(item.employeeAddress).slice(-3,)}`}</td>
                      <td>{item.amount / 10**18} Tokens</td>
                      <td>{item.blockNumber}</td>
                      <td>{item.blockTimestamp}</td>
                      <td>{(item.transactionHash).slice(0, 3)+"..."+(item.transactionHash).slice(-3,)}</td>
                  </tr>
              )})
          }
  
            </tbody>
        </table>
  
          </div>
        </div>
      </div>
  </div>
    
  );
}

export default App;
