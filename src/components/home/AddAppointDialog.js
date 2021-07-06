import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, Dialog, DialogContent, Typography, DialogActions, IconButton, Grid } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { getOffices, pushNewAppoint } from "./APIcalls";
import { Gtextfield, Gdropdown } from "../shared/FormElements";
import CloseIcon from "@material-ui/icons/Close";

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

export default function AddAppointDialog({ handleClose, open, data, newHistory }) {
  const [offices, setOffices] = useState(null);
  useEffect(() => {
    getOffices(setOffices);
    return () => {};
  }, []);

  const [newAppoint, setNewAppoint] = useState({
    service_history: [{}],
  });
  const handleChanges = (e) => {
    setNewAppoint({
      service_history: [{ ...newAppoint.service_history[0], [e.target.id ?? e.target.name]: e.target.id === "rate_per_day" ? parseInt(e.target.value) : e.target.value }],
    });
  };

  const onSubmit = () => {
    pushNewAppoint(data._id, { ...data, service_history: [...newAppoint.service_history, ...data.service_history] }, newHistory);
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Add to Personel's Appointment History
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>{`Name: ${data.name.toUpperCase()}`}</Typography>
        <Typography gutterBottom>{`Sex: ${data.sex.toUpperCase()}`}</Typography>

        <Typography variant="caption" color="textSecondary">
          New Appointment
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} md={8}>
            <Gtextfield size="small" label="Designation" id="designation" value={newAppoint.service_history[0].designation ?? ""} onChange={handleChanges} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Gtextfield type="number" size="small" label="Rate per Day" id="rate_per_day" value={newAppoint.service_history[0].rate_per_day ?? ""} onChange={handleChanges} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Gtextfield
              type="date"
              size="small"
              label="Employment Period: Start"
              id="ep_start"
              value={newAppoint.service_history[0].ep_start ?? ""}
              onChange={handleChanges}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Gtextfield
              type="date"
              size="small"
              label="Employment Period: End"
              id="ep_end"
              value={newAppoint.service_history[0].ep_end ?? ""}
              onChange={handleChanges}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Gdropdown
              label="Office Assignment"
              menuItems={offices}
              name="office_assignment"
              value={newAppoint.service_history[0].office_assignment ?? ""}
              onChange={handleChanges}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Gtextfield size="small" label="Status / Remarks" id="status" value={newAppoint.service_history[0].status ?? ""} onChange={handleChanges} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onSubmit} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
