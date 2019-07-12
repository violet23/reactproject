import React from 'react';
import axios from 'axios';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Config from '../Config';
import General from './General';
import Profiles from './Profiles';
import Gene from './Gene';
import Motif from './Motif'

const styles = theme => ({
  jumbotron:{
    padding: '1rem 2rem',
    bottomMargin:'2rem',     
},
    center : {
        margin: 'auto',      
        maxWidth: 1100,
        padding: 10,
        // border: '2px solid green'
      },
    card: {
        maxWidth: 1200
        
    },           
    
      searchbar:{
        width: 1100
      },
       
    
});



class TopicGraphPage extends React.Component {
  state ={
        topic: null,
        loading: true,
        message: "Fetching Topics",
    }
    
    componentDidMount (){
        const topic = window.location.pathname;
        const topicURL = Config.settings.apiURL +Config.settings.topicsEndpoint +topic;
        
        axios.get(topicURL).then(result=>{
          let topic = result.data.topic;
          this.setState({
            topic : topic[0],
            loading: false
          });
          //const Page = <Try why = {topicTagCountsInSubsectors}/>
        }).catch(error =>{
            console.log(error);
            this.setState({
                loading: true,
                message: error.message
            })
        });;    
      }

      render(){  
        const {classes} = this.props;
        const{topic,loading,message,} = this.state;
        const TopicGraph = loading ? (  
            <Typography component="div" >                   
                <Typography component="p" variant="subtitle1" >
                    {message}
                </Typography>
                <LinearProgress variant="query" />
            </Typography> 
            
            ) : (<General topic = {this.state.topic}/>);

        const pp = loading ? (  
          <Typography component="div" >                   
              <Typography component="p" variant="subtitle1" >
                  {message}
              </Typography>
              <LinearProgress variant="query" />
          </Typography> 
          
          ) : (<Profiles topic = {this.state.topic}/>);

        const genes = loading ? (  
          <Typography component="div" >                   
              <Typography component="p" variant="subtitle1" >
                  {message}
              </Typography>
              <LinearProgress variant="query" />
          </Typography> 
          ) : (<Gene topic = {this.state.topic}/>);

        const motif = loading? (  
          <Typography component="div" >                   
              <Typography component="p" variant="subtitle1" >
                  {message}
              </Typography>
              <LinearProgress variant="query" />
          </Typography> 
          ) : (<Motif topic = {this.state.topic}/>);

    return (
        <div className={classes.root}>
            <Grid container justify = "center">
                <Paper className={classes.card}>   
                  <Grid item>
                  {TopicGraph}
                  </Grid>
                  <Grid item>
                  {pp}
                  </Grid>
                  <Grid item>
                  {genes}
                  </Grid>
                  <Grid item>
                  {motif}
                  </Grid>
                </Paper>
                    
                    
            </Grid>
                <br/> 
                {/* Sample Explore Table */}
                        
            </div>

    );
}}

TopicGraphPage.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(TopicGraphPage);