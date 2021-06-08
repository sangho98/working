import React from "react";
import { Redirect } from "react-router";
import { tokenData } from "../Apollo";

function Auth(props) {
  tokenData(null);
  localStorage.clear();
  return <Redirect to="/login" />;
}

export default Auth;
