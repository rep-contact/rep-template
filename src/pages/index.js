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
import ContactList from "../components/repinfo";

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
  const [validApi, setValidApi] = React.useState(true);
  const classes = useStyles();

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
      .catch(() => {
        setValidApi(false);
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
              <Grid
                container
                spacing={5}
                alignItems="flex-start"
                justify="center"
              >
                {Object.keys(context.reps).length === 0 ? (
                  <ContentCard
                    title="Lookup"
                    subtitle="Enter your address to get your reps"
                    centerChildren={true}
                  >
                    <Formik
                      initialValues={{ address: "" }}
                      onSubmit={(values, { setSubmitting, validateForm }) => {
                        setSubmitting(true);
                        handleSubmit(context.setReps, values, validateForm);
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
                              The more specific your address, the more reps we can find.
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
                  context.reps.map((official, index) => (
                    <ContentCard
                      title={official.name}
                      subheader={official.office.name}
                      key={index}
                    >
                      <ContactList
                        phone={official.phones[0]}
                        email={official.emails}
                        address1={official.address[0].line1}
                        address2={official.address[0].line2}
                        state={official.address[0].state}
                        zip={official.address[0].zip}
                        image={official.photoUrl}
                      ></ContactList>
                    </ContentCard>
                  ))
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
