import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//provided components
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import CardActions from '@material-ui/core/CardActions';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import TabIcon from '@material-ui/icons/TabOutlined';
import {Paper, IconButton, Typography, LinearProgress} from '@material-ui/core';
import FormatColorIcon from '@material-ui/icons/FormatColorFill';
//sub components
import Search from './Search';
import ProteinPage from './ProteinPage';
//configuration
import Config from '../Config';

const styles = theme =>({
    list: {
        width: 900,
      },
    appBar: { 
        background: '#f5f5f5' 
      },
      appBar2: {  
        background: '#fff' 
      },
      drawerHeader:{
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',    
        height: 75,
      },
      progress: {
        width: 500
      },
      textField: {
        width: 200,
        margin: "auto"
      },
})

class ProteinContainer extends React.Component {
    state = {      
        left: false,
        searchOptions : null,    
        pageData: null,
        data: null,
        publicFilter: '',
        proteinName: '',
        proteinNames: [],
        //sampleStatus: ['Public', 'Private', 'All']
    };

    componentDidMount(){
      const getURL = Config.settings.apiURL + Config.settings.proteinsEndpoint;
      axios.get(getURL).then(res=>{

          let proteinNames = res.data.proteins.map(protein=>{
            return protein.proteinName
        });
        console.log(proteinNames);
          
        this.setState({
          searchOptions: proteinNames,
        });
        }).catch(err=>{
          console.log(err);        
        });
        
    }


    reload = () =>{
      window.location.assign(Config.settings.appURL);
      }

    openNewTab = () =>{
        var win = window.open(Config.settings.appURL, '_blank');
        win.focus();
      }
      render(){
          const {classes} = this.props;
          const{searchOptions, pageData} = this.state;
          const SearchBar = searchOptions
          ? <Search suggestions = {searchOptions} />
          //showing loading status when not connected to database.
          : <Typography component = 'div'>
            Loading Search Options
            <LinearProgress className={classes.progress}/>
          </Typography>
          //const SearchBar = <Search suggestions = {searchOptions} updateContent={this.updateContent}/>
          const Page = <ProteinPage/>
          //const Page = <LandingPage updateContent={this.updateContent}/> 

        return(
            <div>
                <Paper square={true} className = {pageData ? classes.appBar2 : classes.appBar}  elevation = {0}>
                <CardActions>
                    <Grid container alignItems = {"center"} justify= {"space-between"}>

                        <Grid item sm = {"auto"}>
                            <Grid container spacing={8} alignItems={"center"} justify={"space-between"}>

                                {/*SearchBar*/}
                                <Grid item sm={"auto"}>
                                    {SearchBar}
                                </Grid>

                              </Grid>      
                        </Grid>

                        <Grid item sm={"auto"}>
                        {<Tooltip title="Home" aria-label = "home">
                        <IconButton color = "primary" onClick = {this.reload}>
                            <HomeIcon/>
                        </IconButton>
                        </Tooltip>}

                        {<Tooltip title="Open Topic Website" aria-label="theme">
                        <IconButton color = "primary" onClick = {this.openNewTab}>
                            <TabIcon />
                        </IconButton>
                        </Tooltip>}

                        {<Tooltip title="Change Theme" aria-label="theme">
                        <IconButton color = "primary" onClick = {this.props.changeTheme}>
                            <FormatColorIcon />
                        </IconButton>
                        </Tooltip>}
                    </Grid>
                        </Grid>
                </CardActions>
                
                </Paper>
                {Page}
            </div>
        )

      }
}

ProteinContainer.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ProteinContainer);