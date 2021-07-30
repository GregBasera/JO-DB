import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, Dialog, DialogContent, Typography, DialogActions, IconButton } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { Gtextfield } from "../shared/FormElements";
import { addDept, addFund } from "./APIcalls";

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

export default function AddDepartmentDialog({ handleClose, open, mode }) {
  const [name, setName] = useState(null);
  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    if (mode === "offices") addDept({ name: name }, null);
    else addFund({ name: name }, null);
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {mode === "offices" ? "Add an Office" : "Add a Funding Source"}
      </DialogTitle>
      <DialogContent dividers>
        <Gtextfield
          value={name}
          onChange={handleChange}
          label={mode === "offices" ? "Office name" : "Fund Source name"}
          helperText={
            <Typography variant="caption">{`${mode === "offices" ? "Offices" : "Funding Sources"} added here will become an option on ${
              mode === "offices" ? "Office Assignment" : "Funding Sources"
            } fields`}</Typography>
          }
        />
      </DialogContent>
      <DialogActions style={{ backgroundColor: "#1589FF" }}>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
