import React from "react";
import JobCard from "./JobCard";

/** maps over jobs and renders job cards for them.
 *
 * Props:
 * - jobs: [{ id, title, salary, equity }, ...]
 *
 * { CompanyDetail, JobList } -> JobCardList
 */

function JobCardList({ jobs }) {
  return (
    <>
      {jobs.map(j => (
        <JobCard job={j} key={j.id} />
      ))}
    </>
  );
}

export default JobCardList;