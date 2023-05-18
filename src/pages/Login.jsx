import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState, useRef } from "react";
import signup from "../images/signupbg.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useLoginMutation } from "../store";
import { useDispatch } from "react-redux";
import { setrdkAuthenticated, setrdkloggedInUserData } from "../store/user/userSlice";

const Login = () => {
  const [login, {isLoading}] = useLoginMutation();
  const dispatch = useDispatch();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData(e.target);
    // const data = Object.fromEntries(formData.entries());

    // setLogIndata(data);
    // console.log(logIndata);

    // try {
    //   const response = await axios.post(process.env.REACT_APP_SERVER_URL+'/api/users/login',{
    //     email: data.email,
    //     password: data.password
    //   },{
    //     withCredentials: true
    //   });
    //   console.log(response);
    //   const {tokens, user} = response.data;
    //   localStorage.setItem("loggedInUserData", JSON.stringify({ user, tokens }))
    //   setAuthenticated(true);
    //   setloggedInUserData({tokens, user});
    //   <Navigate to = "/Social"/>
    // } catch (error) {
    //   console.log(error);
    // }
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      const response = await login({ email, password });
      console.log(response);
      const rememberUser = response.data;
      localStorage.setItem("rememberUser", rememberUser);
      const temp = localStorage.getItem("rememberUser");
      console.log("temp", JSON.stringify(temp));
      dispatch(setrdkAuthenticated(true));
      dispatch(setrdkloggedInUserData(response.data.user));
      // setAuthenticated(true);
    } catch (error) {
      console.log(error);
      alert(error.data.errors[0].message);
      dispatch(setrdkAuthenticated(false));
    }
    // setloggedInUserData({tokens, user});
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${signup})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      p="80px"
      height={{ xs: "85vh", sm: "87vh" }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: { xs: "70%", sm: "30%" },
          borderRadius: "12px",
          padding: "50px",
          backgroundColor: "#ebebff85",
          marginTop: "-20px",
        }}
      >
        <Typography variant="h5" mb="25px" color="#4b4949">
          Login
        </Typography>

        <TextField
          fullWidth
          inputProps={{ ref: emailRef }}
          label="Email"
          variant="outlined"
          size="small"
          sx={{ marginBottom: "10px" }}
          name="email"
        />

        <TextField
          fullWidth
          inputProps={{ ref: passwordRef }}
          label="Password"
          variant="outlined"
          size="small"
          sx={{ marginBottom: "10px" }}
          name="password"
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: 24, display: "block" }}
        >
          Submit
        </Button>
        <Typography mt="25px">
          <Link to="/signup">Don't have an account?</Link>
        </Typography>
      </form>
    </Box>
  );
};

export default Login;
