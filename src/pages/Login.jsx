import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import signup from "../images/signupbg.jpg";

const Login = () => {
  const [logIndata, setLogIndata] = useState(null);

  const handleSubmit = (e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    setLogIndata(data);
    // console.log(logIndata);
  }

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
        onSubmit={handleSubmit}
        style = {{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            width: { xs: "70%", sm: "30%" },
            borderRadius: "12px",
            padding: "50px",
            backgroundColor: "#ebebff85"
        }}
      >
        <Typography variant="h5" mb="25px" color = "#4b4949">
          Login
        </Typography>


        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          size="small"
          sx = {{marginBottom: "10px"}}
          name = "email"
        />


        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          size="small"
          sx = {{marginBottom: "10px"}}
          name = "password"
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: 24, display: "block" }}

        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Login;