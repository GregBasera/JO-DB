import React, { useState, useEffect } from "react";
import { Grid, Typography, CircularProgress } from "@material-ui/core";
import TopControls from "./TopControls";
import PersonelCard from "./PersonelCard";
import { initialize, onRecord, getOffices, getFundSources } from "./APIcalls";

export default function HomeBody() {
  const [data, setData] = useState([]);
  const [onRecordState, setonRecordState] = useState(null);
  const [offices, setOffices] = useState(null);
  const [funding, setFunding] = useState(null);
  useEffect(() => {
    initialize(setData);
    getOffices(setOffices);
    getFundSources(setFunding);
    onRecord(setonRecordState);
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
      <TopControls append={appendData} setData={setData} data={data} />

      <Grid container spacing={1} style={{ margin: "0px", width: "100vw", backgroundColor: "#eeeeee" }}>
        {data.length !== 0 ? (
          data.map((personel) => (
            <Grid key={personel._id} item xs={12} md={2}>
              <PersonelCard data={personel} deleteOne={popOneOut} newHistory={addNewAppoint} offices={offices} funding={funding} />
            </Grid>
          ))
        ) : (
          <Typography>
            <CircularProgress />
          </Typography>
        )}
      </Grid>

      <Typography>
        <i>{`Showing ${data.length} of ${onRecordState} personnel on record`}</i>
      </Typography>
    </div>
  );
}
