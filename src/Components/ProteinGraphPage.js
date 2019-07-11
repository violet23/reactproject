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
import ProteinProfiles from './ProteinProfiles';

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



class ProteinGraphPage extends React.Component {
  state ={
        protein: null,
        loading: true,
        message: "Fetching Topics",
    }
    
    componentDidMount (){
        const protein= window.location.pathname.split('/')[2];
        const proteinURL = Config.settings.apiURL +Config.settings.proteinsEndpoint+ "/" + protein;
        
        axios.get(proteinURL).then(result=>{
          let protein = result.data.protein;
          this.setState({
            protein : protein[0],
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
        const{protein,loading,message,} = this.state;

        const pp = loading ? (  
          <Typography component="div" >                   
              <Typography component="p" variant="subtitle1" >
                  {message}
              </Typography>
              <LinearProgress variant="query" />
          </Typography> 
          
          ) : (<ProteinProfiles protein = {this.state.protein}/>);


    return (
        <div className={classes.root}>
            <Grid container justify = "center">
                <Paper className={classes.card}>   
                  <Grid item>
                  {pp}
                  </Grid>
                    
                </Paper>
                    
                    
            </Grid>
                <br/> 
                {/* Sample Explore Table */}
                        
            </div>

    );
}}

ProteinGraphPage.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ProteinGraphPage);