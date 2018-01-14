import React, { Component } from "react";
import Select from "material-ui/Select";
import { MenuItem } from "material-ui/Menu";
import Input, { InputLabel } from "material-ui/Input";
import { FormControl, FormHelperText } from "material-ui/Form";

class SelectControl extends Component {
  render() {
    const { field, value, onChange } = this.props;
    const { label, name } = field;
    return (
      <FormControl fullWidth disabled={field.readOnly}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={value || ""}
          onChange={e => onChange(e.target.value)}
          input={<Input name={name} />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {field.options.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

export default SelectControl;
