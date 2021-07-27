import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography, Table, TableHead, TableRow, TableBody } from "@material-ui/core";
import tkLogo from "../../logo lgu new 12x12 inches 300px.png";
import MuiTableCell from "@material-ui/core/TableCell";

const TableCell = withStyles({
  root: {
    fontSize: "10pt",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
    padding: "0px",
  },
})(MuiTableCell);

export default function JOappreport() {
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
          <Typography align="center" variant="h6" style={{ margin: "20px 0px 0px 0px" }}>
            <b>{"JOB ORDER APPOINTMENT [year]"}</b>
          </Typography>
          <Typography align="center" style={{ fontSize: "13pt", color: "red", margin: "0px 0px 20px 0px" }}>
            <b>{"[???] QUARTER (month - month)"}</b>
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={12} style={{ padding: "0px 10px 0px 10px" }}>
        {/* <TableContainer component={Paper} elevation={0}> */}
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center" rowSpan={2}>
                No.
              </TableCell>
              <TableCell align="center" rowSpan={2}>
                Name of Job Order Personnel
              </TableCell>
              <TableCell align="center" rowSpan={2}>
                Designation
              </TableCell>
              <TableCell align="center" rowSpan={2}>
                Sex
              </TableCell>
              <TableCell align="center" rowSpan={2}>
                Rate per Day
              </TableCell>
              <TableCell align="center" colSpan={2} rowSpan={1}>
                Period of Employment
              </TableCell>
              <TableCell align="center" rowSpan={2}>
                Funding Source
              </TableCell>
              <TableCell align="center" rowSpan={2}>
                Office Assignment
              </TableCell>
              <TableCell align="center" rowSpan={2}>
                Status
              </TableCell>
              <TableCell align="center" rowSpan={2}>
                General Function
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">From</TableCell>
              <TableCell align="center">To</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">1</TableCell>
              <TableCell align="center">???</TableCell>
              <TableCell align="center">???</TableCell>
              <TableCell align="center">???</TableCell>
              <TableCell align="center">???</TableCell>
              <TableCell align="center">???</TableCell>
              <TableCell align="center">???</TableCell>
              <TableCell align="center">Gen. Fund</TableCell>
              <TableCell align="center">???</TableCell>
              <TableCell align="center">???</TableCell>
              <TableCell align="center">???</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {/* </TableContainer> */}
      </Grid>
    </React.Fragment>
  );
}
