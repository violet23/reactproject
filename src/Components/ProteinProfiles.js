import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Config from '../Config.js'

const styles = theme => ({
  jumbotron:{
    padding: '1rem 1rem',
    bottomMargin:'1rem',     
},
  tagpaper:{
      width: 150,
      overflowX: 'scroll',
  },
    card: {
        maxWidth: 1100,
        minWidth: 1100
    },    
    largecard: {
      maxWidth: 1200,
      minWidth: 1200
  },      
    featureHeatmap:{
      width: 150,
      height:180,
      marginTop:20,
      marginBottom:20,
    //   border: '2px solid yellow'
  },  
  featureHeatmapbar:{
      width: 10,
      height:180,
      marginTop:20,
      marginBottom:20,

  },
  myColor:{
    background: 'black'
  },
      searchbar:{
        width: 1100
      },
    scroller:{
      overflow: "scroll"
    },
      colorBar:{
        height: 470,
        width: 20,
        marginTop:14,
        marginLeft: -15   
      },
      scroll1card:{
        //maxWidth: 10000,
        minWidth: 10000,
        overflowY : "hidden",
        overflowX: "auto",
        maxHeight: 230,
      },
      scrolltagcard:{
        minWidth: 10000,
        //minWidth: 1000,
        overflowX : "auto",
        maxHeight: 25,
        //minHeight: 25
    },  
    pcard: {
      //maxWidth: 1100,
      width: 1100,
      overflow: 'scroll'
  },   
});


class ProteinProfiles extends React.Component { 
  state = {
    selectTab :0,
    imageURL:this.props.protein.bindingRegionProfiles[0]
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      selectTab :0,
      imageURL: nextProps.protein.bindingRegionProfiles[0]
        //stringPicture: nextProps.topic.stringPicture
  });
  }

  handleChange = (event, selectedTab) => {
    
    switch(selectedTab) {
        case 1:
          console.log(selectedTab);
          
            this.setState({
              selectTab: selectedTab,
              imageURL: this.props.protein.tssProfiles[0]
            });
          break;
        case 2:
        this.setState({
            selectTab: selectedTab,
            imageURL: this.props.protein.tesProfiles[0]
        })
        break;
        default:
            this.setState({
              selectTab: selectedTab,
              imageURL: this.props.protein.bindingRegionProfiles[0]
            })
      }
  };

  render(){ 
    const {classes} = this.props;
    //const{tabContent} = this.state;
    console.log(this.props.protein.proteinName)
    const {imageURL} = this.state;
    const proteinName = this.props.protein.proteinName;
    const topicList = this.props.protein.topicList.split('\t');
    let averagePics = topicList.map(topic =>(
      Config.settings.apiURL +'/' + imageURL.averagePlot[0][topic]
    ));
    let heatmapPics= topicList.map((topic)=>(Config.settings.apiURL +'/' + imageURL.heatmap[0][topic]));
    let heatmap3 = topicList.map((topic)=>(Config.settings.apiURL +'/' + imageURL.heatmap3category[0][topic]));
    console.log(imageURL.averagePlot[0])
    console.log(averagePics);
    
    const heatmap3category = this.state.selectTab === 0
        ?(<CardContent > 
          <Typography>
            No heatmap3category pics
          </Typography>
          </CardContent>)
        :(<Grid container direction="row"
              justify="flex-start"
              alignItems="flex-start"
              spacing={0}
              //className={classes.mainContainer}
            >                       

            <Grid item >
              <img src={Config.settings.apiURL +'/'+ imageURL.heatmap3categoryBar} alt="heatmap3"
              className={classes.featureHeatmapbar}/>
            </Grid>

            <Grid item >
              <img src={Config.settings.apiURL +'/' + imageURL.heatmap3category[0][proteinName]} alt="heatmap3"
              className={classes.featureHeatmap}/>
            </Grid>
            

            <Grid item >
              {heatmap3.map(item =>(
                <img
              src = {item}
              alt="heatmap3" 
              className={classes.featureHeatmap}
              />
              ))}
            </Grid>

          </Grid>)  
     
    return (
        <div className={classes.largecard}>
            <div className={classes.jumbotron}>
                <Grid container justify = "center">
                  <Paper elevation={0} className={classes.card}>
                        <Typography variant="h5" paragraph={true}>
                                Profiles
                            </Typography>
                  </Paper>      
                    <Paper elevation={4}>  
                        <Tabs
                          value={this.state.selectTab}
                          onChange={this.handleChange}
                          variant="scrollable"
                          scrollButtons="on"
                          textColor="primary" 
                          classes={{scrollable:classes.scroller, indicator:classes.myColor}}  
                        >
                          <Tab label="Binding Region Profiles" key={0} />
                          <Tab label="TSS Profiles" key={1} />
                          <Tab label="TES Profiles" key={2} />
                        </Tabs>
                        <Divider/>

                    <CardContent className = {classes.pcard}>   
                    <Paper className={classes.scrolltagcard} elevation = {0}>                      
                              <Grid container direction="row" >
                                <Paper className={classes.tagpaper} elevation = {0}>
                                      <Typography align = 'center'>
                                               {proteinName}
                                      </Typography>
                                  </Paper> 
                                 
                                  {topicList.map(item =>(
                                    <Paper className={classes.tagpaper} elevation = {0}>
                                      <Typography align = 'center'>
                                               Topic-{item}
                                      </Typography>
                                    </Paper>
                                    ))} 
                              </Grid>
                              </Paper>

                              
                              <Paper className={classes.scroll1card} elevation = {0}>   
                              <Grid container 
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="flex-start"
                                    spacing={0}
                                    className={classes.scroller}
                                  >     
                                                   
                                  <Grid item >
                                    <img src={Config.settings.apiURL +'/' + imageURL.averagePlot[0][proteinName]} alt="average"
                                    className={classes.featureHeatmap}/>
                                    {averagePics.map(item =>(
                                      <img
                                        src = {item}
                                        alt="average" 
                                        className={classes.featureHeatmap}
                                      />
                                          
                                    ))}
                                    
                                  </Grid>
                              </Grid>   

                              <Divider/>
                              </Paper>

                              <Paper className={classes.scroll1card} elevation = {0}>   
                              <Grid container 
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="flex-start"
                                    spacing={0}
                                    //className={classes.mainContainer}
                                  >                       
                                  <Grid item >
                                    <img src={Config.settings.apiURL +'/'+ imageURL.heatmap[0][proteinName]} alt="heatmap"
                                    className={classes.featureHeatmap}/>
                                    {heatmapPics.map(item =>(
                                      <img
                                    src = {item}
                                    alt="heatmap" 
                                    className={classes.featureHeatmap}
                                    />
                                    ))}
                                  </Grid>

                              </Grid>

                              <Divider/>
                              </Paper>

                              <Paper className={classes.scroll1card} elevation = {0}> 
                                  {heatmap3category}
                              </Paper>
      
                      </CardContent>
                      </Paper> 
                      
                    
                        
                    
                </Grid>  
            </div>  
            </div>
          
       
    );
}}

ProteinProfiles.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ProteinProfiles);