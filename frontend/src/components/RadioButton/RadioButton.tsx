import classNames from 'classnames';
import React from 'react';

import Icon, { ICONS } from '../SVG/Icon';

import './RadioButton.scss';

interface RadioButtonProps {
  value?: string | number | undefined;
  onSelectRadio?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  selected?: string | number | undefined;
  label?: string | React.ReactNode | undefined;
}
const RadioButton: React.FC<RadioButtonProps> = ({ value, onSelectRadio, className, label = '', selected }) => {
  const radioButtonClasses = classNames('radio-button', className);

  return (
    <label className={radioButtonClasses}>
      <input type="radio" name="default_send" value={value} onChange={onSelectRadio} id="send_email" />
      <span>{label}</span>
      <span className="radio-button__checkmark">
        <Icon component={selected && selected === value ? ICONS.RADIO_SELECTED : ICONS.RADIO_DEFAULT} />
      </span>
    </label>
  );
};

export default RadioButton;
