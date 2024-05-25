import React from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import { selectionModePlugin } from "@react-pdf-viewer/selection-mode";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
// Import styles
import "@react-pdf-viewer/selection-mode/lib/styles/index.css";
// Import styles
import "@react-pdf-viewer/zoom/lib/styles/index.css";

// Import styles
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function PDFView(props) {
  // Create the page navigation plugin instance
  const toolbarPluginInstance = toolbarPlugin();
  const zoomPluginInstance = zoomPlugin();
  const { t } = useTranslation();
const selectionModePluginInstance = selectionModePlugin({selectionMode:"hand"});
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const {
    GoToFirstPage,
    GoToLastPage,
    GoToNextPage,
    GoToPreviousPage,
    CurrentPageInput,
    NumberOfPages,
  } = pageNavigationPluginInstance;
  const { CurrentScale, ZoomIn, ZoomOut } = zoomPluginInstance;
useEffect(() => {
  // Disable text selection for elements
  // with class "no-select"
  const noSelectElements = document.querySelectorAll(".no-select");
  noSelectElements.forEach((element) => {
    element.style.webkitUserSelect = "none";
    element.style.mozUserSelect = "none";
    element.style.msUserSelect = "none";
    element.style.userSelect = "none";
  });
}, []);
  return (
    <div className="ThesisView no-select">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <div className="pdf_viewer_toolbar no-select">
          <div>
            <ZoomOut>
              {(props) => (
                <button
                  style={{
                    backgroundColor: props.isDisabled ? "#96750c6e" : "#e0af14",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                  onClick={props.onClick}
                >
                  {t("Zoom Out")}
                </button>
              )}
            </ZoomOut>
            <CurrentScale>
              {(props) => <>{`${Math.round(props.scale * 100)}%`}</>}
            </CurrentScale>

            <ZoomIn>
              {(props) => (
                <button
                  style={{
                    backgroundColor: props.isDisabled ? "#96750c6e" : "#e0af14",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                  onClick={props.onClick}
                >
                  {t("Zoom In")}
                </button>
              )}
            </ZoomIn>
          </div>
          <div>
            <GoToPreviousPage>
              {(props) => (
                <button
                  style={{
                    backgroundColor: props.isDisabled ? "#96750c6e" : "#e0af14",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                  onClick={props.onClick}
                >
                  {t("Previous Page")}
                </button>
              )}
            </GoToPreviousPage>{" "}
            <div>
              <CurrentPageInput />
            </div>
            {" / "}
            <NumberOfPages />
            <GoToNextPage>
              {(props) => (
                <button
                  style={{
                    backgroundColor: props.isDisabled ? "#96750c6e" : "#e0af14",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                  onClick={props.onClick}
                >
                  {t("Next page")}
                </button>
              )}
            </GoToNextPage>{" "}
          </div>
        </div>

        <div
          style={{
            border: "1px solid rgba(0, 0, 0, 0.3)",
            minWidth: "100%",
            height: "600px",
          }}
        >
          <Viewer
            className="no-select"
            fileUrl={URL.createObjectURL(props.file)}
            plugins={[
              pageNavigationPluginInstance,
              toolbarPluginInstance,
              zoomPluginInstance,
              selectionModePluginInstance,
            ]}
          />
        </div>
      </Worker>
    </div>
  );
}
