import { Card, CardContent, CardHeader, makeStyles } from "@material-ui/core";
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
  title: string
  subheader?: string
}

const ContentCard: FunctionComponent<CardProps> = ({ children, title, subheader }) => {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader
        title={title}
        subheader={subheader}
        titleTypographyProps={{ align: "center" }}
        subheaderTypographyProps={{ align: "center" }}
        className={classes.cardHeader}
      />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default ContentCard;
