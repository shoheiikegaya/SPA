import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { AuthContextProvider } from "./components/AuthContextProvider";
//ReactDOM.render(<App />, document.getElementById("root"));

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
