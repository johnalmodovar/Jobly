import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CompanyList.css";

import SearchForm from "../../components/form/SearchForm";
import CompanyCard from "../../components/company/CompanyCard";
import JoblyApi from "../../utilities/api";

/** renders list of companies with its details & search bar.
 *
 * State:
 * - companies: [{handle, name, description, numEmployees, logoUrl}, ...]
 *
 * CompanyList -> { SearchForm, CompanyCard }
 */

function CompanyList() {
  const [companies, setCompanies] = useState(null);

  useEffect(() => {
    async function fetchCompanies() {
      const data = await JoblyApi.getCompanies();
      setCompanies(data);
    }
    fetchCompanies();
  }, []);

  /** filter: takes in a search term and
   * returns a list of companies that match that name */
  async function filter(searchTerm) {
    const data = await JoblyApi.getCompanies(searchTerm);
    setCompanies(data);
  }

  if (!companies) return <h1>Companies Loading....</h1>;

  return (
    <div className="CompanyList container d-flex flex-column align-items-center">
      <SearchForm filter={filter} />

      <div className="row row-cols-1 mt-4">
        {companies.length === 0 && <p>Sorry, no results were found!</p>}
        {companies.map(c => (
          <Link
            to={`${c.handle}`}
            key={c.handle}>
            <CompanyCard key={c.handle} company={c} />
          </Link>))}
      </div>
    </div>
  );
}

export default CompanyList;
