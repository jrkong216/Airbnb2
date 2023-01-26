import React from 'react';

const Footer = () => (
<footer className="footer">
      <div className="footer-about">
      <strong style={{color:"#E6004D"}}>Airbnb2 -  Inspired by Airbnb</strong>
     </div>
      <div className="footer-links">
       <div>
         <a id="github" className="links-github" href="https://github.com/jrkong216" target="_blank">Created By: Jason Kong &nbsp;
          <i className="fa-brands fa-github fa-xl"></i>
        </a>
         <a id="linkedin" className="links-linkedin" href="https://www.linkedin.com/in/jason-kong-39552922/" target="_blank">
        <i className="fa-brands fa-linkedin fa-xl"></i>
      </a>
      <a id="personal" className="links-personal" href="https:jason-kong.com" target="_blank">
          <i className="fa-solid fa-person fa-xl"></i>
        </a>
     </div>
    </div>
    </footer>
);

export default Footer;
