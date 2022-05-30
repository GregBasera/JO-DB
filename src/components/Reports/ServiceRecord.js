import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { Grid, Typography, Table, TableHead, TableRow, TableBody, Dialog, DialogContent, DialogActions, Button } from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import HRdocHeader from "./HRdocHeader";
import { Gtextfield } from "../shared/FormElements";
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

export default function ServiceRecord() {
  useEffect(() => {
    // Change the document.title for unique filename when downloaded
    document.title = `ServiceRecord_${moment().format("YY-MM-DD-Hms")}`;
  }, []);
  let useServiceRecord = JSON.parse(localStorage.getItem("serviceRecord"));
  let { name, service_history, birthdate, birthplace, address, status } = useServiceRecord;

  const [open, setOpen] = useState(true);
  const [details, setDetails] = useState({
    prepby: "[prepby]",
    prepbyPosition: "[prepbyPosition]",
    approvedby: "[attestby]",
    approvedbyPosition: "[attestbyPosition]",
  });

  const signatoriesChanges = (e) => {
    setDetails({ ...details, [e.target.id]: e.target.value });
  };
  // const [isAbsent, setIsAbsent] = useState(false);
  // const checkChange = (e) => {
  //   setIsAbsent(e.target.checked);
  // };

  return (
    <React.Fragment>
      <FinishingDetails open={open} handleClose={() => setOpen(false)} details={details} changes={signatoriesChanges} />
      <HRdocHeader paperSize="a4" />

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
          <Typography style={{ fontSize: "10pt" }}>
            <b>{name.toUpperCase()}</b>
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography style={{ fontSize: "10pt" }}>Address:</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography style={{ fontSize: "10pt" }}>
            <b>{address.toUpperCase()}</b>
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography style={{ fontSize: "10pt" }}>Birthday:</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography style={{ fontSize: "10pt" }}>
            <b>{moment(birthdate).format("MMMM DD, YYYY")}</b>
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography style={{ fontSize: "10pt" }}>Birthplace:</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography style={{ fontSize: "10pt" }}>
            <b>{birthplace.toUpperCase()}</b>
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography align="justify" style={{ textIndent: "5em", margin: "20px 0px 20px 0px", fontSize: "10pt" }}>
            This is to certify that the above-named employee rendered service in this Agency, as shown in this Service Record. Each line is supported by Appointment and other
            pertinent papers issued and approved by this Office and other Authorities concerned.
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={0} style={{ display: "block" }}>
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
                    <TableCell align="center">{moment(q.ep_end).isSameOrAfter(moment()) ? "to date" : moment(q.ep_end).format("DD-MMM-YYYY")}</TableCell>
                    <TableCell align="center">{q.designation}</TableCell>
                    <TableCell align="center">{`${status} / ${q.status}`}</TableCell>
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
      </Grid>

      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography align="justify" style={{ textIndent: "5em", margin: "20px 0px 20px 0px", fontSize: "10pt" }}>
            Issued this {moment().format("Do")} day of {moment().format("MMM")} for whatever legal purposes it may serve.
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={0}>
        <Grid item xs={6} style={{ marginTop: "30px" }}>
          <Typography style={{ fontSize: "10pt" }}>Prepared by:</Typography>
          <Typography align="center" style={{ marginTop: "30px" }}>
            <b>{details.prepby}</b>
          </Typography>
          <Typography align="center" style={{ fontSize: "10pt" }}>
            <i>{details.prepbyPosition}</i>
          </Typography>
        </Grid>
        <Grid item xs={6} style={{ marginTop: "30px" }}>
          <Typography style={{ fontSize: "10pt" }}>Reviewed and Attested by:</Typography>
          <Typography align="center" style={{ marginTop: "30px" }}>
            <b>{details.approvedby}</b>
          </Typography>
          <Typography align="center" style={{ fontSize: "10pt" }}>
            <i>{details.approvedbyPosition}</i>
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

function FinishingDetails({ open, handleClose, details, changes }) {
  let { prepby, prepbyPosition, approvedby, approvedbyPosition } = details;

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      onExited={() => {
        window.print();
      }}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Finish Employment Certificate
      </DialogTitle>
      <DialogContent dividers>
        {/* <Alert severity="warning">This page is better printed on Mozilla Firefox</Alert> */}
        {/* <FormControlLabel control={<Checkbox checked={isAbsent} onChange={isAbsentChange} />} label="Attester is absent" /> */}
        <Gtextfield type="text" id="prepby" label="Prepared by" value={prepby} onChange={changes} InputLabelProps={{ shrink: true }} />
        <Gtextfield type="text" id="prepbyPosition" label="Position" value={prepbyPosition} onChange={changes} InputLabelProps={{ shrink: true }} />
        <Gtextfield type="text" id="approvedby" label="Approved by" value={approvedby} onChange={changes} InputLabelProps={{ shrink: true }} />
        <Gtextfield type="text" id="approvedbyPosition" label="Position" value={approvedbyPosition} onChange={changes} InputLabelProps={{ shrink: true }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Print</Button>
      </DialogActions>
    </Dialog>
  );
}
