import React from "react";
import MyButton from "../../util/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
// redux
import { connect } from "react-redux";
import { getTune, likeTune, unlikeTune } from "../../redux/actions/dataActions";

const LikeButton = props => {
  const likedTune = () => {
    if (
      props.user.likes &&
      props.user.likes.find(like => like.tuneId === props.tuneId)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const likeTune = () => {
    props.getTune(props.tuneId);
    props.likeTune(props.tuneId);
  };
  const unlikeTune = () => {
    props.getTune(props.tuneId);
    props.unlikeTune(props.tuneId);
  };

  const { authenticated } = props.user;
  const likeButton = !authenticated ? (
    <Link to="/login">
      <MyButton tip="Like">
        <FavoriteBorder color="primary" />
      </MyButton>
    </Link>
  ) : likedTune() ? (
    <MyButton tip="Undo like" onClick={unlikeTune}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={likeTune}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );

  return likeButton;
};

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
