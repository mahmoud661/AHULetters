import data from "../../data";

export default function SelectedThesis({ ThesisId }) {
  const thesis = data.find((item) => item.researcher === ThesisId);

  if (!thesis) {
    // Handle case when ThesisId doesn't match any Thesis
    return <div>Thesis not found</div>;
  }

  return (
    <div>
      <div className="letter">
        <div className="card">
          <div className="header">
            <div>
              <a className="title" href="#d">
                {thesis["letter Topic"]}
              </a>
              <p className="name"> {thesis.researcher}</p>
            </div>
          </div>
          <div className="description">
            <div>الكلية : {thesis.collage}</div>
            <div>التخصص : {thesis.dept}</div>
            <div> المشرف : {thesis.super}</div>
          </div>
          <dl className="post-info">
            <div className="cr">
              <dd className="dd"> {thesis.year}</dd>
              <dt className="dt">Published</dt>
            </div>
            <div className="cr">
              <dd className="dd"> {thesis.type}</dd>
              <dt className="dt">Type</dt>
            </div>
            <div className="cr">
              <dd className="dd"> EN</dd>
              <dt className="dt">language</dt>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
