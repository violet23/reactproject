import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import comingup from '../comingup.png';

const styles = theme => ({
  jumbotron:{
    padding: '1rem 1rem',
    bottomMargin:'1rem',     
},
    center : {
        margin: 'auto',      
        minWidth: 1100,
        padding: 5,
        // border: '2px solid green'
      },
    card: {
        minWidth: 1100
    },           
    
      searchbar:{
        width: 1100
      },
      forbottom:{
          width: 280,     
        //   border: '2px solid yellow'
      },
      fortop:{
        width: 320,     
      //   border: '2px solid yellow'
    },
    leftSection: {
      // border: '2px solid gray'
    },
    rightSection:{
      // border: '2px solid blue'
    },
      mainContainer:{
          overflow: 'scroll'
      },
    
});



class Reference extends React.Component { 
  render(){  
    const {classes} = this.props;
    return (
            <div className={classes.jumbotron}>
            <Grid container justify = "center">
                <Paper elevation={0} className={classes.card}>
                    <Typography variant="h5" paragraph={true}>
                            Reference
                        </Typography>
                <Paper>  
                <CardContent className={classes.sectionHolder}>   
                              {/* Bottom Section */}                             
                          <Grid container 
                                    direction="row"
                                    justify="space-evenly"
                                    alignItems="center"
                                    spacing={8}
                              >                       
                              <Grid item>
                                <img src={comingup} alt="comingup" className = {classes.forbottom}/>
                              </Grid>

                            </Grid>             
                  </CardContent>

                  </Paper> 
                    
                </Paper>
            </Grid>
            </div>      
          
       
    );
}}

Reference.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Reference);