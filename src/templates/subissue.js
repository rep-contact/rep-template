import React from "react";
import Layout from "../components/layout";
import { Link } from "gatsby";

const Page = ({ pageContext }) => {
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: pageContext.title }} />
      <Link dangerouslySetInnerHTML={{__html:pageContext.link}}></Link>
    </Layout>
  );
};
export default Page;
