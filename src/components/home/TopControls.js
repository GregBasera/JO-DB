import React, { useState, useEffect } from "react";
import { Grid, Box } from "@material-ui/core";
import { Gtextfield, Gdropdown, Gbutton } from "../shared/FormElements";
import AddPersonelDialog from "./AddPersonelDialog";
import { getOffices } from "./APIcalls";
import AddIcon from "@material-ui/icons/Add";

export default function TopControls({ append }) {
  const [addPersonelDialog, setAddPersonelDialog] = useState(false);
  const [depts, setDepts] = useState([]);
  useEffect(() => {
    getOffices(setDepts);
    return () => {};
  }, []);

  return (
    <React.Fragment>
      <Grid container spacing={1} style={{ margin: "0px", width: "100vw" }}>
        <Grid item xs={6} md={3}>
          <Gtextfield type="text" label="Search" size="small" />
        </Grid>
        <Grid item xs={6} md={2}>
          <Gdropdown
            label="Status"
            menuItems={[
              { _id: "Male", value: "Male" },
              { _id: "Female", value: "Female" },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Gdropdown label="Office Assignment" menuItems={depts} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box display="flex" flexDirection="row-reverse">
            <Gbutton icon={<AddIcon />} text="Add Personel" color="secondary" onClick={() => setAddPersonelDialog(true)} />
            <Gbutton icon={<AddIcon />} text="Add Department" />
          </Box>
        </Grid>
      </Grid>

      <AddPersonelDialog open={addPersonelDialog} handleClose={() => setAddPersonelDialog(false)} depts={depts} append={append} />
    </React.Fragment>
  );
}
