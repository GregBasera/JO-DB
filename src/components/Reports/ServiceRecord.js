import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography, Table, TableHead, TableRow, TableBody, TableContainer, Paper } from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";
import qs from "qs";
import moment from "moment";
import tkLogo from "../../../src/logo lgu new 12x12 inches 300px.png";

const TableCell = withStyles({
  root: {
    fontSize: "10pt",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
    padding: "5px",
  },
})(MuiTableCell);

export default function ServiceRecord() {
  useEffect(() => {
    // Change the document.title for unique filename when downloaded
    document.title = `ServiceRecord_${moment().format("YY-MM-DD-Hms")}`;
  }, []);
  let { name, service_history, birthdate, birthplace, address, status } = qs.parse(window.location.search.substring(1));

  return (
    <React.Fragment>
      <Grid container spacing={0} style={{ borderBottom: "solid 2px black" }}>
        <Grid item xs={10}>
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
        <Grid item xs={2}>
          <img src={tkLogo} alt="Tagkawayan Logo" style={{ height: "100px" }} />
        </Grid>
      </Grid>

      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography align="center" variant="h6" style={{ margin: "20px 0px 20px 0px" }}>
            <b>SERVICE RECORD</b>
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography style={{ fontSize: "10pt" }}>Name:</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography style={{ fontSize: "10pt" }}>{name.toUpperCase()}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography style={{ fontSize: "10pt" }}>Address:</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography style={{ fontSize: "10pt" }}>{address.toUpperCase()}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography style={{ fontSize: "10pt" }}>Birthday:</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography style={{ fontSize: "10pt" }}>{moment(birthdate).format("MMMM DD, YYYY")}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography style={{ fontSize: "10pt" }}>Birthplace:</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography style={{ fontSize: "10pt" }}>{birthplace.toUpperCase()}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography align="justify" style={{ textIndent: "5em", margin: "20px 0px 20px 0px", fontSize: "10pt" }}>
            This is to certify that the above-named employee rendered service in this Agency, as shown in this Service Record. Each line is supported by Appointment and other
            pertinent papers issued and approved by this Office and other Authorities concerned.
          </Typography>
        </Grid>

        <Grid item xs={12} style={{ padding: "0px 10px 0px 10px" }}>
          {/* <TableContainer component={Paper} elevation={0}> */}
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ color: "firebrick" }} colSpan={2}>
                  SERVICE
                </TableCell>
                <TableCell align="center" style={{ color: "firebrick" }} colSpan={3}>
                  RECORD OF APPOINTMENT
                </TableCell>
                <TableCell align="center" style={{ color: "firebrick" }} colSpan={1}>
                  OFFICE
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" style={{ color: "firebrick" }}>
                  From
                </TableCell>
                <TableCell align="center" style={{ color: "firebrick" }}>
                  To
                </TableCell>
                <TableCell align="center" style={{ color: "firebrick" }}>
                  Designation
                </TableCell>
                <TableCell align="center" style={{ color: "firebrick" }}>
                  Status
                </TableCell>
                <TableCell align="center" style={{ color: "firebrick" }}>
                  Salary
                </TableCell>
                <TableCell align="center" style={{ color: "firebrick" }}>
                  Station of Assignment
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {service_history.map((q, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="center">{moment(q.ep_start).format("DD-MMM-YYYY")}</TableCell>
                    <TableCell align="center">{moment(q.ep_end).format("DD-MMM-YYYY")}</TableCell>
                    <TableCell align="center">{q.designation}</TableCell>
                    <TableCell align="center">{status}</TableCell>
                    <TableCell align="center">{`${q.rate_per_day}.00/day`}</TableCell>
                    <TableCell align="center" style={{ maxWidth: "20vw" }}>
                      {q.office_assignment}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {/* </TableContainer> */}
        </Grid>

        <Grid item xs={6} style={{ marginTop: "10vh" }}>
          <Typography>Prepared by:</Typography>
          <Typography align="center" style={{ marginTop: "30px" }}>
            <b>NIDA A. NABUHAY</b>
          </Typography>
          <Typography align="center">
            <i>Administrative Aide II</i>
          </Typography>
        </Grid>
        <Grid item xs={6} style={{ marginTop: "10vh" }}>
          <Typography>Reviewed and Attested by:</Typography>
          <Typography align="center" style={{ marginTop: "30px" }}>
            <b>MA. SARINA G. ANONUEVO</b>
          </Typography>
          <Typography align="center">
            <i>MGDH I (HRMO V)</i>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          {/* spacer */}
        </Grid>
        <Grid item xs={6}>
          <Typography>for and In the Absence of:</Typography>
          <Typography align="center" style={{ marginTop: "30px" }}>
            <b>ANNA LOUELLA U. VILLANUEVA</b>
          </Typography>
          <Typography align="center">
            <i>Administrative Officer V (HRMO III)</i>
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
