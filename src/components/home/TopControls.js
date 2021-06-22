import React from "react";
import { Grid } from "@material-ui/core";
import { Gtextfield } from "../shared/FormElements";

export default function TopControls() {
  return (
    <Grid container spacing={3} style={{ width: "100vw" }}>
      <Grid item xs={6} md={3}>
        <Gtextfield type="text" label="Search" size="small" />
      </Grid>
    </Grid>
  );
}
