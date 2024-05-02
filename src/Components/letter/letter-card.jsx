import React from "react";
import "./letter-card.css";

export default function LetterCard() {


return (
  <div>
    <div className="card">
      <p className="card-title">Product Name</p>
      <p className="small-desc">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat
        veritatis nobis saepe itaque rerum nostrum aliquid obcaecati odio
        officia deleniti. Expedita iste et illum, quaerat pariatur consequatur
        eum nihil itaque!
      </p>
      <div className="go-corner">
        <div className="go-arrow">→</div>
      </div>
    </div>
  </div>
);


}