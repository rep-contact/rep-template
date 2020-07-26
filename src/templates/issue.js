import React from "react";
import Layout from "../components/layout";
import { Link } from "gatsby";
import PageTitle from "../components/pagetitle";
import { Grid } from "@material-ui/core";
import ContentCard from "../components/contentcard";

const Page = ({ pageContext }) => {
  console.log(pageContext);
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
            size="small"
          >
            <Link to={`/sub-issue/${subIssue.subissue.uid}`}>
              {subIssue.subissue.raw.slug}
            </Link>
          </ContentCard>
        ))}
      </Grid>
    </Layout>
  );
};
export default Page;
