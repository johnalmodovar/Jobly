import React from "react";
import { useState, useEffect } from "react";

import SearchForm from "../../components/form/SearchForm";
import JoblyApi from "../../utilities/api";
import JobCardList from "../../components/job/JobCardList";

/** renders list of all jobs.
 *
 * State:
 * - jobs: [{ id, title, salary, equity }, ...]
 *
 * RoutesList -> JobList
 */

function JobList({ apply }) {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    async function fetchJobs() {
      const data = await JoblyApi.getJobs("");
      setJobs(data);
    }
    fetchJobs();
  }, []);

  /** filter: takes in a search term and
   * returns a list of jobs that match that title */
  async function filter(searchTerm) {
    const data = await JoblyApi.getJobs(searchTerm);
    setJobs(data);
  }

  if (!jobs) return <h1>Jobs Loading....</h1>;

  return (
    <div className="JobList container d-flex flex-column align-items-center">
      <SearchForm filter={filter} />

      <div className="row row-cols-1">
        {jobs.length === 0 && <p>Sorry, no results were found!</p>}
        <JobCardList jobs={jobs} />
      </div>
    </div>

  );
}

export default JobList;