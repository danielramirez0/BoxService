import React from "react";
import "bootswatch/dist/superhero/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col">
            <Navbar />
          </div>
          <div className="col-md-1"></div>
        </div>
      </header>
    </div>
  );
}

export default App;
