import { useState ,useEffect} from "react";
import "./NavBar.css";
import LogoE from "../../Images/Logo.png";
import Burger from "./burgermenu";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

function Navbar() {
  // adding the states
  const [isActive, setIsActive] = useState(false);
  const [t, i18n] = useTranslation();

  //clean up function to remove the active className
  const removeActive = () => {
    setIsActive(false);
  };

  // Function to change language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const lang = Cookies.get("i18next") || "EN"
  useEffect(()=>{

window.document.dir = i18n.dir();
  },[lang,i18n])

  return (
    <div className="App">
      <header className="App-header">
        <nav className={`navbar`}>
          {/* logo */}
          <div href="#home" className={`logo`}>
            <a
              href="https://www.ahu.edu.jo/HomeAr.aspx"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                height={"30px"}
                width={"30px"}
                className={`logo`}
                src={LogoE}
                alt="Alhussain bin Talal university"
              />
            </a>
            <Link to={"/"} className={`logo`}>
              <strong>{t("title")}</strong>
            </Link>
          </div>
          <ul className={`navMenu ${isActive ? "active" : ""}`}>
            <li onClick={removeActive}>
              <Link to={"/"} href="#home" className={"navLink nav_btn"}>
                {t("navbar1")}
              </Link>
            </li>
            <li onClick={removeActive}>
              <Link to={"/About"} href="#home" className={`navLink nav_btn`}>
                {t("navbar2")}
              </Link>
            </li>
            <li onClick={removeActive}>
              <a href="#contact" className={`nav_btn navLink `}>
                {t("navbar3")}
              </a>
            </li>
          </ul>
          <div className="language-selector">
            {i18n.language === "en" ? (
              <>
                <span onClick={() => changeLanguage("ar")}>AR</span>
              </>
            ) : (
              <>
                <span onClick={() => changeLanguage("en")}>EN</span>
              </>
            )}
          </div>
          <div className={`hamburger `}>
            <Burger />
          </div>
        </nav>
      </header>
    </div>
  );
}
export default Navbar;
