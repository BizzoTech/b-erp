import React, { PureComponent } from 'react';
import TextField from 'material-ui/TextField';

import DateControl from './DateControl';
import SelectControl from './SelectControl';

class InputControl extends PureComponent {
  render() {
    const { field, value, onChange } = this.props;
    const { label, name, type } = field;
    const fieldProps = { label, name, disabled: field.readOnly };
    switch (field.type) {
      case 'date':
        return <DateControl {...this.props} />;
      case 'select':
        return <SelectControl {...this.props} />;
      case 'textarea':
        return <TextField multiline rows={3} {...fieldProps} fullWidth value={value || ""} onChange={e => onChange(e.target.value)} />;
      default:
        return <TextField {...fieldProps} fullWidth value={value || ""} onChange={e => onChange(e.target.value)} />;
    }
  }
}

export default InputControl;