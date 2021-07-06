import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Gtextfield } from "../shared/FormElements";
import { SignupLogic } from "./APIcalls";
import AlertMaker from "../shared/AlertMaker";

export default function Signup() {
  let history = useHistory();
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [confirmation, setConfirmation] = useState();
  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.id]: e.target.value });
    if (e.target.type === "password") setConfirmation(e.target.value === signupData.password ? false : true);
  };

  const [showAlert, setShowAlert] = useState([false, ""]);
  const onSubmit = (show, msg) => {
    setShowAlert([show, msg]);
  };

  return (
    <div>
      <Gtextfield id="username" type="text" label="Username" value={signupData.username} onChange={handleChange} />
      <Gtextfield id="email" type="email" label="E-mail" value={signupData.email} onChange={handleChange} />
      <Gtextfield id="password" type="password" label="Password" value={signupData.password} onChange={handleChange} />
      <Gtextfield error={confirmation} type="password" label="Confirm Password" onChange={handleChange} />

      <Button onClick={() => SignupLogic(signupData, history, onSubmit)} variant="contained" fullWidth color="primary" style={{ marginTop: "16px" }}>
        sign-in
      </Button>

      {showAlert[0] ? <AlertMaker msg={showAlert[1]} /> : null}
    </div>
  );
}
