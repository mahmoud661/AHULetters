import "./SelectedThesis.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AlertDialogSlide from "../MUI/Dialog";
import EditControl from "./EditControl";
import { Navigate } from "react-router-dom";
import PDfView from "./pdfView";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function SelectedThesis({ ThesisId }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openHide, setOpenHide] = useState(false);

  const [thesis, setThesis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedThesis, setEditedThesis] = useState(null);
  const [redirectHome, setRedirectHome] = useState(false); // State for redirection
  const [viewPDF, setViewPDF] = useState(false);
  const [pdffile, setPdfFile] = useState(null);

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

        if (data.thesisPdf && data.thesisPdf.data) {
          const uint8Array = new Uint8Array(data.thesisPdf.data.data);

          // Create Blob from Uint8Array
          const blob = new Blob([uint8Array], { type: "application/pdf" });

          // Create File object from Blob
          const file = new File([blob], data.researcher + " thesis.pdf", {
            type: "application/pdf",
          });

          // Replace buffer data with file object
          data.thesisPdf.data = file;
          setPdfFile(file);
        }
        // Convert array to Uint8Array
        if (data.shortThesisPdf && data.shortThesisPdf.data) {
          const uint8Array = new Uint8Array(data.shortThesisPdf.data.data);

          // Create Blob from Uint8Array
          const blob = new Blob([uint8Array], { type: "application/pdf" });

          // Create File object from Blob
          const file = new File(
            [blob],
            data.researcher + " Thesis Abstract.pdf",
            {
              type: "application/pdf",
            }
          );

          // Replace buffer data with file object
          data.shortThesisPdf.data = file;
        }

        setThesis(data);
        setEditedThesis(data); // Set editedThesis to the same values as thesis
        setLoading(false);
      } catch (error) {
        console.error("Error fetching thesis:", error);
        setError("Error fetching thesis. Please try again later.");
        setRedirectHome(true); // Set redirect state to true if error occurs
        setLoading(false);
      }
    };

    fetchThesis();

    return () => {
      // Clean up function if needed
    };
  }, [ThesisId]);

  const [t] = useTranslation();

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    // setEditedThesis(null); // Reset edited thesis when toggling edit mode
  };
  const cancelEditMode = () => {
    setIsEditing(!isEditing);
    setEditedThesis(thesis);
    // setEditedThesis(null); // Reset edited thesis when toggling edit mode
  };

  const handleInputChange = (e, field) => {
    setEditedThesis({
      ...editedThesis,
      [field]: e.target.value,
    });
  };

  const handleFileInputChange = (e, field) => {
    setEditedThesis({
      ...editedThesis,
      [field]: { data: e.target.files[0], contentType: e.target.files[0].type },
    });
  };
  
   const handleHide = async () => {
     try {
       const response = await fetch("http://localhost:13500/hideThesis", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           id: ThesisId,
           editBy: JSON.parse(localStorage.getItem("AHUThesisAdmin13500"))
             .Admin,
         }),
       });
       setThesis(null); // Clear thesis state after deleting it
       setRedirectHome(true); // Set redirect state to true after successful deletion

       if (!response.ok) {
         throw new Error("Failed to delete thesis");
       }
     } catch (error) {
       console.error("Error deleting thesis:", error);
       setError("Error deleting thesis. Please try again later.");
     }
     navigate("/"); // Navigate to home page after deleting thesis
   };
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      for (const key in editedThesis) {
        if (
          editedThesis[key] !== undefined &&
          editedThesis[key] !== "undefined" &&
          editedThesis[key] !== null
        ) {
          if (key === "thesisPdf" || key === "shortThesisPdf") {
            // Check if data is not empty and is an instance of Blob
            if (editedThesis[key].data instanceof Blob) {
              formData.append(
                key,
                editedThesis[key].data,
                editedThesis[key].name
              );
            }
          } else {
            formData.append(key, editedThesis[key]);
          }
        }
      }
      // Retrieve and append admin data
      const adminData = JSON.parse(localStorage.getItem("AHUThesisAdmin13500"));
      if (!adminData || !adminData.Admin) {
        throw new Error("Admin data not found in localStorage");
      }
      formData.append("editBy", adminData.Admin._id);

      const response = await fetch("http://localhost:13500/updateThesis", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update thesis");
      }

      setThesis(editedThesis); // Update thesis state with edited values
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating thesis:", error);
      setError("Error updating thesis. Please try again later.");
    }
  };

  if (redirectHome) {
    return <Navigate to="/" />; // Redirect to home page if redirect state is true
  }
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
        <Box sx={{ display: "flex" }}>
          <CircularProgress style={{ color: "#3a73c2" }} />
        </Box>
      ) : viewPDF ? (
        <div className="Thesis1">
          <Button
            style={{ backgroundColor: "#e01d0f" }}
            variant="contained"
            onClick={() => {
              setViewPDF(false);
            }}
          >
            {t("Go back")}
          </Button>

          <PDfView file={pdffile} />
        </div>
      ) : (
        <div className="Thesis1">
          {isEditing ? (
            <EditControl
              editedThesis={editedThesis}
              handleInputChange={handleInputChange}
              handleFileInputChange={handleFileInputChange}
              handleUpdate={handleUpdate}
              cancelEditMode={cancelEditMode}
            />
          ) : (
            <>
              <div
                className="Thesis_title title"
                onClick={() => {
                  if (!thesis.shortThesisPdf || !thesis.shortThesisPdf.data) {
                    return;
                  }
                  const pdfData = thesis.shortThesisPdf.data;

                  if (pdfData instanceof Blob) {
                    const pdfUrl = URL.createObjectURL(pdfData);
                    window.open(pdfUrl, "_blank");
                  } else if (typeof pdfData === "string") {
                    window.open(pdfData, "_blank");
                  } else if (
                    pdfData instanceof ArrayBuffer ||
                    pdfData instanceof Uint8Array
                  ) {
                    // Convert ArrayBuffer or Uint8Array to Blob
                    const blob = new Blob([pdfData], {
                      type: "application/pdf",
                    });
                    const pdfUrl = URL.createObjectURL(blob);
                    window.open(pdfUrl, "_blank");
                  } else {
                    console.error("Invalid PDF data format");
                  }
                }}
              >
                {thesis.title}
              </div>
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
                  thesis.co_supervisor === null ||
                  typeof thesis.co_supervisor === "undefined"
                    ? "hidden"
                    : ""
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
                <button
                  className="D_Btn"
                  onClick={() => {
                    if (!thesis.thesisPdf || !thesis.thesisPdf.data) {
                      return;
                    }

                    setViewPDF(true);
                  }}
                >
                  <div style={{ color: "#fff" }}>{t("view")}</div>
                </button>
              </div>
              <Button
                onClick={toggleEditMode}
                variant="contained"
                style={{ backgroundColor: "#3a73c2", color: "#ffffff" }}
              >
                {t("Edit")}
              </Button>
              <Button
                onClick={() => {
                  setOpenHide(true);
                }}
                variant="contained"
                style={{ backgroundColor: "#363636", color: "#ffffff" }}
              >
                {t("Hide")}
              </Button>
             
            </>
          )}
        </div>
      )}
      <AlertDialogSlide
        openAlert={openHide}
        cancelAction={() => {
          setOpenHide(false);
        }}
        Action={handleHide}
        title={t("Hide thesis")}
        message={t("Are you sure you want to Hide the thesis ?")}
      />
    
    </div>
  );
}
