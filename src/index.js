import React from "react";
import ReactDOM from "react-dom";
import { SpeechProvider } from "@speechly/react-client";

import { Provider } from "./context/context";
import App from "./App";
import "./index.css";

ReactDOM.render(
  // The client exposes a context provider and a hook that allows you to consume that context.
  <SpeechProvider appId="e68b27c2-1643-4335-a090-636e1ae92485" language="en-US">
    <Provider>
      <App />
    </Provider>
  </SpeechProvider>,
  document.getElementById("root")
);
