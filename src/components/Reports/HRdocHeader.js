import React from "react";
import { Grid, Typography } from "@material-ui/core";
import tkLogo from "../../logo lgu new 12x12 inches 300px.png";

export default function HRdocHeader({ paperSize }) {
  return (
    <React.Fragment>
      <Grid container spacing={0} style={{ borderBottom: "solid 2px black" }}>
        <Grid item xs={paperSize === "long" ? 11 : 10}>
          <Typography style={{ fontSize: "10pt" }}>Republic of the Philippines</Typography>
          <Typography style={{ fontSize: "10pt", marginTop: "-5px" }}>Province of Quezon</Typography>
          <Typography style={{ fontSize: "10pt", marginTop: "-5px" }}>
            <b>Municipality of Tagkawayan</b>
          </Typography>

          <Typography variant="h6" style={{ color: "darkblue", marginTop: "-5px" }}>
            Human Resource Management & Development Office
          </Typography>
          <Typography style={{ fontSize: "9pt", marginTop: "-5px" }}>
            <i>Contact Number: 0908-872-9964</i>
          </Typography>
          <Typography style={{ fontSize: "9pt", marginTop: "-5px" }}>
            <i>Email Address: hrmo.lgutagkawayan@gmail.com</i>
          </Typography>
        </Grid>
        <Grid item xs={paperSize === "long" ? 1 : 2}>
          <img src={tkLogo} alt="Tagkawayan Logo" style={{ height: "100px" }} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export function OMMdocHeader({ paperSize }) {
  return (
    <React.Fragment>
      <Grid container spacing={0} style={{ borderBottom: "solid 2px black" }}>
        <Grid item xs={paperSize === "long" ? 1 : 2}>
          <img src={tkLogo} alt="Tagkawayan Logo" style={{ height: "80px" }} />
        </Grid>

        <Grid item xs={paperSize === "long" ? 10 : 8}>
          <Typography align="center" style={{ fontSize: "10pt", fontFamily: "Times New Roman" }}>
            Republic of the Philippines
          </Typography>
          <Typography align="center" style={{ fontSize: "10pt", marginTop: "-5px", fontFamily: "Times New Roman" }}>
            Province of Quezon
          </Typography>
          <Typography align="center" style={{ fontSize: "10pt", marginTop: "-5px", fontFamily: "Times New Roman" }}>
            <b>MUNICIPALITY OF TAGKAWAYAN</b>
          </Typography>

          <Typography align="center" variant="h6" style={{ color: "darkblue", fontFamily: "Times New Roman" }}>
            <b>OFFICE OF THE MUNICIPAL MAYOR</b>
          </Typography>
        </Grid>

        <Grid item xs={paperSize === "long" ? 1 : 2}>
          {/* SPACER */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
