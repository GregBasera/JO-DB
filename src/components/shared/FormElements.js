import React from "react";
import { TextField, FormControl, Select, InputLabel, MenuItem, Button } from "@material-ui/core";

function Gtextfield(props) {
  const { type, label, id, value, onChange, onKeyDown, error, size, InputLabelProps, readOnly, helperText } = props;

  return (
    <TextField
      id={id}
      type={type}
      label={label}
      value={value}
      onChange={onChange}
      helperText={helperText}
      onKeyDown={onKeyDown}
      error={error}
      size={size ?? "small"}
      variant="outlined"
      fullWidth
      style={{ marginTop: "8px" }}
      InputLabelProps={{ ...InputLabelProps, readOnly: readOnly ? true : false }}
    />
  );
}

function Gdropdown(props) {
  const { name, label, value, onChange, menuItems } = props;

  return (
    <FormControl variant="outlined" size="small" fullWidth style={{ marginTop: "8px" }}>
      <InputLabel>{label}</InputLabel>
      <Select name={name} value={value} onChange={onChange} label={label}>
        <MenuItem key="all" value={"all"}>
          All
        </MenuItem>
        {(menuItems ?? []).map((item) => (
          <MenuItem key={item._id} value={item.name ?? item.value}>
            {item.name ?? item.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function Gbutton(props) {
  const { text, color, icon, onClick, fullWidth, size } = props;

  return (
    <Button size={size ?? "small"} startIcon={icon} disableElevation color={color} variant="contained" style={{ margin: "8px" }} onClick={onClick} fullWidth={fullWidth}>
      {text}
    </Button>
  );
}

export { Gtextfield, Gdropdown, Gbutton };
