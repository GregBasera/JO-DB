import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Dialog, DialogContent, Typography, DialogActions, Button, IconButton, Grid } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { Gdropdown, Gtextfield } from "../shared/FormElements";
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

export default function PrintReport({ open, handleClose, data }) {
  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Print Report
      </DialogTitle>
      <DialogContent dividers>
        {/* <Alert severity="warning">This is an error alert — check it out!</Alert> */}
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Gdropdown name="office_assignment" label="Office Assignment" menuItems={[]} />
          </Grid>
          <Grid item xs={6}>
            <Gtextfield
              type="date"
              id="ep_start"
              label="Employment Period: Start"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Gtextfield
              type="date"
              id="ep_end"
              label="Employment Period: End"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Save changes</Button>
      </DialogActions>
    </Dialog>
  );
}
