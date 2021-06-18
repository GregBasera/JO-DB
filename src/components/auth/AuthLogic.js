import React, { useState } from "react";

function AuthLogic() {
  const [authData, setAuthData] = useState({});
  const handleChange = (event) => {
    setAuthData();
  };

  return [authData, setAuthData];
}

export { AuthLogic };
