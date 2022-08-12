import React from "react";
import './css/tableData.css'
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import { Delete } from './Delete.js';
import { ListUser } from './ListUser.js';

function App() {
  
  return (
      <Router>
        <Routes>
          <Route path='/' element={<ListUser/>}/>
          <Route path='/delete' element={<Delete/>}/>
        </Routes>
      </Router>
  );
}

export default App;
