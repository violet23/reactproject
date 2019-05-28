import React, { Component } from 'react';

// Material ui styling
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// SubComponents
// import AppContainer from './Components/AppContainer';
import Topic from './Components/Topic';
import Try from './Components/Try';
// creating a theme with default fontfamily
const theme1 = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Roboto Slab"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ],
     useNextVariants: true },
});

// creating custom theme
const theme2 = createMuiTheme({
  palette: {
    primary: {
      light: '#60ad5e',
      main: '#2e7d32',
      dark: '#005005',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#fff',
    },
  },
  typography: { 
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Bree Serif"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ],
     useNextVariants: true },
});


class App extends Component {

  state = {
    isThemeLight: true
  }
  handleThemeChange = () => {
    this.setState({ isThemeLight: !this.state.isThemeLight })
  }

  render() {
    const { isThemeLight } = this.state;

    return (
      <MuiThemeProvider theme={isThemeLight ? theme1 : theme2}>
      <CssBaseline />
      <div >
        <BrowserRouter>
         
          <Switch>
            {/* <Route exact path='/' 
            render={() => <AppContainer changeTheme={this.handleThemeChange}/>} /> */}
            {/* <Route path="/edit/:sample_id" component={EditSample} /> */}
            <Route exact path="/" component={Try}/>
            <Route path="/second/" component={Topic}/>
          </Switch>   
        </BrowserRouter>
      </div>        
      </MuiThemeProvider>
    );
  }
}

export default App;
