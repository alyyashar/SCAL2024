/// Menu
import Metismenu from "metismenujs";
import React, { Component, useContext, useEffect } from "react";
/// Link
import { Link } from "react-router-dom";
import useScrollPosition from "use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";

class MM extends Component {
	  componentDidMount() {
		this.$el = this.el;
		this.mm = new Metismenu(this.$el);
	  }
	  componentWillUnmount() {
	  }
	render() {
		return (
			<div className="mm-wrapper">
				<ul className="metismenu" ref={(el) => (this.el = el)}>
					{this.props.children}
				</ul>
			</div>
		);
	}
}

const SideBar = () => {
  const {
    iconHover,
    sidebarposition,
    headerposition,
    sidebarLayout,
  } = useContext(ThemeContext);
  useEffect(() => {
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);
	
  }, []);
  let scrollPosition = useScrollPosition();
  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  /// Active menu
  let deshBoard = [
      "dashboard"
    ],
    scan = ["solidity-scan"],
    bytecode = ["bytecode-scan"],
    tools = ["tools"],
    about = ["about"],
    history = ["scan-history"]
  return (
    <div
      className={`deznav ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
          ? scrollPosition > 120
            ? "fixed"
            : ""
          : ""
      }`}
    >
     
        <MM className="metismenu" id="menu">
          <li className={`${deshBoard.includes(path) ? "mm-active" : ""}`}>
            <Link className="ai-icon" to="dashboard" >
              <i className="flaticon-025-dashboard"></i>
              <span className="nav-text">Dashboard</span>
            </Link>
          </li>
          <li className={`${scan.includes(path) ? "mm-active" : ""}`}>
            <Link className="ai-icon" to="solidity-scan" >
              <i className="flaticon-381-file"></i>
              <span className="nav-text">Scan Solidity</span>
            </Link>
          </li>
         {/* <li className={`${bytecode.includes(path) ? "mm-active" : ""}`}>
            <Link className="ai-icon" to="bytecode-scan" >
              <i className="flaticon-381-file-1"></i>
              <span className="nav-text">Scan Bytecode</span>
            </Link>
          </li> */} 
          <li className={`${history.includes(path) ? "mm-active" : ""}`}>
            <Link className="ai-icon" to="scan-history" >
              <i className="flaticon-088-time"></i>
              <span className="nav-text">Scan History</span>
            </Link>
          </li>
          <li className={`${tools.includes(path) ? "mm-active" : ""}`}>
            <Link className="ai-icon" to="tools" >
              <i className="flaticon-381-settings-3"></i>
              <span className="nav-text">Tools</span>
            </Link>
          </li>
          
          <li className={`${about.includes(path) ? "mm-active" : ""} justify-items-end`}>
            <Link className="ai-icon" to="about" >
              <i className="flaticon-050-info"></i>
              <span className="nav-text">About</span>
            </Link>
          </li>
        </MM>
    </div>
  );
};

export default SideBar;
