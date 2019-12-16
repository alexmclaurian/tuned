import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

const MyButton = ({
  children,
  onClick,
  tip,
  btnClassName,
  tipClassName,
  name
}) => (
  <Tooltip title={tip} className="tuned" placement="top">
    <IconButton onClick={onClick} className={btnClassName}>
      {children}
      <Typography color="secondary" variant="h6">
        {name}
      </Typography>
    </IconButton>
  </Tooltip>
);

export default MyButton;
