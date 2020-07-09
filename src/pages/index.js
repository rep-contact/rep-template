import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import ContentCard from "../components/contentcard";
import Layout from "../components/layout";
import { Consumer } from "../context/RepresentativeContext";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
}));

const SearchPage = () => {
  const classes = useStyles();

  const formSchema = Yup.object().shape({
    address: Yup.string()
      .min(5, "Please enter a longer address")
      .max(100, "Please enter a shorter address")
      .required("Please enter an address"),
  });

  const handleSubmit = (setReps, values) => {
    const address = values.address;
    fetch("/.netlify/functions/civicsCall", {
      method: "POST",
      body: address,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json()) // parse JSON from request
      .then((resultData) => {
        console.log(resultData);
        setReps(resultData.response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout>
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          An Easy Way to Reach Out
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          Quickly reach out to your representatives and demand change within
          your Community, State, and Country
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Consumer>
          {(context) => {
            return (
              <Grid container spacing={5} alignItems="center" justify="center">
                {!context.reps.officials ? (
                  <ContentCard
                    title="Lookup"
                    subtitle="Enter your address to get your reps"
                  >
                    <Formik
                      initialValues={{ address: "" }}
                      onSubmit={(values, { setSubmitting }) => {
                        handleSubmit(context.setReps, values);
                        setSubmitting(false);
                      }}
                      validationSchema={formSchema}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <FormControl>
                            <Field
                              component={TextField}
                              name="address"
                              type="text"
                              label="Address"
                            ></Field>
                            <FormHelperText id="my-helper-text">
                              We won't store this information.
                            </FormHelperText>
                            <Button type="submit" disabled={isSubmitting}>
                              {!isSubmitting ? "Submit" : <CircularProgress />}
                            </Button>
                          </FormControl>
                        </Form>
                      )}
                    </Formik>
                  </ContentCard>
                ) : (
                  <ContentCard
                    title="Your Reps"
                    subheader="Your reps will show up here"
                  >
                    <ul>
                      {context.reps.officials.map((official, index) => (
                        <li key={index}>{official.name}</li>
                      ))}
                    </ul>
                  </ContentCard>
                )}
              </Grid>
            );
          }}
        </Consumer>
      </Container>
    </Layout>
  );
};
export default SearchPage;
