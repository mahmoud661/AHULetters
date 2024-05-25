import "./About_Co.css";
import { useTranslation } from "react-i18next";

export default function AboutCo() {
  const { t } = useTranslation();
  return (
    <div className="about_main_div">
      <div className="about_child">
        <div className="about_image">
          <img
            className="about_image"
            src="https://www.ahu.edu.jo/assets/img/colleges.jpg"
            alt="al hussain bin talal university"
          />
        </div>
        <div className="about_para">
          <p style={{ lineHeight: "30px" }}>
{t("About content")}
          </p>
        </div>
      </div>
    </div>
  );
}
