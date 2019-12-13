import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import PostTune from "../tune/PostTune";
import Notifications from "./Notifications";
// MUI
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Button from "@material-ui/core/Button";
// Redux
import { connect } from "react-redux";
// Icons
import HomeIcon from "@material-ui/icons/Home";
import AudiotrackIcon from "@material-ui/icons/Audiotrack";

const Navbar = props => {
  const authenticated = props.authenticated;
  return (
    <AppBar>
      <ToolBar className="nav-container">
        {authenticated ? (
          <Fragment>
            <PostTune />
            <Link to="/">
              <MyButton tip="Home">
                <HomeIcon />
              </MyButton>
            </Link>
            <Notifications />
            <Link to={`/projects/${props.userName}`}>
              <MyButton tip="Projects">
                <AudiotrackIcon />
              </MyButton>
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/projects">
              Projects
            </Button>
          </Fragment>
        )}
      </ToolBar>
    </AppBar>
  );
};

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
  userName: state.user.userName
});

export default connect(mapStateToProps)(Navbar);
