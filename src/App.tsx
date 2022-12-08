import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Activate from "./components/Activate";
import ForgetAccount from "./components/ForgetAccount";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
   return (
      <BrowserRouter>
         <div className="App">
            <Routes>
               <Route path="/" element={<Login />} />
               <Route path="/activate" element={<Activate />} />
               <Route path="/forget-account" element={<ForgetAccount />} />
               <Route path="/home" element={<Home />} />
               <Route path="/register" element={<Register />} />
            </Routes>
         </div>
      </BrowserRouter>
   );
}

export default App;
