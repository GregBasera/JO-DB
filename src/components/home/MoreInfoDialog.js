import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { Dialog, DialogContent, Typography, DialogActions, Button, IconButton, Paper, Grid } from "@material-ui/core";
import { Gtextfield } from "../shared/FormElements";
import qs from "qs";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";

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

export default function MoreInfoDialog({ handleClose, open, data }) {
  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {data.name}
      </DialogTitle>
      <DialogContent dividers>
        <Gtextfield readOnly label="Name" value={data.name} />
        <Gtextfield readOnly label="Sex" value={data.sex} />
        <Gtextfield readOnly label="Birthdate" value={data.birthdate} />
        <Gtextfield readOnly label="Birthplace" value={data.birthplace} />
        <Gtextfield readOnly label="Address" value={data.address} />

        <Typography style={{ marginTop: "8px" }}>Service History</Typography>
        {data.service_history.map((elem, index) => (
          <ServHisSet key={index} data={elem} />
        ))}
      </DialogContent>

      <DialogActions style={{ backgroundColor: "#5CB3FF" }}>
        <Button
          variant="contained"
          disableElevation
          href={`${document.location.origin}/employcert?${qs.stringify({
            name: data.name,
            office_assignment: data.service_history[0].office_assignment,
            designation: data.service_history[0].designation,
            status: data.service_history[0].appointment_status,
          })}`}
          target="_blank">
          EMPLOYMENT CERT
        </Button>
        <Button
          variant="contained"
          disableElevation
          href={`${document.location.origin}/servrecord?${qs.stringify({
            name: data.name,
            birthdate: data.birthdate,
            birthplace: data.birthplace,
            address: data.address,
            status: data.service_history[0].appointment_status,
            service_history: data.service_history,
          })}`}
          target="_blank">
          SERVICE RECORD
        </Button>
        <Button variant="contained" disableElevation onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function ServHisSet({ data }) {
  let { designation, rate_per_day, ep_start, ep_end, office_assignment, status, general_function, appointment_status, funding_source } = data;

  return (
    <Paper variant="outlined" style={{ padding: "8px", paddingLeft: "16px", marginBottom: "8px", borderColor: "black" }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <Gtextfield isReadOnly label="Designation" id="designation" defaultValue={designation ?? ""} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Gtextfield readOnly label="Rate per Day" id="rate_per_day" value={rate_per_day ?? ""} />
        </Grid>
        <Grid item xs={12} md={12}>
          <Gtextfield readOnly label="Appointment Status" value={appointment_status} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Gtextfield readOnly label="Employment Period: Start" id="ep_start" value={moment(ep_start).format("MMM DD, YYYY") ?? ""} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Gtextfield readOnly label="Employment Period: End" id="ep_end" value={moment(ep_end).format("MMM DD, YYYY") ?? ""} />
        </Grid>
        <Grid item xs={12} md={12}>
          <Gtextfield readOnly label="Office Assignment" id="office_assignment" value={office_assignment ?? ""} />
        </Grid>
        <Grid item xs={12} md={12}>
          <Gtextfield readOnly label="General Function" id="general_function" value={general_function ?? ""} />
        </Grid>
        <Grid item xs={12} md={12}>
          <Gtextfield readOnly label="Status / Remarks" id="status" value={status ?? ""} />
        </Grid>
        <Grid item xs={12} md={12}>
          <Gtextfield readOnly label="Funding Source" id="funding_source" value={funding_source ?? ""} />
        </Grid>
      </Grid>
    </Paper>
  );
}
