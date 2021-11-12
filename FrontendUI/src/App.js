import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "bootswatch/dist/superhero/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import WhatsInside from "./components/WhatsInside/WhatsInside";
import Register from "./features/Register/Register";
import Survey from "./features/Survey/Survey";
import Login from "./features/Login/Login";
import Logoff from "./features/Logoff/Logoff";
import Profile from "./features/Profile/Profile";

function App() {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("JWT")
  );
  const [showLogoff, setShowLogoff] = useState(false);

  useEffect(() => {
    setShowLogoff(authenticated);
  }, [authenticated]);

  function toggleAuth() {
    setAuthenticated(!authenticated);
  }

  return (
    // <div className="App h-100 w-100 text-center">
    <div className="App h-100 w-100 text-center">
      <header className="App-header">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col">
            <Navbar authenticated={showLogoff} />
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/whats-inside" element={<WhatsInside />} />
              <Route path="/register" element={<Register />} />
              <Route path="/survey" element={<Survey />} />
              <Route
                path="/login"
                element={<Login toggleAuth={() => toggleAuth()} />}
              />
              <Route
                path="/logoff"
                element={<Logoff toggleAuth={() => toggleAuth()} />}
              />
              <Route path="/profile" element={<Profile />} />
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
