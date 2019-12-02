import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Tune from "../components/tune/Tune";
import Profile from "../components/profile/Profile";

import { connect } from "react-redux";
import { getTunes } from "../redux/actions/dataActions";

class home extends Component {
  componentDidMount() {
    this.props.getTunes();
  }
  render() {
    const { tunes, loading } = this.props.data;
    let recentTunes = !loading ? (
      tunes.map(tune => <Tune key={tune.tuneId} tune={tune} />)
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container>
        <Grid item sm={8} xs={12}>
          {recentTunes}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getTunes: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getTunes })(home);
