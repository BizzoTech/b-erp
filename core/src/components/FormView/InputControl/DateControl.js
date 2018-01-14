import React, { Component } from 'react';

import { DatePicker } from 'material-ui-pickers';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

const datePickerIcons = {
  leftArrowIcon: <KeyboardArrowLeft />,
  rightArrowIcon: <KeyboardArrowRight />
}

class DateControl extends Component {
  render() {
    const { field, value, onChange } = this.props;
    const { label, name, type } = field;
    const fieldProps = { label, name, disabled: field.readOnly };
    return (
      <DatePicker {...datePickerIcons} {...fieldProps} type={undefined} value={value} fullWidth onChange={date => {
        onChange(date.valueOf())
      }
      } />
    )
  }
}

export default DateControl;