import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, Dialog, DialogContent, Typography, DialogActions, IconButton } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { deletePersonel } from "./APIcalls";
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

export default function DeletePersonelDialog({ handleClose, open, data, deleteOne }) {
  const handleDelete = () => {
    deletePersonel(data.id, deleteOne);
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Delete a Personnel's Records
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>{`You are about to delete ${data.name.toUpperCase()} from the database.`}</Typography>
        <Typography gutterBottom color="secondary" align="center">
          This can not be undone.
        </Typography>
      </DialogContent>
      <DialogActions style={{ backgroundColor: "#F75D59" }}>
        <Button onClick={handleDelete}>Delete Personnel</Button>
      </DialogActions>
    </Dialog>
  );
}
