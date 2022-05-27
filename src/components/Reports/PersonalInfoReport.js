import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import HRdocHeader from "./HRdocHeader";
import { Grid, Table, TableHead, TableRow, TableBody, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";
import { Gtextfield, Gdropdown } from "../shared/FormElements";
import moment from "moment";
import { getOffices } from "../home/APIcalls";
import { empStatus } from "../shared/sharedVariables";

const TableCell = withStyles({
  root: {
    fontSize: "10pt",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
    padding: "0px",
  },
})(MuiTableCell);

export default function PersonalInfoReport() {
  const [offices, setOffices] = useState([]);
  const [open, setOpen] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [officeFilter, setOfficeFilter] = useState("");
  const [data, setData] = useState(null);
  const [males, setMales] = useState(null);
  const [females, setFemales] = useState(null);
  const [dateRange, setDateRange] = useState({
    from: "",
    to: "",
  });

  const settingStatus = (e) => {
    setStatusFilter(e.target.value);
  };
  const settingOffice = (e) => {
    setOfficeFilter(e.target.value);
  };
  const dateRangeChanges = (e) => {
    setDateRange({ ...dateRange, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    // Change tab title
    document.title = `PersonalInfoReport_${moment().format("YY-MM-DD-Hms")}`;
    // get offices for filtering
    getOffices(setOffices);
    // get all employees from localstorage
    let temp = JSON.parse(localStorage.getItem("forPrinting"));
    // counter for sexes
    let males = 0;
    let females = 0;

    // filter raw data from localstorage againts daterange provided by users
    let dateRangeFiltered = temp.filter(
      (e) => moment(e.service_history[0].ep_start).isSameOrAfter(dateRange.from) && moment(e.service_history[0].ep_end).isSameOrBefore(dateRange.to)
    );
    // filter again against status from user; if undefined; dont
    let statusFiltered = statusFilter !== "" ? dateRangeFiltered.filter((e) => e.service_history[0].status === statusFilter) : dateRangeFiltered;
    // filter again against office from user; if undefined; dont
    let officeFiltered = officeFilter !== "" ? statusFiltered.filter((e) => e.service_history[0].office_assignment === officeFilter) : statusFiltered;

    // sort alphabetically by name
    let sorted = officeFiltered.sort((a, b) => {
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if (x < y) return -1;
      if (x > y) return 1;
      return 0;
    });

    // count male and female
    sorted.forEach((personnel, index) => {
      personnel.sex === "Male" ? males++ : females++;
    });

    // return data to respective states
    setData(sorted);
    setMales(males);
    setFemales(females);
  }, [dateRange, statusFilter, officeFilter]);

  return (
    <React.Fragment>
      <FinishingDetails
        open={open}
        handleClose={() => setOpen(false)}
        dateRange={dateRange}
        changes={dateRangeChanges}
        statusFilter={statusFilter}
        setStatusFilter={settingStatus}
        offices={offices}
        officeFilter={officeFilter}
        setOfficeFilter={settingOffice}
      />
      <HRdocHeader paperSize="long" />

      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography align="center" variant="h5" style={{ margin: "20px 0px 0px 0px" }}>
            <b>{`PERSONAL INFO REPORT ${moment(dateRange.to).format("YYYY")}`}</b>
          </Typography>
          <Typography align="center">
            <b>{`${statusFilter ? (statusFilter + " Employees").toUpperCase() : ""} ${officeFilter}`}</b>
          </Typography>
          <Typography align="center" style={{ fontSize: "13pt", color: "red", margin: "0px 0px 20px 0px" }}>
            <b>{`(${moment(dateRange.from).format("MMMM")} - ${moment(dateRange.to).format("MMMM")})`}</b>
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={0} style={{ display: "block" }}>
        <Grid item xs={12} style={{ padding: "0px 10px 0px 10px" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">No.</TableCell>
                <TableCell align="center">Name of Job Order Personnel</TableCell>
                <TableCell align="center">Sex</TableCell>
                <TableCell align="center">Birthdate</TableCell>
                <TableCell align="center">Birthplace</TableCell>
                <TableCell align="center">Contact No.</TableCell>
                <TableCell align="center">Address</TableCell>
                <TableCell align="center">TIN No.</TableCell>
                <TableCell align="center">PHILHEALTH No.</TableCell>
                <TableCell align="center">PAG-IBIG No.</TableCell>
                <TableCell align="center">SSS No.</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(data ?? []).map((q, index) => {
                return (
                  <TableRow key={q._id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="left">{q.name}</TableCell>
                    <TableCell align="center">{q.sex.substring(0, 1)}</TableCell>
                    <TableCell align="center">{moment(q.birthdate).format("MMM DD, YYYY")}</TableCell>
                    <TableCell align="center">{q.birthplace}</TableCell>
                    <TableCell align="center">{q.contact_no}</TableCell>
                    <TableCell align="center">{q.address}</TableCell>
                    <TableCell align="center">{q.tin_num}</TableCell>
                    <TableCell align="center">{q.philhealth_num}</TableCell>
                    <TableCell align="center">{q.pagibig_num}</TableCell>
                    <TableCell align="center">{q.sss_num}</TableCell>
                  </TableRow>
                );
              })}

              <Typography color="textSecondary" style={{ fontSize: "10pt" }}>{`${males} Male, ${females} Female`}</Typography>
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

function FinishingDetails({ open, handleClose, dateRange, statusFilter, setStatusFilter, offices, officeFilter, setOfficeFilter, changes }) {
  let { from, to } = dateRange;

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      onExited={() => {
        window.print();
      }}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Set Date Ranges
      </DialogTitle>
      <DialogContent dividers>
        {/* <Alert severity="warning">This page is better printed on Mozilla Firefox</Alert> */}
        <Gtextfield type="date" id="from" label="From" value={from} onChange={changes} InputLabelProps={{ shrink: true }} />
        <Gtextfield type="date" id="to" label="To" value={to} onChange={changes} InputLabelProps={{ shrink: true }} />
        <Gdropdown label="Status / Remarks" menuItems={empStatus} name="status" value={statusFilter ?? ""} onChange={setStatusFilter} />
        <Gdropdown label="Office Assignment" menuItems={offices} name="office_assignment" value={officeFilter ?? ""} onChange={setOfficeFilter} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Print</Button>
      </DialogActions>
    </Dialog>
  );
}
