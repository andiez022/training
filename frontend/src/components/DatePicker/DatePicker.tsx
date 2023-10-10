import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import DatePickerComponent, { ReactDatePickerProps } from 'react-datepicker';
import dayjs from 'dayjs';

import TextInput from '../TextInput/TextInput';
import withFormikField from '../../common/utils/withFormikField';
import { defaultDayFormat } from '../../common/utils/formatters';

import TimePicker from './TimePicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.scss';

export interface DatePickerProps extends ReactDatePickerProps {
  dataId: string;
  label?: string;
  onChange: (date: Date) => void;
  className?: string;
  error?: string;
  value: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  wrapperClassName?: string;
  mode: Mode;
}

export type Mode = 'date' | 'date-time' | 'time';

const DatePicker: React.FunctionComponent<DatePickerProps> = ({
  dataId,
  label,
  placeholderText,
  onChange,
  className,
  value,
  name,
  error,
  dateFormat = null,
  startAdornment = null,
  endAdornment = null,
  wrapperClassName,
  mode = 'date',
  ...rest
}) => {
  const [currentStartDate, selectDate] = useState<Date | null>((value && new Date(value)) || null);

  const handleChange = (date: any) => {
    if (mode === 'date') selectDate(date);
    if (onChange) onChange(date);
  };

  useEffect(() => {
    if (value) {
      selectDate(new Date(value));
    }
  }, [value]);

  const classes = classNames({ 'date-picker': mode === 'date', 'time-picker': mode === 'time' }, className);

  return (
    <>
      {mode === 'time' && (
        <TimePicker classes={classes} label={label} name={name} error={error} value={value} onChange={handleChange} {...rest} />
      )}
      {mode === 'date' && (
        <DatePickerComponent
          dropdownMode="select"
          showMonthDropdown
          showYearDropdown
          data-id={dataId}
          calendarClassName={classes}
          wrapperClassName={wrapperClassName}
          dateFormat={dateFormat || defaultDayFormat}
          selected={currentStartDate}
          onChange={handleChange}
          disabledKeyboardNavigation
          placeholderText={currentStartDate === null && !placeholderText ? '--/--/----' : placeholderText}
          customInput={
            <TextInput
              dataId="datePicker.input"
              label={label}
              name={name}
              error={error}
              startAdornment={startAdornment}
              endAdornment={endAdornment}
            />
          }
          value={value ? dayjs(value).format((dateFormat as string) || 'DD MMM YYYY') : undefined}
          {...rest}
        />
      )}
    </>
  );
};

export default withFormikField(DatePicker);
