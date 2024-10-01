import "./DashBoard.css";
import "../../style/form.css";
import { useEffect, useState } from "react";
import ScrollAnimation from "../scrollanimate";
import { useTranslation } from "react-i18next";
import Switch from "@mui/material/Switch";
import { saveAs } from "file-saver"; // For downloading files
import { Button } from "@mui/material";
import Cookies from "js-cookie";
import { Alert, CircularProgress } from "@mui/material";
import Collapse from "@mui/material/Collapse";

export default function DashBoard(props) {
  const [selected, setSelected] = useState(1);
  const [entrances, setEntrances] = useState([]);
  const [reports, setReports] = useState([]);
  const [hiddenThesis, setHiddenThesis] = useState([]);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // State variable to track loading state
  const [showPassword, setShowPassword] = useState(false);
  const [notify,setNotify] = useState("");
  const [notifyType , setNotifyType] = useState("success")
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const { t } = useTranslation();
  const lang = Cookies.get("i18next");

  // Function to convert report data to CSV format
  const exportToCSV = () => {
    const json = reports;
    if (json.length === 0) {
      alert("No data to export");
      return;
    }

    const fields = Object.keys(json[0]);
    const replacer = (key, value) => (value === null ? "" : value);
    let csv = json.map((row) => {
      return fields
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(",");
    });
    csv.unshift(fields.join(","));
    csv = csv.join("\r\n");

    const blob = new Blob([`\uFEFF${csv}`], {
      type: "text/csv;charset=utf-8;",
    });
    saveAs(blob, "reports.csv");
  };

  useEffect(() => {
    fetch("http://localhost:13500/admins")
      .then((response) => response.json())
      .then((data) => setEntrances(data))
      .catch((error) => console.error("Error fetching admins:", error));

    fetch("http://localhost:13500/hiddenthesis")
      .then((response) => response.json())
      .then((data) => setHiddenThesis(data))
      .catch((error) => console.error("Error fetching hidden theses:", error));

    fetch("http://localhost:13500/reports")
      .then((response) => response.json())
      .then((data) => setReports(data))
      .catch((error) => console.error("Error fetching reports:", error));
  }, []);

  const handleActiveToggle = (admin) => {
    const updatedAdmin = { ...admin, active: !admin.active };

    fetch(`http://localhost:13500/admins/${admin._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAdmin),
    })
      .then((response) => response.json())
      .then((updatedAdmin) => {
        setNotify(t("Admin active status updated successfully"))
        setNotifyType("success")
        setEntrances((prevEntrances) =>
          prevEntrances.map((admin) =>
            admin._id === updatedAdmin._id ? updatedAdmin : admin
          )
        );
      })
      .catch((error) =>{
        console.error("Error updating admin active status:", error)
        setNotify(t("Error updating admin active status , please refresh the page"))
        setNotifyType("error")}
      );
  };

  // Function to show the thesis
  const handleShowThesis = (thesisId) => {
    setLoading(true);
    fetch("http://localhost:13500/ShowThesis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: thesisId,
        editBy: JSON.parse(localStorage.getItem("AHUThesisAdmin13500")).Admin,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.error) {
          setNotify(t("Error showing thesis , try again later"))
          setNotifyType("error")
        } else {
          setHiddenThesis((prevHiddenThesis) =>
            prevHiddenThesis.filter((thesis) => thesis._id !== thesisId)
          );
          setNotify(t("Thesis shown successfully"));
          setNotifyType("success")
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error showing thesis:", error);
        setNotify(t("Error showing thesis , try again later"));
        setNotifyType("error")
      });
  };

   const handleAddEntrance = () => {
     if (password !== confirmPassword ) {
       setNotify(t("Passwords do not match"));
       setNotifyType("error")
       return;
     }
     else if (userName === "" || password === "" || confirmPassword === "") {
        setNotify(t("Please fill all fields"));
        setNotifyType("warning")
        return;
      }

     setLoading(true);

     fetch("http://localhost:13500/createAdmin", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ userName, password, confirmPassword }),
     })
       .then((response) => response.json())
       .then((data) => {
         setLoading(false);
         if (data.error) {
           setNotify(t(data.error))
            setNotifyType("error")
         } else {
           setNotify(t("Admin created successfully"));
           setNotifyType("success")
           setUserName("");
           setPassword("");
           setConfirmPassword("");
           setEntrances((prev) => [...prev, data]); // Assuming the new admin data is returned in response
         }
       })
       .catch((error) => {
         setLoading(false);
         console.error("Error creating admin:", error);
         setNotify(t("Erorr creating admin"))
         setNotifyType("error") 
       });
   };
  useEffect(() => {
    let timer;
    if (notify) {
      // reset the notify message after 3 seconds
      // reset the timer if the notify message is changed
      timer = setTimeout(() => {
        setNotify("");
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [notify]);
 

  return (
    <div className="main_container">
      <Collapse className="notify" in={notify === "" ? false : true}>
        <Alert
        color={notifyType}
          severity={notifyType}
          onClose={() => {
            setNotify("");
          }}
        >
          {notify}
        </Alert>
      </Collapse>

      <div className="Dash_bar">
        <div
          onClick={() => {
            setSelected(1);
          }}
          className={` ${selected === 1 ? "selected_Dash" : null}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            className="bi bi-person-fill"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>{" "}
          {t("Entrances")}
        </div>
        <div
          onClick={() => {
            setSelected(2);
          }}
          className={` ${selected === 2 ? "selected_Dash" : null}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            className="bi bi-newspaper"
            viewBox="0 0 16 16"
          >
            <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5z" />
            <path d="M2 3h10v2H2zm0 3h4v3H2zm0 4h4v1H2zm0 2h4v1H2zm5-6h2v1H7zm3 0h2v1h-2zM7 8h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2z" />
          </svg>{" "}
          {t("Reports")}
        </div>
        <div
          onClick={() => {
            setSelected(3);
          }}
          className={` ${selected === 3 ? "selected_Dash" : null}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            className="bi bi-eye-slash-fill"
            viewBox="0 0 16 16"
          >
            <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
          </svg>{" "}
          {t("Hidden thesis")}
        </div>
        <div
          onClick={() => {
            setSelected(4);
          }}
          className={` ${selected === 4 ? "selected_Dash" : null}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            className="bi bi-person-plus-fill"
            viewBox="0 0 16 16"
          >
            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            <path
              fillRule="evenodd"
              d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"
            />
          </svg>{" "}
          {t("Add Entrance")}
        </div>
      </div>
      <div className="selected_Board">
        {selected === 1 ? (
          <div className="Entrance_container">
            <div className="Entrance_list">
              {entrances.map((entrance, index) => {
                return (
                  <div key={index} className="Entrance">
                    <div>
                      {t("Username")}:{entrance.userName}
                    </div>
                    <div>
                      {t("operations")}:
                      <div className="dd">
                        {t("Add")} : {entrance.add}
                      </div>
                      <div className="dd">
                        {t("Edit")} : {entrance.edit}
                      </div>
                      <div className="dd">
                        {t("Hide")} : {entrance.hide}
                      </div>
                    </div>

                    <div>
                      {t("Active")}{" "}
                      <Switch
                        checked={entrance.active}
                        onClick={() => handleActiveToggle(entrance)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
        {selected === 2 ? (
          <div>
            <div className="Reports_container">
              <Button
                onClick={() => exportToCSV(reports)}
                variant="contained"
                color="success"
              >
                {t("Export to Excel file")}
              </Button>
              <div className="Reports_list">
                {reports.map((report, index) => {
                  return (
                    <ScrollAnimation
                      direction={index % 2 === 0 ? "_right" : null}
                      key={index}
                    >
                      <div className="Report">
                        <div>{report.thesisTitle}</div>
                        <div>
                          {t("Researcher")}:{report.researcher}
                        </div>
                        <div>
                          {t("Action")}:{" "}
                          <span style={{ color: "#3a73c2" }}>
                            {report.operation}
                          </span>
                        </div>
                        <div>
                          {t("Action by")}:
                          <span style={{ color: "#3a73c2" }}>
                            {report.admin}
                          </span>
                        </div>
                        <div>
                          {t("Date")}:{" "}
                          <span style={{ color: "#3a73c2" }}>
                            {" "}
                            {new Date(report.dateOfOperation).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </ScrollAnimation>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
        {selected === 3 ? (
          <div>
            <div className="Hidden_Thesis_container">
              <div className="Hidden_Thesis_list">
                {hiddenThesis.map((thesis, index) => {
                  return (
                    <ScrollAnimation
                      key={index}
                      direction={index % 2 === 0 ? "_right" : null}
                    >
                      <div className="letter" key={index}>
                        <div
                          className={`card ${
                            lang === "ar"
                              ? "card_image_back_left"
                              : "card_image_back_right"
                          }`}
                        >
                          <div className="header">
                            <div>
                              <div className="title">{thesis.title}</div>
                              <p className="name">{thesis.researcher}</p>
                            </div>
                          </div>
                          <div className="description">
                            <div>
                              {t("Collage")} {thesis.collage}
                            </div>
                            <div>
                              {t("Department")} {thesis.department}
                            </div>
                            <div>
                              {t("Supervisor")} {thesis.supervisor}
                            </div>
                          </div>
                          <dl className="post-info">
                            <div className="cr">
                              <dd className="dd">{thesis.year}</dd>
                              <dt className="dt">{t("Published")}</dt>
                            </div>
                            <div className="cr">
                              <dd className="dd">{thesis.type}</dd>
                              <dt className="dt">{t("Type")}</dt>
                            </div>
                            <div className="cr">
                              <dd className="dd">{thesis.language}</dd>
                              <dt className="dt">{t("Language")}</dt>
                            </div>
                          </dl>
                          <div>
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() => handleShowThesis(thesis._id)}
                              disabled={loading}
                            >
                              {loading ? (
                                <CircularProgress size={24} />
                              ) : (
                                t("Show")
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </ScrollAnimation>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
        {selected === 4 ? (
          <div>
            <div className="Add_Entrance_container">
              <div className="Add_Entrance_form">
                <div className="login_container">
                  <div className="login_form">
                    <p className="login_title">{t("New Entrance")}</p>
                    <input
                      placeholder={t("Username")}
                      className="login_username login_input"
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          //handleSubmit(e); // Pass the event object to handleSubmit
                        }
                      }}
                    />
                    <input
                      placeholder={t("Password")}
                      className="login_password login_input"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          //handleSubmit(e); // Pass the event object to handleSubmit
                        }
                      }}
                    />
                    <input
                      placeholder={t("Confirm")+" " + t("Password")}
                      className="login_password login_input"
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          //handleSubmit(e); // Pass the event object to handleSubmit
                        }
                      }}
                    />
                    <button
                      className="login_btn"
                      type="submit"
                      onClick={handleAddEntrance}
                    >
                      {loading ? <CircularProgress size={24} /> : t("Add")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
