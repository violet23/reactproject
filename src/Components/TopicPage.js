import React from 'react';
import axios from 'axios';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import Config from '../Config';
import TopicStatisticsTable from './TopicStatisticsTable'
import Tooltip from '@material-ui/core/Tooltip';
import DownloadIcon from '@material-ui/icons/GetApp';

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
        minWidth: 1200,
        maxWidth: 1200
    },           
    
      searchbar:{
        width: 1100
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      collapse: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(0deg)',
      },
      leftIcon: {
        marginRight: theme.spacing(0)
        // fontSize: 25,
      },  
      smallcard:{
        maxWidth: 10
      }
});



class TopicPage extends React.Component {
  state ={
        topicName :  ' Undefined',
        proteinList: 'Undefined',
        genelist: "Undefined",
        wigFile: "Undefined",
        loading: true,
        message: "Fetching",
        expanded: false,

    }
    
    handleExpandClick= () =>{
        this.setState({
          expanded: !this.state.expanded
        })
    }
    handlewigDownloadClick = () => {
      //console.log(this.state.wigFile)
      var win = window.open(this.state.wigFile);
        win.focus();

    }
    handlegeneDownloadClick = () => {
      //console.log(this.state.genelist)
      var win = window.open(this.state.genelist);
        win.focus();
        
    }



    componentDidMount (){
        const topic = window.location.pathname;
        const topicURL = Config.settings.apiURL +Config.settings.topicsEndpoint +topic;
        
        axios.get(topicURL).then(result=>{
          let topicID = result.data.topic.map(topic =>{
              return topic.topicID
          });
          const proteinList = result.data.topic.map(topic =>{
              return topic.proteinList.split("\t").join(', ')
          });
          const genelist = result.data.topic.map(topic =>{
            return "http://localhost:8080/"+ topic.geneList
        });
        const wigFile = result.data.topic.map(topic =>{
          return "http://localhost:8080/"+ topic.wigFile
      });
          this.setState({
            topicName: topicID[0],
            proteinList: proteinList[0],
            genelist: genelist,
            loading: false,
            wigFile: wigFile
          });
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
        const{topicName,proteinList,loading,message,expanded,genelist,wigFile} = this.state;
                  
    return (
            <div>
            <div className={classes.jumbotron}>
            <Grid container justify = "center">
                <Card className={classes.card}>
                    <CardContent >
                        <Typography gutterBottom variant="h4" component="h2">
                            Topic{topicName}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h5">
                        Protein List: {proteinList}
                        </Typography>
                        {/*<Grid container spacing={8} alignItems={"center"}>
                                <Grid item sm={"auto"}>
                        <Typography component="p" variant="body1" >
                            
                        </Typography>
                        </Grid>
                        </Grid>*/}

                    </CardContent>
                    <Divider variant="middle"/>
                    

                    <CardActions>
                    <Tooltip title="Download">
                                        <Button size="small" color="primary" onClick={this.handlewigDownloadClick}>
                                        <DownloadIcon className={classes.leftIcon} />
                                            Wig File
                                        </Button>
                    </Tooltip>
                    <Tooltip title="Download">
                                        <Button size="small" color="primary" onClick={this.handlegeneDownloadClick}>
                                        <DownloadIcon className={classes.leftIcon} />
                                            Gene List
                                        </Button>
                    </Tooltip>

                    <Button
                        size = "small"
                        className={clsx(classes.expand, {[classes.expandOpen]: expanded,})}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                    >
                      Learn more
                        
                    </Button>
                  </CardActions>
                      <Collapse in={expanded} timeout="auto" unmountOnExit>
                          <CardContent>
                          <TopicStatisticsTable />
                          {/*<Grid item style={{margin: '0 auto', padding:20}}>                    
                                <TopicStatisticsTable />
                            </Grid>*/}  
                          </CardContent>
                      </Collapse>
                </Card>
            </Grid>
                <br/> 
                {/* Sample Explore Table */}
                        
            </div>
            </div>
            
       
    );
}}

TopicPage.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(TopicPage);