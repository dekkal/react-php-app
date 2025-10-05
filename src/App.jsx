import { useState } from 'react'
import {BrowserRouter as Router ,Routes, Route } from "react-router-dom";
import Home from './Home'
import AddStudent from './AddStudent'
import ListStudent from './ListStudent'
import EditStudent from './EditStudent'
import Header from './Header';
import './App.css';

function App() {
  const [count, setCount] = useState(0)

   return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/AddStudent' element={<AddStudent/>}/>
         <Route path='/ListStudent' element={<ListStudent/>}/>
        <Route path='/EditStudent/:id' element={<EditStudent/>}/>
       
     
      </Routes>
    </Router>
  );
}

export default App
