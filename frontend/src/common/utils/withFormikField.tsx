import { get } from 'lodash';
import * as React from 'react';

const withFormikField =
  <P extends {}>(WrappedComponent: React.FC<P>) =>
  (props: any) => {
    // workaround for "Rest types may only be created from object types error" when as any is not specified
    const { form, field, error, onChange, onBlur, onFocus, ...inputProps } = props;
    // make it possible to hook into onChange and onBlur methods to trigger side-effects
    // also make it possible to support custom values dispatched as onChange parameters, by default formik supports only Events as arguments
    // make it possible to supply custom error message provider
    // eslint-disable-next-line react/destructuring-assignment, no-prototype-builtins
    const errorMessage = props.hasOwnProperty('error') ? error : get(form.touched, field.name) && get(form.errors, field.name);
    const overrideProps = {
      onBlur: (e: any) => {
        if (onBlur) {
          onBlur(e);
        }
        if (e && e.nativeEvent && e.nativeEvent instanceof Event) {
          field.onBlur(e);
        } else {
          form.setFieldTouched(field.name, true);
        }
      },
      onChange: (e: React.ChangeEvent<any> | any) => {
        if (onChange) {
          onChange(e);
        }
        if (e && e.nativeEvent && e.nativeEvent instanceof Event) {
          field.onChange(e as any);
        } else {
          form.setFieldValue(field.name, e);
        }
      },
      onFocus: (e: React.FocusEvent<any> | any) => {
        if (onFocus) {
          onFocus(e);
        }
      },
    };
    return <WrappedComponent {...inputProps} {...field} {...overrideProps} error={errorMessage} />;
  };

export default withFormikField;
