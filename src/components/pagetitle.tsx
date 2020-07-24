import { Container, Typography } from "@material-ui/core";

const PageTitle = () => {
  return (
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
        Quickly find your representatives and demand change at the federal,
        state, and local level.
      </Typography>
    </Container>
  );
};
