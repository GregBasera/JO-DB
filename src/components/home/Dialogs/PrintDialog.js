import React from "react";
import { Dialog, DialogContent, Button, Typography, Grid } from "@material-ui/core";

export default function PrintDialog({ open, handleClose, data }) {
  const printAppReport = () => {
    localStorage.setItem("forPrinting", JSON.stringify(data));
    localStorage.setItem("auth", sessionStorage.getItem("auth"));
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" href={`${document.location.origin}/JOappreport`} target="_blank" onClick={printAppReport} style={{ margin: "2px" }}>
              Appointment Report
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption">
              The said job orders shall automatically cease upon the expiration as stipulated above, unless renewed. However, services of any or above-named can be terminated prior to the expiration of this job order for lack of funds or when
              the/their services is/are no longer needed. The above-named hereby attest that ...
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Button variant="contained" color="primary" href={`${document.location.origin}/perinforeport`} target="_blank" onClick={printAppReport} style={{ margin: "2px" }}>
              JO Information Report
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption">This is just an Information report on each employee; Basic info, contact number, Identification numbers, etc.</Typography>
          </Grid>

          <Grid item xs={6}>
            <Button variant="contained" color="primary" href={`${document.location.origin}/employcert`} target="_blank" style={{ margin: "2px" }}>
              Employment Certificate
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption">
              This is to certify that Mr./Ms. [requester] is currently employed at the [office/department] in the Municipal Government of Tagkawayan, as [designation] in [status] status. Issued this 13th day of July 2022, at Tagkawayan, Quezon, upon
              the request of [requester] for [reason] purposes.
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Button variant="contained" color="primary" href={`${document.location.origin}/listJoCos`} target="_blank" onClick={printAppReport} style={{ margin: "2px" }}>
              List of Casual/Contractual
            </Button>
            <Button variant="contained" color="primary" href={`${document.location.origin}/listJoCosIMP`} target="_blank" onClick={printAppReport} style={{ margin: "2px" }}>
              Copy to Excel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption">A list of active employees and their number of years in service. Data generated here is meant to be copied to excel and submited to regional office and/or printed</Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
