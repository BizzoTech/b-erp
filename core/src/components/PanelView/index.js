import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";

import { connect } from "react-kunafa";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30
  },
  paper: theme.mixins.gutters({
    flexGrow: 1,
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit
  }),
  button: {
    margin: theme.spacing.unit
  },
  groupTitle: {
    padding: 30
  }
});

class PanelView extends Component {
  renderLinks = group => {
    return group.links.map((link, i) => {
      return (
        <Grid key={i} item xs={12} sm={6} style={{ textAlign: "center" }}>
          <Button onClick={() => this.props.webNavigateTo(link.path)}>
            {" "}
            {link.label}{" "}
          </Button>
        </Grid>
      );
    });
  };
  renderGroups = () => {
    const { panel, classes } = this.props;
    return panel.groups.map((group, i) => {
      return (
        <Paper key={i} className={classes.paper} elevation={4}>
          <Typography type="title" className={classes.groupTitle}>
            {group.title}
          </Typography>
          <Grid container spacing={24}>
            {this.renderLinks(group)}
          </Grid>
        </Paper>
      );
    });
  };
  render() {
    const { panel } = this.props;
    return <div>{this.renderGroups()}</div>;
  }
}

PanelView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect()(withStyles(styles)(PanelView));
