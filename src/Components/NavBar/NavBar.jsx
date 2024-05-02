import { useState } from "react";
import "./NavBar.css"
import LogoE from "../../Images/Logo.png"
import Burger from "./burgermenu";
function Navbar() {
  // adding the states
  const [isActive, setIsActive] = useState(false);
  //add the active className
 
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
            <img
              className={`logo`}
              src={LogoE}
              alt="Alhussain bin Talal university"
            />
            Thesis Archive
          </div>
          <ul className={`navMenu ${isActive ? "active" : ""}`}>
            <li onClick={removeActive}>
              <a href="#home" className={"navLink nav_btn"}>
                Home
              </a>
            </li>
            <li onClick={removeActive}>
              <a href="#home" className={`navLink nav_btn`}>
                About
              </a>
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
