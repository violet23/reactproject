import React from 'react';
import axios from 'axios';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Config from '../Config';
import TopicStatisticsTable from './TopicStatisticsTable'
const styles = theme => ({
          
    center : {
        margin: 'auto',      
        maxWidth: 1100,
        padding: 10,
        // border: '2px solid green'
      },
    card: {
        minWidth: 1100
    },           
      navbar:{
        
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
      expandOpen: {
        transform: 'rotate(0deg)',
      },
       
    
});



class TopicPage extends React.Component {
  state ={
        topicName :  ' Undefined',
        proteinList: 'Undefined',
        loading: true,
        message: "Fetching Topics",
        expanded: false
    }
    
    handleExpandClick= () =>{
        this.setState({
          expanded: !this.state.expanded
        })
    }
    componentDidMount (){
        const topic = window.location.pathname;
        const topicURL = Config.settings.apiURL +Config.settings.topicsEndpoint +topic;
        console.log(topicURL);
        
        axios.get(topicURL).then(result=>{
          let topicID = result.data.topic.map(topic =>{
              return topic.topicID
          });
          const proteinList = result.data.topic.map(topic =>{
              return topic.proteinList.split("\t").join()
          });
          this.setState({
            topicName: topicID[0],
            proteinList: proteinList[0],
            loading: false
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
        const{topicName,proteinList,loading,message,expanded} = this.state;
    return (
            <div>
            <Grid container justify = "center">
                <Card className={classes.card}>
                    <CardContent >
                        <Typography gutterBottom variant="h4" component="h2">
                            Topic{topicName}
                        </Typography>
                        <Grid container spacing={8} alignItems={"center"}>
                                <Grid item sm={"auto"}>
                        <Typography component="p" variant="body1" >
                            Protein list: {proteinList}
                        </Typography>
                        </Grid>
                        </Grid>

                    </CardContent>
                    <Divider variant="middle"/>
                    <CardActions>

                    {/*<Button size="small">
                    Learn More

                    </Button>*/}
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
        
       
    );
}}

TopicPage.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(TopicPage);