
import './App.css';

import React from "react";
import {ThemeProvider} from "styled-components";
import {Theme} from "./cv/components/styling/Theme";
import RouterPage from "./find-job/RouterPage";
import GlobalStyle from "./cv/components/styling/GlobalStyle";

function App() {
  return (
      <><ThemeProvider theme={Theme}>
        <GlobalStyle/>
        <RouterPage />
      </ThemeProvider>
      </>
  );
}
export default App;
