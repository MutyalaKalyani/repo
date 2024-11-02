import AboutUs from "./components/AboutUs";
import Navbar from "./components/Navbar";
import Test from "./components/Test";
import { Route,Routes,BrowserRouter as Router } from "react-router-dom";

import { useState } from "react";
import HomePage from "./components/HomePage";

function App() {
 
  const [mode,setMode]=useState('light')
  const toggleMode=()=>{
    if (mode==='light'){
      setMode('dark');
      document.body.style.backgroundColor='black';
      document.body.style.color='white';
    }
    else{
      setMode('light');
      document.body.style.backgroundColor='white';
      document.body.style.color='black';
    }
  }

  return (
    <>
    <Router>
    <Navbar toggleMode={toggleMode} mode={mode} />
    <div className="container mt-5">
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/test" element={<Test/>} />
        <Route path="/about" element={<AboutUs/>} />
        </Routes>
    </div>
    </Router>
    </>
  );
}

export default App;
