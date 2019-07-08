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
    center : {
        margin: 'auto',      
        maxWidth: 1100,
        padding: 5,
        // border: '2px solid green'
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
    imageURL:{
    bindingRegionProfiles: this.props.topic.bindingRegionProfiles[0],
    tssProfiles: this.props.topic.tssProfiles[0],
    tesProfiles : this.props.topic.tesProfiles[0]},
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
      imageURL:{
      bindingRegionProfiles: nextProps.topic.bindingRegionProfiles[0],
      tssProfiles: nextProps.topic.tssProfiles[0],
      tesProfiles : nextProps.topic.tesProfiles[0]},
        //stringPicture: nextProps.topic.stringPicture
  });
  }

  /*handleChange = (event, selectedTab) => {
    
    selectedTab === 0 ? this.setState({
        selectedTab: selectedTab,
        imageURL: {average_topic: this.props.topic.bindingRegionProfiles[0]}
    }) : 
    this.setState({
        selectedTab: selectedTab,
        imageURL: {average_topic: this.props.topic.tssProfiles[0]},
    })
  };*/

  render(){ 
    const {classes} = this.props;
    const{tabContent} = this.state;
    const bindingRegionProfiles = this.state.imageURL.bindingRegionProfiles;
    const topicID = this.props.topic.topicID;
    const proteinList = this.props.topic.proteinList.split('\t');
    let BRPpics_average = proteinList.map((protein)=>("http://localhost:8080/" + bindingRegionProfiles.averagePlot[0][protein]));
    let BRPpics_heatmap= proteinList.map((protein)=>("http://localhost:8080/" + bindingRegionProfiles.heatmap[0][protein]));
       
    return (
            <div className={classes.largecard}>
              
                <Grid container justify = "center">
                  <Paper elevation={0} className={classes.card}>
                        <Typography variant="h5" paragraph={true}>
                                Profiles
                            </Typography>
                    <Paper>  
                        <Tabs
                          value={tabContent}
                          //onChange={this.handleChange}
                          indicatorColor="primary"
                          textColor="primary"
                          variant="scrollable"
                          scrollButtons="on"            
                          classes={{scrollable:classes.scroller}}   
                        >
                          <Tab label="Binding Region Profiles" key={0} />
                          <Tab label="TSS Profiles" key={1} />
                          <Tab label="TES Profiles" key={2} />
                        </Tabs>
                        <Divider/>

                    <CardContent className = {classes.card}>   
                                  {/* Bottom Section */}          
                        <Typography component="div" >                       
                              <Grid container 
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="flex-start"
                                    spacing={0}
                                    className={classes.mainContainer}
                                  >                       
                                  {<Grid item >
                                    <img src={"http://localhost:8080/" + bindingRegionProfiles.averagePlot[0][topicID]} alt="bindingRegionProfiles"
                                    className={classes.featureHeatmap}/>
                                  </Grid>}
                                  {<Grid item >
                                    {BRPpics_average.map(item =>(
                                      <img
                                    src = {item}
                                    alt="bindingRegionProfiles" 
                                    className={classes.featureHeatmap}
                                    />
                                    ))}
                                    
                                  </Grid>}
                              </Grid>   

                              <Divider/>

                              <Grid container 
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="flex-start"
                                    spacing={0}
                                    className={classes.mainContainer}
                                  >                       
                                  {<Grid item >
                                    <img src={"http://localhost:8080/" + bindingRegionProfiles.heatmap[0][topicID]} alt="bindingRegionProfiles"
                                    className={classes.featureHeatmap}/>
                                  </Grid>}
                                  
                                  {<Grid item >
                                    {BRPpics_heatmap.map(item =>(
                                      <img
                                    src = {item}
                                    alt="heatmap" 
                                    className={classes.featureHeatmap}
                                    />
                                    ))}
                                  </Grid>}
                              </Grid>   
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