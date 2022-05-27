import React, { useState, useEffect } from "react";
import { Grid, Typography, CircularProgress, List, ListItem } from "@material-ui/core";
import TopControls from "./TopControls";
// import PersonelCard from "./PersonelCard";
import { initialize, onRecord, getOffices, getFundSources } from "./APIcalls";
import EmployeeList from "./EmployeeList";

export default function HomeBody() {
  const [data, setData] = useState([]);
  const [onRecordState, setonRecordState] = useState(null);
  const [offices, setOffices] = useState(null);
  const [funding, setFunding] = useState(null);
  const [isDesc, setIsDesc] = useState(false);
  useEffect(() => {
    initialize(isDesc ? "desc" : "asc", setData);
    getOffices(setOffices);
    getFundSources(setFunding);
    onRecord(setonRecordState);
  }, [isDesc]);

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
    <React.Fragment>
      <TopControls append={appendData} setData={setData} data={data} sort={setIsDesc} isDesc={isDesc} />

      <Grid container spacing={1} style={{ backgroundColor: "#eeeeee", marginBottom: "1px" }}>
        <Grid item xs={3}>
          <Typography align="center">Employee Name</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography align="center">Position</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography align="center">Lastest Appoint</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography align="center">Office/Department</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography align="center">Status</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography align="center">Actions</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={1} style={{ padding: "0px", backgroundColor: "#eeeeee" }}>
        {data.length !== 0 ? (
          <List dense={true} disablePadding={true} style={{ width: "100%" }}>
            {data.map((personel) => (
              <ListItem>
                <EmployeeList data={personel} deleteOne={popOneOut} newHistory={addNewAppoint} offices={offices} funding={funding} />
              </ListItem>
            ))}
            {/* <Grid key={personel._id} item xs={12} md={2}>
              <PersonelCard data={personel} deleteOne={popOneOut} newHistory={addNewAppoint} offices={offices} funding={funding} />
            </Grid> */}
          </List>
        ) : (
          <Typography>
            <CircularProgress />
          </Typography>
        )}
      </Grid>

      <Typography>
        <i>{`Showing ${data.length} of ${onRecordState} personnel on record`}</i>
      </Typography>
    </React.Fragment>
  );
}
