import data from "../../data";
import "./SelectedThesis.css";
import { Translation, useTranslation } from "react-i18next";
export default function SelectedThesis({ ThesisId }) {
  const thesis = data.find((item) => item.researcher === ThesisId);
  const [t] = useTranslation();
  if (!thesis) {
    // Handle case when ThesisId doesn't match any Thesis
    return <div>{t("No thesis found")}</div>;
  }

  return (
    <div className="Thesis1_main">
      <div className="Thesis1  ">
        <div className="Thesis_title title">{thesis["letter Topic"]}</div>
        <div className="Thesis_researcher column_align">
          <div className="d_title">{t("Researcher")}</div>
          <div>{thesis.researcher}</div>
        </div>
        <div className="Thesis_Sup column_align">
          <div className="d_title">{t("Supervisorr")}</div>
          <div>{thesis.super}</div>
        </div>
        <div
          className={`Thesis_CoSup ${
            thesis.sub === null || "" ? "hidden" : ""
          }`}
        >
          <div className="d_title">{t("Co-supervisor")}</div>
          <div>{thesis.sub}</div>
        </div>
        <div className="Thesis_Collage">
          <div className="d_title">{t("Collagee")}</div>
          <div>{thesis.collage}</div>
        </div>
        <div className="Thesis_Dept">
          <div className="d_title">{t("Departmentt")}</div>
          <div>{thesis.dept}</div>
        </div>
        <div className="Thesis_date">
          <div className="thesis_year">
            <div className="cr">
              <dd className="dd">{thesis.year}</dd>
              <dt className="dt">{t("Year")}</dt>
            </div>
          </div>
          <div className="Academic_year">
            <div className="cr">
              <dd className="dd">2020-2021</dd>
              <dt className="dt">{t("Academic year")}</dt>
            </div>
          </div>
          <div className="semester">
            <div className="cr">
              <dd className="dd">First</dd>
              <dt className="dt">{t("Semester")}</dt>
            </div>
          </div>
        </div>
        <div className="TL">
          <div className="type">
            <div className="cr">
              <dd className="dd">{thesis.type}</dd>
              <dt className="dt">{t("Type")}</dt>
            </div>
          </div>
          <div className="thesis_lang">
            <div className="cr">
              <dd className="dd">EN</dd>
              <dt className="dt">{t("Language")}</dt>
            </div>
          </div>
        </div>
        <div className="Thesis_pdf">
          <button class="D_Btn">
            <svg
              class="svgIcon"
              viewBox="0 0 384 512"
              height="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
            </svg>
            <span class="icon2"></span>
            <span class="tooltip_D">Download</span>
          </button>
        </div>
      </div>
    </div>
  );
}
