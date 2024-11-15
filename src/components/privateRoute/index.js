/* eslint-disable react/prop-types */
import React from "react";
import Layout from "../layout/index";

const PrivateRoute = ({ element: Component }) => {
  return (
    <>
      <Layout>{Component}</Layout>
    </>
  );
};

export default PrivateRoute;
