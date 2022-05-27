import React from "react";
import { Dialog, DialogContent, Button } from "@material-ui/core";

export default function PrintDialog({ open, handleClose, data }) {
  const printAppReport = () => {
    localStorage.setItem("forPrinting", JSON.stringify(data));
    localStorage.setItem("auth", sessionStorage.getItem("auth"));
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogContent dividers>
        <Button variant="contained" color="primary" href={`${document.location.origin}/JOappreport`} target="_blank" onClick={printAppReport} style={{ margin: "2px" }}>
          Print Appointment Report
        </Button>
        <Button variant="contained" color="primary" href={`${document.location.origin}/perinforeport`} target="_blank" onClick={printAppReport} style={{ margin: "2px" }}>
          Print JO Information Report
        </Button>

        <Button variant="contained" color="primary" href={`${document.location.origin}/employcert`} target="_blank" style={{ margin: "2px" }}>
          Print EMPLOYMENT CERTificate
        </Button>
      </DialogContent>
    </Dialog>
  );
}
