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
          width: 270,     
          height:180,
        //   border: '2px solid yellow'
      },
      fortop:{
        width: 280,     
        height:300,
      //   border: '2px solid yellow'
    },
      mainContainer:{
          overflow: 'scroll'
      },
    
});



class General extends React.Component {
  state ={
    topicTagCountsInSubsectors: this.props.topic.topicTagCountsInSubsectors,
    subsectorPicture: this.props.topic.subsectorPicture,
    //stringPicture: this.props.topic.stringPicture
    }
    
    componentDidMount(){
        this.setState({
          topicTagCountsInSubsectors: this.props.topic.topicTagCountsInSubsectors,
          subsectorPicture: this.props.topic.subsectorPicture,
            //stringPicture: this.props.topic.stringPicture
    });}

    componentWillReceiveProps(nextProps){
        this.setState({
            topicTagCountsInSubsectors: nextProps.topic.topicTagCountsInSubsectors,
            subsectorPicture: nextProps.topic.subsectorPicture,
            //stringPicture: nextProps.topic.stringPicture
    });
      }

      render(){  
        const {classes} = this.props;
        const topicTagCountsInSubsectors = "http://localhost:8080/"+this.state.topicTagCountsInSubsectors.split('./')[1];
        const subsectorPicture = "http://localhost:8080/"+this.state.subsectorPicture.split('./')[1];
        //const{topicTagCountsInSubsectors} = this.state;
    return (
            <div>
            <div className={classes.jumbotron}>
            <Grid container justify = "center">
                <Paper elevation={0} className={classes.card}>
                    <Typography variant="h5" paragraph={true}>
                            General
                        </Typography>
                <Paper elevation={4}>  
                <CardContent className={classes.sectionHolder}>   
                              {/* Bottom Section */}                             
                          <Grid container 
                                    direction="row"
                                    justify="space-evenly"
                                    alignItems="center"
                                    spacing={0}
                              >                       
                              <Grid item >
                                  <img src={topicTagCountsInSubsectors} alt="Topic Tag Counts In Subsectors"
                                  className = {classes.fortop}/>
                              </Grid>
                              <Grid item >
                                  <img src={subsectorPicture} alt="Subsector Picture"
                                  className={classes.forbottom}/>
                              </Grid>
                              <Grid item>
                                <img src={comingup} alt="comingup" className = {classes.forbottom}/>
                              </Grid>

                            </Grid>             
                  </CardContent>

                  </Paper> 
                    
                </Paper>
            </Grid>
            </div>      
            </div>
          
       
    );
}}

General.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(General);