import React from "react";
import {
  CssBaseline,
  Toolbar,
  Typography,
  AppBar,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            TellMyRep
          </Typography>
          <nav>
            <Link
              variant="button"
              color="textPrimary"
              href="#"
              className={classes.link}
            >
              I
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              href="#"
              className={classes.link}
            >
              Luv
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              href="#"
              className={classes.link}
            >
              U
            </Link>
          </nav>
        </Toolbar>
      </AppBar>
    </>
  );
};
// <header
//   style={{
//     background: `rebeccapurple`,
//     marginBottom: `1.45rem`,
//   }}
// >

//   <div
//     style={{
//       margin: `0 auto`,
//       maxWidth: 960,
//       padding: `1.45rem 1.0875rem`,
//     }}
//   >
//     <h1 style={{ margin: 0 }}>
//       <Link
//         to="/"
//         style={{
//           color: `white`,
//           textDecoration: `none`,
//         }}
//       >
//         {siteTitle}
//       </Link>
//     </h1>
//   </div>
// </header>
// Header.propTypes = {
//   siteTitle: PropTypes.string,
// };

// Header.defaultProps = {
//   siteTitle: ``,
// };

export default Header;
