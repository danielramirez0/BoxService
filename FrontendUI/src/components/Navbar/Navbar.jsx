import hero from "../../img/Hero_Edit.png";

const Navbar = (props) => {
//   let items = 0;
  return (
    <div className="row mb-4">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-flex ms-auto me-auto">
          <a className="navbar-brand" href="/">
            <img src={hero} alt="Retro Game Treasure Logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav ms-auto me-auto">
              <li className="nav-item">
                <a className="nav-link active" href="/getStarted">
                  Get Started
                  <span className="visually-hidden">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/whats-inside">
                  What's Inside
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/unboxing-videos">
                  Unboxing Videos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">
                  About
                </a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="/cart">
                  Cart({items.length > 0 ? items.length : "0"})
                </a>
              </li> */}
              <li className="nav-item">
                <a className="nav-link" hidden={!props.authenticated ? true : false} href="/profile">
                    My Account
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href={props.authenticated ? "/logoff" : "/login"}
                >
                  {props.authenticated ? "Logoff" : "Login"}
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
