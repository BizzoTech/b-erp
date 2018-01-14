import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Delete from 'material-ui-icons/Delete';
import Add from 'material-ui-icons/Add';

import { connect } from 'react-kunafa';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  tabelLable: {
    padding: '20px'
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class TableControl extends Component {
  state = {
    selected: []
  }
  onChange = (index, fieldName) => (e) => {
    const { onChange, items } = this.props;
    const newItem = { ...items[index], [fieldName]: e.target.value };
    onChange(items.map((item, i) => index === i ? newItem : item));
  }
  removeSelected = () => {
    const { onChange, items } = this.props;
    const { selected } = this.state;
    onChange(items.filter((item, i) => !selected.includes(i)));
    this.deSelectAll();
  }
  addNewItem = () => {
    const { onChange, items } = this.props;
    onChange([...items, {}]);
  }
  selectAll = () => {
    const { items } = this.props;
    this.setState({
      selected: items.map((item, i) => i)
    });
  }
  deSelectAll = () => {
    this.setState({ selected: [] });
  }
  clickItemCheckbox = itemIndex => () => {
    const { selected } = this.state;
    if (selected.includes(itemIndex)) {
      this.setState({
        selected: selected.filter(i => i !== itemIndex)
      });
    } else {
      this.setState({
        selected: [...selected, itemIndex]
      })
    }
  }
  renderItems = () => {
    const { classes, field, items } = this.props;
    const { selected } = this.state;
    return items.map((item, itemIndex) => {
      return (
        <TableRow key={itemIndex} selected={selected.includes(itemIndex)}>
          <TableCell padding="checkbox">
            <Checkbox onChange={this.clickItemCheckbox(itemIndex)} checked={selected.includes(itemIndex)} />
          </TableCell>
          {
            field.fields.map((f, i) => {
              return (
                <TableCell key={i}>
                  <TextField {...f} fullWidth value={item[f.name] || ""} label={null} onChange={this.onChange(itemIndex, f.name)} />
                </TableCell>
              )
            })
          }
        </TableRow>
      )
    })
  }
  render() {
    const { classes, field, items } = this.props;
    const { selected } = this.state;
    return (
      <Paper className={classes.root}>
        <Typography type="title" className={classes.tabelLable}>{field.label}</Typography>
        <Table className={classes.table} style={{ minWidth: 50 + 150 * field.fields.length }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < items.length}
                  onChange={selected.length === 0 ? this.selectAll : this.deSelectAll}
                  checked={selected.length > 0 && selected.length === items.length} />
              </TableCell>
              {
                field.fields.map((f, i) => {
                  return <TableCell key={i}>{f.label}</TableCell>
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {this.renderItems()}
          </TableBody>
        </Table>
        <div style={{ padding: 20 }}>
          <Button className={classes.button} raised color="primary" onClick={this.addNewItem}>
            New
            <Add className={classes.rightIcon} />
          </Button>
          <Button className={classes.button} raised color="accent" disabled={selected.length === 0} onClick={this.removeSelected}>
            Delete
            <Delete className={classes.rightIcon} />
          </Button>
        </div>
      </Paper>
    );
  }
}

TableControl.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect((state, {items}) => {
  return {
    items: items || []
  }
})(withStyles(styles)(TableControl));