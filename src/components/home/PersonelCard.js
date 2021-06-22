import React from "react";
import { Card, CardContent, CardActions, CardHeader, Button, Typography, ListItem, ListItemText, Divider, List } from "@material-ui/core";

export default function PersonelCard({ data }) {
  return (
    <Card>
      <CardContent>
        <List dense disablePadding>
          <ListItem key={data._id} alignItems="flex-start" disableGutters>
            <ListItemText
              primary={
                <Typography align="right" variant="h5">
                  <b>{data.name}</b>
                </Typography>
              }
            />
          </ListItem>
          <Divider component="li" />
          <ListItem key={data._id} alignItems="flex-start" disableGutters>
            <ListItemText primary={<Typography>{data.sex}</Typography>} />
          </ListItem>
          <Divider component="li" />
          <ListItem key={data._id} alignItems="flex-start" disableGutters>
            <ListItemText primary={<Typography>{data.service_history.history[0].designation}</Typography>} />
          </ListItem>
          <Divider component="li" />
          <ListItem key={data._id} alignItems="flex-start" disableGutters>
            <ListItemText primary={<Typography>{data.service_history.history[0].rate_per_day}</Typography>} />
          </ListItem>
          <Divider component="li" />
          <ListItem key={data._id} alignItems="flex-start" disableGutters>
            <ListItemText primary={<Typography>{data.service_history.history[0].employment_period}</Typography>} />
          </ListItem>
          <Divider component="li" />
          <ListItem key={data._id} alignItems="flex-start" disableGutters>
            <ListItemText primary={<Typography>{data.service_history.history[0].office_assignment}</Typography>} />
          </ListItem>
          <Divider component="li" />
          <ListItem key={data._id} alignItems="flex-start" disableGutters>
            <ListItemText primary={<Typography>{data.service_history.history[0].status}</Typography>} />
          </ListItem>
          {/* <Divider component="li" />   */}
        </List>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
