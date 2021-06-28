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

  const appendData = (newElem) => {
    setData([...data, newElem]);
  };

  return (
    <div style={{ width: "100vw" }}>
      <TopControls append={appendData} />

      <Grid container spacing={1} style={{ margin: "0px", width: "100vw", backgroundColor: "#eeeeee" }}>
        {data.map((personel) => (
          <Grid key={personel._id} item xs={12} md={2}>
            <PersonelCard data={personel} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
