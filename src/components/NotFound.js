import React from "react";
import { Box, Button, Card, CardActions, CardContent, Typography } from "@material-ui/core";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";

export default function NotFound() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
      <Card elevation="0">
        <CardContent>
          <Typography variant="h1" gutterBottom>
            Error: 404
          </Typography>
          <Typography variant="h4" gutterBottom>
            Page not Found
          </Typography>
        </CardContent>
        <CardActions>
          <Button color="secondary" startIcon={<KeyboardReturnIcon />}>
            go back
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
