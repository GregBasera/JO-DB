import React from "react";
import { Grid, Box } from "@material-ui/core";
import { Gtextfield, Gdropdown, Gbutton } from "../shared/FormElements";
import AddIcon from "@material-ui/icons/Add";

export default function TopControls() {
  return (
    <Grid container spacing={2} style={{ margin: "0px", width: "100vw" }}>
      <Grid item xs={12} md={3}>
        <Gtextfield type="text" label="Search" size="small" />
      </Grid>
      <Grid item xs={6} md={3}>
        <Gdropdown label="Office Assignment" />
      </Grid>
      <Grid item xs={6} md={2}>
        <Gdropdown label="Status" />
      </Grid>
      <Grid item xs={12} md={4}>
        <Box display="flex" flexDirection="row-reverse">
          <Gbutton icon={<AddIcon />} text="Add Personel" color="secondary" />
          <Gbutton icon={<AddIcon />} text="Add Department" />
        </Box>
      </Grid>
    </Grid>
  );
}
