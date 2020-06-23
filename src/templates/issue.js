import React from "react";
import Layout from "../components/layout";
import { Link } from "gatsby";

const Page = ({ pageContext }) => {
  console.log(pageContext.subIssues);
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: pageContext.title }} />
      <div>
        {pageContext.subIssues.map((subIssue) => (
          <Link
            key={subIssue.subissue.uid}
            to={`/sub-issue/${subIssue.subissue.uid}`}
          >
            {subIssue.subissue.raw.slug}
          </Link>
        ))}
      </div>
    </Layout>
  );
};
export default Page;
