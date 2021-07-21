import React from "react";
import { Grid, Typography } from "@material-ui/core";
import tkLogo from "../../../src/logo lgu new 12x12 inches 300px.png";

export default function EmploymentCert() {
  return (
    <React.Fragment>
      <Grid container spacing={0} style={{ borderBottom: "solid 2px black" }}>
        <Grid item xs={10}>
          <Typography>Republic of the Philippines</Typography>
          <Typography>Province of Quezon</Typography>
          <Typography>
            <b>Municipality of Tagkawayan</b>
          </Typography>

          <Typography variant="h5" style={{ color: "darkblue", marginTop: "10px" }}>
            Human Resource Management & Development Office
          </Typography>
          <Typography>
            <i>Contact Number: 0908-872-9964</i>
          </Typography>
          <Typography>
            <i>Email Address: hrmo.lgutagkawayan@gmail.com</i>
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <img src={tkLogo} alt="Tagkawayan Logo" style={{ height: "120px" }} />
        </Grid>
      </Grid>

      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography align="center" variant="h5" style={{ margin: "30px 0px 30px 0px" }}>
            <b>
              <u>CERTIFICATE OF EMPLOYMENT</u>
            </b>
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
