import React from "react";
import hero from "../../img/Hero_Edit.png" 

const Navbar = () => {
  let items = 0;
  return (
    <div className="row">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-flex ms-auto me-auto">
          <a class="navbar-brand" href="#">
              <img src={hero} alt="Retro Game Treasure Logo" />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarColor02">
            <ul class="navbar-nav ms-auto me-auto">
              <li class="nav-item">
                <a class="nav-link active" href="#">
                  Get Started
                  <span class="visually-hidden">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  What's Inside
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Unboxing Videos
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  About
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Cart({items.length > 0 ? items.length : "0"})
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  About
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
