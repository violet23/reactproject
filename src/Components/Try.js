import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';

const styles = theme => ({
  card: {
    maxWidth: 400,
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
  state = { expanded: false , samples:[]};

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

    return (
      <Card className={classes.card}>
        <CardHeader
          title="Included Porteins"
        />
        <CardMedia
          className={classes.media}
          image="http://localhost:8080/images/string0.png"
          title="String Graph"
        />
        <CardContent>
          <Typography component="p">
            Let's just try if this thing works, I hope so. You can try to click the button.
            But not sure if it works. :)
          </Typography>
        </CardContent>

        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Relative information:</Typography>
            <Typography>
              Ok here is the sample_id(idk what it is tbh):
            </Typography>
            <Typography paragraph>
            {this.state.samples.sample_id}
            </Typography>
            <Typography>
              Ok now it is topic name(well maybe you already knew): 
            </Typography>
            <Typography paragraph>
            {this.state.samples.topic}
            </Typography>
            <Typography>
              No more, the database is not offical now.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}



RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);