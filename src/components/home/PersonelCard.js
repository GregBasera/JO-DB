import React, { useState } from "react";
import moment from "moment";
import { Card, CardContent, CardActions, IconButton, Typography, ListItem, ListItemText, Divider, List, Box } from "@material-ui/core";
import MoreInfoDialog from "./MoreInfoDialog";
import { Gbutton } from "../shared/FormElements";
import AddAppointDialog from "./AddAppointDialog";
import EditAppointsDialog from "./EditAppointsDialog";
import DeletePersonelDialog from "./DeletePersonelDialog";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
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

export default function PersonelCard({ data, deleteOne, newHistory, offices, funding }) {
  let { designation, rate_per_day, ep_start, ep_end, office_assignment, status } = data.service_history[0];

  const [showMoreOpen, setShowMoreOpen] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  return (
    <Card>
      <CardContent>
        <List dense disablePadding>
          <ListItem key={data._id} alignItems="flex-start" disableGutters>
            <ListItemText
              primary={
                <Typography variant="h5">
                  <b>{data.name}</b>
                </Typography>
              }
            />
          </ListItem>
          <Divider component="li" />
          <ListItem key={data._id + "designation"} alignItems="flex-start" disableGutters>
            <ListItemText primary={<Typography title="Designation">{designation}</Typography>} />
          </ListItem>
          <Divider component="li" />
          <ListItem key={data._id + "rate_per_day"} alignItems="flex-start" disableGutters>
            <ListItemText primary={<Typography title="Rate per day">{rate_per_day}</Typography>} />
          </ListItem>
          <Divider component="li" />
          <ListItem key={data._id + "employment_period"} alignItems="flex-start" disableGutters>
            <ListItemText primary={<Typography title="Employment Period">{moment(ep_start).format("MMM DD, YYYY") + " to " + moment(ep_end).format("MMM DD, YYYY")}</Typography>} />
          </ListItem>
          <Divider component="li" />
          <ListItem key={data._id + "office_assignment"} alignItems="flex-start" disableGutters>
            <ListItemText primary={<Typography title="Office Assignment">{office_assignment}</Typography>} />
          </ListItem>
          <Divider component="li" />
          <ListItem key={data._id + "status"} alignItems="flex-start" disableGutters>
            <ListItemText primary={<Typography>{statusNode(status)}</Typography>} />
          </ListItem>
        </List>
      </CardContent>
      <CardActions>
        <Gbutton text="More" onClick={() => setShowMoreOpen(true)} />

        <Box display="flex" flexDirection="row-reverse" style={{ width: "100%" }}>
          <IconButton size="small" title="Delete Personel Record" onClick={() => setDeleteDialog(true)} style={TokenVerifier(2) ? { display: "block" } : { display: "none" }}>
            <DeleteIcon />
          </IconButton>
          <IconButton size="small" title="Edit Existing Appointments" onClick={() => setEditDialog(true)} style={TokenVerifier(1) ? { display: "block" } : { display: "none" }}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" title="Add Lastest Appointment" onClick={() => setAddDialog(true)} style={TokenVerifier(1) ? { display: "block" } : { display: "none" }}>
            <AddIcon />
          </IconButton>
        </Box>
      </CardActions>

      <MoreInfoDialog handleClose={() => setShowMoreOpen(false)} open={showMoreOpen} data={data} />
      <AddAppointDialog handleClose={() => setAddDialog(false)} open={addDialog} data={data} newHistory={newHistory} offices={offices} funding={funding} />
      <EditAppointsDialog handleClose={() => setEditDialog(false)} open={editDialog} data={data} offices={offices} funding={funding} />
      <DeletePersonelDialog handleClose={() => setDeleteDialog(false)} open={deleteDialog} data={{ name: data.name, id: data._id }} deleteOne={deleteOne} />
    </Card>
  );
}
