import React, { Fragment, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
// MUI stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
// redux
import { connect } from "react-redux";
import { deleteTune } from "../../redux/actions/dataActions";

const styles = {
  deleteButton: {
    position: "absolute",
    left: "90%",
    top: "10%"
  }
};

const DeleteTune = props => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const deleteTune = () => {
    props.deleteTune(props.tuneId);
    setOpen(false);
  };

  const { classes } = props;
  return (
    <Fragment>
      <MyButton
        tip="Delete tune"
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color="secondary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete this tune?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteTune} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

DeleteTune.propTypes = {
  deleteTune: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  tuneId: PropTypes.string.isRequired
};

export default connect(null, { deleteTune })(withStyles(styles)(DeleteTune));
