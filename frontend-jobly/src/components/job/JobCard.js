import React, { useContext, useState, useEffect } from "react";
import "./JobCard.css";

import userContext from "../../utilities/userContext";

/** renders info on a job.
 *
 * Props:
 * - job { id, title, salary, equity, companyHandle, companyName }
 *
 * JobCardList -> JobCard
 */

function JobCard({ job }) {
  const { currentUser, apply, unapply, hasAppliedToJob } = useContext(userContext);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    if (hasAppliedToJob(job.id)) {
      setHasApplied(true);
    }
  }, [job.id]);

  /** Handles on click for applying to jobs.
   *  Calls on parent function and sets hasApplied state to true.
   */

  async function handleApply(evt) {
    const jobId = +evt.target.value;

    try {
      await apply(currentUser.data.username, jobId);
      setHasApplied(true);
    } catch (error) {
      console.error("Error applying to job", error);
    }
  }

  /** Handles on click for unapplying to jobs.
   *  Calls on parent function and sets hasApplied state to false.
   */

  async function handleUnapply(evt) {
    const jobId = +evt.target.value;

    try {
      await unapply(currentUser.data.username, jobId);
      setHasApplied(false);
    } catch (error) {
      console.error("Error unapplying to job", error);
    }
  }

  return (
    <div className="JobCard container col card my-2 p-3 d-flex shadow p-3 mb-5 bg-white rounded">
      <div className="card-body">
        <h4>{job.title}</h4>
        <h5>{job.companyName}</h5>
        <div>
          {job.salary ? <small>{`Salary: ${job.salary}`}</small> : ""}
        </div>
        <div>
          {job.equity ? <small>{`Equity: ${job.equity}`}</small> : ""}
        </div>
        <button
          value={job.id}
          className={`btn btn-${hasApplied ? "" : "outline-"}danger apply-button float-end`}
          onClick={hasApplied ? handleUnapply : handleApply}>
          {hasApplied ? "Applied" : "Apply"}
        </button>
      </div>
    </div >
  );
}

export default JobCard;
