import React from "react";
import ReactDOM from "react-dom";

import "@appsafetyhub/safetyhub-form-creator/dist/app.css";
import Router from "./router";
import * as serviceWorker from "./serviceWorker";


ReactDOM.render(<Router />, document.getElementById("form-builder"));

serviceWorker.unregister();
