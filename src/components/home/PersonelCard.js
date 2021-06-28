import React, { useState } from "react";
import moment from "moment";
import { Card, CardContent, CardActions, Button, Typography, ListItem, ListItemText, Divider, List } from "@material-ui/core";
import MoreInfoDialog from "./MoreInfoDialog";

function statusNode(value) {
  // separated this for cleaner render function
  switch (value.toLowerCase()) {
    case "active":
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
    default:
      return <b title="Status">{value}</b>;
  }
}

export default function PersonelCard({ data }) {
  let { designation, rate_per_day, ep_start, ep_end, office_assignment, status } = data.service_history[0];

  const [showMoreOpen, setShowMoreOpen] = useState(false);

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
          <ListItem key={data._id + "sex"} alignItems="flex-start" disableGutters>
            <ListItemText primary={<Typography title="Sex">{data.sex}</Typography>} />
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
        <Button size="small" onClick={() => setShowMoreOpen(true)}>
          Show More
        </Button>
      </CardActions>

      <MoreInfoDialog handleClose={() => setShowMoreOpen(false)} open={showMoreOpen} data={data} />
    </Card>
  );
}
