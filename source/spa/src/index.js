import React from "react";
import ReactDOM from "react-dom";

import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";

import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";

export const msalInstance = new PublicClientApplication(msalConfig);

const accounts = msalInstance.getAllAccounts();

if (accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    const account = event.payload.account;
    msalInstance.setActiveAccount(account);
  }

  if (event.eventType === EventType.LOGIN_FAILURE) {
    console.log(JSON.stringify(event));
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App instance={msalInstance} />
  </React.StrictMode>,
  document.getElementById('root')
);
