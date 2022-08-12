import './App.css';
import React from "react";
import './css/tableData.css'
import { CreateUser } from './CreateUser';  
import {Tbl} from './Tbl';
import { Delete } from './Delete.js';

export function ListUser() {
  const [data, getData] = React.useState([]);

  React.useEffect(() => {
    fetch("/list")
      .then((res) => res.json())
      .then((data) => {
        getData(data);
    });
  },[data]);

  return (
    <div className='body'>
        <div>
          <CreateUser />
        </div>
        <div className='userList'>{(data.length !== 0) && <Tbl data = {data.map((item) => {return [item.id,item.name,item.password,item.profession,'Edit','<a href="/delete">Delete</a>']})}></Tbl>}</div>
    </div>
  );
}
