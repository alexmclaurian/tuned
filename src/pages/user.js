import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Tune from "../components/tune/Tune";
import TuneSkeleton from "../util/TuneSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";
import StaticProfile from "../components/profile/StaticProfile";
import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

const User = props => {
  const [profile, setProfile] = useState(null);
  const [tuneIdParam, setTuneIdParam] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // match.params are dynamic URL params
    if (!loaded) {
      setLoaded(true);
      const userName = props.match.params.userName;
      const tuneId = props.match.params.tuneId;

      if (tuneId) setTuneIdParam(tuneId);

      props.getUserData(userName);
      axios
        .get(`/user/${userName}`)
        .then(res => {
          setProfile(res.data.user);
        })
        .catch(err => console.log("not working.. ", props.match, err));
    }
  }, [loaded, props]);

  const { tunes, loading } = props.data;
  const tunesMarkup = loading ? (
    <TuneSkeleton />
  ) : tunes === null ? (
    <p>No tunes from this user</p>
  ) : !tuneIdParam ? (
    tunes.map(tune => <Tune key={tune.tuneId} tune={tune} />)
  ) : (
    tunes.map(tune => {
      if (tune.tuneId !== tuneIdParam)
        return <Tune key={tune.tuneId} tune={tune} />;
      else return <Tune key={tune.tuneId} tune={tune} openDialog />;
    })
  );

  return (
    <Grid container>
      <Grid item sm={8} xs={12}>
        {tunesMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile === null ? (
          <ProfileSkeleton />
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
    </Grid>
  );
};

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getUserData })(User);
