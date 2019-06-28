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
import PageNoSearch from './PageNoSearch';
// import image assets
import pennstatelogo from '../pennstatelogo.png';
import cegrlogo from '../CEGRlogo.png';
//configuration
import Config from '../Config';

const styles = theme =>({
    list: {
        width: 900,
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

class AppContainer extends React.Component {
    state = {      
        left: false,
        searchOptions : null,   
        pageData: null,
        data: null,
        publicFilter: '',
        proteinName: '',
        proteinNames: [],
        theme: this.props.theme,
        background : this.props.background
        //sampleStatus: ['Public', 'Private', 'All']
    };


  

    refresh = () =>{
    this.setState({
      pageData: null,
      theme: this.props.theme,
      background : this.props.background
    });
    }

    componentDidMount(){
      console.log(this.props)
      const getURL = Config.settings.apiURL + Config.settings.proteinsEndpoint;
      axios.get(getURL).then(res=>{

          let proteinNames = res.data.proteins.map(protein=>{
            return protein.proteinName
        });
        console.log(proteinNames);
        this.setState({
          searchOptions: proteinNames,
          theme: this.props.theme,
          background : this.props.background
        });
        }).catch(err=>{
          console.log(err);        
        });
    }

    componentWillReceiveProps(nextProps){
      this.setState({
        theme: nextProps.theme,
        background : nextProps.background
      });
    }

    /*updateContent = (protein) => () =>{
      const proteinURL = Config.settings.apiURL +Config.settings.proteinsEndpoint+'/protein/'+protein;
      console.log(proteinURL);
   
      // fetch topicData 
      axios.get(proteinURL).then(result=>{
        const proteinName= [...new Set(result.data.proteins.map(protein => {
          return protein.proteinName;
          } ))]; 
          
        this.setState({
          pageData: result.data.proteins,
          data: result.data,
          proteinNames: [...proteinName, 'All']
        });
      });    
    };*/

    openNewTab = () =>{
        var win = window.open(Config.settings.appURL, '_blank');
        win.focus();
      }
      render(){
          const {classes} = this.props;
          const{searchOptions, pageData, theme,background} = this.state;
          console.log(this.state.background)
          const SearchBar = searchOptions
          ? <Search suggestions = {searchOptions} />
          //showing loading status when not connected to database.
          : <Typography component = 'div'>
            Loading Search Options
            <LinearProgress className={classes.progress}/>
          </Typography>
          //const SearchBar = <Search suggestions = {searchOptions} updateContent={this.updateContent}/>
          const Page = <PageNoSearch/>

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
                        <IconButton color = "primary" onClick = {this.refresh}>
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
                {/*<Grid item className={classes.center}> 
                        <Grid container spacing={40} alignItems={"center"} direction="row" justify="center" className={classes.footer}>
                            <Grid item>
                                <img src={pennstatelogo} alt="pennstateLogo" style={{width: 160}}/> 
                            </Grid>
                            <Grid item>
                                <img src={cegrlogo} alt="cegrlogo" style={{height: 55}}/>
                            </Grid>
                            <Grid item>
                                <Typography variant='body2' style={{paddingLeft:28}}>
                                    &copy; 2019 Pennsylvania State University
                                </Typography>
                            </Grid>
                        </Grid>                       
                    </Grid>*/}
            </div>
        )

      }
}

AppContainer.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(AppContainer);




