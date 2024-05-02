import React, { useState, useEffect } from "react";
import "./burger.css";

export default function Burger() {
  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled down, then set isChecked to false
      if (window.scrollY > 0) {
        setChecked(false);
      }
    };

    // Add event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  const handleLinkClick = () => {
    // Set the checkbox state to unchecked when a link is clicked
    setChecked(false);
  };

  return (
    <div className="burger_div">
      <label className="burger">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => setChecked(!isChecked)}
        />
        <div className="checkmark">
          <span></span>
          <span></span>
          <span></span>
          <div className="burger_navi">
            <div>
              <div className="navi_buttons">
                {/* Add onClick event handler to each link */}
                <a className="nav_btn" href="#start" onClick={handleLinkClick}>
                  Home
                </a>
                <a className="nav_btn" href="#About" onClick={handleLinkClick}>
                  About
                </a>
                <a
                  className="nav_btn"
                  href="#contact"
                  onClick={handleLinkClick}
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </label>
    </div>
  );
}
