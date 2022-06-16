import React, { useState, useEffect } from "react";
import { Grid, Typography, Dialog, DialogContent, DialogActions, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { OMMdocHeader } from "./HRdocHeader";
import { Gtextfield } from "../shared/FormElements";
import moment from "moment";

export default function JOappcert() {
  useEffect(() => {
    // Change the document.title for unique filename when downloaded
    document.title = `AppointmentCert_${moment().format("YY-MM-DD-Hms")}`;
  }, []);
  let storage = JSON.parse(localStorage.getItem("serviceRecord"));
  const straightFromStorage = (mode) => {
    let copy;
    let cap1stLetter;

    switch (mode) {
      case "name":
        return storage.name;
      case "address":
        copy = storage.address.split(" ");
        cap1stLetter = copy.map((q) => q[0].toUpperCase() + q.slice(1).toLowerCase());
        let remove = cap1stLetter.filter((el) => (el.search("Tagkawayan") ? true : false) && (el.search("Quezon") ? true : false));
        let merge = remove.join(" ");
        return merge;
      case "surname":
        copy = storage.name.split(" ");
        cap1stLetter = copy.map((q) => q[0].toUpperCase() + q.slice(1).toLowerCase());
        return cap1stLetter[0].replace(/,/g, "");
      case "position":
        return storage.service_history[0].designation;
      default:
        break;
    }
  };

  const [open, setOpen] = useState(true);
  const [details, setDetails] = useState({
    position: straightFromStorage("position"),
    location: "[location]",
    rate: "one hundred pesos (Php 100.00)",
    expiration: "[expiration]",
    supervisor: "[supervisor]",
    super_position: "[super_position]",
    mayor: "LUIS OSCAR T. ELEAZAR",
  });

  const handleDetailChange = (e) => {
    setDetails({ ...details, [e.target.id]: e.target.value });
  };

  return (
    <React.Fragment>
      <FinishingDetails open={open} handleClose={() => setOpen(false)} details={details} changes={handleDetailChange} />

      <OMMdocHeader paperSize="a4" />
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography align="right" style={{ margin: "30px 20px 0px 20px", fontFamily: "Times New Roman" }}>
            {moment().format("MMMM DD, YYYY")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="left" style={{ fontSize: "12pt", lineHeight: "normal", margin: "20px 20px 0px 20px", fontFamily: "Times New Roman" }}>
            {straightFromStorage("name")}
          </Typography>
          <Typography align="left" style={{ fontSize: "12pt", lineHeight: "normal", margin: "0px 20px 0px 20px", fontFamily: "Times New Roman" }}>
            {straightFromStorage("address")}
          </Typography>
          <Typography align="left" style={{ fontSize: "12pt", lineHeight: "normal", margin: "0px 20px 0px 20px", fontFamily: "Times New Roman" }}>
            Tagkawayan, Quezon
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="left" style={{ margin: "30px 20px 0px 20px", fontFamily: "Times New Roman" }}>
            {`Dear Mr./Ms. ${straightFromStorage("surname")}:`}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography align="justify" style={{ fontSize: "12pt", lineHeight: "normal", margin: "10px 20px 10px 20px", textIndent: "5em", fontFamily: "Times New Roman" }}>
            {`You are hereby directed to perform the job of a `}
            <b>{details.position}</b>
            {` at the ${details.location}, at the rate of `}
            <b>{details.rate}</b>
            {` daily, which will be released every 5th
            and 20th day of the month. This will take effect from the date stated above until ${moment(details.expiration).format("MMMM DD, YYYY")}`}
          </Typography>
          <Typography align="justify" style={{ fontSize: "12pt", lineHeight: "normal", margin: "0px 20px 10px 20px", textIndent: "5em", fontFamily: "Times New Roman" }}>
            {`Please be noted that this order automatically ceases upon its expiration or you can be terminated prior to the expiration of this
            Job Order for the following reasons:`}
          </Typography>
          <Typography align="justify" style={{ fontSize: "12pt", lineHeight: "normal", margin: "0px 20px 10px 80px", fontFamily: "Times New Roman" }}>
            <ul>
              <li>Lack of funds or when your service is no longer needed;</li>
              <li>False entry on your Daily Time Record;</li>
              <li>Absence without written notice to your immediate supervisor;</li>
              <li>Misbehavior;</li>
              <li>Poor performance;</li>
              <li>Falsification of documents or forging of signatures; and</li>
              <li>Other violation of the Norms of Conduct of Public Officials and Employees, Section 4 of the Republic Act No. 6713.</li>
            </ul>
          </Typography>
          <Typography align="justify" style={{ fontSize: "12pt", lineHeight: "normal", margin: "0px 20px 10px 20px", textIndent: "5em", fontFamily: "Times New Roman" }}>
            {`Furthermore, your services rendered are not considered or will not be accredited as government service, and you cannot enjoy the benifits
            enjoyed by government employees such as ACA, PERA, and other benefits.`}
          </Typography>
          <Typography align="justify" style={{ fontSize: "12pt", lineHeight: "normal", margin: "0px 20px 10px 20px", textIndent: "5em", fontFamily: "Times New Roman" }}>
            {`You are hereby instructed to report to ${details.supervisor}, ${details.super_position} of ${details.location}, for briefing and orientation on your job descriptions.`}
          </Typography>
          <Typography align="justify" style={{ fontSize: "12pt", lineHeight: "normal", margin: "0px 20px 10px 20px", textIndent: "5em", fontFamily: "Times New Roman" }}>
            {`It is expected that you will work diligently, conscientiously, and without reservation for the good of the people and public service.`}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          {/* Spacer */}
        </Grid>
        <Grid item xs={6}>
          <Typography align="center" style={{ fontSize: "14pt", lineHeight: "normal", marginTop: "50px", fontFamily: "Times New Roman" }}>
            <b>{details.mayor}</b>
          </Typography>
          <Typography align="center" style={{ fontSize: "12pt", lineHeight: "normal", fontFamily: "Times New Roman" }}>
            <i>Municipal Mayor</i>
          </Typography>
        </Grid>

        <Grid item xs={12} style={{ marginTop: "10px" }}>
          <Typography align="left" style={{ fontSize: "6pt", lineHeight: "normal", fontFamily: "Times New Roman" }}>
            <b>
              <i>Copy Furnished:</i>
            </b>
          </Typography>
          <Typography align="left" style={{ fontSize: "6pt", lineHeight: "normal", fontFamily: "Times New Roman" }}>
            <i>Office where JO will be assigned</i>
          </Typography>
          <Typography align="left" style={{ fontSize: "6pt", lineHeight: "normal", fontFamily: "Times New Roman" }}>
            <i>Office of the Municipal Budget Officer</i>
          </Typography>
          <Typography align="left" style={{ fontSize: "6pt", lineHeight: "normal", fontFamily: "Times New Roman" }}>
            <i>Office of the Municipal Accountant</i>
          </Typography>
          <Typography align="left" style={{ fontSize: "6pt", lineHeight: "normal", fontFamily: "Times New Roman" }}>
            <i>Office of the Municipal Treasurer</i>
          </Typography>
          <Typography align="left" style={{ fontSize: "6pt", lineHeight: "normal", fontFamily: "Times New Roman" }}>
            <i>Office of the HRMO</i>
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
  let { position, location, rate, expiration, supervisor, super_position, mayor } = details;

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      onExited={() => {
        window.print();
      }}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Finish JO Appointment Certificate
      </DialogTitle>
      <DialogContent dividers>
        <Gtextfield id="position" label="Position" value={position} onChange={changes} />
        <Gtextfield id="location" label="Location" value={location} onChange={changes} />
        <Gtextfield id="rate" label="Rate" value={rate} onChange={changes} />
        <Gtextfield id="expiration" type="date" label="Expiration" value={expiration} onChange={changes} InputLabelProps={{ shrink: true }} />
        <Gtextfield id="supervisor" label="Supervisor" value={supervisor} onChange={changes} />
        <Gtextfield id="super_position" label="Supervisor Position" value={super_position} onChange={changes} />
        <Gtextfield id="mayor" label="Mayor" value={mayor} onChange={changes} />
      </DialogContent>
      <DialogActions>
        <Button disableRipple onClick={handleClose}>
          Print
        </Button>
      </DialogActions>
    </Dialog>
  );
}
