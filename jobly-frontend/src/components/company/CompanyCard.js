import React from "react";
import "./CompanyCard.css";


/** renders info on a company.
 *
 * Props:
 * - company: {handle, name, description, numEmployees, logoUrl}
 *
 * CompanyList -> CompanyCard
*/
function CompanyCard({ company }) {
  return (
    <div className="CompanyCard container col card my-2 p-2 d-flex">
      {company.logoUrl &&
        <img
          className="company-logo"
          src={company.logoUrl}
          alt={company.handle} width="75px" />}
      <h4>{company.name}</h4>
      <div className="card-body">
        <p>{company.description}</p>
      </div>
    </div>
  );
}

export default CompanyCard;
