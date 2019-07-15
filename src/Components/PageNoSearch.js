import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import SearchTable from './SearchTable'
// import image assets
import pennstatelogo from '../pennstatelogo.png';
import cegrlogo from '../CEGRlogo.png';

const styles =({
    root: {
        height: '100vh',
        display: 'flex',
        flexDirection:'column',        
        //background: 'linear-gradient(to bottom,#efefda,#efefda)' 
    },
    content:{
        flex : '1 0 auto',
    },
    footer: {
        /* Prevent Chrome, Opera, and Safari from letting these items shrink to smaller than their content's default minimum size. */
        flexShrink: 0,       
      },
      jumbotron:{
          padding: '4rem 2rem',
          bottomMargin:'2rem',     
      },
      container:{
          maxWidth: '1140px',
          paddingRight: 15,
          paddingLeft: 15,
          margin: "auto"
      }, 
      center : {
        margin: 'auto',
        maxWidth: 1140,
      },
      webLink:{
          textDecoration: 'none',
      }
});

const PageNoSearch = (props) =>{
    const{classes} = props;
    return (
         
        <div className={classes.root}>
            
            <div className={classes.content}>
            <Paper >
            {/* Jumbotron or main message */}
                <div className={classes.jumbotron}>
                    <div className={classes.container}>
                    <Typography variant="h2" gutterBottom>
                    Topics Yeast Epigenome Project
                        </Typography>
                        
                        {/*<Typography variant="subtitle1" gutterBottom>
                        <em>Saccharomyces cerevisiae</em> epigenome                        
                        </Typography><Divider/>
                        <Typography variant="caption" component="p" gutterBottom>
                        An improved understanding of how genes are regulated requires an improved understanding of where gene regulatory proteins are bound.
                        </Typography>*/}
                                   
                    </div>
                </div> 
                </Paper>
                <br/>
                <Grid container spacing={0} direction="column" justify="space-between" >
                

                    {/* Sample Explore Table */}
                    {<Grid item style={{margin: '0 auto', padding:20}}>                    
                        <SearchTable />
                    </Grid>}
                    
                    
                     {/*Footer  Section*/ 
                     <Grid item className={classes.center}> 
                        <Grid container spacing={10} alignItems={"center"} direction="row" justify="center" className={classes.footer}>
                            <Grid item>
                                <img src={pennstatelogo} alt="pennstateLogo" style={{width: 160}}/> 
                            </Grid>
                            <Grid item>
                                <img src={cegrlogo} alt="cegrlogo" style={{height: 55}}/>
                            </Grid>
                            <Grid item>
                                <Typography variant='body2' style={{paddingLeft:28}}>
                                    &copy; 2019 Pennsylvania State University
                                </Typography>
                            </Grid>
                        </Grid>                       
                    </Grid>}

                </Grid>                
            </div>

           
          
        </div>
        
       
    );
}

PageNoSearch.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PageNoSearch);