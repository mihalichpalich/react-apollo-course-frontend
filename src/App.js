import React from 'react';

import Tabs from "./components/Tabs/Tabs";
import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from "./components/theme";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Tabs/>
    </MuiThemeProvider>
  );
}

export default App;
