import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import Homepage from "./pages/homepage/Homepage";
import CompanyList from "./pages/company/CompanyList";
import CompanyDetail from "./pages/company/CompanyDetail";
import JobList from "./pages/job/JobList";
import NotFound from "./pages/error/NotFound";
import SignupForm from "./pages/auth/SignupForm";
import LoginForm from "./pages/auth/LoginForm";
import Profile from "./pages/profile/Profile";
import userContext from "./utilities/userContext";


/** List of routes for App.
 *
 * Props:
 * - login: fetches token from backend with username/password (from App component)
 * - signup: fetches token from backend with form data (from App component)
 *
 * App -> RoutesList -> { Homepage, CompanyList, CompanyDetail, Joblist }
 */

function RoutesList({ login, signup, editProfile }) {
  const { currentUser } = useContext(userContext);

  return (
    <div className="RoutesList container d-flex flex-column align-items-center">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
        {currentUser.data
          ? <>
            <Route path="/companies" element={<CompanyList />} />
            <Route path="/companies/:handle" element={<CompanyDetail />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/profile" element={<Profile editProfile={editProfile} />} />
          </>
          : <>
            <Route path="/login" element={<LoginForm login={login} />} />
            <Route path="/signup" element={<SignupForm signup={signup} />} />
          </>}
      </Routes>
    </div>
  );
}

export default RoutesList;
