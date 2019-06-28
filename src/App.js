import React, { Component } from 'react';
// Material ui styling
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Router, browserHistory } from 'react-router'
// SubComponents
import AppContainer from './Components/AppContainer';
import TopicContainer from './Components/TopicContainer';
import ProteinContainer from './Components/ProteinContainer';
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
  /*palette: {
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
  },*/
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
    theme : theme1,
    background : 'linear-gradient(to bottom,#efefda,#efefda)'
  }
  handleThemeChange = () => {

    const theme0 =(this.state.theme === theme1) 
    ? theme2 
    : theme1;

    const background0 = (this.state.background === 'linear-gradient(to bottom,#efefda,#efefda)')
    ? 'linear-gradient(to bottom,#ede6e8,#ede6e8)'
    : 'linear-gradient(to bottom,#efefda,#efefda)';

    this.setState({ 
      theme : theme0,
      background : background0 
    })
    console.log(this.state)
  }

  render() {
    const { theme, background } = this.state;

    return (
      <MuiThemeProvider theme = {this.state.theme}>
      <CssBaseline />
      <div style={{height: '100%', background: this.state.background}}>
        <BrowserRouter>
         
          <Switch>
            <Route exact path='/' 
            render={() => <AppContainer changeTheme={this.handleThemeChange} theme = {this.state.theme} background = {this.state.background}/>} />
            <Route exact path="/:topicName"
            render={() => <TopicContainer changeTheme={this.handleThemeChange} theme = {this.state.theme} background = {this.state.background}/>}/>
            <Route exact path="/protein/:proteinName" render={() => <ProteinContainer changeTheme={this.handleThemeChange} theme = {this.state.theme} background = {this.state.background}/>}/>
            {/*<Route exact path="/try" component={General} /> */}
          </Switch>   
        </BrowserRouter>
      </div>        
      </MuiThemeProvider>
    );
  }
}

export default App;
