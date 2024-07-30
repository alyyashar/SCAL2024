import React, { useContext, useEffect } from "react";

/// React router dom
import { Switch, Route, Redirect } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
/// Dashboard
import Home from "./components/Dashboard/Home";
import About from "./components/Dashboard/About";
import LocalScan from "./components/Dashboard/LocalScan";
import BytecodeScan from "./components/Dashboard/BytecodeScan";
import Tools from "./components/Dashboard/Tools";
import ScanHistory from "./components/Dashboard/ScanHistory";


/// App
import AppProfile from "./components/AppsMenu/AppProfile/AppProfile";


/// Pages
import { ThemeContext } from "../context/ThemeContext";
import Error404 from "./pages/Error404";

const Markup = () => {
  const { menuToggle } = useContext(ThemeContext);

  const routes = [
    /// Dashboard
    { url: "", component: Home },
    { url: "about", component: About },
    { url: "tools", component: Tools },
    { url: "solidity-scan", component: LocalScan },
    { url: "bytecode-scan", component: BytecodeScan },
    { url: "dashboard", component: Home },
    { url: "scan-history", component: ScanHistory },

    /// Apps
    { url: "app-profile", component: AppProfile },

  ];
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  let pagePath = path.split("-").includes("page");



  return (
    <>
      {
        <div
          id={`${!pagePath ? "main-wrapper" : ""}`}
          className={`${!pagePath ? "show" : "vh-100"}  ${menuToggle ? "menu-toggle" : ""
            }`}
        >
          {!pagePath && <Nav />}

          <div className={`${!pagePath ? "content-body" : ""}`}>
            <div
              className={`${!pagePath ? "container-fluid" : ""}`}
              style={{ minHeight: window.screen.height - 60 }}
            >
              <Switch>
                {routes.map((data, i) => (
                  <Route
                    key={i}
                    exact
                    path={`/${data.url}`}
                    component={data.component}
                  />
                ))}
                <Route exact path="/login">
                  <Redirect to="/dashboard" />
                </Route>
                <Route exact path="/users/new/register">
                  <Redirect to="/dashboard" />
                </Route>
                <Route exact path="/forgot-password">
                  <Redirect to="/dashboard" />
                </Route>
                <Route exact path="users/password/reset/:token">
                  <Redirect to="/dashboard" />
                </Route>
                <Route path='*' component={Error404} />
              </Switch>
            </div>
          </div>
          {!pagePath && <Footer />}
        </div>
      }
    </>
  );
};

export default Markup;
