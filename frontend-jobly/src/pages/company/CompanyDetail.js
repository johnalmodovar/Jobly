import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../../utilities/api";
import JobCardList from "../../components/job/JobCardList";

/** renders details of a single company.
 *
 * State:
 * - company: {handle, name, description, numEmployees, logoUrl}
 *
 * RoutesList -> CompanyDetail
 */

function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function fetchCompany() {
      const data = await JoblyApi.getCompany(handle);
      setCompany(data);
    }
    fetchCompany();
  }, [handle]);

  if (!company) return <h1>Loading....</h1>;

  return (
    <div className="CompanyDetail container d-flex flex-column align-items-center">
      <h3>{company.name}</h3>
      <p>{company.description}</p>
      <div className="row row-cols-1">
        <JobCardList jobs={company.jobs} />
      </div>
    </div>
  );
}

export default CompanyDetail;
