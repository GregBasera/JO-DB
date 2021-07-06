import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
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

  const popOneOut = (id) => {
    let mutable = data;
    mutable.splice(mutable.map((q) => q._id).indexOf(id), 1);
    setData([...mutable]); // "setData(mutable)" doesnt work, youll need to deconstruct it :(
  };

  const addNewAppoint = (id, newdata) => {
    let mutable = data;
    mutable.splice(mutable.map((q) => q._id).indexOf(id), 1, newdata);
    setData([...mutable]);
  };

  return (
    <div style={{ width: "100vw" }}>
      <TopControls append={appendData} setData={setData} />

      <Grid container spacing={1} style={{ margin: "0px", width: "100vw", backgroundColor: "#eeeeee" }}>
        {data.length !== 0 ? (
          data.map((personel) => (
            <Grid key={personel._id} item xs={12} md={2}>
              <PersonelCard data={personel} deleteOne={popOneOut} newHistory={addNewAppoint} />
            </Grid>
          ))
        ) : (
          <Typography>No data found</Typography>
        )}
      </Grid>
    </div>
  );
}
