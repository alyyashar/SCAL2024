import React from "react";
import { Link } from "react-router-dom";

const PageTitle = ({ motherMenu, activeMenu, pageContent, menuMenu }) => {
  let path = window.location.pathname.split("/");

  return (
    <div className="row page-titles mx-0">
			<ol className="breadcrumb">
				<li className="breadcrumb-item active"><Link to={`/${path[path.length - 1]}`}>{motherMenu}</Link></li>
				<li className="breadcrumb-item  "><Link to={`/${path[path.length - 1]}`}>{activeMenu}</Link></li>
			</ol>
    </div>
  );
};

export default PageTitle;
