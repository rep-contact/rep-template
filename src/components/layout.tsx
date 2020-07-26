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

type LayoutProps = {
  pageTitle: string;
};

const Layout: React.FunctionComponent<LayoutProps> = ({
  pageTitle,
  children,
}) => {
  const [reps, setReps] = useState({});

  const processReps = (apiResponse) => {
    //process regions -> offices
    let officials = apiResponse.officials;
    let offices = apiResponse.offices;

    offices.forEach((office) => {
      office.officialIndices.forEach((officialIndex) => {
        officials[officialIndex]["office"] = office;
      });
    });
    //delete POTUS and VP (as if they would listen anyway)
    officials.splice(0, 2);

    setReps(officials);
  };

  const resetReps = () => {
    setReps({});
  };

  return (
    <Provider
      value={{
        reps: reps,
        setReps: processReps,
        resetReps: resetReps,
      }}
    >
      <Header pageTitle={pageTitle}></Header>
      <Container>{children}</Container>
      <Footer></Footer>
    </Provider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
