import React, { useContext } from "react";

import { Link } from "react-router-dom";
import userContext from '../../utilities/userContext';


/** custom 404 Page component */
function NotFound() {
  const { currentUser } = useContext(userContext);

  return (
    <div className="NotFound">
      {currentUser.data
        ? <>
          <h1>Sorry, this page isn't available.</h1>
          <p>Either the page is broken, deleted, or doesn't exist.</p>
          <Link to="/">Go Home</Link>
        </>
        : <>
          <h1>Sorry, you must be logged in to see this page.</h1>
          <Link to="/">Go Home</Link>
        </>}
    </div>
  );
}

export default NotFound;
