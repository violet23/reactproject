/* eslint-disable react/prop-types, react/jsx-handler-names */

import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';


const styles = theme => ({
  root: {     
    minWidth: 500,
    [theme.breakpoints.down('sm')]: {
      minWidth: 300,
    },
    [theme.breakpoints.up('md')]: {
      minWidth: 500,
    },
  },
  input: {
    display: 'flex',
    padding: 8,
    border: `1px solid ${theme.palette.primary[300]}`,    
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  }, 
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 15,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 999,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  inputContainer:{
    padding:'8px 0px 0px 0px',
  }
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
      
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >    
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class Search extends React.Component {
  state = {
    single: "",    
  };
  

  handleChange = name => item => {
    this.setState({
        [name]: item,
      });

    //Do nothing when the value is null
      if(!item){
        console.log(item);
      }
      else{
          // console.log(item.category);
          
          item.category === 'standardGeneName' 
          ? this.props.updateContent(item.label.split(' / ')[0])() : this.props.updateContent(item.value.split(' / ')[1])();
      }   
  };

  handleBlur = () => {
    this.setState({
        single: '',
      });    
  };


  render() {
    const { classes, theme, suggestions } = this.props;    

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
        padding: 4
      }),
    };

    return (
      <div className={classes.root}>
        <NoSsr>
        <Paper className={classes.inputContainer} square={true} elevation={1}>                       
                <Select
                    classes={classes}
                    styles={selectStyles}
                    options={suggestions}
                    components={components}
                    value={this.state.single}
                    onChange={this.handleChange('single')}
                    onBlur={this.handleBlur}
                    placeholder="Search your favourite factor"
                    isClearable
                    autoFocus
                />
          </Paper>
        </NoSsr>
      </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Search);
