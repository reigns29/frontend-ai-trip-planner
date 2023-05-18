import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState, useRef} from "react";
import signupimage from "../images/signupbg.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { useSignupMutation } from "../store";


const PWD_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      PWD_REG,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be between 8-24 characters long"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Signup = () => {
  // const [signupdata, setsignupdata] = useState(null);
  const [signup] = useSignupMutation();

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    // onSubmit: async (values) => {
    //   setsignupdata(values);
    //   console.log(signupdata);

    //   try {
    //     const response = await axios.post(process.env.REACT_APP_SERVER_URL+'/api/users', {
    //       email: values.email,
    //       username: values.username,
    //       password: values.password,
    //     }, {withCredentials: true});
    //     console.log(response);
    //     <Navigate to="/login"/>
    //   } catch (error) {
    //     console.log("these " + error);
    //   }
    // },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const username = usernameRef.current.value;
    signup({ email, password, username });
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        backgroundImage: `url(${signupimage})`,
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
          maxWidth: isMobile ? "70%" : "30%",
          borderRadius: "12px",
          padding: "50px",
          backgroundColor: "#ebebff85",
          marginTop: "20px",
        }}
      >
        <Typography variant="h5" mb="25px" color="#4b4949">
          SignUp
        </Typography>
        <TextField
          fullWidth
          inputProps={{ref: usernameRef}}
          label="User Name"
          variant="outlined"
          size="small"
          sx={{ marginBottom: "10px" }}
          error={!!formik.touched.username && !!formik.errors.username}
          helperText={formik.touched.username && formik.errors.username}
          {...formik.getFieldProps("username")}
        />

        <TextField
          fullWidth
          inputProps={{ref: emailRef}}
          label="Email"
          variant="outlined"
          size="small"
          sx={{ marginBottom: "10px" }}
          error={!!formik.touched.email && !!formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
          {...formik.getFieldProps("email")}
        />

        <TextField
          fullWidth
          inputProps={{ref: passwordRef}}
          label="Password"
          variant="outlined"
          size="small"
          sx={{ marginBottom: "10px" }}
          error={!!formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
          {...formik.getFieldProps("password")}
        />

        <TextField
          fullWidth
          inputProps={{ref: confirmPasswordRef}}
          label="Confirm Password"
          variant="outlined"
          size="small"
          sx={{ marginBottom: "10px" }}
          error={
            !!formik.touched.confirmPassword && !!formik.errors.confirmPassword
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          {...formik.getFieldProps("confirmPassword")}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: 24, display: "block" }}
          disabled={!formik.isValid}
        >
          Submit
        </Button>
        <Typography mt = "25px">Already have an account <Link to="/login">LogIn</Link></Typography>
      </form>
    </Box>
  );
};

export default Signup;
