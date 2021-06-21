import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { LoginLogic } from "./APIcalls";
import { Gtextfield } from "../shared/FormElements";
import AlertMaker from "../shared/AlertMaker";

export default function Login() {
  let history = useHistory();
  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
  });
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const [showAlert, setShowAlert] = useState([false, ""]);
  const onSubmit = (show, msg) => {
    setShowAlert([show, msg]);
  };

  return (
    <div>
      <Gtextfield id="identifier" type="text" label="Username or E-mail" value={loginData.identifier} onChange={handleChange} />
      <Gtextfield id="password" type="password" label="Password" value={loginData.password} onChange={handleChange} />

      <Button onClick={() => LoginLogic(loginData, history, onSubmit)} variant="contained" fullWidth color="primary" style={{ marginTop: "16px" }}>
        log-in
      </Button>

      {showAlert[0] ? <AlertMaker msg={showAlert[1]} /> : null}
    </div>
  );
}
