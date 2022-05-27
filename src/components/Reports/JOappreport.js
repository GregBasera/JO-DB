import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography, Table, TableHead, TableRow, TableBody, Dialog, DialogContent, DialogActions, Button } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiTableCell from "@material-ui/core/TableCell";
import moment from "moment";
import { Gtextfield, Gdropdown } from "../shared/FormElements";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import HRdocHeader from "./HRdocHeader";
import { getOffices } from "../home/APIcalls";
import { empStatus } from "../shared/sharedVariables";

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
  const [offices, setOffices] = useState([]);
  const [data, setData] = useState(null);
  const [males, setMales] = useState(null);
  const [females, setFemales] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [officeFilter, setOfficeFilter] = useState("");
  const [open, setOpen] = useState(true);
  const [signatories, setSignatories] = useState({
    prepby: "[prepby]",
    prepbyPosition: "[prepbyposition]",
    approvedby: "[approvedby]",
    approvedbyPosition: "[approvedbyPosition]",
  });
  const [dateRange, setDateRange] = useState({
    from: "",
    to: "",
  });

  useEffect(() => {
    document.title = `AppointmentReport_${moment().format("YY-MM-DD-Hms")}`;
    getOffices(setOffices);
    let temp = JSON.parse(localStorage.getItem("forPrinting"));
    let males = 0,
      females = 0;

    // filter raw data from localstorage againts daterange provided by users
    let dateRangeFiltered = temp.filter(
      (e) => moment(e.service_history[0].ep_start).isSameOrAfter(dateRange.from) && moment(e.service_history[0].ep_end).isSameOrBefore(dateRange.to)
    );
    // filter again against status from user; if undefined; dont
    let statusFiltered = statusFilter !== "" ? dateRangeFiltered.filter((e) => e.service_history[0].status === statusFilter) : dateRangeFiltered;
    // filter again against office from user; if undefined; dont
    let officeFiltered = officeFilter !== "" ? statusFiltered.filter((e) => e.service_history[0].office_assignment === officeFilter) : statusFiltered;

    officeFiltered.forEach((personnel, index) => {
      personnel.sex === "Male" ? males++ : females++;
    });

    setData(officeFiltered);
    setMales(males);
    setFemales(females);
  }, [dateRange, officeFilter, statusFilter]);

  const settingStatus = (e) => {
    setStatusFilter(e.target.value);
  };
  const settingOffice = (e) => {
    setOfficeFilter(e.target.value);
  };
  const dateRangeChanges = (e) => {
    setDateRange({ ...dateRange, [e.target.id]: e.target.value });
  };
  const signatoriesChanges = (e) => {
    setSignatories({ ...signatories, [e.target.id]: e.target.value });
  };

  return (
    <React.Fragment>
      <FinishingDetails
        open={open}
        handleClose={() => setOpen(false)}
        dateRange={dateRange}
        changes={dateRangeChanges}
        statusFilter={statusFilter}
        setStatusFilter={settingStatus}
        offices={offices}
        officeFilter={officeFilter}
        setOfficeFilter={settingOffice}
        signatories={signatories}
        signatoriesChanges={signatoriesChanges}
      />
      <HRdocHeader paperSize="long" />

      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography align="center" variant="h5" style={{ margin: "20px 0px 0px 0px" }}>
            <b>{`JOB ORDER APPOINTMENT ${moment(dateRange.to).format("YYYY")}`}</b>
          </Typography>
          <Typography align="center">
            <b>{`${statusFilter ? (statusFilter + " Employees").toUpperCase() : ""} ${officeFilter}`}</b>
          </Typography>
          <Typography align="center" style={{ fontSize: "13pt", color: "red", margin: "0px 0px 20px 0px" }}>
            <b>{`(${moment(dateRange.from).format("MMMM")} - ${moment(dateRange.to).format("MMMM")})`}</b>
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
            <b>{signatories.prepby}</b>
          </Typography>
          <Typography align="center">
            <i>{signatories.prepbyPosition}</i>
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
            <b>{signatories.approvedby}</b>
          </Typography>
          <Typography align="center">
            <i>{signatories.approvedbyPosition}</i>
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

function FinishingDetails({ open, handleClose, dateRange, changes, offices, statusFilter, setStatusFilter, officeFilter, setOfficeFilter, signatories, signatoriesChanges }) {
  let { from, to } = dateRange;
  let { prepby, prepbyPosition, approvedby, approvedbyPosition } = signatories;

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
        <Gdropdown label="Status / Remarks" menuItems={empStatus} name="status" value={statusFilter ?? ""} onChange={setStatusFilter} />
        <Gdropdown label="Office Assignment" menuItems={offices} name="office_assignment" value={officeFilter ?? ""} onChange={setOfficeFilter} />
        <Gtextfield type="text" id="prepby" label="Prepared by" value={prepby} onChange={signatoriesChanges} InputLabelProps={{ shrink: true }} />
        <Gtextfield type="text" id="prepbyPosition" label="Position" value={prepbyPosition} onChange={signatoriesChanges} InputLabelProps={{ shrink: true }} />
        <Gtextfield type="text" id="approvedby" label="Approved by" value={approvedby} onChange={signatoriesChanges} InputLabelProps={{ shrink: true }} />
        <Gtextfield type="text" id="approvedbyPosition" label="Position" value={approvedbyPosition} onChange={signatoriesChanges} InputLabelProps={{ shrink: true }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Print</Button>
      </DialogActions>
    </Dialog>
  );
}
