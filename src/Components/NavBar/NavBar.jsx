import { useState } from "react";
import "./NavBar.css"
import LogoE from "../../Images/Logo.png"
import Burger from "./burgermenu";
import { Link } from "react-router-dom";
function Navbar() {
  // adding the states
  const [isActive, setIsActive] = useState(false);

 
  //clean up function to remove the active className
  const removeActive = () => {
    setIsActive(false);
    
  };
  return (
    <div className="App">
      <header className="App-header">
        <nav className={`navbar`}>
          {/* logo */}
          <div href="#home" className={`logo`}>
            <a href="https://www.ahu.edu.jo/HomeAr.aspx" target="_blank" rel="noreferrer">
              <img
                height={"30px"}
                width={"30px"}
                className={`logo`}
                src={LogoE}
                alt="Alhussain bin Talal university"
              />
            </a>
            Thesis Archive
          </div>
          <ul className={`navMenu ${isActive ? "active" : ""}`}>
            <li onClick={removeActive}>
              <Link to={"/"} href="#home" className={"navLink nav_btn"}>
                Home
              </Link>
            </li>
            <li onClick={removeActive}>
              <Link to={"/About"} href="#home" className={`navLink nav_btn`}>
                About
              </Link>
            </li>
            <li onClick={removeActive}>
              <a href="#contact" className={`nav_btn navLink `}>
                Contact
              </a>
            </li>
          </ul>
          <div className={`hamburger `}>
            <Burger />
          </div>
        </nav>
      </header>
    </div>
  );
}
export default Navbar;
