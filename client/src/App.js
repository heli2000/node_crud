import './App.css';
import React from "react";
import './css/tableData.css'
import { CreateUser } from './CreateUser';  
import {Tbl} from './Tbl';

function App() {
  const [data, getData] = React.useState([]);

  React.useEffect(() => {
    fetch("/list")
      .then((res) => res.json())
      .then((data) => {
        //getData(data);
        getData(data);
      });
  },[data]);

  return (
    <div className="App">
        <header className="App-header">
        <h2 className = "table_header">User Data</h2>
        <div>
          <CreateUser />
        </div>
        <div className='userList'>{(data.length !== 0) && <Tbl data = {data.map((item) => {return [item.id,item.name,item.password,item.profession,'Edit','Delete']})}></Tbl>}</div>
      </header>
    </div>
  );
}

export default App;
