import React from "react";
import Layout from "../components/layout";
import { Link, useStaticQuery, graphql } from "gatsby";
import PageTitle from "../components/pagetitle";
import { Grid } from "@material-ui/core";
import ContentCard from "../components/contentcard";

const IssuesIndex = () => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      allPrismicIssue {
        nodes {
          id
          uid
          data {
            title {
              text
            }
          }
        }
      }
    }
  `);
  console.log(data.allPrismicIssue.nodes);
  return (
    <Layout pageTitle="Issues">
      <PageTitle
        title="Choose an issue"
        subtitle="Choose an issue so we can help you narrow down your message"
      />
      <Grid container spacing={5} justify="center">
        {data.allPrismicIssue.nodes.map((issue) => (
          <ContentCard
            title={issue.data.title.text}
            key={issue.id}
            size="small"
          >
            <Link to={`/issue/${issue.uid}`}>Go to Issue</Link>
          </ContentCard>
        ))}
      </Grid>
    </Layout>
  );
};
export default IssuesIndex;
