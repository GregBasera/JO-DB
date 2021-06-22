import React from "react";
import { useHistory } from "react-router-dom";
import TokenVerifier from "../shared/TokenVerifier";
import Navbar from "../shared/Navbar";
import HomeBody from "./HomeBody";

export default function Home() {
  let history = useHistory();
  if (!TokenVerifier(0, history)) history.push("/");

  return (
    <div style={{ backgroundColor: "#eeeeee" }}>
      <Navbar />

      <HomeBody />
    </div>
  );
}
