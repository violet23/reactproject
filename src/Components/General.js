import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import comingup from '../comingup.png';
import Config from '../Config.js'

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
        minWidth: 1100,
        marginTop:20,
    },           
    
      searchbar:{
        width: 1100
      },
      forbottom:{
          width: 450,     
          height:160,
        //   border: '2px solid yellow'
      },
      forstring:{
        minwidth: 100,     
        minHeight:180,
      //   border: '2px solid yellow'
    },
      fortop:{
        width: 280,     
        height:290,
      //   border: '2px solid yellow'
    },
    tagpaper:{
      width: 300
  },
});



class General extends React.Component {
  state ={
    topicTagCountsInSubsectors: this.props.topic.topicTagCountsInSubsectors,
    subsectorPicture: this.props.topic.subsectorPicture,
    stringImage: this.props.topic.stringImage
    }
    
    componentDidMount(){
        this.setState({
          topicTagCountsInSubsectors: this.props.topic.topicTagCountsInSubsectors,
          subsectorPicture: this.props.topic.subsectorPicture,
          stringImage: this.props.topic.stringImage
    });}

    componentWillReceiveProps(nextProps){
        this.setState({
            topicTagCountsInSubsectors: nextProps.topic.topicTagCountsInSubsectors,
            subsectorPicture: nextProps.topic.subsectorPicture,
            stringImage: nextProps.topic.stringImage
    });
      }

      render(){  
        const {classes} = this.props;
        const topicTagCountsInSubsectors = Config.settings.apiURL +'/'+this.state.topicTagCountsInSubsectors;
        const subsectorPicture = Config.settings.apiURL +'/'+this.state.subsectorPicture;
        const stringImage = (this.props.topic.stringImage)=== "No STRING image" ?
        (comingup)
        : (Config.settings.apiURL +'/'+this.state.stringImage)
        console.log(this.state.stringImage)
        //console.log(this.state.subsectorPicture)
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
                <CardContent >   
                                                     
                          <Grid container 
                                    direction="row"
                                    justify="space-evenly"
                                    alignItems="center"
                                    spacing={0}
                              >                       
                              <Grid item >
                                  <img src={topicTagCountsInSubsectors} alt="Topic Tag Counts In Subsectors"
                                  className = {classes.fortop}/>
                                  <Paper className={classes.tagpaper} elevation = {0}>
                                      <Typography align = 'center'>
                                      Topic tag counts in subsectors
                                      </Typography>
                                  </Paper> 
                              </Grid>
                              <Grid item >
                                  <img src={subsectorPicture} alt="Subsector"
                                  className={classes.forbottom}/>
                                  <Paper className={classes.tagpaper} elevation = {0}>
                                      <Typography align = 'center'>
                                      Enriched subsector
                                      </Typography>
                                  </Paper> 
                              </Grid>
                              <Grid item align = "flex-left">
                              <img src={stringImage} alt="Subsector"
                                  className={classes.forbottom} />
                                <Paper className={classes.tagpaper} elevation = {0}>
                                
                                      <Typography align = 'center'>
                                      
                                      Protein-protein interaction network from STRING
                                      </Typography>
                                  </Paper> 
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