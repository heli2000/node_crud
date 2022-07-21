import './App.css';
import React from "react";
import './css/tableData.css'

function App() {
  const [data, getData] = React.useState([]);
  React.useEffect(() => {
    fetch("/list")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        getData(data);
      });
  },[]);

  return (
    <div className="App">
      <header className="App-header">
        <h2 className = "table_header">User Data</h2>
        <table>
          <tbody>
            <tr>
                <th>User Id</th>
                <th>Id</th>
                <th>Title</th>
                <th>Description</th>
                <th colSpan="2">Operations</th>
            </tr>
            {data.map((item, i) => (
                <tr key={i}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.password}</td>
                    <td>{item.profession}</td>
                    <td>Edit</td>
                    <td>Delete</td>
                </tr>
            ))}
            </tbody>
          </table>
      </header>
    </div>
  );
}

export default App;
