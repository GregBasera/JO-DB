import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography, Table, TableHead, TableRow, TableBody, Dialog, DialogContent, DialogActions, Button } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiTableCell from "@material-ui/core/TableCell";
import moment from "moment";
import { Gtextfield } from "../shared/FormElements";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import HRdocHeader from "./HRdocHeader";
// import { Alert } from "@material-ui/lab";

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
  useEffect(() => {
    // Change the document.title for unique filename when downloaded
    document.title = `AppointmentReport_${moment().format("YY-MM-DD-Hms")}`;
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
            <b>{`JOB ORDER APPOINTMENT ${moment(dateRange.to).format("YYYY")}`}</b>
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
              {(data ?? []).map((q, index) => {
                return (
                  <TableRow key={q._id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="left">{q.name}</TableCell>
                    <TableCell align="center">{q.service_history[0].designation}</TableCell>
                    <TableCell align="center">{q.sex.substring(0, 1)}</TableCell>
                    <TableCell align="center">{`${q.service_history[0].rate_per_day}.00`}</TableCell>
                    <TableCell align="center">{moment(q.service_history[0].ep_start).format("D-MMM-YYYY")}</TableCell>
                    <TableCell align="center">{moment(q.service_history[0].ep_end).format("D-MMM-YYYY")}</TableCell>
                    <TableCell align="center">{q.service_history[0].funding_source}</TableCell>
                    <TableCell align="center">{q.service_history[0].office_assignment}</TableCell>
                    <TableCell align="center">{q.service_history[0].status}</TableCell>
                    <TableCell align="center">{q.service_history[0].general_function}</TableCell>
                  </TableRow>
                );
              })}

              <Typography color="textSecondary" style={{ fontSize: "10pt" }}>{`${males} Male, ${females} Female`}</Typography>
            </TableBody>
          </Table>
          {/* </TableContainer> */}
        </Grid>
      </Grid>

      <Grid container spacing={0}>
        <Grid item xs={12} style={{ padding: "0px 10px 0px 10px" }}>
          <Typography align="justify" style={{ textIndent: "5em", margin: "20px 0px 20px 0px", fontSize: "10pt" }}>
            The said job orders shall automatically cease upon the expiration as stipulated above, unless renewed. However, services of any or above-named can be terminated prior
            to the expiration of this job order for lack of funds or when the/their services is/are no longer needed. The above-named hereby attest that (1) s/he is not related
            with the fourth degree of consanguinity or affinity to the hiring authority and/or representative of the hiring agency; (2) s/he has not been previously dismissed from
            government service by reason of an administrative offense; (3) s/he has not already reached the agency retirement age of sixty-five (65).
          </Typography>
        </Grid>

        <Grid item xs={6} style={{ marginTop: "20px" }}>
          <Typography>Prepared by:</Typography>
          <Typography align="center" style={{ marginTop: "20px" }}>
            <b>MA. SARINA G AÑONUEVO</b>
          </Typography>
          <Typography align="center">
            <i>MGDH I (HRMO V)</i>
          </Typography>
        </Grid>
        <Grid item xs={5}>
          {/* SPACER */}
        </Grid>
        <Grid item xs={6}>
          {/* SPACER */}
        </Grid>
        <Grid item xs={6}>
          <Typography>Approved by:</Typography>
          <Typography align="center" style={{ marginTop: "20px" }}>
            <b>LUIS OSCAR T. ELEAZAR</b>
          </Typography>
          <Typography align="center">
            <i>Municipal Mayor</i>
          </Typography>
          <Typography align="center">
            <i>Date: {moment().format("D MMM YYYY")}</i>
          </Typography>
        </Grid>
        <Grid item xs={6} style={{ padding: "0px 10px 0px 10px" }}>
          <Typography style={{ fontSize: "10pt" }}>Copy Furnished:</Typography>
          <Typography style={{ fontSize: "10pt" }}>
            <i>Department Heads Concern</i>
          </Typography>
          <Typography style={{ fontSize: "10pt" }}>
            <i>File</i>
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

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
