import React from "react";
import "./styles.css";
import { Route } from "react-router-dom";
import Explorer from "./Explorer";
import { createBrowserHistory } from "history";
export const history = createBrowserHistory();
//If this were a bigger project I would use context, and seperate the components. But for what we're doing it's not nesecary. I have no idea how you spell necesary
export default function App() {
  return (
    <Route path="/" render={props => <Explorer {...props} />} />
  );
}
