import React, { useState } from "react";
import { Box, Card, CardContent, Grid, Tab, Tabs, Typography } from "@material-ui/core";
import Login from "./Login";
import Signup from "./Signup";
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

              {tabState === 0 ? <Login /> : <Signup />}
            </CardContent>

            {/* <CardActions>
              <Button variant="contained" fullWidth color="primary">
                {tabState === 0 ? "log-in" : "sign-up"}
              </Button>
            </CardActions> */}
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
}
