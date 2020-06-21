import React from "react";
import Layout from "../components/layout";

const Page = ({ pageContext }) => {
  return <div>{pageContext.id}</div>;
};
export default Page;
