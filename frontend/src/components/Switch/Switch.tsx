import classNames from 'classnames';
import React from 'react';
import './SwitchStyles.scss';

interface SwitchProps {
  checked?: boolean;
  disable?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options?: boolean;
  className?: string;
}

const Switch: React.FunctionComponent<SwitchProps> = ({ disable, checked, onChange, options, className }) => {
  const classes = classNames('switch', className);

  return (
    <label className={classes}>
      <input type="checkbox" disabled={disable} checked={checked} onChange={onChange} />
      <span className={`slider slider${options ? '--primary' : '--default'} round`} />
    </label>
  );
};

export default Switch;
