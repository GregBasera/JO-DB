import React from "react";
import { Alert } from "@material-ui/lab";

export default function AlertMaker(props) {
  let { severity, msg } = props;

  return (
    <Alert severity={severity ?? "error"} style={{ marginTop: "16px" }}>
      {msg ?? ""}
    </Alert>
  );
}
