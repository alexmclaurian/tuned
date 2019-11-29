import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Tune from "../components/Tune";
import Profile from "../components/Profile";

class home extends Component {
  state = {
    tunes: null
  };
  componentDidMount() {
    axios
      .get("/tunes")
      .then(res => {
        // console.log(res.data);
        this.setState({
          tunes: res.data
        });
      })
      .catch(err => console.error(err));
  }
  render() {
    let recentTunes = this.state.tunes ? (
      this.state.tunes.map(tune => <Tune key={tune.tuneId} tune={tune} />)
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

export default home;
