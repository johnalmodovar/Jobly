import React, { useState, useContext } from "react";

import Alert from "../../components/alert/Alert";
import userContext from "../../utilities/userContext";

function ProfileForm({ editProfile }) {
  const { currentUser } = useContext(userContext);
  const { username, firstName, lastName, email } = currentUser.data;

  const [formData, setFormData] = useState({
    username,
    firstName,
    lastName,
    email
  });

  const [formErrors, setFormErrors] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  /** Update formData inputs */
  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  }

  /** handleSubmit: call parent function to signup and navigate to homepage
   *
   * If error, set formErrors state with list of error messages
   */
  async function handleSubmit(evt) {
    evt.preventDefault();
    setFormErrors([]);

    try {
      await editProfile(formData);
      setIsSaved(true);
    } catch (err) {
      let errors = err[0].message;
      setFormErrors(errors);
    }
  }

  return (
    <div className="SignupForm mt-4">
      <form onSubmit={handleSubmit} className="form-control p-3 mb-4 shadow p-3 mb-5 bg-white rounded">
        <div className="mb-3 text-start">
          <label className="form-label" htmlFor="username">Username</label>
          <input
            disabled={true}
            required
            id="username"
            placeholder={formData.username}
            name="username"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3 text-start">
          <label className="form-label" htmlFor="first-name">First Name</label>
          <input
            required
            id="first-name"
            value={formData.firstName}
            name="firstName"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3 text-start">
          <label className="form-label" htmlFor="last-name">Last Name</label>
          <input
            required
            id="last-name"
            value={formData.lastName}
            name="lastName"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3 text-start">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            required
            id="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Edit Profile</button>
      </form>
      {isSaved && <Alert type={"success"} alerts={"Changes saved."} />}
      {formErrors.length !== 0 && <Alert alerts={formErrors} type={"danger"} />}
    </div>
  );
}

export default ProfileForm;
