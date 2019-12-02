import React, { Component } from "react";
import MyButton from "../../util/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
// redux
import { connect } from "react-redux";
import { getTune, likeTune, unlikeTune } from "../../redux/actions/dataActions";

export class LikeButton extends Component {
  likedTune = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.tuneId === this.props.tuneId)
    ) {
      return true;
    } else {
      return false;
    }
  };
  likeTune = () => {
    this.props.getTune(this.props.tuneId);
    this.props.likeTune(this.props.tuneId);
  };
  unlikeTune = () => {
    this.props.getTune(this.props.tuneId);
    this.props.unlikeTune(this.props.tuneId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedTune() ? (
      <MyButton tip="Undo like" onClick={this.unlikeTune}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeTune}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );

    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  tuneId: PropTypes.string.isRequired,
  likeTune: PropTypes.func.isRequired,
  unlikeTune: PropTypes.func.isRequired,
  getTune: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeTune,
  unlikeTune,
  getTune
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
