import React from "react";
import { TextField, FormControl, Select, InputLabel, MenuItem, Button } from "@material-ui/core";

function Gtextfield(props) {
  const { type, label, id, value, onChange, error, size, InputLabelProps } = props;

  return (
    <TextField
      id={id}
      type={type}
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      size={size}
      variant="outlined"
      fullWidth
      style={{ marginTop: "8px" }}
      InputLabelProps={InputLabelProps}
    />
  );
}

function Gdropdown(props) {
  const { label, value, onChange, menuItems } = props;

  return (
    <FormControl variant="outlined" size="small" fullWidth style={{ marginTop: "8px" }}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange} label={label}>
        {(menuItems ?? []).map((dept) => (
          <MenuItem key={dept._id} value={dept.name}>
            {dept.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function Gbutton(props) {
  const { text, color, icon, onClick, fullWidth } = props;

  return (
    <Button startIcon={icon} disableElevation color={color} variant="contained" style={{ margin: "8px" }} onClick={onClick} fullWidth={fullWidth}>
      {text}
    </Button>
  );
}

export { Gtextfield, Gdropdown, Gbutton };
