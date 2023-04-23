import React from "react";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import AddPost from "../components/SocialComponents/AddPost";
import FeedContent from "../components/SocialComponents/FeedContent";
import Sidebar from "../components/SocialComponents/Sidebar";
import { useState } from "react";

const Social = ({loggedInUserData, searchedUserData}) => {
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{ backgroundColor: "background.default", color: "text.primary" }}
      >
        <Stack
          spacing={2}
          direction="row"
          justifyContent="space-between"
          p={1}
          mt="60px"
        >
          <Box
            sx={{ display: { xs: "none", sm: "block" } }}
            flex={1}
            p={2}
            mr="25px"
            alignItems="center"
            maxWidth = "200px"
          >
            <Sidebar />
          </Box>
          <FeedContent loggedInUserData = {loggedInUserData} searchedUserData = {searchedUserData} />
          {/* <Rightbar /> */}
        </Stack>
        <AddPost />
      </Box>
    </ThemeProvider>
  );
};

export default Social;
