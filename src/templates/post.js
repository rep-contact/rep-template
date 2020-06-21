import React from "react";
import Layout from "../components/layout";

const Page = ({ pageContext }) => {
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: pageContext.title }} />
    </Layout>
  );
};
export default Page;
