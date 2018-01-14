import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import Field from './Field';

const styles = theme => ({
  root: {
    marginTop: 30,
  },
  paper: theme.mixins.gutters({
    flexGrow: 1,
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit,
  }),
});

function FieldGroup(props) {
  const { classes, group, doc, onChange } = props;
  const fields = group.fields.map((field, i) => {
    return <Field field={field} key={i} value={doc[field.name]} onChange={value => onChange(field.name, value)} />; 
  });
  return (
    <Paper className={classes.paper} elevation={4}>
      <Grid container spacing={24}>
        {fields}
      </Grid>
    </Paper>
  );
}

FieldGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FieldGroup);