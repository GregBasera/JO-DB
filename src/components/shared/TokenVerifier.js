// import React from "react";

export default function TokenVerifier(roleLevel) {
  let levels = { Visitor: 0, Staff: 1, Admin: 2 };
  if (sessionStorage.getItem("auth")) {
    if (levels[JSON.parse(sessionStorage.getItem("auth")).user.role.name] >= roleLevel) {
      return true;
    }
  }
  return false;
}
