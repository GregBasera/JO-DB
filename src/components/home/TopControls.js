import React, { useState, useEffect } from "react";
import { Grid, Box } from "@material-ui/core";
import { Gtextfield, Gdropdown, Gbutton } from "../shared/FormElements";
import AddPersonelDialog from "./AddPersonelDialog";
import { getOffices, search, filter } from "./APIcalls";
import AddIcon from "@material-ui/icons/Add";

export default function TopControls({ append, setData }) {
  const [addPersonelDialog, setAddPersonelDialog] = useState(false);
  const [depts, setDepts] = useState([]);
  useEffect(() => {
    getOffices(setDepts);
    return () => {};
  }, []);

  const [offAssign, setOffAssign] = useState(null);
  const handleOAchange = (e) => {
    filter();
    setOffAssign(e.target.value);
  };

  const [searchTerm, setSearchTerm] = useState(null);
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      search(searchTerm, setData);
    }
    setSearchTerm(e.target.value);
  };

  return (
    <React.Fragment>
      <Grid container spacing={1} style={{ margin: "0px", width: "100vw" }}>
        <Grid item xs={6} md={3}>
          <Gtextfield type="text" label="Search a Name" value={searchTerm ?? ""} onChange={handleSearch} onKeyDown={handleSearch} />
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
          <Gdropdown name="office_assignment" label="Office Assignment" menuItems={depts} value={offAssign ?? ""} onChange={handleOAchange} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box display="flex" flexDirection="row-reverse">
            <Gbutton icon={<AddIcon />} size="medium" text="Add Personel" color="secondary" onClick={() => setAddPersonelDialog(true)} />
            <Gbutton icon={<AddIcon />} size="medium" text="Add Department" />
          </Box>
        </Grid>
      </Grid>

      <AddPersonelDialog open={addPersonelDialog} handleClose={() => setAddPersonelDialog(false)} depts={depts} append={append} />
    </React.Fragment>
  );
}
