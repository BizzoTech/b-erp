import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import Checkbox from "material-ui/Checkbox";
import Delete from "material-ui-icons/Delete";
import Add from "material-ui-icons/Add";
import Hidden from "material-ui/Hidden";
import IconButton from "material-ui/IconButton";

import { connect } from "react-kunafa";

import { lists } from "../../data";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
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

class ListView extends Component {
  state = {
    selected: []
  };
  componentDidMount() {
    const { docType, loadNewDocs } = this.props;
    loadNewDocs(docType);
  }
  componentWillReceiveProps = nextProps => {
    if (this.props.rows !== nextProps.rows) {
      const selected = this.state.selected.filter(rowId => {
        return nextProps.rows.some(row => row._id === rowId);
      });
      this.setState({ selected });
    }
  };
  selectAll = () => {
    const { rows } = this.props;
    this.setState({
      selected: rows.map(row => row._id)
    });
  };
  deSelectAll = () => {
    this.setState({ selected: [] });
  };
  clickItemCheckbox = row => () => {
    const { selected } = this.state;
    if (selected.includes(row._id)) {
      this.setState({
        selected: selected.filter(i => i !== row._id)
      });
    } else {
      this.setState({
        selected: [...selected, row._id]
      });
    }
  };
  addNewItem = () => {
    const { docType } = this.props;
    this.props.webNavigateTo(["form", docType, "new"]);
  };
  removeSelected = () => {
    const { selected } = this.state;
    const { rows } = this.props;
    const selectedRows = rows.filter(row => selected.includes(row._id));
    selectedRows.forEach(this.props.removeDoc);
  };
  renderRows = () => {
    const { classes, list, docType, rows } = this.props;
    const { selected } = this.state;
    return rows.map((row, rowIndex) => {
      return (
        <TableRow
          key={rowIndex}
          className={classes.row}
          selected={selected.includes(row._id)}
          hover
          onClick={e => {
            if (e.target.type !== "checkbox") {
              this.props.webNavigateTo(["form", docType, row._id]);
            }
          }}
        >
          <TableCell padding="checkbox">
            <Checkbox
              onChange={this.clickItemCheckbox(row)}
              checked={selected.includes(row._id)}
            />
          </TableCell>
          {list.columns.map((col, i) => {
            return <TableCell key={i}>{row[col.name]}</TableCell>;
          })}
        </TableRow>
      );
    });
  };
  render() {
    const { classes, list, rows } = this.props;
    const { selected } = this.state;
    if (!list) return null;
    return (
      <Paper className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Typography type="title" className={classes.tabelLable}>
              {list.title}
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
                color="primary"
                onClick={this.addNewItem}
              >
                <Add className={classes.rightIcon} />
              </IconButton>
              <IconButton
                className={classes.button}
                color="accent"
                disabled={selected.length === 0}
                onClick={this.removeSelected}
              >
                <Delete className={classes.rightIcon} />
              </IconButton>
            </Hidden>

            <Hidden xsDown>
              <Button
                className={classes.button}
                raised
                color="primary"
                onClick={this.addNewItem}
              >
                New
                <Add className={classes.rightIcon} />
              </Button>
              <Button
                className={classes.button}
                raised
                color="accent"
                disabled={selected.length === 0}
                onClick={this.removeSelected}
              >
                Delete
                <Delete className={classes.rightIcon} />
              </Button>
            </Hidden>
          </Grid>
        </Grid>
        <Table
          className={classes.table}
          style={{ minWidth: 50 + 150 * list.columns.length }}
        >
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < rows.length
                  }
                  onChange={
                    selected.length === 0 ? this.selectAll : this.deSelectAll
                  }
                  checked={
                    selected.length > 0 && selected.length === rows.length
                  }
                />
              </TableCell>
              {list.columns.map((col, i) => {
                return <TableCell key={i}>{col.label}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>{this.renderRows()}</TableBody>
        </Table>
      </Paper>
    );
  }
}

ListView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect((state, { docType, selectors }) => {
  return {
    list: lists[docType],
    rows: selectors[`${docType}sSearchSelector`](state)
  };
})(withStyles(styles)(ListView));
