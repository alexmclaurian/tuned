import React from "react";
import Grid from "@material-ui/core/Grid";
// import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

import Profile from "../components/profile/Profile";
import Entry from "../components/project/Entry";

import { connect } from "react-redux";

const Projects = () => {
  return (
    <Grid container>
      <Grid item sm={8} xs={12}>
        <Typography variant="h2">Projects</Typography>
        <Entry />
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps)(Projects);
