import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { Grid, Typography, Dialog, DialogContent, DialogActions, Button } from "@material-ui/core";
import moment from "moment";
import qs from "qs";
import tkLogo from "../../../src/logo lgu new 12x12 inches 300px.png";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Gtextfield } from "../shared/FormElements";

export default function EmploymentCert() {
  useEffect(() => {
    // Change the document.title for unique filename when downloaded
    document.title = `EmploymentCert_${moment().format("YY-MM-DD-Hms")}`;
  }, []);
  let { name, office_assignment, designation, status } = qs.parse(window.location.search.substring(1));

  const [open, setOpen] = useState(true);
  const [details, setDetails] = useState({
    requestee: "[requestee]",
    reason: "[reason]",
  });
  const handleDetailChange = (e) => {
    setDetails({ ...details, [e.target.id]: e.target.value });
  };

  return (
    <React.Fragment>
      <FinishingDetails open={open} handleClose={() => setOpen(false)} details={details} changes={handleDetailChange} />
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
          <Typography align="center" variant="h5" style={{ margin: "80px 0px 50px 0px", fontFamily: "Times New Roman" }}>
            <b>
              <u>CERTIFICATE OF EMPLOYMENT</u>
            </b>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="justify" style={{ fontSize: "14pt", margin: "30px 0px 30px 0px", textIndent: "5em", fontFamily: "Times New Roman" }}>
            This is to certify that Mr./Ms.{" "}
            <b>
              <u>{name.toUpperCase()}</u>
            </b>{" "}
            is currently employed at the{" "}
            <b>
              <u>{office_assignment.toUpperCase()}</u>
            </b>{" "}
            in the Municipal Government of Tagkawayan, as{" "}
            <b>
              <u>{designation.toUpperCase()}</u>
            </b>{" "}
            in{" "}
            <b>
              <u>{status.toUpperCase()}</u>
            </b>{" "}
            status.
          </Typography>
          <Typography align="justify" style={{ fontSize: "14pt", margin: "0px 0px 80px 0px", textIndent: "5em", fontFamily: "Times New Roman" }}>
            Issued this{" "}
            <b>
              <u>{moment().format("Do").toUpperCase()}</u>
            </b>{" "}
            day of{" "}
            <b>
              <u>{moment().format("MMMM YYYY").toUpperCase()}</u>
            </b>
            , at Tagkawayan, Quezon, upon the request of{" "}
            <b>
              <u>{details.requestee.toUpperCase()}</u>
            </b>{" "}
            for{" "}
            <b>
              <u>{details.reason.toUpperCase()}</u>
            </b>{" "}
            purposes.
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
          <Typography align="right" color="textSecondary" style={{ fontSize: "11pt" }}>
            <i>(Not valid without DRY SEAL and STAMP DATE of RELEASE, and</i>
          </Typography>
          <Typography align="right" color="textSecondary" style={{ fontSize: "11pt" }}>
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

function FinishingDetails({ open, handleClose, details, changes }) {
  let { requestee, reason } = details;

  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Finish Employment Certificate
      </DialogTitle>
      <DialogContent dividers>
        <Gtextfield id="requestee" label="Requestee" value={requestee} onChange={changes} />
        <Gtextfield id="reason" label="Reason" value={reason} onChange={changes} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Save changes</Button>
      </DialogActions>
    </Dialog>
  );
}