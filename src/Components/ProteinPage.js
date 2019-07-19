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
import Tooltip from '@material-ui/core/Tooltip';
import LaunchIcon from '@material-ui/icons/Launch';

import Config from '../Config';
import ProteinStatisticsTable from './ProteinStatisticsTable'
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
      expandOpen: {
        transform: 'rotate(0deg)',
      },
});


class ProteinPage extends React.Component {
  state ={
        proteinName :  ' Undefined',
        topicList: 'Undefined',
        description: "Undefined",
        loading: true,
        message: "Fetching Topics",
        expanded: false
    }
    
    handleExpandClick= () =>{
        this.setState({
          expanded: !this.state.expanded
        })
    }


    handleYEPClick = () => {
      const protein = (window.location.pathname).split("/")[2];
      
      const proteinURL = Config.settings.apiURL +Config.settings.proteinsEndpoint +"/" + protein;
      console.log(proteinURL);
      axios.get(proteinURL).then(result=>{
      const yepID = result.data.protein.map(protein =>{
          return protein.proteinName
      });
      let url = "https://mars.vmhost.psu.edu/yep/" + yepID;
      console.log(yepID);
      console.log(url);
      let yepWin = window.open(url, '_blank');
      yepWin.focus();
  }).catch(error =>{
      console.log(error);
      this.setState({
          loading: true,
          message: error.message
      })
  });;  
      
  }
    

    componentDidMount (){
      const protein = (window.location.pathname).split("/")[2];
        
        const proteinURL = Config.settings.apiURL +Config.settings.proteinsEndpoint +"/" + protein;
        console.log(proteinURL);
        
        axios.get(proteinURL).then(result=>{
          let proteinName = result.data.protein.map(protein =>{
              return protein.proteinName
          });
          const description = result.data.protein.map(protein =>{
            return protein.definition
        });
          const topicList = result.data.protein.map(protein =>{
              return protein.topicList.split("\t").join(", ")
          });
          
        
          this.setState({
            proteinName: proteinName[0],
            description : description[0],
            topicList: topicList[0],
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
        const{proteinName,topicList,description,expanded} = this.state;
    return (
            <div>
            <div className={classes.jumbotron}>
            <Grid container justify = "center">
                <Card className={classes.card}>
                    <CardContent >
                        <Typography gutterBottom variant="h4" component="h2">
                            {proteinName}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h5">
                            Topic list: {topicList}
                        </Typography>
                        <Grid container spacing={8} alignItems={"center"}>
                                <Grid item sm={"auto"}>
                        
                        <Typography component="p" variant="body1" >
                        {description}
                        </Typography>
                        
                        </Grid>
                        </Grid>

                    </CardContent>
                    <Divider variant="middle"/>
                    <CardActions>
                    <Tooltip title="YEP Page" aria-label="Go to YEP Page">
                                        <Button size="small" color="primary" onClick={this.handleYEPClick}>
                                        <LaunchIcon className={classes.leftIcon} />
                                        view on YEP
                                        </Button>
                    </Tooltip>
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
                 {<CardContent>
                  <ProteinStatisticsTable />
                  </CardContent>}
                </Collapse>
                </Card>
            </Grid>
                <br/> 
                {/* Sample Explore Table */}
                        
            </div>
            </div>
        
       
    );
}}

ProteinPage.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ProteinPage);