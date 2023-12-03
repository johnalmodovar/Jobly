import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import Alert from "../../components/alert/Alert";


/** LoginForm: form for a user to authenticate themselves and login
 *
 * Props:
 * - login: function to call in the parent
 *
 * State:
 * - formData: {username, password}
 * - formErrors: [msg, msg, ...]
 *
 * RoutesList -> LoginForm -> Alert (if formErrors)
 */
function LoginForm({ login }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [formErrors, setFormErrors] = useState([]);

  const navigate = useNavigate();

  /** Update form data inputs */
  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  }

  /** call parent login function and redirect to homepage
   *
   * if errors, set formErrors to the list of error messages
   */
  async function handleSubmit(evt) {
    evt.preventDefault();
    setFormErrors([]);

    try {
      await login(formData);
      navigate("/");
    } catch (err) {
      let errors = err[0].message;
      setFormErrors(errors);
    }
  }

  return (
    <div className="LoginForm col-md-6 m-5">
      <h1>Sign in to Jobly</h1>
      <form onSubmit={handleSubmit} className="form-control p-3 my-4 shadow p-3 mb-5 bg-white rounded">
        <div className="mb-3 text-start">
          <label className="form-label" htmlFor="username">Username</label>
          <input
            required
            id="username"
            value={formData.username}
            name="username"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3 text-start">
          <label className="form-label" htmlFor="password">Password</label>
          <input
            required
            type="password"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Log in</button>
      </form>
      {formErrors.length !== 0 && <Alert alerts={formErrors} type={"danger"} />}
    </div>
  );
}

export default LoginForm;
