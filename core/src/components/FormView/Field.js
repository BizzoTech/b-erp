import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";

import TableControl from "./TableControl";
import InputControl from "./InputControl";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
});

function Field(props) {
  const { field, value, onChange } = props;
  if (field.type === "table") {
    return (
      <Grid item xs={12} sm={field.large ? 12 : 6}>
        <TableControl field={field} items={value} onChange={onChange} />
      </Grid>
    );
  } else {
    return (
      <Grid item xs={12} sm={field.large ? 12 : 6}>
        <InputControl {...props} />
      </Grid>
    );
  }
}

Field.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Field);
