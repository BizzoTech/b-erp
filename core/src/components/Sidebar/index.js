import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Divider from "material-ui/Divider";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import InboxIcon from "material-ui-icons/MoveToInbox";

import { connect } from "react-kunafa";

import { sidebarItems } from "../../data";

const styles = theme => ({
  drawerHeader: theme.mixins.toolbar
});

class Sidebar extends Component {
  onItemClick = itemKey => {
    this.props.navigateTo(["panel", itemKey]);
  };
  renderItems = () => {
    return Object.keys(sidebarItems).map(itemKey => {
      const item = sidebarItems[itemKey];
      const label = typeof item === "string" ? item : item.label;
      return (
        <ListItem
          button
          key={itemKey}
          onClick={() => this.onItemClick(itemKey)}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={label} />
        </ListItem>
      );
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.drawerHeader} />
        <Divider />
        <List>
          {this.renderItems()}
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Accounting" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Sales" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Purchase" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Stock" />
          </ListItem>
        </List>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect()(withStyles(styles)(Sidebar));
