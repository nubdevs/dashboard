import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CallRecordContext } from "./context/CallRecordContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CallRecordContext>
      <App />
    </CallRecordContext>
  </React.StrictMode>
);
