/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import React from "react";
import DrawerAppBar from "../navBar";

const Layout = ({ children }) => {
  return (
    <Box>
      <DrawerAppBar />
      {children}
    </Box>
  );
};

export default Layout;
