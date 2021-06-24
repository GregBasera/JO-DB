import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, Dialog, DialogContent, Typography, DialogActions, IconButton, Paper, Grid } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { Gtextfield, Gbutton, Gdropdown } from "../shared/FormElements";
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

export default function AddPersonelDialog({ handleClose, open }) {
  const [servHisArray, setServHisArray] = useState([ServHisSet()]);
  const addNewSet = () => {
    setServHisArray([...servHisArray, ServHisSet()]);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle onClose={handleClose}>Add a Personel</DialogTitle>
      <DialogContent dividers>
        <Gtextfield size="small" label="Name" />
        <Gtextfield size="small" label="Sex" />

        <Typography style={{ marginTop: "8px" }}>Service History</Typography>
        <Typography variant="caption" color="textSecondary">
          from lastest to oldest
        </Typography>

        {servHisArray.map((node, index) => (
          <div key={index}>{node}</div>
        ))}

        <Gbutton text="add" onClick={addNewSet} />
        <Gbutton text="remove" onClick={null} />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function ServHisSet() {
  return (
    <Paper variant="outlined" style={{ padding: "8px", paddingLeft: "16px", marginBottom: "8px", borderColor: "black" }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <Gtextfield size="small" label="Designation" />
        </Grid>
        <Grid item xs={12} md={4}>
          <Gtextfield type="number" size="small" label="Rate per Day" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Gtextfield
            type="date"
            size="small"
            label="Employment Period: Start"
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
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Gdropdown label="Office Assignment" />
        </Grid>
        <Grid item xs={12} md={12}>
          <Gtextfield size="small" label="Status / Remarks" />
        </Grid>
      </Grid>
    </Paper>
  );
}
