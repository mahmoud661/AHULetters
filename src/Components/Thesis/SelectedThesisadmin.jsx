import "./SelectedThesis.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Button, TextField } from "@mui/material";

export default function SelectedThesis({ ThesisId }) {
  const [thesis, setThesis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedThesis, setEditedThesis] = useState(null);

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

      if(data.thesisPdf.data !== null){
        const uint8Array = new Uint8Array(data.thesisPdf.data.data);

      // Create Blob from Uint8Array
      const blob = new Blob([uint8Array], { type: "application/pdf" });

      // Create File object from Blob
      const file = new File([blob], "thesis.pdf", { type: "application/pdf" });

      // Replace buffer data with file object
      data.thesisPdf.data = file;}
      // Convert array to Uint8Array
      
      

      setThesis(data);
      setEditedThesis(data); // Set editedThesis to the same values as thesis
      console.log("Thesis data:", data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching thesis:", error);
      setError("Error fetching thesis. Please try again later.");
      setLoading(false);
    }
  };


    fetchThesis();

    return () => {
      // Clean up function if needed
    };
  }, [ThesisId]);

  const [t] = useTranslation();
  const openShortThesisPdf = (shortThesisPdf) => {
    // Open the short thesis PDF in a new browser tab
    // const pdfBlob = new Blob([shortThesisPdf.data], {
    //   type: shortThesisPdf.contentType,
    // });
    // const pdfUrl = URL.createObjectURL(pdfBlob);
    // window.open(pdfUrl, "_blank");
  };
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
           formData.append(key, editedThesis[key].data, editedThesis[key].name);
         } else {
           formData.append(key, editedThesis[key]);
         }
       }
     }

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
          {isEditing ? (
            <div className="edit-controls-main">
              <div className="edit-controls">
                <TextField
                  label="Title"
                  value={editedThesis?.title || ""}
                  onChange={(e) => handleInputChange(e, "title")}
                />
                <TextField
                  label="Researcher"
                  value={editedThesis.researcher}
                  onChange={(e) => handleInputChange(e, "researcher")}
                />
                <TextField
                  label="Type"
                  value={editedThesis.type}
                  onChange={(e) => handleInputChange(e, "type")}
                />
                <TextField
                  label="Language"
                  value={editedThesis.language}
                  onChange={(e) => handleInputChange(e, "language")}
                />
                <TextField
                  label="Year"
                  value={editedThesis.year}
                  onChange={(e) => handleInputChange(e, "year")}
                />
                <TextField
                  label="Collage"
                  value={editedThesis.collage}
                  onChange={(e) => handleInputChange(e, "collage")}
                />
                <TextField
                  label="Department"
                  value={editedThesis.department}
                  onChange={(e) => handleInputChange(e, "department")}
                />
                <TextField
                  label="Supervisor"
                  value={editedThesis.supervisor}
                  onChange={(e) => handleInputChange(e, "supervisor")}
                />
                <TextField
                  label="Co-supervisor"
                  value={editedThesis.co_supervisor}
                  onChange={(e) => handleInputChange(e, "co_supervisor")}
                />
                <TextField
                  label="Semester"
                  value={editedThesis.semester}
                  onChange={(e) => handleInputChange(e, "semester")}
                />
                <TextField
                  label="Academic Year"
                  value={editedThesis.academicYear}
                  onChange={(e) => handleInputChange(e, "academicYear")}
                />
                <TextField
                  label="Language"
                  value={editedThesis.language}
                  onChange={(e) => handleInputChange(e, "language")}
                />
              </div>
              <div className="files-uploader">
                <div className="custum-file-upload-container">
                  <label for="file" class="labelFile">
                    <span>
                      <svg
                        viewBox="0 0 184.69 184.69"
                        xmlns="http://www.w3.org/2000/svg"
                        id="Capa_1"
                        version="1.1"
                        width="60px"
                        height="60px"
                      >
                        <g>
                          <g>
                            <g>
                              <path
                                d="M149.968,50.186c-8.017-14.308-23.796-22.515-40.717-19.813
                                    C102.609,16.43,88.713,7.576,73.087,7.576c-22.117,0-40.112,17.994-40.112,40.115c0,0.913,0.036,1.854,0.118,2.834
                                    C14.004,54.875,0,72.11,0,91.959c0,23.456,19.082,42.535,42.538,42.535h33.623v-7.025H42.538
                                    c-19.583,0-35.509-15.929-35.509-35.509c0-17.526,13.084-32.621,30.442-35.105c0.931-0.132,1.768-0.633,2.326-1.392
                                    c0.555-0.755,0.795-1.704,0.644-2.63c-0.297-1.904-0.447-3.582-0.447-5.139c0-18.249,14.852-33.094,33.094-33.094
                                    c13.703,0,25.789,8.26,30.803,21.04c0.63,1.621,2.351,2.534,4.058,2.14c15.425-3.568,29.919,3.883,36.604,17.168
                                    c0.508,1.027,1.503,1.736,2.641,1.897c17.368,2.473,30.481,17.569,30.481,35.112c0,19.58-15.937,35.509-35.52,35.509H97.391
                                    v7.025h44.761c23.459,0,42.538-19.079,42.538-42.535C184.69,71.545,169.884,53.901,149.968,50.186z"
                                style={{ fill: "#010002" }}
                              ></path>
                            </g>
                            <g>
                              <path
                                d="M108.586,90.201c1.406-1.403,1.406-3.672,0-5.075L88.541,65.078
                            				c-0.701-0.698-1.614-1.045-2.534-1.045l-0.064,0.011c-0.018,0-0.036-0.011-0.054-0.011c-0.931,0-1.85,0.361-2.534,1.045
                            				L63.31,85.127c-1.403,1.403-1.403,3.672,0,5.075c1.403,1.406,3.672,1.406,5.075,0L82.296,76.29v97.227
                            				c0,1.99,1.603,3.597,3.593,3.597c1.979,0,3.59-1.607,3.59-3.597V76.165l14.033,14.036
                            				C104.91,91.608,107.183,91.608,108.586,90.201z"
                                style={{ fill: "#010002" }}
                              ></path>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </span>
                    <p>
                      {editedThesis &&
                      editedThesis.shortThesisPdf &&
                      editedThesis.shortThesisPdf.data !== null
                        ? editedThesis.shortThesisPdf.name
                        : "drag and drop your file here or click to select a thesis abstract!"}
                    </p>
                    <input
                      class="input"
                      type="file"
                      accept=".pdf"
                      onChange={(e) =>
                        handleFileInputChange(e, "shortThesisPdf")
                      }
                    />
                  </label>
                  <div className="dd">Thesis abstract</div>
                </div>
                <div className="custum-file-upload-container">
                  <label for="file" class="labelFile">
                    <span>
                      <svg
                        viewBox="0 0 184.69 184.69"
                        xmlns="http://www.w3.org/2000/svg"
                        id="Capa_1"
                        version="1.1"
                        width="60px"
                        height="60px"
                      >
                        <g>
                          <g>
                            <g>
                              <path
                                d="M149.968,50.186c-8.017-14.308-23.796-22.515-40.717-19.813
                                    C102.609,16.43,88.713,7.576,73.087,7.576c-22.117,0-40.112,17.994-40.112,40.115c0,0.913,0.036,1.854,0.118,2.834
                                    C14.004,54.875,0,72.11,0,91.959c0,23.456,19.082,42.535,42.538,42.535h33.623v-7.025H42.538
                                    c-19.583,0-35.509-15.929-35.509-35.509c0-17.526,13.084-32.621,30.442-35.105c0.931-0.132,1.768-0.633,2.326-1.392
                                    c0.555-0.755,0.795-1.704,0.644-2.63c-0.297-1.904-0.447-3.582-0.447-5.139c0-18.249,14.852-33.094,33.094-33.094
                                    c13.703,0,25.789,8.26,30.803,21.04c0.63,1.621,2.351,2.534,4.058,2.14c15.425-3.568,29.919,3.883,36.604,17.168
                                    c0.508,1.027,1.503,1.736,2.641,1.897c17.368,2.473,30.481,17.569,30.481,35.112c0,19.58-15.937,35.509-35.52,35.509H97.391
                                    v7.025h44.761c23.459,0,42.538-19.079,42.538-42.535C184.69,71.545,169.884,53.901,149.968,50.186z"
                                style={{ fill: "#010002" }}
                              ></path>
                            </g>
                            <g>
                              <path
                                d="M108.586,90.201c1.406-1.403,1.406-3.672,0-5.075L88.541,65.078
                            				c-0.701-0.698-1.614-1.045-2.534-1.045l-0.064,0.011c-0.018,0-0.036-0.011-0.054-0.011c-0.931,0-1.85,0.361-2.534,1.045
                            				L63.31,85.127c-1.403,1.403-1.403,3.672,0,5.075c1.403,1.406,3.672,1.406,5.075,0L82.296,76.29v97.227
                            				c0,1.99,1.603,3.597,3.593,3.597c1.979,0,3.59-1.607,3.59-3.597V76.165l14.033,14.036
                            				C104.91,91.608,107.183,91.608,108.586,90.201z"
                                style={{ fill: "#010002" }}
                              ></path>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </span>
                    <p>
                      {editedThesis &&
                      editedThesis.thesisPdf &&
                      editedThesis.thesisPdf.data !== null
                        ? editedThesis.thesisPdf.name
                        : "drag and drop your file here or click to select a thesis!"}
                    </p>{" "}
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileInputChange(e, "thesisPdf")}
                  />
                  <div className="dd">Thesis</div>
                </div>
              </div>

              <Button onClick={handleUpdate}>Confirm</Button>
              <Button onClick={cancelEditMode}>Cancel</Button>
            </div>
          ) : (
            <>
              <div
                className="Thesis_title title"
                onClick={() => openShortThesisPdf(thesis)}
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
                <button
                  className="D_Btn"
                  onClick={() => {
                    const pdfData = thesis.thesisPdf.data;
                    console.log(thesis.thesisPdf);
                    
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
              <Button onClick={toggleEditMode}>Edit</Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
