import React, { useState, useEffect } from "react";
import { Grid, Box, IconButton, Popover, Button, ButtonGroup } from "@material-ui/core";
import { Gtextfield, Gdropdown, Gbutton } from "../shared/FormElements";
import AddPersonelDialog from "./AddPersonelDialog";
import AddDepartmentDialog from "./AddDepartmentDialog";
import { getOffices, getFundSources, search, filter } from "./APIcalls";
import AddIcon from "@material-ui/icons/Add";
import PrintIcon from "@material-ui/icons/Print";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";
import TokenVerifier from "../shared/TokenVerifier";

export default function TopControls({ append, setData, data, sort, isDesc }) {
  const [addPersonelDialog, setAddPersonelDialog] = useState(false);
  const [addDepartmentDialog, setAddDepartmentDialog] = useState(false);
  const [addFundingDialog, setFundingDialog] = useState(false);
  // const [print, setPrint] = useState(false);
  const [depts, setDepts] = useState([]);
  const [fundSources, setFundSources] = useState([]);
  useEffect(() => {
    getOffices(setDepts);
  }, []);
  useEffect(() => {
    getFundSources(setFundSources);
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

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <React.Fragment>
      <Grid container spacing={1} style={{ margin: "0px" }}>
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
            <IconButton onClick={handleClick} style={TokenVerifier(1) ? { display: "block" } : { display: "none" }}>
              <PrintIcon />
            </IconButton>

            <IconButton onClick={() => sort(!isDesc)} color={isDesc ? "secondary" : "inherit"}>
              <SortByAlphaIcon />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              elevation={2}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}>
              <ButtonGroup>
                <Button href={`${document.location.origin}/JOappreport`} target="_blank" onClick={printAppReport}>
                  Appointment Report
                </Button>
                <Button href={`${document.location.origin}/perinforeport`} target="_blank" onClick={printAppReport}>
                  JO Information Report
                </Button>
              </ButtonGroup>
            </Popover>
          </Box>
        </Grid>
      </Grid>

      <AddPersonelDialog open={addPersonelDialog} handleClose={() => setAddPersonelDialog(false)} depts={depts} fundSources={fundSources} append={append} />
      <AddDepartmentDialog open={addDepartmentDialog} handleClose={() => setAddDepartmentDialog(false)} mode="offices" />
      <AddDepartmentDialog open={addFundingDialog} handleClose={() => setFundingDialog(false)} mode="funding" />
    </React.Fragment>
  );
}
