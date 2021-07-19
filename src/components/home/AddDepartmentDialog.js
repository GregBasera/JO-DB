import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, Dialog, DialogContent, Typography, DialogActions, IconButton } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { Gtextfield } from "../shared/FormElements";
import { addDept } from "./APIcalls";

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

export default function AddDepartmentDialog({ handleClose, open }) {
  const [name, setName] = useState(null);
  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    addDept({ name: name }, null);
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Add an Office
      </DialogTitle>
      <DialogContent dividers>
        <Gtextfield
          value={name}
          onChange={handleChange}
          label="Office name"
          helperText={<Typography variant="caption">Offices added here will become an option on "Office Assignment" fields</Typography>}
        />
      </DialogContent>
      <DialogActions style={{ backgroundColor: "#1589FF" }}>
        <Button onClick={handleSubmit}>Add Office</Button>
      </DialogActions>
    </Dialog>
  );
}
