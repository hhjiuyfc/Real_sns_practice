import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./state/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    {/* Appコンポーネント全てで使える(ActionContext.Providerのvalue) */}
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
