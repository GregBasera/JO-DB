import React from "react";
import { TextField } from "@material-ui/core";

function Gtextfield(props) {
  const { type, label, id, value, onChange, error, size } = props;

  return <TextField id={id} type={type} label={label} value={value} onChange={onChange} error={error} size={size} variant="outlined" fullWidth style={{ marginTop: "16px" }} />;
}

export { Gtextfield };
