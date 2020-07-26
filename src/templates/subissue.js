import { Grid } from "@material-ui/core";
import { Link } from "gatsby";
import React from "react";
import ContentCard from "../components/contentcard";
import Layout from "../components/layout";
import PageTitle from "../components/pagetitle";

const Page = ({ pageContext }) => {
  return (
    <Layout pageTitle={pageContext.title}>
      <PageTitle
        title={pageContext.title}
        subtitle="Choose a sub-issue so we can provide you specific talking points."
      />
      <Grid container spacing={5} justify="center">
        {pageContext.subIssues.map((subIssue) => (
          <ContentCard
            title={subIssue.subissue.document.data.title.text}
            subheader={subIssue.subissue.document.data.description.text}
            key={subIssue.subissue.uid}
          >
            <Link to={`/sub-issue/${subIssue.subissue.uid}`}>
              {subIssue.subissue.raw.slug}
            </Link>
          </ContentCard>
        ))}
      </Grid>
      <div dangerouslySetInnerHTML={{ __html: pageContext.title }} />
      <Link dangerouslySetInnerHTML={{ __html: pageContext.link }}></Link>
    </Layout>
  );
};
export default Page;
