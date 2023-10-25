import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

import Nav from '../nav/Nav';
import RoutesList from '../../RoutesList';
import userContext from '../../utilities/userContext';
import JoblyApi from '../../utilities/api';

/** main app component.
 *
 * State:
 * - currentUser: has data for current user logged in, and isLoaded boolean to
 *                check if current user has been properly fetched.
 *                ex: { data: {username,...}, isLoaded: false }
 * - token: state if we have valid token. "...."
 *
 * Effects:
 * - if token, fetch the current user from the DB and set the state of the user
 * - if token, set token in Local Storage, else, remove from localStorage
 *
 * Functions:
 * - signup
 * - login
 * - logout
 * - editProfile
 * - apply
 *
 * App -> { Nav, RoutesList }
 */

function App() {
  const [currentUser, setCurrentUser] = useState({ data: null, isLoaded: false });
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [appIds, setAppIds] = useState(new Set([]));

  useEffect(() => {
    async function fetchCurrentUser() {
      const { username } = jwtDecode(token);

      try {
        const user = await JoblyApi.getUser(username);
        setCurrentUser({ data: user, isLoaded: true });
        setAppIds(new Set([...user.applications]));
      } catch (error) {
        console.error(error);
      }
    }

    token ? fetchCurrentUser() : setCurrentUser(c => ({ ...c, isLoaded: true }));

  }, [token]);

  useEffect(() => {
    token
      ? localStorage.setItem("token", token)
      : localStorage.removeItem("token");
  }, [token]);


  /** fetch token from backend with username/password -> set the token in state. */
  async function login(userCreds) {
    const token = await JoblyApi.login(userCreds);
    setToken(token);
  }

  /** set the current user and token in state to null. */
  function logout() {
    setCurrentUser({ data: null, isLoaded: false });
    setToken(null);
  }

  /** fetch token from backend with signin form data -> set the token in state. */
  async function signup(userData) {
    const token = await JoblyApi.register(userData);
    setToken(token);
  }

  /** takes in edit form data and set current user with new data */
  async function editProfile({ username, firstName, lastName, email }) {
    const formData = { firstName, lastName, email };
    const user = await JoblyApi.editUser(username, formData);
    setCurrentUser(u => ({ ...u, data: user }));
  }

  /** adds username and job id to application database and sets job id to state id. */
  async function apply(username, jobId) {
    const id = await JoblyApi.applyToJob(username, jobId);
    setAppIds(ids => new Set([...ids, id]));
  }

  /** takes in username & jobId removes it from state and database. */
  async function unapply(username, jobId) {
    await JoblyApi.unapplyToJob(username, jobId);

    setAppIds(a => new Set([...a].filter(id => id !== jobId)));
  }

  /** checks if current jobid is in appIds state. */
  function hasAppliedToJob(id) {
    return appIds.has(id);
  }

  /** Protects whole app when fetching current user. */
  if (!currentUser.isLoaded) return <h1>Jobly Loading...</h1>;

  return (
    <div className="App">
      <BrowserRouter>
        <userContext.Provider value={{ currentUser, hasAppliedToJob, apply, unapply }}>
          <Nav logout={logout} />
          <RoutesList
            login={login}
            signup={signup}
            editProfile={editProfile}
          />
        </userContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
