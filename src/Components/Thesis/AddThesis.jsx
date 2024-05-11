import "./SelectedThesis.css";
import {  useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, } from "@mui/material";
import AddControl from "./AddControl";
import { Navigate } from "react-router-dom";

export default function AddThesis() {
  const [error, setError] = useState(null);
  const [redirectHome, setRedirectHome] = useState(false); // State for redirection
  const [thesis, setThesis] = useState({
    title: null,
    researcher: null,
    type: null,
    language: null,
    year: null,
    collage: null,
    department: null,
    supervisor: null,
    co_supervisor: null,
    semester: null,
    academicYear: null,
    thesisPdf: null, // Store full thesis PDF as binary data
    shortThesisPdf: null, // Store short thesis PDF as binary data
  });

  const [t] = useTranslation();

  const handleAdd = async () => {
    try {
      const formData = new FormData();
      for (const key in thesis) {
        if (
          thesis[key] !== undefined &&
          thesis[key] !== "undefined" &&
          thesis[key] !== null
        ) {
          if (key === "thesisPdf" || key === "shortThesisPdf") {
            // Check if data is not empty and is an instance of Blob
            if (thesis[key].data instanceof Blob) {
              formData.append(key, thesis[key].data, thesis[key].name);
            }
          } else {
            formData.append(key, thesis[key]);
          }
        }
      }

      const response = await fetch("http://localhost:13500/addThesis", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update thesis");
      }
      setRedirectHome(true);
    } catch (error) {
      console.error("Error updating thesis:", error);
      setError("Error updating thesis. Please try again later.");
    }
  };

  const handleInputChange = (e, field) => {
    setThesis({
      ...thesis,
      [field]: e.target.value,
    });
  };

  const handleFileInputChange = (e, field) => {
    setThesis({
      ...thesis,
      [field]: { data: e.target.files[0], contentType: e.target.files[0].type },
    });
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

      <AddControl
        editedThesis={thesis}
        handleInputChange={handleInputChange}
        handleFileInputChange={handleFileInputChange}
        handleAddThesis={handleAdd}
      />
    </div>
  );
}
