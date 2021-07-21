import React from "react";
import { Grid, Typography } from "@material-ui/core";
import moment from "moment";
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
          <Typography align="center" variant="h5" style={{ margin: "80px 0px 50px 0px" }}>
            <b>
              <u>CERTIFICATE OF EMPLOYMENT</u>
            </b>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="justify" style={{ fontSize: "14pt", margin: "30px 0px 30px 0px", textIndent: "5em" }}>
            This is to certify that Mr./Ms. [NAME] is currently employed at the [OFFICE ASSIGNMENT] in the Municipal Government of Tagkawayan, as [DESIGNATION] in [STATUS].
          </Typography>
          <Typography align="justify" style={{ fontSize: "14pt", margin: "0px 0px 100px 0px", textIndent: "5em" }}>
            {`Issued this ${moment().format("Do").toUpperCase()} day of ${moment()
              .format("MMMM YYYY")
              .toUpperCase()}, at Tagkawayan, Quezon, Upon the request of [name] for [reason] purposes.`}
          </Typography>
        </Grid>
        {/* spacer */}
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <Typography>Prepared by:</Typography>
          <Typography align="center" style={{ marginTop: "50px" }}>
            <b>NIDA A. NABUHAY</b>
          </Typography>
          <Typography align="center">
            <i>Administrative Aide II</i>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Reviewed and Attested by:</Typography>
          <Typography align="center" style={{ marginTop: "50px" }}>
            <b>MA. SARINA G. ANONUEVO</b>
          </Typography>
          <Typography align="center">
            <i>MGDH I (HRMO V)</i>
          </Typography>
        </Grid>
        {/* spacer */}
        <Grid item xs={6}></Grid>

        <Grid item xs={12} style={{ marginTop: "70px" }}>
          <Typography align="right">
            <i>(Not valid without DRY SEAL and STAMP DATE of RELEASE, and</i>
          </Typography>
          <Typography align="right">
            <i>if document bears any visible physical tampering and erasures)</i>
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
