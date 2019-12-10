import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import DeleteTune from "./DeleteTune";
import TuneDialog from "./TuneDialog";
import LikeButton from "./LikeButton";
// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
// Icons
import ChatIcon from "@material-ui/icons/Chat";
// Redux
import { connect } from "react-redux";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: "cover"
  }
};

const Tune = props => {
  dayjs.extend(relativeTime);
  const {
    classes,
    tune: {
      body,
      createdAt,
      userImage,
      userName,
      tuneId,
      likeCount,
      commentCount
    },
    user: { authenticated, credentials }
  } = props;

  const deleteButton =
    authenticated && userName === credentials.userName ? (
      <DeleteTune tuneId={tuneId} />
    ) : null;

  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile Image"
        className={classes.image}
      />

      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userName}`}
          color="primary"
        >
          {userName}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton tuneId={tuneId} />
        <span>{likeCount} Likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
        <TuneDialog
          tuneId={tuneId}
          userName={userName}
          openDialog={props.openDialog}
        />
      </CardContent>
    </Card>
  );
};

Tune.propTypes = {
  user: PropTypes.object.isRequired,
  tune: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Tune));
