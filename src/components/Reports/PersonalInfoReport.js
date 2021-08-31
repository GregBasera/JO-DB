import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import HRdocHeader from "./HRdocHeader";
import { Grid, Table, TableHead, TableRow, TableBody, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";
import { Gtextfield } from "../shared/FormElements";
import moment from "moment";

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

export default function PersonalInfoReport() {
  useEffect(() => {
    // Change the document.title for unique filename when downloaded
    document.title = `PersonalInfoReport_${moment().format("YY-MM-DD-Hms")}`;
  }, []);
  const [open, setOpen] = useState(true);
  const [dateRange, setDateRange] = useState({
    from: "",
    to: "",
  });
  const dateRangeChanges = (e) => {
    setDateRange({ ...dateRange, [e.target.id]: e.target.value });
  };

  const [data, setData] = useState(null);
  const [males, setMales] = useState(null);
  const [females, setFemales] = useState(null);
  useEffect(() => {
    let temp = JSON.parse(localStorage.getItem("forPrinting"));
    let males = 0,
      females = 0;
    temp.forEach((personnel, index) => {
      temp[index].service_history = personnel.service_history.filter((sh) => {
        // remove all invalid date-range on each personel
        return sh.ep_start >= dateRange.from && sh.ep_end <= dateRange.to;
      });
    });
    temp = temp
      .filter((p) => {
        // remove all personnel with no servicehistory; whats left is the personnels with VALID date-range
        return p.service_history.length !== 0;
      })
      .sort((a, b) => {
        if (a.service_history[0].funding_source !== b.service_history[0].funding_source)
          return a.service_history[0].funding_source.localeCompare(b.service_history[0].funding_source);
        else if (a.service_history[0].office_assignment !== b.service_history[0].office_assignment)
          return a.service_history[0].office_assignment.localeCompare(b.service_history[0].office_assignment);
        return a.name.localeCompare(b.name);
      });
    temp.forEach((personnel, index) => {
      personnel.sex === "Male" ? males++ : females++;
    });
    // put data from localStorage to temp -> state(data)
    setData(temp);
    setMales(males);
    setFemales(females);
  }, [dateRange]);

  const quarterMaker = (num) => {
    switch (num) {
      case 1:
        return "FIRST";
      case 2:
        return "SECOND";
      case 3:
        return "THIRD";
      case 4:
        return "FOURTH";
      default:
        return "ERROR";
    }
  };

  return (
    <React.Fragment>
      <FinishingDetails open={open} handleClose={() => setOpen(false)} dateRange={dateRange} changes={dateRangeChanges} />
      <HRdocHeader paperSize="long" />

      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography align="center" variant="h6" style={{ margin: "20px 0px 0px 0px" }}>
            <b>{`JOB ORDER PERSONAL INFORMATION ${moment(dateRange.to).format("YYYY")}`}</b>
          </Typography>
          <Typography align="center" style={{ fontSize: "13pt", color: "red", margin: "0px 0px 20px 0px" }}>
            <b>{`${quarterMaker(moment(dateRange.from).quarter())} QUARTER (${moment(dateRange.from).format("MMMM")} - ${moment(dateRange.to).format("MMMM")})`}</b>
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={0} style={{ display: "block" }}>
        <Grid item xs={12} style={{ padding: "0px 10px 0px 10px" }}>
          {/* <TableContainer component={Paper} elevation={0}> */}
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">No.</TableCell>
                <TableCell align="center">Name of Job Order Personnel</TableCell>
                <TableCell align="center">Sex</TableCell>
                <TableCell align="center">Birthdate</TableCell>
                <TableCell align="center">Birthplace</TableCell>
                <TableCell align="center">Contact No.</TableCell>
                <TableCell align="center">Address</TableCell>
                <TableCell align="center">TIN No.</TableCell>
                <TableCell align="center">PHILHEALTH No.</TableCell>
                <TableCell align="center">PAG-IBIG No.</TableCell>
                <TableCell align="center">SSS No.</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(data ?? []).map((q, index) => {
                return (
                  <TableRow key={q._id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="left">{q.name}</TableCell>
                    <TableCell align="center">{q.sex.substring(0, 1)}</TableCell>
                    <TableCell align="center">{moment(q.birthdate).format("MMM DD, YYYY")}</TableCell>
                    <TableCell align="center">{q.birthplace}</TableCell>
                    <TableCell align="center">{q.contact_no}</TableCell>
                    <TableCell align="center">{q.address}</TableCell>
                    <TableCell align="center">{q.tin_num}</TableCell>
                    <TableCell align="center">{q.philhealth_num}</TableCell>
                    <TableCell align="center">{q.pagibig_num}</TableCell>
                    <TableCell align="center">{q.sss_num}</TableCell>
                  </TableRow>
                );
              })}

              <Typography color="textSecondary" style={{ fontSize: "10pt" }}>{`${males} Male, ${females} Female`}</Typography>
            </TableBody>
          </Table>
          {/* </TableContainer> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

function FinishingDetails({ open, handleClose, dateRange, changes }) {
  let { from, to } = dateRange;

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      onExited={() => {
        window.print();
      }}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Set Date Ranges
      </DialogTitle>
      <DialogContent dividers>
        {/* <Alert severity="warning">This page is better printed on Mozilla Firefox</Alert> */}
        <Gtextfield type="date" id="from" label="From" value={from} onChange={changes} InputLabelProps={{ shrink: true }} />
        <Gtextfield type="date" id="to" label="To" value={to} onChange={changes} InputLabelProps={{ shrink: true }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Print</Button>
      </DialogActions>
    </Dialog>
  );
}
