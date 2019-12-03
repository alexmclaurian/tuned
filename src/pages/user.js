import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Tune from "../components/tune/Tune";
import TuneSkeleton from "../util/TuneSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";
import StaticProfile from "../components/profile/StaticProfile";
import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

class user extends Component {
  state = {
    profile: null,
    tuneIdParam: null
  };
  componentDidMount() {
    const userName = this.props.match.params.userName;
    const tuneId = this.props.match.params.tuneId;

    if (tuneId) this.setState({ tuneIdParam: tuneId });

    this.props.getUserData(userName);
    axios
      .get(`/user/${userName}`)
      .then(res => {
        this.setState({ profile: res.data.user });
      })
      .catch(err => console.log("not working.. ", this.props.match, err));
  }
  render() {
    const { tunes, loading } = this.props.data;
    const { tuneIdParam } = this.state;
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
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getUserData })(user);
