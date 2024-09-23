import { useState, useEffect } from "react";
import "./NavBar.css";
import LogoE from "../../Images/Logo3.jpg";
import Burger from "./burgermenu";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import AlertDialogSlide from "../MUI/Dialog";

function Navbar(props) {
  const navigate = useNavigate();
  // adding the states
  const [isActive, setIsActive] = useState(false);
  const [t, i18n] = useTranslation();
  const [admin, setAdmin] = useState(null);
  const [open, setOpen] = useState(false);

  //clean up function to remove the active className
  const removeActive = () => {
    setIsActive(false);
  };

  // Function to change language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const lang = Cookies.get("i18next") || "EN";
  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lang, i18n]);

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("AHUThesisAdmin13500"));
    setAdmin(storedAdmin);
  }, []);

  const HandleLogout = () => {
    //Perform any logout logic, such as clearing local storage
    localStorage.setItem("AHUThesisAdmin13500", null);
    // Update the admin state to null
    setAdmin(null);
    // Use useHistory hook to get the history object
    props.updateAdmin(null);
    // Navigate to the desired route
    navigate("/");
  };
  const handelCancelLogout = () => {
    setOpen(false);
  };
  const renderAdmin = () => {
    if (admin && admin !== null) {
      return (
        <div className="adminbtn" onClick={() => setOpen(true)}>
          {t("Logout")}
        </div>
      );
    } else {
      return (
        <Link className="admin-link" to={"/login"}>
          {t("Admin")}
        </Link>
      );
    }
  };

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
                height={"60px"}
                width={"60px"}
                className={`logo`}
                src={LogoE}
                alt="Alhussain bin Talal university"
              />
            </a>
            <Link to={"/"} className={`logo`}>
              <strong>{t("title")}</strong>
            </Link>
          </div>
          <div className={`navMenu ${isActive ? "active" : ""}`}>
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
          </div>
          <div className=" language-selector">
            {i18n.language === "en" ? (
              <>
                <span onClick={() => changeLanguage("ar")}>عربي</span>
              </>
            ) : (
              <>
                <span onClick={() => changeLanguage("en")}>English</span>
              </>
            )}
          </div>
          <div className="adminbtn">{renderAdmin()}</div>
          <div className={`hamburger `}>
            <Burger
              renderAdmin={renderAdmin}
              open={open}
              setOpen={setOpen}
              admin={admin}
              HandleLogout={HandleLogout}
              handelCancelLogout={handelCancelLogout}
            />
          </div>
        </nav>
      </header>
      <AlertDialogSlide
        openAlert={open}
        cancelAction={handelCancelLogout}
        Action={HandleLogout}
        title={t("Logout")}
        message={t("Are you sure you want to logout?")}
      />
    </div>
  );
}
export default Navbar;
