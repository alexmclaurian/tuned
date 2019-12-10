import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Tune from "../components/tune/Tune";
import Profile from "../components/profile/Profile";
import TuneSkeleton from "../util/TuneSkeleton";

import { connect } from "react-redux";
import { getTunes } from "../redux/actions/dataActions";

const Home = props => {
  const { getTunes } = props;
  useEffect(() => {
    getTunes();
  }, [getTunes]);

  const { tunes, loading } = props.data;
  let recentTunes = !loading ? (
    tunes.map(tune => <Tune key={tune.tuneId} tune={tune} />)
  ) : (
    <TuneSkeleton />
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
};

Home.propTypes = {
  getTunes: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getTunes })(Home);
