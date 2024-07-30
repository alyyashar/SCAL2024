import React, { Fragment, useContext, useState } from "react";
/// React router dom
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";

//Image
import logoText from "../../../images/logo-text-white.png"
import logo from "../../../images/logo-frontal.png"


const NavHader = () => {
  const [toggle, setToggle] = useState(false);
  const { openMenuToggle } = useContext(
    ThemeContext
  );
  return (
    <div className="nav-header">
      <Link to="/dashboard" className="brand-logo">
        
          <Fragment>
				
				<img className="logo-abbr" alt="logo" src={logo} />
				<img className="brand-title" alt="logo-text" src={logoText} />
          </Fragment>
       
      </Link>

      <div
        className="nav-control"
        onClick={() => {
          setToggle(!toggle);
          openMenuToggle();
        }}
      >
        <div className={`hamburger ${toggle ? "is-active" : ""}`}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div>
    </div>
  );
};

export default NavHader;
