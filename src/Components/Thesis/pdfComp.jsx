import { useState } from 'react';
import { Document, Page } from 'react-pdf';

function PdfComp(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className='pdfComp'>
      <Document file={props.file} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} renderAnnotationLayer={false} renderTextLayer={false} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}
export default PdfComp;