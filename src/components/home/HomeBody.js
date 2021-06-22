import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import TopControls from "./TopControls";
import PersonelCard from "./PersonelCard";
import { initialize } from "./APIcalls";

export default function HomeBody() {
  const [data, setData] = useState([]);
  useEffect(() => {
    initialize(setData);
    return () => {};
  }, []);

  return (
    <React.Fragment>
      <TopControls />

      <Grid container spacing={1} style={{ marginTop: "8px", width: "100vw" }}>
        {data.map((personel) => (
          <Grid item xs={12} md={2}>
            <PersonelCard data={personel} />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}
