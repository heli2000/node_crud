import './App.css';
import React from "react";
import './css/tableData.css'
import { CreateUser } from './CreateUser';  
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

function App() {
  const [data, getData] = React.useState([]);

  React.useEffect(() => {
    fetch("/list")
      .then((res) => res.json())
      .then((data) => {
        getData(data);
      });
  },[]);

  // const script = document.createElement("script");
  // script.src = "https://cdn.datatables.net/1.10.24/js/jquery.dataTables.js";
  // script.async = true;

  // document.body.appendChild(script);

  $(document).ready(function () {
    $('#listuser').dataTable( {
      "bDestroy": true,
      // "paging": true

  } );
  });

  return (
    <div className="App">
        <header className="App-header">
        <h2 className = "table_header">User Data</h2>
        <div>
          <CreateUser />
        </div>
        <table id="listuser">
          {/* <tbody> */}
            <thead>
              <tr>
                  <th>User Id</th>
                  <th>Name</th>
                  <th>Password</th>
                  <th>Profession</th>
                  {/* <th colSpan="2">Operations</th> */}
              </tr>
            </thead>
            <tbody>
              
              {/* <tr>
                <td>User Id</td>
                <td>Name</td>
                <td>Password</td>
                <td>Profession</td>
              </tr> */}
              {data.map((item, i) => (
                <tr key={i}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.password}</td>
                    <td>{item.profession}</td>
                    {/* <td>Edit</td>
                    <td>Delete</td> */}
                </tr>
              ))}
            </tbody>
            <tfoot>

            </tfoot>
        </table>
      </header>
    </div>
  );
}

export default App;
