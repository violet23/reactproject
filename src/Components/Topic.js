import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';


const styles = theme => ({
  card: {
    maxWidth: 400,
    margin:'0 auto',
    padding: 20
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class RecipeReviewCard extends React.Component {
  state = { expanded: false,
    samples:[] 
};

  componentDidMount(){
      var getURL = "http://localhost:8080/reviewSamples";
      axios.get(getURL).then(
        res =>{
            console.log(res.data.sample[0]);
            this.setState({
                samples:res.data.sample[0]
            });               
        }
      );
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props; 
    // console.log(this.state);
    // console.log(this.state.samples.sample_id);
    
    

    return (
      <Card className={classes.card}>
        <CardContent>
            <Typography>
               {this.state.samples.sample_id}
            </Typography>
            <Typography>
               {this.state.samples._id}
            </Typography>
        </CardContent>
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);
