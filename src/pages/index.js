import React from "react";
import Layout from "../components/layout";
import { Consumer } from "../context/RepresentativeContext";
import {
  Container,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Button,
  FormControl,
  Grid,
  InputLabel,
  FormHelperText,
  Input,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { makeStyles } from "@material-ui/core/styles";

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
  const formData = {
    address: "",
  };

  const classes = useStyles();

  const handleSubmit = (event, setReps) => {
    event.preventDefault();
    const address = formData.address;

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
        setReps(resultData.response);
      });
  };

  const handleChange = (event) => {
    formData.address = event.target.value;
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
          {(context) => (
            <Grid container spacing={5} alignItems="flex-end">
              <Card>
                <CardHeader
                  title="Contact"
                  subheader="Enter your Zip code to get your reps"
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{ align: "center" }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <FormControl textAlign="center">
                    <InputLabel htmlFor="my-input">ZipCode</InputLabel>
                    <Input
                      id="my-input"
                      aria-describedby="my-helper-text"
                      onChange={handleChange}
                    />
                    <FormHelperText id="my-helper-text">
                      We'll never share your address.
                    </FormHelperText>
                    <Button onClick={(e) => handleSubmit(e, context.setReps)}>
                      Submit
                    </Button>
                  </FormControl>
                </CardContent>
              </Card>
              <ArrowForwardIcon />
              <Card>
                <CardHeader
                  title="Your Reps"
                  subheader="Your reps will show up here"
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{ align: "center" }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <ul>
                    {context.reps.officials &&
                      context.reps.officials.map((official) => (
                        <li>{official.name}</li>
                      ))}
                  </ul>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Consumer>
      </Container>
    </Layout>
  );
};
export default SearchPage;
