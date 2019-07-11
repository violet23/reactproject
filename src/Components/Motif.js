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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import comingup from '../comingup.png';
import MotifHitTable from './MotifHitTable';

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
        minWidth: 1100
    },    
    largecard: {
      maxWidth: 1200,
      minWidth: 1200
  },      
    featureHeatmap:{
      width: 320,
      height:150,
      marginTop:20,
      marginBottom:20,
    //   border: '2px solid yellow'
  },  
  featureHeatmapbar:{
      width: 110,
      height:170,
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
      table: {
        maxWidth: 100,
      },
      root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
      },
});

function createData([Motif,Width, Sites, LLR, E_value]) {
  return {Motif,Width, Sites, LLR, E_value};
}

class Motif extends React.Component { 
  state = {
    selectTab :0,
    singleMotif:this.props.topic.motif[0][1]
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      selectTab :0,
      singleMotif: nextProps.topic.motif[0][1]
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
            this.setState({
              selectTab: selectedTab,
              singleMotif: this.props.topic.motif[0][selectedTab+1]
            });
          break;
        case 2:
        this.setState({
            selectTab: selectedTab,
            singleMotif: this.props.topic.motif[0][selectedTab+1]
        })
        break;
        default:
            this.setState({
              selectTab: selectedTab,
              singleMotif: this.props.topic.motif[0][1]
            })
      }
  };

  render(){ 
    const {classes} = this.props;
    const {singleMotif} = this.state
    //let heatmap3 = proteinList.map((protein)=>("http://localhost:8080/" + imageURL.heatmap3category[0][protein]));

    //Get number of motifs and tag them
    var motifNum = [];
    if(this.props.topic.motif !== []){
    for (var key in this.props.topic.motif[0]) {
      if (this.props.topic.motif[0].hasOwnProperty(key)) {
          motifNum.push(key)
          }
      }
    }
    console.log(motifNum)
    var tabList = (motifNum.length)=== 0 ?
    <Tab label={"Motif "}  key={0}/>
    :motifNum.map(item=>(
    <Tab label={"Motif "+item}  key={item-1}/>
    ))

    const rows = (motifNum.length)=== 0 ?
    [0,0,0,0,0]
    :[createData(singleMotif.values.split('\t')),];
    //render single motif materials, If no motif then show "no motifs"
    console.log(rows)
    const motifInfo = (motifNum.length)=== 0 ?
      (<CardContent> 
          <Typography>
            No Motif to show
          </Typography>
        </CardContent>)
    :(
      <Grid container 
            direction="column"
            //justify="space-evenly"
            alignItems="center"
            spacing={0}
            className={classes.mainContainer}
            >
                <Grid item >
                  <img src={"http://localhost:8080/"+singleMotif.logo} alt="Motif logo"
                  className={classes.featureHeatmap}/>
                </Grid>
                <Divider/>
                <Grid container 
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    spacing={2}
                    className={classes.mainContainer}
                    >
                <Grid item>
                <Paper className={classes.root} elevation={3}>
                  <Table size = 'small'>
                    <TableHead>
                      <TableRow>
                        <TableCell>Motif</TableCell>
                        <TableCell align="center">Width</TableCell>
                        <TableCell align="center">Sites</TableCell>
                        <TableCell align="center">LLR</TableCell>
                        <TableCell align="center">E_value</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map(row => (
                        <TableRow key={row.Motif}>
                          <TableCell component="th" scope="row">
                            {row.Motif}
                          </TableCell>
                          <TableCell align="center">{row.Width}</TableCell>
                          <TableCell align="center">{row.Sites}</TableCell>
                          <TableCell align="center">{row.LLR}</TableCell>
                          <TableCell align="center">{row.E_value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  </Paper>
                  </Grid>
                  <Divider/>
                  <Grid item>
                      <Paper className={classes.root} elevation={3}>
                        {<MotifHitTable singleMotif = {singleMotif}/>}
                      </Paper>
                  </Grid>
                    
              </Grid>
              </Grid>        
    )

    
     
    return (
            <div className={classes.jumbotron}>
                <Grid container justify = "center">
                  <Paper elevation={0} className={classes.card}>
                        <Typography variant="h5" paragraph={true}>
                                Motifs
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
                          {tabList}
                        </Tabs>
                        <Divider/>

                    <CardContent className = {classes.card}>   
                      <Typography component="div" >      
                              {/*tags if contained*/}                 
                              <Grid container direction="row" ></Grid>
                              
                                  {motifInfo}
                            
                        </Typography>          
                      </CardContent>
                      </Paper> 
                      </Paper> 
                    
                        
                    
                </Grid>
            </div>      
          
       
    );
}}

Motif.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Motif);