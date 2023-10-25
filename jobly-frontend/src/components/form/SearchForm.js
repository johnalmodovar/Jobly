import React, { useState } from "react";

/** search form for both companies and jobs.
 *
 * Props:
 * - filter: parent function to call
 *
 * { CompanyList, JobList } -> SearchForm
 */

function SearchForm({ filter }) {
  const [searchTerm, setSearchTerm] = useState("");

  /** updates search input value */
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  /** call parent filter function with current search term value. */
  function handleSubmit(evt) {
    evt.preventDefault();
    filter(searchTerm);
  }

  return (
    <div className="SearchForm mt-3 w-50">
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          className="form-control mx-3"
          placeholder="Enter Search Term..."
          onChange={handleChange}
          value={searchTerm}
        />
        <button className="btn btn-primary mt-2">Submit</button>
      </form>
    </div>
  );
}

export default SearchForm;
