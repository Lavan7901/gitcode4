import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import Register from './Components/Register';
import ForgetPassword from './Components/ForgetPassword';
import './style.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/reset-password" element={<ForgetPassword />} />
          <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
