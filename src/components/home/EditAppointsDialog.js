import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, Dialog, DialogContent, Typography, DialogActions, IconButton, Grid, Paper } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { getOffices } from "./APIcalls";
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

export default function EditAppointsDialog({ handleClose, open, data }) {
  const [depts, setDepts] = useState([]);
  useEffect(() => {
    getOffices(setDepts);
    return () => {};
  }, []);

  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Edit a Personel's Existing Appointment History
      </DialogTitle>
      <DialogContent dividers>
        <Gtextfield id="name" size="small" label="Name" value={data.name} onChange={null} />
        <Gdropdown
          name="sex"
          label="Sex"
          value={data.sex}
          onChange={null}
          menuItems={[
            { _id: "Male", value: "Male" },
            { _id: "Female", value: "Female" },
          ]}
        />

        <Typography style={{ marginTop: "8px" }}>Service History</Typography>
        <Typography variant="caption" color="textSecondary">
          from lastest to oldest
        </Typography>

        {data.service_history.map((node, index) => (
          <div key={index}>{<ServHisSet depts={depts} data={data} index={index} onChange={null} />}</div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function ServHisSet(props) {
  let { depts, data, index, onChange } = props;

  return (
    <Paper variant="outlined" style={{ padding: "8px", paddingLeft: "16px", marginBottom: "8px", borderColor: "black" }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <Gtextfield size="small" label="Designation" id="designation" value={data.service_history[index].designation ?? ""} onChange={onChange} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Gtextfield type="number" size="small" label="Rate per Day" id="rate_per_day" value={data.service_history[index].rate_per_day ?? ""} onChange={onChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Gtextfield
            type="date"
            size="small"
            label="Employment Period: Start"
            id="ep_start"
            value={data.service_history[index].ep_start ?? ""}
            onChange={onChange}
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
            value={data.service_history[index].ep_end ?? ""}
            onChange={onChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Gdropdown label="Office Assignment" menuItems={depts} name="office_assignment" value={data.service_history[index].office_assignment ?? ""} onChange={onChange} />
        </Grid>
        <Grid item xs={12} md={12}>
          <Gtextfield size="small" label="Status / Remarks" id="status" value={data.service_history[index].status ?? ""} onChange={onChange} />
        </Grid>
      </Grid>
    </Paper>
  );
}
