import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TopicSubsectorTable from './TopicSubsectorTable';
import NeighborTopicTable from './NeighborTopicTable';
import comingup from '../comingup.png';

const styles = theme => ({
  jumbotron:{
    padding: '1rem 1rem',
    bottomMargin:'1rem',     
},
  tagpaper:{
      minWidth: 150,
      marginTop:20,
      marginBottom:10,
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
        marginTop:20,
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
    width: 300,
    height:320,
    marginTop:30,
    marginBottom:20,
  //   border: '2px solid yellow'
},  
  myColor:{
    background: 'black'
  },
      searchbar:{
        width: 1100
      },
    scroller:{
      overflow: "hidden"
    },
      mainContainer:{
          overflow: 'scroll'
      },
      colorBar:{
        height: 470,
        width: 20,
        marginTop:14,
        marginLeft: -15   
      },
      root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
      },
});


class Gene extends React.Component { 
  state = {
    selectTab :0,
    topic:this.props.topic
  }

  /*componentDidMount(){
    this.setState({
      selectTab :0,
      bindingRegionProfiles: this.props.topic.bindingRegionProfiles[0],
      tssProfiles: this.props.topic.tssProfiles[0],
      tesProfiles : this.props.topic.tesProfiles[0],
        //stringPicture: this.props.topic.stringPicture
});}*/

  componentWillReceiveProps(nextProps){
    this.setState({
      selectTab :0,
      topic: nextProps.topic
        //stringPicture: nextProps.topic.stringPicture
  });
  }

  /*handleChange = (event, selectedTab) => {
    
    selectedTab === 0 ? this.setState({
        selectedTab: selectedTab,
        imageURL: this.props.topic.bindingRegionProfiles[0]
    }) : 
    this.setState({
        selectedTab: selectedTab,
        imageURL: this.props.topic.tssProfiles[0]
    })
  };*/
  render(){ 
    const {classes} = this.props;
    //const{tabContent} = this.state;
    const {topic} = this.state;
    const topicID = this.props.topic.topicID;
    const proteinList = this.props.topic.proteinList.split('\t');
    console.log()
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

                    <CardContent className = {classes.card}>   
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
                                    className={classes.mainContainer}
                                  >     
                                                   
                                  <Grid item >
                                   <Paper className={classes.smalltagpaper} elevation = {0}>
                                      <Typography variant="subtitle1" align = 'center'>
                                      Significance of overlapping gene list of topics
                                      </Typography>
                                  </Paper> 
                                  </Grid>
                                  {/*<Grid item >
                                  <Paper className={classes.smalltagpaper} elevation = {0}>
                                      <Typography variant="subtitle1" align = 'center'>
                                      # common genes
                                      </Typography>
                                  </Paper> 
                                  </Grid>
                                  <Grid item >
                                  <Paper className={classes.smalltagpaper} elevation = {0}>
                                      <Typography variant="subtitle1" align = 'center'>
                                      Percent of common genes with respect to other topics
                                      </Typography>
                                  </Paper> 
                                  </Grid>*/}
                              </Grid> 
                              <Grid container 
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="flex-start"
                                    spacing={4}
                                    className={classes.mainContainer}
                                  >     
                                                   
                                  <Grid item >
                                    <img src={"http://localhost:8080/" + topic.topicSubsectorSignificance} alt="subsector"
                                    className={classes.featureHeatmap}/>
                                  </Grid>
                                  {/*<Grid item >
                                    <img src={"http://localhost:8080/" + topic.topicSubsectorNoCommonGenes} alt="average"
                                    className={classes.featureHeatmap}/>
                                  </Grid>
                                  <Grid item >
                                    <img src={"http://localhost:8080/" + topic.topicSubsectorPercentCommonGenesForTopics} alt="average"
                                    className={classes.featureHeatmap}/>
                                  </Grid>*/}
                                  <Grid item>
                                      <Paper className={classes.root} elevation={3}>
                                        {<TopicSubsectorTable table = {topic.topicSubsectorResults}/>}
                                      </Paper>
                                  </Grid>
                              </Grid>  
                              <Grid container 
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="flex-start"
                                    spacing={4}
                                    className={classes.mainContainer}
                                  >     
                                                   
                                  <Grid item >
                                    <img src={"http://localhost:8080/" + topic.topicSubsectorSignificanceSubsectorSpecific} alt="subsector"
                                    className={classes.featureHeatmap}/>
                                  </Grid>
                                  {/*<Grid item >
                                    <img src={"http://localhost:8080/" + topic.topicSubsectorNoCommonGenesSubsectorSpecific} alt="average"
                                    className={classes.featureHeatmap}/>
                                  </Grid>
                                  <Grid item >
                                    <img src={"http://localhost:8080/" + topic.topicSubsectorPercentCommonGenesForTopicsSubsectorSpecific} alt="average"
                                    className={classes.featureHeatmap}/>
                                  </Grid>*/}
                                  <Grid item>
                                      <Paper className={classes.root} elevation={3}>
                                        {<TopicSubsectorTable table = {topic.topicSubsectorResultsSubsectorSpecific}/>}
                                      </Paper>
                                  </Grid>
                              </Grid>
                                <Paper className={classes.tagpaper} elevation = {0}>
                                      <Typography variant = "h6">
                                      Topics around the reference topic bins:
                                      </Typography>
                                </Paper> 
                                <Divider/>
                                <Grid container 
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="flex-start"
                                    spacing={4}
                                    className={classes.mainContainer}
                                  >     
                                                   
                                  <Grid item >
                                    <img src={"http://localhost:8080/" + topic.neighborTopicsPlot[0].figure} alt="neighborTopicsPlot"
                                    className={classes.bigfeatureHeatmap}/>
                                  </Grid>
                                  {/*<Grid item >
                                    <img src={"http://localhost:8080/" + topic.topicSubsectorNoCommonGenesSubsectorSpecific} alt="average"
                                    className={classes.featureHeatmap}/>
                                  </Grid>
                                  <Grid item >
                                    <img src={"http://localhost:8080/" + topic.topicSubsectorPercentCommonGenesForTopicsSubsectorSpecific} alt="average"
                                    className={classes.featureHeatmap}/>
                                  </Grid>*/}
                                  <Grid item>
                                      <Paper className={classes.root} elevation={3}>
                                        {<NeighborTopicTable table = {topic.neighborTopicsPlot}/>}
                                      </Paper>
                                  </Grid>
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