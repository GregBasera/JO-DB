import React, { useState } from "react";
import moment from "moment";
import { IconButton, Typography, Box, Grid } from "@material-ui/core";
import MoreInfoDialog from "./Dialogs/MoreInfoDialog";
import AddAppointDialog from "./Dialogs/AddAppointDialog";
import EditAppointsDialog from "./Dialogs/EditAppointsDialog";
import DeletePersonelDialog from "./Dialogs/DeletePersonelDialog";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import TokenVerifier from "../shared/TokenVerifier";

function statusNode(value) {
  // separated this for cleaner render function
  switch (value.toLowerCase()) {
    case "new":
    case "re-appointed":
      return (
        <b title="Status" style={{ color: "green" }}>
          {value}
        </b>
      );
    case "resigned":
    case "terminated":
      return (
        <b title="Status" style={{ color: "red" }}>
          {value}
        </b>
      );
    case "promoted":
      return (
        <b title="Status" style={{ color: "orange" }}>
          {value}
        </b>
      );
    default:
      return <b title="Status">{value}</b>;
  }
}

export default function EmployeeList({ data, deleteOne, newHistory, offices, funding }) {
  let { designation, ep_start, ep_end, office_assignment, status } = data.service_history[0];

  const [showMoreOpen, setShowMoreOpen] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  return (
    <React.Fragment>
      <Grid container spacing={1} style={{ backgroundColor: "white", marginBottom: "1px" }}>
        <Grid item xs={3} style={{ borderLeft: "1px lightgray solid" }}>
          <Typography>
            <b>{data.name}</b>
          </Typography>
        </Grid>
        <Grid item xs={2} style={{ borderLeft: "1px lightgray solid" }}>
          <Typography>{designation}</Typography>
        </Grid>
        {/* <Grid item xs={1}>
          <Typography>{rate_per_day}</Typography>
        </Grid> */}
        <Grid item xs={2} style={{ borderLeft: "1px lightgray solid" }}>
          <Typography>{moment(ep_start).format("MMM DD YYYY") + " - " + moment(ep_end).format("MMM DD YYYY")}</Typography>
        </Grid>
        <Grid item xs={3} style={{ borderLeft: "1px lightgray solid" }}>
          <Typography>{office_assignment}</Typography>
        </Grid>
        <Grid item xs={1} style={{ borderLeft: "1px lightgray solid" }}>
          <Typography>{statusNode(status)}</Typography>
        </Grid>
        <Grid item xs={1} style={{ backgroundColor: "skyblue" }}>
          <Box display="flex" flexDirection="row-reverse" style={{ width: "100%" }}>
            <IconButton size="small" title="Delete Personel Record" onClick={() => setDeleteDialog(true)} style={TokenVerifier(2) ? { display: "inline" } : { display: "none" }}>
              <DeleteIcon />
            </IconButton>
            <IconButton size="small" title="Edit Existing Appointments" onClick={() => setEditDialog(true)} style={TokenVerifier(1) ? { display: "inline" } : { display: "none" }}>
              <EditIcon />
            </IconButton>
            <IconButton size="small" title="Add Lastest Appointment" onClick={() => setAddDialog(true)} style={TokenVerifier(1) ? { display: "inline" } : { display: "none" }}>
              <AddIcon />
            </IconButton>
            <IconButton size="small" title="More" onClick={() => setShowMoreOpen(true)}>
              <MoreHorizIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <MoreInfoDialog handleClose={() => setShowMoreOpen(false)} open={showMoreOpen} data={data} />
      <AddAppointDialog handleClose={() => setAddDialog(false)} open={addDialog} data={data} newHistory={newHistory} offices={offices} funding={funding} />
      <EditAppointsDialog handleClose={() => setEditDialog(false)} open={editDialog} data={data} offices={offices} funding={funding} editCallback={newHistory} />
      <DeletePersonelDialog handleClose={() => setDeleteDialog(false)} open={deleteDialog} data={{ name: data.name, id: data._id }} deleteOne={deleteOne} />
    </React.Fragment>
  );
}
