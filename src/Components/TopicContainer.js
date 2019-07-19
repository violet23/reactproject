import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter} from 'react-router-dom';
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
import TopicPage from './TopicPage';
import TopicGraphPage from './TopicGraphPage';
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

class TopicContainer extends React.Component {
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

    componentDidMount(){
      //const topicURL = Config.settings.apiURL + Config.settings.topicsEndpoint;
      const getURL = Config.settings.apiURL + Config.settings.proteinsEndpoint;
      axios.get(getURL).then(res=>{

          let proteinNames = res.data.proteins.map(protein=>{
            return protein.proteinName
        });
          
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


    reload = () =>{
      //window.location.assign(Config.settings.appURL);
      this.props.history.push('/');
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
          const Page = <TopicPage/>
          const Page2 = <TopicGraphPage/>
          //const Page = <LandingPage updateContent={this.updateContent}/> 

        return(
            <div style={{background:this.state.background}}>
                <Paper  square={true} className = {pageData ? classes.appBar2 : classes.appBar}  elevation = {0}>
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
                {Page2}
            </div>
        )

      }
}

TopicContainer.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withRouter(withStyles(styles)(TopicContainer));
  //export default withRouter(TopicContainer);