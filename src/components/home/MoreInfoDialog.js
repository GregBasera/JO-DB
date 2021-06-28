import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { Dialog, DialogContent, Typography, DialogActions, Button, IconButton, Paper, Grid } from "@material-ui/core";
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

export default function MoreInfoDialog({ handleClose, open, data }) {
  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {data.name}
      </DialogTitle>
      <DialogContent dividers>
        <Gtextfield label="Name" value={data.name} />
        <Gtextfield label="Sex" value={data.sex} />

        <Typography style={{ marginTop: "8px" }}>Service History</Typography>
        <Typography variant="caption" color="textSecondary">
          from lastest to oldest
        </Typography>
        {data.service_history.map((elem) => (
          <ServHisSet data={elem} />
        ))}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function ServHisSet(props) {
  let { designation, rate_per_day, ep_start, ep_end, office_assignment, status } = props.data;

  return (
    <Paper variant="outlined" style={{ padding: "8px", paddingLeft: "16px", marginBottom: "8px", borderColor: "black" }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <Gtextfield size="small" label="Designation" id="designation" value={designation ?? ""} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Gtextfield type="number" size="small" label="Rate per Day" id="rate_per_day" value={rate_per_day ?? ""} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Gtextfield
            type="date"
            size="small"
            label="Employment Period: Start"
            id="ep_start"
            value={ep_start ?? ""}
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
            value={ep_end ?? ""}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Gtextfield label="Office Assignment" id="office_assignment" value={office_assignment ?? ""} />
        </Grid>
        <Grid item xs={12} md={12}>
          <Gtextfield size="small" label="Status / Remarks" id="status" value={status ?? ""} />
        </Grid>
      </Grid>
    </Paper>
  );
}
