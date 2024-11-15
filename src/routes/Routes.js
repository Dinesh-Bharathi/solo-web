import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import App from "../App";
import NotFound from "../components/pageNotFound";
import Home from "../main/home";
import Profile from "../main/profile";

const PrivateRoute = lazy(() => import("../components/privateRoute/index"));
const Settings = lazy(() => import("../main/settings/index"));
const CreateUserForm = lazy(() => import("../main/profile/addUser"));
const SignUp = lazy(() => import("../main/profile/signup"));

const LoadingFallback = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <CircularProgress />
  </Box>
);

const AppRoutes = () => {
  return (
    <Box>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route
            path="/signup"
            element={<PrivateRoute element={<SignUp />} />}
          /> */}
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route
            path="/settings"
            element={<PrivateRoute element={<Settings />} />}
          />
          <Route
            path="/account"
            element={<PrivateRoute element={<Profile />} />}
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/users" element={<CreateUserForm />} />
        </Routes>
      </Suspense>
    </Box>
  );
};

export default AppRoutes;
