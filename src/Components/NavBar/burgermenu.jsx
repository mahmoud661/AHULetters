import React, { useState, useEffect } from "react";
import "./burger.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Burger() {
  const [isChecked, setChecked] = useState(false);
  const [t, i18n] = useTranslation();

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
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
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
                <Link
                  to={"/"}
                  className="nav_btn"
                  href="#start"
                  onClick={handleLinkClick}
                >
                  {t("navbar1")}
                </Link>
                <Link
                  to={"/About"}
                  className="nav_btn"
                  onClick={handleLinkClick}
                >
                  {t("navbar2")}
                </Link>
                <a
                  href="#contact"
                  className="nav_btn"
                  onClick={handleLinkClick}
                >
                  {t("navbar3")}
                </a>
                <Link to={"/login"}>admin</Link>
                <div className=" nav_btn ">
                  <div className="  ">
                    {i18n.language === "en" ? (
                      <>
                        <div onClick={() => changeLanguage("ar")}>عربي</div>
                      </>
                    ) : (
                      <>
                        <div onClick={() => changeLanguage("en")}>English</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </label>
    </div>
  );
}
