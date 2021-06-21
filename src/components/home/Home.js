import React from "react";
import { useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import TokenVerifier from "../shared/TokenVerifier";
import Navbar from "../shared/Navbar";

export default function Home() {
  let history = useHistory();
  if (!TokenVerifier(0, history)) history.push("/");

  return (
    <div>
      <Navbar />
      <Typography>Home</Typography>
    </div>
  );
}
