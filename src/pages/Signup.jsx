import {
    Box,
    Button,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
  import React, { useState } from "react";
  import signup from "../images/signupbg.jpg";
  import { useFormik } from "formik";
  import * as Yup from "yup";
  
  const PWD_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  
  const validationSchema = Yup.object().shape({
    name: Yup.string()
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
    const [signupdata, setsignupdata] = useState(null);
  
    const formik = useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema,
      onSubmit: (values) => {
        //   console.log(values);
        setsignupdata(values);
        console.log(signupdata);
      },
    });
  
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
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
        height={{ xs: "85vh", sm: "80vh" }}
      >
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: isMobile ? "70%" : "30%",
            borderRadius: "12px",
            padding: "50px",
            backgroundColor: "#ebebff85",
          }}
        >
          <Typography variant="h5" mb="25px" color="#4b4949">
            SignUp
          </Typography>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            size="small"
            sx={{ marginBottom: "10px" }}
            error={!!formik.touched.name && !!formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
            {...formik.getFieldProps("name")}
          />
  
          <TextField
            fullWidth
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
        </form>
      </Box>
    );
  };
  
  export default Signup;