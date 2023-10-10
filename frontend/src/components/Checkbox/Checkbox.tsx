import classNames from 'classnames';
import * as React from 'react';
import { useState } from 'react';

import Icon, { ICONS } from '../SVG/Icon';

import './Checkbox.scss';

export interface CheckboxProps {
  name: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  readonly?: boolean;
  value?: boolean;
  label?: string | React.ReactNode | undefined;
  dataTip?: string | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  className,
  name,
  disabled,
  readonly,
  onBlur,
  onChange,
  value,
  label,
  dataTip,
}: CheckboxProps) => {
  const [hasFocus, setHasFocus] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const classes = classNames('checkbox', className, { 'checkbox--has-focus': hasFocus }, { 'checkbox--no-label': !label });

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
    }
    setHasFocus(false);
  };
  const handleFocus = () => {
    setHasFocus(true);
  };

  return (
    <label className={classes} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} data-id={`${name}.label`}>
      <input
        data-id={`${name}.input`}
        disabled={disabled || readonly}
        checked={value}
        type="checkbox"
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className="checkbox__input"
      />
      <span className="checkbox__title">{label}</span>
      <span data-tip={dataTip || ''} className="checkbox__checkmark">
        {value ? (
          <Icon component={ICONS.CHECKBOX_PRESSED} />
        ) : isHover && !readonly ? (
          <Icon component={ICONS.CHECKBOX_HOVER} />
        ) : (
          <Icon component={ICONS.CHECK} />
        )}
      </span>
    </label>
  );
};

Checkbox.defaultProps = {
  readonly: false,
};

export default Checkbox;
