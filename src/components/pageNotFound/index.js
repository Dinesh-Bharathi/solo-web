// components/NotFound.js

import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4">Page Not Found</Typography>
      <Typography
        onClick={() => navigate("/home")}
        sx={{
          textDecoration: "underline",
          color: "skyblue",
          cursor: "pointer",
        }}
      >
        Back To Home
      </Typography>
    </Box>
  );
};

export default NotFound;
