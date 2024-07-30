 import React from "react";

const Footer = () => {
  var d = new Date();
  return (
    <div className="footer">
      <div className="copyright">
        <p>
          Copyright © {d.getFullYear()} . Developed by{" "}
          <a href="https://frontal.io/" target="_blank" rel="noreferrer">
            Frontal Labs
          </a>{" "}
          
        </p>
      </div>
    </div>
  );
};

export default Footer;
