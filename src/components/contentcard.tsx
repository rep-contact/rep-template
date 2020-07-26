import {
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  Grid,
} from "@material-ui/core";
import React, { FunctionComponent } from "react";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
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

type CardProps = {
  title: string;
  subheader?: string;
  centerChildren?: boolean;
  size?: string;
};

const ContentCard: FunctionComponent<CardProps> = ({
  children,
  title,
  subheader,
  centerChildren = false,
  size = "large",
}) => {
  const classes = useStyles();
  return (
    //put key here
    <Grid item xs={size === "large" ? 12 : 6} md={size === "large" ? 6 : 4}>
      <Card>
        <CardHeader
          title={title}
          subheader={subheader}
          titleTypographyProps={{ align: "center" }}
          subheaderTypographyProps={{ align: "center" }}
          className={classes.cardHeader}
        />
        <CardContent align={centerChildren ? "center" : "start"}>
          {children}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ContentCard;
