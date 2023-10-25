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
      <p>All the jobs in one, convenient place.</p>
      {currentUser.data
        ? <h3>Welcome Back, {currentUser.data.firstName}!</h3>
        : <>
          <Link className="btn btn-primary mx-1" to="/login">Login</Link>
          <Link className="btn btn-primary mx-1" to="/signup">Signup</Link>
        </>}
    </div>
  );
}

export default Homepage;
