import React, { useContext } from "react";
import userContext from "../../utilities/userContext";
import { Link } from "react-router-dom";

/** renders homepage.
 *
 * RoutesList -> Homepage
*/

function Homepage() {
  const { currentUser } = useContext(userContext);

  return (
    <div className="Homepage">
      <h1>Jobly</h1>
      <p>Find a job best suited for you.</p>
      {currentUser.data
        ? <h3>Welcome Back, {currentUser.data.firstName}!</h3>
        : <>
          <Link className="btn btn-primary mx-1" to="/login">Login</Link>
          <Link className="btn btn-primary mx-1" to="/signup">Signup</Link>

          <div className="col card p-2 d-flex mt-5 shadow p-3 mb-5 bg-white rounded">
            <h4>Test User Login Information</h4>
            <p>Username: testuser</p>
            <p>Password: password</p>
            <br />
            <h5>Note:</h5>
            <p>Login/Signup won't work instantly.</p>
            <p>It takes time for the backend server to start.</p>
          </div>
        </>}
    </div>
  );
}

export default Homepage;