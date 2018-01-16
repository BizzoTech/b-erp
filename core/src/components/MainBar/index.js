import React, { Component } from "react";
import PropTypes from "prop-types";

import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from 'material-ui/Button';
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import withStyles from "material-ui/styles/withStyles";

import { connect } from "react-kunafa";

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    position: "absolute",
    marginLeft: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  logout: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: `calc(100% - 120px)`
  }
});

class MainBar extends Component {
  render() {
    const { classes, toggleDrawer } = this.props;
    return (
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="contrast"
            aria-label="open drawer"
            onClick={toggleDrawer}
            className={classes.navIconHide}
          >
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" noWrap>
            B-ERP
          </Typography>
          <div className={classes.logout}>
            <Button color="contrast" onClick={this.props.userLogout}>Logout</Button>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

MainBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect()(withStyles(styles)(MainBar));
