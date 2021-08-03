import React, { useState, useEffect } from "react";
import { Grid, Box, IconButton } from "@material-ui/core";
import { Gtextfield, Gdropdown, Gbutton } from "../shared/FormElements";
import AddPersonelDialog from "./AddPersonelDialog";
import AddDepartmentDialog from "./AddDepartmentDialog";
import { getOffices, getFundSources, search, filter } from "./APIcalls";
import AddIcon from "@material-ui/icons/Add";
import PrintIcon from "@material-ui/icons/Print";
import TokenVerifier from "../shared/TokenVerifier";

export default function TopControls({ append, setData, data }) {
  const [addPersonelDialog, setAddPersonelDialog] = useState(false);
  const [addDepartmentDialog, setAddDepartmentDialog] = useState(false);
  const [addFundingDialog, setFundingDialog] = useState(false);
  // const [print, setPrint] = useState(false);
  const [depts, setDepts] = useState([]);
  const [fundSources, setFundSources] = useState([]);
  useEffect(() => {
    getOffices(setDepts);
    getFundSources(setFundSources);
    return () => {};
  }, []);

  const [offAssign, setOffAssign] = useState(null);
  const handleOAchange = (e) => {
    setOffAssign(e.target.value);
    filter(["office_assignment", e.target.value], setData);
  };

  const [searchTerm, setSearchTerm] = useState(null);
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      search(searchTerm, setData);
    }
    setSearchTerm(e.target.value);
  };

  const printAppReport = () => {
    localStorage.setItem("forPrinting", JSON.stringify(data));
  };

  return (
    <React.Fragment>
      <Grid container spacing={1} style={{ margin: "0px", width: "100vw" }}>
        <Grid item xs={6} md={3}>
          <Gtextfield type="text" label="Search a Name" value={searchTerm ?? ""} onChange={handleSearch} onKeyDown={handleSearch} />
        </Grid>
        <Grid item xs={6} md={3}>
          <Gdropdown name="office_assignment" label="Office Assignment" menuItems={depts} value={offAssign ?? ""} onChange={handleOAchange} allOpt />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="row-reverse">
            <Box display={TokenVerifier(1) ? "block" : "none"}>
              <Gbutton icon={<AddIcon />} size="medium" text="Personel" color="secondary" onClick={() => setAddPersonelDialog(true)} />
            </Box>
            <Box display={TokenVerifier(2) ? "block" : "none"}>
              <Gbutton icon={<AddIcon />} size="medium" text="Office" onClick={() => setAddDepartmentDialog(true)} />
            </Box>
            <Box display={TokenVerifier(2) ? "block" : "none"}>
              <Gbutton icon={<AddIcon />} size="medium" text="Funding" onClick={() => setFundingDialog(true)} />
            </Box>
            <IconButton
              title="Print Appointment Report"
              href={`${document.location.origin}/JOappreport`}
              target="_blank"
              onClick={printAppReport}
              style={TokenVerifier(1) ? { display: "block" } : { display: "none" }}>
              <PrintIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <AddPersonelDialog open={addPersonelDialog} handleClose={() => setAddPersonelDialog(false)} depts={depts} fundSources={fundSources} append={append} />
      <AddDepartmentDialog open={addDepartmentDialog} handleClose={() => setAddDepartmentDialog(false)} mode="offices" />
      <AddDepartmentDialog open={addFundingDialog} handleClose={() => setFundingDialog(false)} mode="funding" />
    </React.Fragment>
  );
}
