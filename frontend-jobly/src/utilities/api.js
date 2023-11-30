const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  static token = localStorage.getItem("token");

  // demo token:
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  // "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  // "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static async request(endpoint, data = {}, method = "GET") {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      authorization: `Bearer ${JoblyApi.token}`,
      'content-type': 'application/json',
    };

    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;

    const resp = await fetch(url, { method, body, headers });

    //fetch API does not throw an error, have to dig into the resp for msgs
    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const { error } = await resp.json();
      throw Array.isArray(error) ? error : [error];
    }

    return await resp.json();
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);

    return res.company;
  }

  /** Get list of all companies.
   *
   * Has ability to filter out companies from query.
   *
   * Params:
   * - string that
   */

  static async getCompanies(searchTerm) {
    let data = searchTerm ? { nameLike: searchTerm } : {};
    let res = await this.request("companies", data);

    return res.companies;
  }

  /** Get list of all jobs.
   *
   * Send query string if filtering term is passed in.
   */

  static async getJobs(searchTerm) {
    let data = searchTerm ? { title: searchTerm } : {};
    let res = await this.request("jobs", data);

    return res.jobs;
  }

  /** Get detials on a job by id.
   *
   * Returns { id, title, salary, equity, company }
   * where company is { handle, name, description, numEmployees, logoUrl }
   */
  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);

    return res.job;
  }

  /** login: takes in a username and password and returns a JWT */
  static async login(userCreds) {
    let res = await this.request("auth/token", userCreds, "POST");
    this.token = res.token;

    return this.token;
  }


  /** register: takes in a user object and returns a JWT */
  static async register(user) {
    let res = await this.request("auth/register", user, "POST");
    this.token = res.token;

    return this.token;
  }

  /** Get info on a user by username */
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
  
    return res.user;
  }

  /** Patch a user's info, return the new user info. */
  static async editUser(username, editFormData) {
    let res = await this.request(`users/${username}`, editFormData, "PATCH");

    return res.user;
  }

  /** Applies to a job given a username/job ID. Returns the Job ID */
  static async applyToJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "POST");

    return res.applied;
  }

  /** Unapplies to a job given a username/job ID. Returns the Job ID that was unapplied. */
  static async unapplyToJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "DELETE");

    return res.unapplied;
  }
}

export default JoblyApi;
