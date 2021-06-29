import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import TopControls from "./TopControls";
import PersonelCard from "./PersonelCard";
import { initialize } from "./APIcalls";
import { Typography } from "@material-ui/core";

export default function HomeBody() {
  const [data, setData] = useState([]);
  useEffect(() => {
    initialize(setData);
    return () => {};
  }, []);

  const appendData = (newElem) => {
    setData([...data, newElem]);
  };

  return (
    <div style={{ width: "100vw" }}>
      <TopControls append={appendData} setData={setData} />

      <Grid container spacing={1} style={{ margin: "0px", width: "100vw", backgroundColor: "#eeeeee" }}>
        {data.length !== 0 ? (
          data.map((personel) => (
            <Grid key={personel._id} item xs={12} md={2}>
              <PersonelCard data={personel} />
            </Grid>
          ))
        ) : (
          <Typography>No data found</Typography>
        )}
      </Grid>
    </div>
  );
}
