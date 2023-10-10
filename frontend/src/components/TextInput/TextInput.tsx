import classNames from 'classnames';
import React from 'react';
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';

import withFormikField from '../../common/utils/withFormikField';

import './TextInput.scss';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  labelClass?: string;
  wrapperClass?: string;
  dataId: string;
  textarea?: boolean;

  label?: string | React.ReactNode;
  children?: React.ReactNode;
  inputType?: TextInputType;
  disabled?: boolean;
  error?: React.ReactNode;
  prefixElm?: React.ReactNode | null;

  onlyChangeOnBlur?: boolean;

  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  isRequired?: boolean;
}

export enum TextInputType {
  PRIMARY = 'Primary',
  FILLED = 'Filled',
}

const TextInput: React.FunctionComponent<TextInputProps & TextareaAutosizeProps> = ({
  className,
  wrapperClass,
  labelClass,
  dataId,
  children,
  inputType = TextInputType.PRIMARY,
  error,
  label,
  onFocus,
  onBlur,
  onChange,
  value,
  onlyChangeOnBlur,
  textarea,
  maxRows = 4,
  minRows = 4,
  prefixElm = null,
  endAdornment = null,
  startAdornment = null,
  isRequired = false,
  ...rest
}) => {
  const [inputValue, setValue] = React.useState(value);

  React.useEffect(() => {
    setValue(value);
  }, [value]);

  const wrapClasses = classNames('text-input', wrapperClass, {
    'text-input--primary': inputType === TextInputType.PRIMARY,
    'text-input--filled': inputType === TextInputType.FILLED,
  });

  const classes = classNames('text-input__input', className, {
    'text-input__input--has-error': !!error,
    'text-input__input--has-label': !!label,
    'text-input__input--textarea': textarea,
    'text-input__input--file': rest.type === 'file',
  });

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.persist();
    if (onlyChangeOnBlur && onChange) {
      onChange(e);
    }
    if (onBlur) {
      setTimeout(() => {
        onBlur(e);
      }, 0);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.persist();

    setValue(e.target.value);
    if (!onlyChangeOnBlur && onChange) {
      onChange(e);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onFocus) {
      onFocus(e);
    }
  };

  const labelClasses = classNames('text-input__label', labelClass, {
    'text-input__label--required': isRequired,
  });

  return (
    <div className={wrapClasses} data-id={dataId}>
      {!label && error && <span className="text-input__error">{error}</span>}
      {label && <label className={labelClasses}>{label}</label>}
      {prefixElm}
      {textarea && (
        <TextareaAutosize
          className={classes}
          value={inputValue}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          maxRows={maxRows}
          minRows={minRows}
          placeholder={rest.placeholder}
          {...rest}
        />
      )}
      {!textarea && (
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {startAdornment || null}
          <input className={classes} value={inputValue} onBlur={handleBlur} onChange={handleChange} onFocus={handleFocus} {...rest} />
          {endAdornment || null}
        </div>
      )}
      {label && error && <span className="text-input__error text-input__error--bottom">{error}</span>}
    </div>
  );
};
export const FormikTextInput = withFormikField(TextInput);

export default TextInput;
