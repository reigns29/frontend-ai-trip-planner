import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthLoader from "./components/AuthLoader";
import { Signup, Login, Form, Error404, Profile, Social } from "./pages";
import { useState, useEffect } from "react";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loggedInUserData, setloggedInUserData] = useState(() => {
    const userData = localStorage.getItem("loggedInUserData");
    return userData ? JSON.parse(userData) : { user: null, tokens: null };
  });
  const [searchedUserData, setsearchedUserData] = useState([]);
  // if (isFetching || isError) return <AuthLoader />
  console.log(authenticated);
  console.log("userData", loggedInUserData);
  console.log("searchedUserData", searchedUserData);

  useEffect(() => {
    const userDataFromLocalStorage = localStorage.getItem("loggedInUserData");
    if (userDataFromLocalStorage) {
      const { user, tokens } = JSON.parse(userDataFromLocalStorage);
      setAuthenticated(true);
      setloggedInUserData({ user, tokens });
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Navbar
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
                setsearchedUserData={setsearchedUserData}
                setloggedInUserData={setloggedInUserData}
              />
            }
          >
            <Route index element={<Form />} />
            <Route path="/signup" element={<Signup />} />
            {authenticated ? (
              <Route
                path="/Social"
                element={
                  <Social
                    loggedInUserData={loggedInUserData.user}
                    searchedUserData={searchedUserData}
                  />
                }
              />
            ) : (
              <Route index element={<Form />} />
            )}
            {/* <Route
                path="/Social"
                element={<Social loggedInUserData={loggedInUserData} searchedUserData = {searchedUserData}/>}
              /> */}
            <Route
              path="/login"
              element={
                <Login
                  setAuthenticated={setAuthenticated}
                  setloggedInUserData={setloggedInUserData}
                />
              }
            />
            {/*           <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
//
export default App;
//
