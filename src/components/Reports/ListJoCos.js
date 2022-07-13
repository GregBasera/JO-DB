import React, { useState, useEffect } from "react";
import { Table, Typography, TableRow, TableHead, TableBody } from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";

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

export default function ListJoCos() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("forPrinting")));
  }, []);

  return (
    <React.Fragment>
      <Typography align="center">
        <small>LIST OF CASUAL/CONTRACTUAL PERSONNEL</small>
      </Typography>
      <Typography align="center">
        <small>{`(As of ${moment().format("MMMM DD, YYYY")})`}</small>
      </Typography>

      <Typography align="center">
        <small>
          <b>
            Agency name: <u>LGU Tagkawayan</u>
          </b>
        </small>
      </Typography>
      <Typography align="center">
        <small>
          <b>
            Regional Office No: <u>12345</u>
          </b>
        </small>
      </Typography>

      <div style={{ display: "block", padding: "0px 10px" }}>
        <Table size="small">
          <TableHead style={{ backgroundColor: "lightgray" }}>
            <TableRow>
              <TableCell align="center" rowSpan={2}>
                No.
              </TableCell>
              <TableCell align="center" colSpan={3}>
                <small>Name of Personnel</small>
              </TableCell>
              <TableCell align="center" rowSpan={2}>
                <small>Date of Birth MMDDYYYY</small>
              </TableCell>
              <TableCell align="center" rowSpan={2}>
                <small>Sex</small>
              </TableCell>
              <TableCell align="center" rowSpan={2}>
                <small>Level of CS Eligibility</small>
              </TableCell>
              <TableCell align="center" rowSpan={2}>
                <small>Work Status</small>
              </TableCell>
              <TableCell align="center" rowSpan={2}>
                <small>No. of Years of Service as Casual/Contractual personnel</small>
              </TableCell>
              <TableCell align="center" colSpan={2}>
                <small>Nature of Work</small>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                <small>SURNAME</small>
              </TableCell>
              <TableCell align="center">
                <small>FIRST NAME/EXTENSION NAME</small>
              </TableCell>
              <TableCell align="center">
                <small>MIDDLE INITIAL</small>
              </TableCell>
              <TableCell align="center">
                <small>Pls select</small>
              </TableCell>
              <TableCell align="center">
                <small>Please specify</small>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((q, qind) => {
              return (
                <TableRow>
                  <TableCell>{qind + 1}</TableCell>
                  <TableCell>{q.name}</TableCell>
                  <TableCell>asd</TableCell>
                  <TableCell>asd</TableCell>
                  <TableCell>{q.birthdate}</TableCell>
                  <TableCell>{q.sex}</TableCell>
                  <TableCell>asd</TableCell>
                  <TableCell>{q.service_history[0].appointment_status}</TableCell>
                  <TableCell>{yearsInService(q.service_history[q.service_history.length - 1].ep_start, q.service_history[0].ep_end)}</TableCell>
                  <TableCell>{q.service_history[0].general_function}</TableCell>
                  <TableCell>{}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </React.Fragment>
  );
}

const yearsInService = (start, latest) => {
  return moment(latest).diff(start, "years");
  // return `${start} - ${latest}`;
};
