import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { Grid, Typography, Dialog, DialogContent, DialogActions, Button } from "@material-ui/core";
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Gtextfield } from "../shared/FormElements";
import HRdocHeader from "./HRdocHeader";

export default function EmploymentCert() {
  useEffect(() => {
    // Change the document.title for unique filename when downloaded
    document.title = `EmploymentCert_${moment().format("YY-MM-DD-Hms")}`;
  }, []);

  const [open, setOpen] = useState(true);
  const [isEmployed, setIsEmployed] = useState(true);
  const [details, setDetails] = useState({
    requestee: "[requester]",
    office: "[office/department]",
    designation: "[designation]",
    status: "[status]",
    reason: "[reason]",
    prep: "[prepby]",
    prep_position: "[prepbyposition]",
    attest: "[attest]",
    attest_position: "[attestbyposition]",
  });
  const handleDetailChange = (e) => {
    setDetails({ ...details, [e.target.id]: e.target.value });
  };
  const isEmployedChanges = (e) => {
    setIsEmployed(e.target.checked);
  };

  return (
    <React.Fragment>
      <FinishingDetails
        open={open}
        handleClose={() => setOpen(false)}
        details={details}
        changes={handleDetailChange}
        isEmployed={isEmployed}
        isEmployedChanges={isEmployedChanges}
      />
      <HRdocHeader paperSize="a4" />

      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography align="center" variant="h5" style={{ margin: "80px 0px 50px 0px", fontFamily: "Times New Roman" }}>
            <b>CERTIFICATE OF EMPLOYMENT</b>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="justify" style={{ fontSize: "12pt", margin: "30px 40px 30px 40px", textIndent: "5em", fontFamily: "Times New Roman" }}>
            This is to certify that Mr./Ms. <b>{details.requestee}</b> is {`${isEmployed ? "currently" : "previously"}`} employed at the <b>{details.office}</b> in the Municipal
            Government of Tagkawayan, as <b>{details.designation}</b> in <b>{details.status}</b> status.
          </Typography>
          <Typography align="justify" style={{ fontSize: "12pt", margin: "0px 40px 60px 40px", textIndent: "5em", fontFamily: "Times New Roman" }}>
            Issued this <b>{moment().format("Do")}</b> day of <b>{moment().format("MMMM YYYY")}</b>, at Tagkawayan, Quezon, upon the request of <b>{details.requestee}</b> for{" "}
            <b>{details.reason}</b> purposes.
          </Typography>
        </Grid>
        <Grid item xs={6}>
          {/* spacer */}
        </Grid>
        <Grid item xs={6}>
          <Typography>Prepared by:</Typography>
          <Typography align="center" style={{ fontSize: "12pt", marginTop: "30px", fontFamily: "Times New Roman" }}>
            <b>{details.prep}</b>
          </Typography>
          <Typography align="center" style={{ fontSize: "12pt", fontFamily: "Times New Roman" }}>
            <i>{details.prep_position}</i>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Reviewed and Attested by:</Typography>
          <Typography align="center" style={{ fontSize: "12pt", marginTop: "30px", fontFamily: "Times New Roman" }}>
            <b>{details.attest}</b>
          </Typography>
          <Typography align="center" style={{ fontSize: "12pt", fontFamily: "Times New Roman" }}>
            <i>{details.attest_position}</i>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          {/* spacer */}
        </Grid>

        <Grid item xs={12} style={{ marginTop: "70px" }}>
          <Typography align="right" color="textSecondary" style={{ fontSize: "10pt" }}>
            <i>(Not valid without DRY SEAL and STAMP DATE of RELEASE, and</i>
          </Typography>
          <Typography align="right" color="textSecondary" style={{ fontSize: "10pt" }}>
            <i>if document bears any visible physical tampering and erasures)</i>
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

function FinishingDetails({ open, handleClose, details, changes, isEmployed, isEmployedChanges }) {
  let { requestee, office, designation, status, reason, prep, prep_position, attest, attest_position } = details;

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
        <Gtextfield id="requestee" label="Requestee" value={requestee} onChange={changes} />
        <Gtextfield id="office" label="Office" value={office} onChange={changes} />
        <Gtextfield id="designation" label="Designation" value={designation} onChange={changes} />
        <Gtextfield id="status" label="Status" value={status} onChange={changes} />
        <Gtextfield id="reason" label="Reason" value={reason} onChange={changes} />
        <Gtextfield id="prep" label="Prepared by" value={prep} onChange={changes} />
        <Gtextfield id="prep_position" label="Position" value={prep_position} onChange={changes} />
        <Gtextfield id="attest" label="Attested by" value={attest} onChange={changes} />
        <Gtextfield id="attest_position" label="Position" value={attest_position} onChange={changes} />
        <div style={{ marginTop: "6px" }}>
          <input type="checkbox" id="isEmployedCheckbox" checked={isEmployed} onChange={isEmployedChanges} />
          <label htmlFor="isEmployedCheckbox">requester currently employed</label>
        </div>
      </DialogContent>
      <DialogActions>
        <Button disableRipple onClick={handleClose}>
          Print
        </Button>
      </DialogActions>
    </Dialog>
  );
}
