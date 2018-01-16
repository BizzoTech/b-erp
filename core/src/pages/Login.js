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

class Login extends Component {
  state = {
    username: '',
    password: ''
  }
  login = () => {
    const { userLogin } = this.props;
    const { username, password } = this.state;
    userLogin(username, password, false);
  }
  render() {
    const { classes } = this.props;
    const { username, password } = this.state;
    return (
      <div>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography type="title" color="inherit" noWrap>
              Login
          </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          <TextField value={username} label="Username" fullWidth autoFocus
            onChange={(event, newValue) => this.setState({ username: event.target.value })}
          />
          <br />
          <TextField onKeyPress={e => e.key === "Enter" && this.login()}
            type="password" value={password}
            label="Password" fullWidth
            onChange={(event, newValue) => this.setState({ password: event.target.value })}
          />
          <br />
          <Button
            className={classes.button}
            raised
            color="primary"
            onClick={this.login}
          >
            Login
        </Button>
        <Button
            className={classes.button}
            color="primary"
            onClick={this.props.switchToSignup}
          >
            Signup
        </Button>
        </div>

      </div>
    )
  }
}


export default connect()(withStyles(styles)(Login));