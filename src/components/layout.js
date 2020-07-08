/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react";
import PropTypes from "prop-types";

import "./layout.css";
import { Provider } from "../context/RepresentativeContext";
import Header from "./header";
import Footer from "./footer";
import { Container } from "@material-ui/core";

const Layout = ({ children }) => {
  const [reps, setReps] = useState({});

  return (
    <Provider
      value={{
        reps: reps,
        setReps: setReps,
      }}
    >
      <Header></Header>
      <Container>{children}</Container>
      <Footer></Footer>
    </Provider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
