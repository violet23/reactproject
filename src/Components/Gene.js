import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TopicSubsectorTable from './TopicSubsectorTable';
import NeighborTopicTable from './NeighborTopicTable';
import Collapse from '@material-ui/core/Collapse';
import Config from '../Config.js'

const styles = theme => ({
  jumbotron:{
    padding: '1rem 1rem',
    //bottomMargin:'1rem',     
},
  tagpaper:{
      minWidth: 150,
      marginTop:10,
  },
  smalltagpaper:{
    //maxWidth: 180,
    marginTop:10,
},
    center : {
        margin: 'auto',      
        maxWidth: 1100,
        padding: 5,
        // border: '2px solid green'
      },
    card: {
        maxWidth: 1100,
        marginTop:10,
        minWidth: 1100
    },    
    largecard: {
      maxWidth: 1200,
      minWidth: 1200
  },      
    featureHeatmap:{
      width: 190,
      height:180,
      marginTop:30,
      marginBottom:20,
    //   border: '2px solid yellow'
  },  
  bigfeatureHeatmap:{
    maxWidth: 300,
    maxHeight:320,
    marginTop:30,
    marginBottom:20,
  //   border: '2px solid yellow'
},  
  myColor:{
    background: 'black'
  },
  imagecard:{
    minWidth: 510,
  },
      searchbar:{
        width: 1100
      },

      colorBar:{
        height: 470,
        width: 20,
        marginTop:14,
        marginLeft: -15   
      },
      root: {
        width: '100%',
        //marginTop: theme.spacing(3),
        overflowX: 'auto',
        overflowY: 'auto',
        maxHeight: 300
      },
});


class Gene extends React.Component { 
  state = {
    selectTab :0,
    topic:this.props.topic,
    expanded0: false,
    expanded1: false,
    expanded2: false
  }

handleExpandClick0= () =>{
  this.setState({
    expanded0: !this.state.expanded0
  })
}
handleExpandClick1= () =>{
  this.setState({
    expanded1: !this.state.expanded1
  })
}
handleExpandClick2= () =>{
  this.setState({
    expanded2: !this.state.expanded2
  })
}

  componentWillReceiveProps(nextProps){
    this.setState({
      selectTab :0,
      topic: nextProps.topic
        //stringPicture: nextProps.topic.stringPicture
  });
  }
  render(){ 
    const {classes} = this.props;
    //const{tabContent} = this.state;
    const {topic,expanded0,expanded1,expanded2} = this.state;
    //const topicID = this.props.topic.topicID;
    //const proteinList = this.props.topic.proteinList.split('\t');
    /*let averagePics = proteinList.map(protein =>(
      "http://localhost:8080/" + imageURL.averagePlot[0][protein]
    ));*/
     
    return (
            <div className={classes.jumbotron}>
                <Grid container justify = "center">
                  <Paper elevation={0} className={classes.card}>
                        <Typography variant="h5" paragraph={true}>
                                Topic Genes and Neighbor Topics
                            </Typography>
                            
                    <Paper elevation={4}>  

                    <CardContent>   
                      <Typography component="div" >                       
                                <Paper className={classes.tagpaper} elevation = {0}>
                                      <Typography variant = "h6">
                                      Top 10 topics binding at the same genes:
                                      </Typography>
                                  </Paper> 
                                <Divider/>
                              <Grid container 
                                    direction="row"
                                    justify="flex-start"
                                    //alignItems="center"
                                    spacing={0}
                                    //className={classes.mainContainer}
                                  >     
                                                   
                                  <Grid item >
                                   <Paper className={classes.smalltagpaper} elevation = {0}>
                                      <Typography variant="subtitle1" align = 'center'>
                                      Significance of overlapping gene list of topics
                                      </Typography>
                                  </Paper> 
                                  </Grid>
                                  
                              </Grid> 
                                  

                        <Grid container 
                              direction="column"
                              //justify="flex-start"
                              alignItems="flex-start"
                              spacing = {0}>

                              <Grid item justify="flex-start"
                                  >     
                                  <Card elevation={0} className={classes.imagecard}>
                                        
                                            <img 
                                              src={Config.settings.apiURL +'/' + topic.topicSubsectorSignificance} alt="subsector"
                                    className={classes.featureHeatmap}
                                              onClick={this.handleExpandClick0}
                                              aria-expanded={this.state.expanded0}
                                              aria-label="Show more"
                                          />
                          
                                        
                                        
                                          <Collapse in={expanded0} timeout="auto" unmountOnExit>
                                              <CardContent >
                                                  <Paper className={classes.root} elevation={3}>
                                                    {<TopicSubsectorTable table = {topic.topicSubsectorResults}/>}
                                                  </Paper>
                                              </CardContent>
                                          </Collapse>
                                    </Card>   

                              </Grid>



                              <Grid item justify="flex-start"
                                  >     
                                  <Card elevation={0} className={classes.imagecard}>
                                        
                                            <img 
                                              src={Config.settings.apiURL +'/' + topic.topicSubsectorSignificanceSubsectorSpecific} alt="subsector"
                                    className={classes.featureHeatmap}
                                              onClick={this.handleExpandClick1}
                                              aria-expanded={this.state.expanded1}
                                              aria-label="Show more"
                                          />
                                        
                                        
                                          <Collapse in={expanded1} timeout="auto" unmountOnExit>
                                              <CardContent>
                                              <Paper className={classes.root} elevation={3}>
                                                {<TopicSubsectorTable table = {topic.topicSubsectorResultsSubsectorSpecific}/>}
                                              </Paper>
                                              </CardContent>
                                          </Collapse>
                                    </Card>   

                              </Grid>

                              </Grid>

                                <Paper className={classes.tagpaper} elevation = {0}>
                                      <Typography variant = "h6">
                                      Topics around the reference topic bins:
                                      </Typography>
                                </Paper> 
                                <Divider/>          
                                <Grid item justify="flex-start">     

                                  <Card elevation={0}>
                                        <CardContent >
                                              <img 
                                              src={Config.settings.apiURL +'/'+ topic.neighborTopicsPlot[0].figure} alt="neighborTopicsPlot"
                                          className={classes.bigfeatureHeatmap}
                                              onClick={this.handleExpandClick2}
                                              aria-expanded={this.state.expanded2}
                                              aria-label="Show more"
                                          />
                                            
                                        </CardContent>
                                        
                                        
                                          <Collapse in={expanded2} timeout="auto" unmountOnExit>
                                              <CardContent>
                                                  <Paper className={classes.root} elevation={3}>
                                                      {<NeighborTopicTable table = {topic.neighborTopicsPlot}/>}
                                                  </Paper>
                                              </CardContent>
                                          </Collapse>
                                    </Card>
                              
                                  </Grid>

                                  

                                  



                        </Typography>          
                      </CardContent>
                      </Paper> 
                      </Paper> 
                    
                        
                    
                </Grid>
            </div>     

          
       
    );
}}


Gene.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Gene);