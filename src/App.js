import React, { useEffect, useRef } from "react";
import { Grid } from "@material-ui/core";

import { SpeechState, useSpeechContext } from "@speechly/react-client";
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
} from "@speechly/react-ui";

import { Details, Main } from "./components";
import useStyles from "./styles";

const App = () => {
  const classes = useStyles();
  // custom hook that consumes the state preserved in SpeechProvider
  const { speechState } = useSpeechContext();

  // returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component.
  const main = useRef(null);

  // scrollIntoView() method scrolls the specified element into the visible area of the browser window.
  const executeScroll = () => main.current.scrollIntoView();
  // Sometimes, we want to run some additional code after React has updated the DOM. Network requests, manual DOM mutations, and logging are common examples of effects that don’t require a cleanup. We say that because we can run them and immediately forget about them
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // The context is current recording audio and sending it to the API for recognition. The results are also being fetched.
    if (speechState === SpeechState.Recording) {
      executeScroll();
    }
  }, [speechState]);

  return (
    <div>
      <Grid
        className={classes.grid}
        container
        spacing={0}
        alignItems="center"
        justifyContent="center"
        style={{ height: "100vh" }}
      >
        {/* won't be displayed in desktop view */}
        <Grid item xs={12} sm={4} className={classes.mobile}>
          <Details title="Income" />
        </Grid>
        {/* ref is forwaded to the root element */}
        <Grid ref={main} item xs={12} sm={3} className={classes.main}>
          <Main />
        </Grid>
        {/* won't be displayed in mobile view */}
        <Grid item xs={12} sm={4} className={classes.desktop}>
          <Details title="Income" />
        </Grid>

        <Grid item xs={12} sm={4} className={classes.last}>
          <Details title="Expense" />
        </Grid>

        <PushToTalkButtonContainer>
          <PushToTalkButton />
        </PushToTalkButtonContainer>

      </Grid>
    </div>
  );
};

export default App;
