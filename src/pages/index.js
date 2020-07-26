import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  Typography,
  Box,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import ContentCard from "../components/contentcard";
import Layout from "../components/layout";
import { Consumer } from "../context/RepresentativeContext";
import * as Yup from "yup";
import ContactList from "../components/contactlist";
import PageTitle from "../components/pagetitle";

const SearchPage = () => {
  const [validApi, setValidApi] = React.useState(true);

  const formSchema = Yup.object().shape({
    address: Yup.string()
      .min(5, "Please enter a longer address")
      .max(100, "Please enter a shorter address")
      .test("apiResponse", "We couldn't find that address.", function () {
        return validApi;
      })
      .required("Please enter an address"),
  });

  const handleSubmit = (setReps, values, validateForm) => {
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
        if (resultData.response.name === "Error") {
          //todo we do this to hook the api response into the yup validation schema, im sure there is a less hacky way to accomplish the same thing
          setValidApi(false);
          validateForm();
          setValidApi(true);
        } else {
          setReps(resultData.response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Layout pageTitle="Search">
      {/* Hero unit */}
      <PageTitle
        title="An Easy Way to Reach Out"
        subtitle="Quickly find your representatives and demand change at the federal,
      state, and local level."
      />
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Consumer>
          {(context) => {
            const repsSet = Object.keys(context.reps).length !== 0;
            return (
              <>
                {repsSet && (
                  <Box alignItems="center" paddingBottom="25px">
                    <Typography
                      variant="h6"
                      align="center"
                      color="textPrimary"
                      gutterBottom
                    >
                      Do these reps look wrong? Click{" "}
                      <Link onClick={() => context.resetReps()}>here</Link> to
                      search again!
                    </Typography>
                    <Typography
                      variant="h6"
                      align="center"
                      color="textPrimary"
                      gutterBottom
                    >
                      If these reps look good, click{" "}
                      <Link to="/404">here</Link> to choose issues!
                    </Typography>
                  </Box>
                )}
                <Grid container spacing={5} justify="center">
                  {!repsSet ? (
                    <ContentCard
                      title="Lookup"
                      subheader="Enter your address to get your reps"
                      centerChildren={true}
                    >
                      <Formik
                        initialValues={{ address: "" }}
                        onSubmit={(values, { validateForm, setSubmitting }) => {
                          handleSubmit(context.setReps, values, validateForm);
                          setSubmitting(false);
                        }}
                        validationSchema={formSchema}
                      >
                        {({ isSubmitting }) => (
                          <Form>
                            <FormControl fullWidth={true}>
                              <Field
                                component={TextField}
                                name="address"
                                type="text"
                                label="Address"
                              ></Field>
                              <FormHelperText id="my-helper-text">
                                Zip Code is fine, but the more specific you are
                                the better.
                              </FormHelperText>
                              <Button type="submit" disabled={isSubmitting}>
                                {!isSubmitting ? (
                                  "Submit"
                                ) : (
                                  <CircularProgress />
                                )}
                              </Button>
                            </FormControl>
                          </Form>
                        )}
                      </Formik>
                    </ContentCard>
                  ) : (
                    context.reps.map((official, index) => (
                      <ContentCard
                        title={official.name}
                        subheader={official.office.name}
                        key={index}
                      >
                        <ContactList
                          phone={official.phones ? official.phones[0] : ""}
                          email={official.emails}
                          address={
                            official.address && {
                              address1: official.address[0].line1,
                              address2: official.address[0].line2,
                              state: official.address[0].state,
                              zip: official.address[0].zip,
                              image: official.photoUrl,
                            }
                          }
                        ></ContactList>
                      </ContentCard>
                    ))
                  )}
                </Grid>
              </>
            );
          }}
        </Consumer>
      </Container>
    </Layout>
  );
};
export default SearchPage;
