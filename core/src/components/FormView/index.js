import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Save from "material-ui-icons/Save";
import Hidden from "material-ui/Hidden";
import IconButton from "material-ui/IconButton";

import FieldGroup from "./FieldGroup";

import { connect } from "react-kunafa";

import { forms } from "../../data";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30
  },
  tabelLable: {
    padding: "20px"
  },
  row: {
    cursor: "pointer"
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

class FormView extends Component {
  state = {
    docChanges: null
  };
  onChange = (fieldName, value) => {
    const { docChanges } = this.state;
    const newChanges = docChanges
      ? { ...docChanges, [fieldName]: value }
      : { [fieldName]: value };
    this.setState({
      docChanges: newChanges
    });
  };
  save = () => {
    const { form, docType, doc } = this.props;
    const { docChanges } = this.state;
    const updatedDoc = docChanges ? { ...doc, ...docChanges } : doc;
    if (!updatedDoc._id) {
      this.props.addDoc({ type: docType, ...updatedDoc });
      this.props.webNavigateTo(["list", docType]);
    } else {
      this.props.updateDoc({
        _id: doc._id,
        _rev: doc._rev,
        type: doc.type,
        ...docChanges
      });
      this.setState({ docChanges: null });
    }
  };
  render() {
    const { form, doc, classes } = this.props;
    const { docChanges } = this.state;
    if (doc.notFound) return null;

    const updatedDoc = docChanges ? { ...doc, ...docChanges } : doc;

    const fieldGroups = form.fieldGroups.map((group, i) => (
      <FieldGroup
        group={group}
        key={i}
        doc={updatedDoc}
        onChange={this.onChange}
      />
    ));
    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Typography type="title" className={classes.tabelLable}>
              {form.title}
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={6}
            style={{ alignItems: "flex-end", justifyContent: "flex-end" }}
          >
            <Hidden smUp>
              <IconButton
                className={classes.button}
                disabled={!docChanges}
                color="primary"
                onClick={this.save}
              >
                <Save className={classes.rightIcon} />
              </IconButton>
            </Hidden>

            <Hidden xsDown>
              <Button
                className={classes.button}
                disabled={!docChanges}
                raised
                color="primary"
                onClick={this.save}
              >
                Save
                <Save className={classes.rightIcon} />
              </Button>
            </Hidden>
          </Grid>
        </Grid>
        {fieldGroups}
      </div>
    );
  }
}

FormView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect((state, { docType, docId }) => {
  return {
    form: forms[docType],
    doc: docId ? state.documents[docId] || { notFound: true } : {}
  };
})(withStyles(styles)(FormView));
