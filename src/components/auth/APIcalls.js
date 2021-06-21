// import React from "react";
import Axios from "axios";
import { Auth, Register } from "../shared/endpoints";

function LoginLogic(data, redirect, callback) {
  Axios.post(Auth, data)
    .then((res) => {
      sessionStorage.setItem("auth", JSON.stringify(res.data));
      redirect.push("/home");
    })
    .catch((err) => {
      if (err.response.status === 400) callback(true, err.response.data.message[0].messages[0].message);
    });
}

function SignupLogic(data, redirect, callback) {
  Axios.post(Register, data)
    .then((res) => {
      sessionStorage.setItem("auth", JSON.stringify(res.data));
      redirect.push("/home");
    })
    .catch((err) => {
      if (err.response.status === 400) callback(true, err.response.data.message[0].messages[0].message);
    });
}

export { LoginLogic, SignupLogic };
