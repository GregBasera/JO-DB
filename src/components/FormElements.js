import React from "react";
import { TextField } from "@material-ui/core";

function Gtextfield(props) {
  const { type, label } = props;

  return <TextField type={type} label={label} variant="outlined" fullWidth style={{ marginTop: "16px" }} />;
}

export { Gtextfield };
