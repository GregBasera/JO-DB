import React from "react";
import { TextField, FormControl, Select, InputLabel, MenuItem, Button } from "@material-ui/core";

function Gtextfield(props) {
  const { type, label, id, value, onChange, error, size } = props;

  return <TextField id={id} type={type} label={label} value={value} onChange={onChange} error={error} size={size} variant="outlined" fullWidth style={{ marginTop: "8px" }} />;
}

function Gdropdown(props) {
  const { label, value, onChange, menuItems } = props;

  return (
    <FormControl variant="outlined" size="small" fullWidth style={{ marginTop: "8px" }}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange} label={label}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
}

function Gbutton(props) {
  const { text, color, icon } = props;

  return (
    <Button startIcon={icon} disableElevation color={color} variant="contained" style={{ margin: "8px" }}>
      {text}
    </Button>
  );
}

export { Gtextfield, Gdropdown, Gbutton };
