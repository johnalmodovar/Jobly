import React, { useContext, useState, useEffect } from "react";
import "./Profile.css";

import ProfileForm from "./ProfileForm";
import userContext from "../../utilities/userContext";
import JoblyApi from "../../utilities/api";
import JobCardList from "../../components/job/JobCardList";


/** renders profile page for user.
 *
 * Props:
 * - editProfile(): parent function that saves data that is changed from editing
 *   profile. -> passed down to ProfileForm.
 *
 * Profile -> ProfileForm
 */
function Profile({ editProfile }) {
  const [jobs, setJobs] = useState(null);
  const { hasAppliedToJob } = useContext(userContext);

  useEffect(() => {
    async function fetchJobs() {
      const data = await JoblyApi.getJobs("");
      const applications = data.filter(j => hasAppliedToJob(j.id));
      setJobs(applications);
    }
    fetchJobs();
  }, [hasAppliedToJob]);

  if (!jobs) return <h1>Profile Loading....</h1>;

  return (
    <div className="Profile">
      <h1>Profile Information</h1>
      <ProfileForm editProfile={editProfile} />

      <div className="row row-cols-1">
        <h1>Jobs Applied:</h1>
        {jobs.length === 0 && <p>Sorry, no job applications found.</p>}
        <JobCardList jobs={jobs} />
      </div>

    </div>
  );
}

export default Profile;
