import React, { useState } from "react";
import { Box, Button, Card, CardActions, CardContent, Grid, Tab, Tabs, Typography } from "@material-ui/core";
import { Gtextfield } from "../FormElements";
import tkLogo from "../../../src/logo lgu new 12x12 inches 300px.png";

export default function Auth() {
  const [tabState, setTabState] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabState(newValue);
  };

  return (
    <Grid container spacing={0}>
      {/* decoration: logo */}
      <Grid item md={8} sm={12} style={{ height: "100vh", backgroundColor: "#004e80" }}>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" style={{ height: "100vh" }}>
          <img src={tkLogo} alt="Tagkawayan Logo" style={{ height: "250px" }} />

          <Typography variant="h3" style={{ color: "white" }}>
            <b>LGU-Tagkawayan </b>
          </Typography>
          <Typography variant="h3" style={{ color: "white" }}>
            <b>Job Order Personel Database </b>
          </Typography>
        </Box>
      </Grid>

      {/* loging form */}
      <Grid item md={4} sm={12} style={{ height: "100vh", backgroundColor: "#eeeeee" }}>
        <Box display="flex" justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
          <Card elevation={2} style={{ width: "350px" }}>
            {/* <CardHeader title="Login / Signup" /> */}
            <CardContent>
              <Tabs value={tabState} onChange={handleTabChange} indicatorColor="primary" textColor="primary" centered>
                <Tab label="Log-In" />
                <Tab label="Sign-Up" />
              </Tabs>

              <div>
                <TabPanel index={tabState} />
              </div>
            </CardContent>

            <CardActions>
              <Button variant="contained" fullWidth color="primary">
                {tabState === 0 ? "log-in" : "sign-up"}
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
}

function TabPanel(props) {
  const { index } = props;

  switch (index) {
    case 0:
      return (
        <div>
          <Gtextfield label="Username or E-mail" />
          <Gtextfield type="password" label="Password" />
        </div>
      );
    case 1:
      return (
        <div>
          <Gtextfield type="text" label="Username" />
          <Gtextfield type="email" label="E-mail" />
          <Gtextfield type="password" label="Password" />
          <Gtextfield type="password" label="Confirm Password" />
        </div>
      );
    default:
      return;
  }
}
