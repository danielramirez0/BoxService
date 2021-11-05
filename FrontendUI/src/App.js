import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootswatch/dist/superhero/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import WhatsInside from "./components/WhatsInside/WhatsInside";
import Register from "./features/Register/Register";
import Survey from "./features/Survey/Survey";
import Login from "./features/Login/Login";

function App() {
  return (
    // <div className="App h-100 w-100 text-center">
    <div className="App h-100 w-100 text-center">
      <header className="App-header">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col">
            <Navbar />
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/whats-inside" element={<WhatsInside />} />
              <Route path="/register" element={<Register />} />
              <Route path="/survey" element={<Survey />} />
              <Route path="/login" element={<Login />} />

            </Routes>
            <Footer />
          </div>
          <div className="col-md-1"></div>
        </div>
      </header>
    </div>
  );
}

export default App;
