import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableBody } from "@material-ui/core";
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
  let { name, service_history } = qs.parse(window.location.search.substring(1));

  return (
    <Grid container spacing={0}>
      <Grid item xs={2}>
        <img src={tkLogo} alt="Tagkawayan Logo" style={{ height: "70px", marginLeft: "20vw" }} />
      </Grid>
      <Grid item xs={8}>
        <Typography align="center">Republic of the Philippines</Typography>
        <Typography align="center">
          <b>MUNICIPALITY OF TAGKAWAYAN</b>
        </Typography>
        <Typography align="center">Province of Quezon</Typography>
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={12} style={{ marginBottom: "20px" }}>
        <Typography align="center" variant="h6">
          <b>Human Resource Management & Development Office</b>
        </Typography>
        <Typography align="center" variant="h6">
          <b>Service Record</b>
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
        <Typography style={{ fontSize: "10pt" }}>ADDRESS HERE</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography style={{ fontSize: "10pt" }}>Birthday:</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography style={{ fontSize: "10pt" }}>BIRTHDAY HERE</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography style={{ fontSize: "10pt" }}>Birthplace:</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography style={{ fontSize: "10pt" }}>BIRTHPLACE HERE</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography align="justify" style={{ textIndent: "5em", margin: "20px 0px 20px 0px", fontSize: "10pt" }}>
          This is to certify that the above-named employee rendered service in this agency, as shown in this service record. Each line is supported by Appointment and other
          pertinent papers issued and approved by this office and other authorities concerned.
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <TableContainer component={Paper} elevation={0}>
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
                    <TableCell align="center">{q.status}</TableCell>
                    <TableCell align="center">{`${q.rate_per_day}.00/day`}</TableCell>
                    <TableCell align="center" style={{ maxWidth: "20vw" }}>
                      {q.office_assignment}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
