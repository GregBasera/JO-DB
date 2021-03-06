import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, Dialog, DialogContent, Typography, DialogActions, IconButton, Paper, Grid } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { Gtextfield, Gdropdown } from "../../shared/FormElements";
import { newPersonel } from "../APIcalls";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { appointStatus, empStatus, genFunction } from "../../shared/sharedVariables";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export default function AddPersonelDialog({ handleClose, open, depts, fundSources, append }) {
  const [servHisArray, setServHisArray] = useState(["set"]); // this state is only used as a reference to render elements
  const addNewSet = () => {
    setNewPersonelData({ ...newPersonelData, service_history: [...newPersonelData.service_history, []] });
    setServHisArray([...servHisArray, "set"]);
  };
  const removeSet = () => {
    let temp = servHisArray;
    temp.pop();
    setServHisArray(temp);
    temp = newPersonelData.service_history;
    temp.pop();
    setNewPersonelData({ ...newPersonelData, service_history: temp });
  };

  const [newPersonelData, setNewPersonelData] = useState({
    name: "",
    sex: "",
    service_history: [{}],
    birthdate: "",
    birthplace: "",
    address: "",
    appointment_status: "",
    contact_num: "",
    tin_num: "",
    philhealth_num: "",
    pagibig_num: "",
    sss_num: "",
  });
  const handlePersonelDataChanges = (e, indx) => {
    let { name, id, value } = e.target;

    switch (id ?? name) {
      case "name":
      case "sex":
      case "birthdate":
      case "birthplace":
      case "address":
      case "contact_no":
      case "tin_num":
      case "philhealth_num":
      case "pagibig_num":
      case "sss_num":
        setNewPersonelData({ ...newPersonelData, [id ?? name]: value });
        break;
      case "designation":
      case "rate_per_day":
      case "ep_start":
      case "ep_end":
      case "office_assignment":
      case "status":
      case "general_function":
      case "appointment_status":
      case "funding_source":
        // service_history contains deeply nested values. idk if this way is better
        let iDontLikeThisLongWay = newPersonelData.service_history;
        iDontLikeThisLongWay[indx] = { ...iDontLikeThisLongWay[indx], [id ?? name]: id === "rate_per_day" ? parseInt(value) : value };
        setNewPersonelData({ ...newPersonelData, service_history: iDontLikeThisLongWay });
        break;
      default:
        console.log("error");
    }
  };

  const handleSubmit = () => {
    // console.log(newPersonelData);
    newPersonel(newPersonelData, append);
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle onClose={handleClose}>Add a Personel</DialogTitle>
      <DialogContent dividers>
        <Gtextfield id="name" size="small" label="Name" value={newPersonelData.name} onChange={handlePersonelDataChanges} />
        <Gdropdown
          name="sex"
          label="Sex"
          value={newPersonelData.sex}
          onChange={handlePersonelDataChanges}
          menuItems={[
            { _id: "Male", value: "Male" },
            { _id: "Female", value: "Female" },
          ]}
        />
        <Gtextfield id="birthdate" type="date" label="Birthdate" value={newPersonelData.birthdate} onChange={handlePersonelDataChanges} InputLabelProps={{ shrink: true }} />
        <Gtextfield id="birthplace" label="Birthplace" value={newPersonelData.birthplace} onChange={handlePersonelDataChanges} />
        <Gtextfield id="address" label="Address" value={newPersonelData.address} onChange={handlePersonelDataChanges} />
        <Gtextfield id="contact_no" label="Contact No." value={newPersonelData.contact_no} onChange={handlePersonelDataChanges} />
        <Gtextfield id="tin_num" type="number" label="TIN No." value={newPersonelData.tin_num} onChange={handlePersonelDataChanges} />
        <Gtextfield id="philhealth_num" type="number" label="PHILHEALTH No." value={newPersonelData.philhealth_num} onChange={handlePersonelDataChanges} />
        <Gtextfield id="pagibig_num" type="number" label="HDMF No." value={newPersonelData.pagibig_num} onChange={handlePersonelDataChanges} />
        <Gtextfield id="sss_num" type="number" label="SSS No." value={newPersonelData.sss_num} onChange={handlePersonelDataChanges} />

        <Typography style={{ marginTop: "8px" }}>Service History</Typography>
        <Typography variant="caption" color="textSecondary">
          from latest to oldest
        </Typography>

        {servHisArray.map((node, index) => (
          <div key={index}>{<ServHisSet depts={depts} fundSources={fundSources} data={newPersonelData} index={index} onChange={(e) => handlePersonelDataChanges(e, index)} />}</div>
        ))}

        <IconButton size="small" onClick={addNewSet}>
          <AddIcon />
        </IconButton>
        <IconButton size="small" onClick={removeSet}>
          <RemoveIcon />
        </IconButton>
      </DialogContent>
      <DialogActions style={{ backgroundColor: "#1589FF" }}>
        <Button onClick={handleSubmit}>Save changes</Button>
      </DialogActions>
    </Dialog>
  );
}

function ServHisSet(props) {
  let { depts, fundSources, data, index, onChange } = props;

  return (
    <Paper variant="outlined" style={{ padding: "8px", paddingLeft: "16px", marginBottom: "8px", borderColor: "black" }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <Gtextfield size="small" label="Designation" id="designation" value={data.service_history[index].designation ?? ""} onChange={onChange} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Gtextfield type="number" size="small" label="Rate per Day" id="rate_per_day" value={data.service_history[index].rate_per_day ?? ""} onChange={onChange} />
        </Grid>
        <Grid item xs={12} md={12}>
          <Gdropdown name="appointment_status" label="Appointment Status" value={data.service_history[index].appointment_status ?? ""} onChange={onChange} menuItems={appointStatus} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Gtextfield
            type="date"
            size="small"
            label="Employment Period: Start"
            id="ep_start"
            value={data.service_history[index].ep_start ?? ""}
            onChange={onChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Gtextfield
            type="date"
            size="small"
            label="Employment Period: End"
            id="ep_end"
            value={data.service_history[index].ep_end ?? ""}
            onChange={onChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Gdropdown label="Office Assignment" menuItems={depts} name="office_assignment" value={data.service_history[index].office_assignment ?? ""} onChange={onChange} />
        </Grid>
        <Grid item xs={12} md={12}>
          <Gdropdown label="General Function" menuItems={genFunction} name="general_function" value={data.service_history[index].general_function ?? ""} onChange={onChange} />
        </Grid>
        <Grid item xs={12} md={12}>
          <Gdropdown label="Status / Remarks" menuItems={empStatus} name="status" value={data.service_history[index].status ?? ""} onChange={onChange} />
        </Grid>
        <Grid item xs={12} md={12}>
          <Gdropdown label="Funding Source" menuItems={fundSources} name="funding_source" value={data.service_history[index].funding_source ?? ""} onChange={onChange} />
        </Grid>
      </Grid>
    </Paper>
  );
}
