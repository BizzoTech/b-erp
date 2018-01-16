import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from 'material-ui/AppBar';
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import { connect } from "react-kunafa";


const styles = theme => ({
  appBar: {
    position: "absolute",
    width: '100%'
  },
  button: {
    margin: theme.spacing.unit * 3
  },
  content: {
    width: '300px',
    height: '100%',
    margin: 'auto',
    marginTop: 200,
  }
});

class Signup extends Component {
  state = {
    username: '',
    password: '',
    password2: ''
  }
  signup = async () => {
    const { username, password, password2 } = this.state;
    if (username && password && password === password2) {
      const response = await fetch(`${location.origin}/signup`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (response.status == 200) {
        const result = await response.json();
        if(result.error){
          alert(result.error);
        } else {
          this.props.userLogin(result.name, result.password, result.event);
        }
      } else {
        console.log(response);
        alert("Login Error");
      }
    }

  }
  render() {
    const { classes } = this.props;
    const { username, password, password2 } = this.state;
    return (
      <div>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography type="title" color="inherit" noWrap>
              Signup
          </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          <TextField value={username} label="Username" fullWidth autoFocus
            onChange={(event, newValue) => this.setState({ username: event.target.value })}
          />
          <br />
          <TextField
            type="password" value={password}
            label="Password" fullWidth
            onChange={(event, newValue) => this.setState({ password: event.target.value })}
          />
          <br />
          <TextField onKeyPress={e => e.key === "Enter" && this.signup()}
            type="password" value={password2}
            label="Repeat Password" fullWidth
            onChange={(event, newValue) => this.setState({ password2: event.target.value })}
          />
          <br />
          <Button
            className={classes.button}
            raised
            color="primary"
            onClick={this.signup}
          >
            Signup
        </Button>
          <Button
            className={classes.button}
            color="primary"
            onClick={this.props.switchToLogin}
          >
            Login
        </Button>
        </div>

      </div>
    )
  }
}


export default connect()(withStyles(styles)(Signup));