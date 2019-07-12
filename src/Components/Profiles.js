import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import comingup from '../comingup.png';

const styles = theme => ({
  jumbotron:{
    padding: '1rem 1rem',
    bottomMargin:'1rem',     
},
  tagpaper:{
      width: 150
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
        minWidth: 1100,
        
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
      overflow: 'scroll'
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
});


class Profiles extends React.Component { 
  state = {
    selectTab :0,
    imageURL:this.props.topic.bindingRegionProfiles[0]
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
      imageURL: nextProps.topic.bindingRegionProfiles[0]
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
  handleChange = (event, selectedTab) => {
    
    switch(selectedTab) {
        case 1:
          console.log(selectedTab);
          
            this.setState({
              selectTab: selectedTab,
              imageURL: this.props.topic.tssProfiles[0]
            });
          break;
        case 2:
        this.setState({
            selectTab: selectedTab,
            imageURL: this.props.topic.tesProfiles[0]
        })
        break;
        default:
            this.setState({
              selectTab: selectedTab,
              imageURL: this.props.topic.bindingRegionProfiles[0]
            })
      }
  };

  render(){ 
    const {classes} = this.props;
    //const{tabContent} = this.state;
    const {imageURL} = this.state;
    const topicID = this.props.topic.topicID;
    const proteinList = this.props.topic.proteinList.split('\t');
    let averagePics = proteinList.map(protein =>(
      "http://localhost:8080/" + imageURL.averagePlot[0][protein]
    ));
    let heatmapPics= proteinList.map((protein)=>("http://localhost:8080/" + imageURL.heatmap[0][protein]));
    let heatmap3 = proteinList.map((protein)=>("http://localhost:8080/" + imageURL.heatmap3category[0][protein]));
    
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
              className={classes.mainContainer}
              classes={{scrollable:classes.scroller}} 
            >                       

            <Grid item >
              <img src={"http://localhost:8080/" + imageURL.heatmap3categoryBar} alt="heatmap3"
              className={classes.featureHeatmapbar}/>
            </Grid>

            <Grid item >
              <img src={"http://localhost:8080/" + imageURL.heatmap3category[0][topicID]} alt="heatmap3"
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
                <Grid container justify = "center">
                  <Paper elevation={0} className={classes.card} >
                        <Typography variant="h5" paragraph={true}>
                                Profiles
                            </Typography>
                            
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

                    <CardContent className = {classes.card} classes={{scrollable:classes.scroller}} >   
                      <Typography component="div" >                       
                              <Grid container direction="row" >
                                <Paper className={classes.tagpaper} elevation = {0}>
                                      <Typography align = 'center'>
                                               Topic-{topicID}
                                      </Typography>
                                  </Paper> 
                                 
                                  {proteinList.map(item =>(
                                    <Paper className={classes.tagpaper} elevation = {0}>
                                      <Typography align = 'center'>
                                               {item}
                                      </Typography>
                                    </Paper>
                                    ))} 
                              </Grid>

                              

                              <Grid container 
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="flex-start"
                                    spacing={0}
                                    className={classes.mainContainer}
                                    classes={{scrollable:classes.scroller}} 
                                  >     
                                                   
                                  <Grid item >
                                    <img src={"http://localhost:8080/" + imageURL.averagePlot[0][topicID]} alt="average"
                                    className={classes.featureHeatmap}/>
                                  </Grid>
                                  
                                  <Grid item >
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

                              <Grid container 
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="flex-start"
                                    spacing={0}
                                    className={classes.mainContainer}
                                    classes={{scrollable:classes.scroller}} 
                                  >                       
                                  <Grid item >
                                    <img src={"http://localhost:8080/" + imageURL.heatmap[0][topicID]} alt="heatmap"
                                    className={classes.featureHeatmap}/>
                                  </Grid>
                                  
                                  <Grid item >
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

                              {heatmap3category}

                        </Typography>          
                      </CardContent>
                      </Paper> 
                      </Paper> 
                    
                        
                    
                </Grid>
            </div>      
          
       
    );
}}

Profiles.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Profiles);