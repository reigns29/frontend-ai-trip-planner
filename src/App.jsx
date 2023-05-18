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
import { useDispatch, useSelector } from "react-redux";
import { setrdkAuthenticated, setrdkloggedInUserData } from "./store/user/userSlice";

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  // const [loggedInUserData, setloggedInUserData] = useState(() => {
  //   const userData = localStorage.getItem("loggedInUserData");
  //   return userData ? JSON.parse(userData) : { user: null, tokens: null };
  // });
  // const [searchedUserData, setsearchedUserData] = useState([]);
  // if (isFetching || isError) return <AuthLoader />
  // console.log("authenticated",authenticated);
  // console.log("userData", loggedInUserData);
  // console.log("searchedUserData", searchedUserData);

  const {isAuthenticated, loggedInuserData} = useSelector((store)=>store.user);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const userDataFromLocalStorage = localStorage.getItem("loggedInUserData");
  //   if (userDataFromLocalStorage) {
  //     const { user, tokens } = JSON.parse(userDataFromLocalStorage);
  //     setAuthenticated(true);
  //     setloggedInUserData({ user, tokens });
  //   }
  // }, []);

  useEffect(()=>{
    const userDataFromLocalStorage = localStorage.getItem("rememberUser");
    if(userDataFromLocalStorage.length!==0){
      const [user] = userDataFromLocalStorage;
      console.log(userDataFromLocalStorage);
      dispatch(setrdkAuthenticated(true));
      dispatch(setrdkloggedInUserData(user));
      console.log("localuser",user);
      console.log("loggedinuser", loggedInuserData);
    }else{
      dispatch(setrdkAuthenticated(false));
    }
  },[])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Navbar
              />
            }
          >
            <Route index element={<Form />} />
            <Route path="/signup" element={<Signup />} />
            {isAuthenticated ? (
              <Route
                path="/Social"
                element={
                  <Social
                    loggedInuserData={loggedInuserData}
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
