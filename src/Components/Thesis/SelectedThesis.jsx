import "./SelectedThesis.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "@mui/material";

export default function SelectedThesis({ ThesisId }) {
  const [thesis, setThesis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchThesis = async () => {
      try {
        const response = await fetch("http://localhost:13500/selectedThesis", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: ThesisId,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch thesis");
        }

        const data = await response.json();
        setThesis(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching thesis:", error);
        setError("Error fetching thesis. Please try again later.");
        setLoading(false);
      }
    };

    fetchThesis();

    // Clean up function
    return () => {
      // Any cleanup code here, if needed
    };
  }, [ThesisId]);

  const [t] = useTranslation();

  

  return (
    <div className="Thesis1_main">
      {error ? (
        <div className="error">
          <Alert
            severity="error"
            onClose={() => {
              setError(null);
            }}
            style={{ backgroundColor: "#10060D", color: "white" }}
          >
            {error}
          </Alert>
        </div>
      ) : null}
      {loading || error ? (
        <div>{t("Loading")}...</div>
      ) : (
        <div className="Thesis1">
          <div className="Thesis_title title">{thesis.title}</div>
          <div className="Thesis_researcher column_align">
            <div className="d_title">{t("Researcher")}</div>
            <div>{thesis.researcher}</div>
          </div>
          <div className="Thesis_Sup column_align">
            <div className="d_title">{t("Supervisorr")}</div>
            <div>{thesis.supervisor}</div>
          </div>
          <div
            className={`Thesis_CoSup ${
              thesis.co_supervisor === null || "" ? "hidden" : ""
            }`}
          >
            <div className="d_title">{t("Co-supervisor")}</div>
            <div>{thesis.co_supervisor}</div>
          </div>
          <div className="Thesis_Collage">
            <div className="d_title">{t("Collagee")}</div>
            <div>{thesis.collage}</div>
          </div>
          <div className="Thesis_Dept">
            <div className="d_title">{t("Departmentt")}</div>
            <div>{thesis.department}</div>
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
                <dd className="dd">{thesis.academicYear}</dd>
                <dt className="dt">{t("Academic year")}</dt>
              </div>
            </div>
            <div className="semester">
              <div className="cr">
                <dd className="dd">{thesis.semester}</dd>
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
                <dd className="dd">{thesis.language}</dd>
                <dt className="dt">{t("Language")}</dt>
              </div>
            </div>
          </div>
          <div className="Thesis_pdf">
            <button className="D_Btn">
              <svg
                className="svgIcon"
                viewBox="0 0 384 512"
                height="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
              </svg>
              <span className="icon2"></span>
              <span className="tooltip_D">Download</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
