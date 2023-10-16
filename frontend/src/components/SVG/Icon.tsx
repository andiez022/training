import classNames from 'classnames';
import * as React from 'react';

import { ReactComponent as ArrowDown } from './icons/arrow-down.svg';
import { ReactComponent as ArrowDownLong } from './icons/arrow-down-long.svg';
import { ReactComponent as Backward } from './icons/backward.svg';
import { ReactComponent as Check } from './icons/check.svg';
import { ReactComponent as CheckboxHover } from './icons/checkbox-hover.svg';
import { ReactComponent as CheckboxPressed } from './icons/checkbox-pressed.svg';
import { ReactComponent as Close } from './icons/close.svg';
import { ReactComponent as Dashboard } from './icons/dashboard.svg';
import { ReactComponent as ErrorCircle } from './icons/error-circle.svg';
import { ReactComponent as ExpandLess } from './icons/expand-less.svg';
import { ReactComponent as ExpandMore } from './icons/expand-more.svg';
import { ReactComponent as First } from './icons/first.svg';
import { ReactComponent as Forward } from './icons/forward.svg';
import { ReactComponent as Magnifier } from './icons/magnifier.svg';
import { ReactComponent as InfoCircle } from './icons/info-circle.svg';
import { ReactComponent as Last } from './icons/last.svg';
import { ReactComponent as Sort } from './icons/sort.svg';
import { ReactComponent as SuccessCircle } from './icons/success-circle.svg';
import { ReactComponent as Times } from './icons/times.svg';
import { ReactComponent as WarningCircle } from './icons/warning-circle.svg';
import { ReactComponent as RadioDefault } from './icons/radio-default.svg';
import { ReactComponent as RadioSelected } from './icons/radio-selected.svg';

import './Icon.scss';

export const ICONS = {
  DASHBOARD: Dashboard,
  CLOSE: Close,
  CHECK: Check,
  MAGNIFIER: Magnifier,
  ERROR_CIRCLE: ErrorCircle,
  INFO_CIRCLE: InfoCircle,
  SUCCESS_CIRCLE: SuccessCircle,
  WARNING_CIRCLE: WarningCircle,
  EXPAND_MORE: ExpandMore,
  EXPAND_LESS: ExpandLess,
  TIMES: Times,
  SORT: Sort,
  ARROW_DOWN_LONG: ArrowDownLong,
  ARROW_DOWN: ArrowDown,
  CHECKBOX_HOVER: CheckboxHover,
  CHECKBOX_PRESSED: CheckboxPressed,
  RADIO_DEFAULT: RadioDefault,
  RADIO_SELECTED: RadioSelected,
  BACKWARD: Backward,
  FORWARD: Forward,
  FIRST: First,
  LAST: Last,
};

export interface IconProps {
  /**
   * Use ICONS constant in Icon.tsx
   */
  component: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  className?: string;
  size?: IconSize;
  rotation?: number;
  style?: React.CSSProperties;
}

export enum IconSize {
  XS = 'XS',
  SM = 'SM',
  MD = 'MD',
  LG = 'LG',
  XL = 'XL',
  XXL = 'XXL',
}

const Icon: React.FC<IconProps> = ({ className, rotation, size = IconSize.SM, component: Component, style }) => {
  const classes = classNames(
    'icon',
    {
      'icon--xs': size === IconSize.XS,
      'icon--sm': size === IconSize.SM,
      'icon--md': size === IconSize.MD,
      'icon--lg': size === IconSize.LG,
      'icon--xl': size === IconSize.XL,
      'icon--xxl': size === IconSize.XXL,
    },
    className,
    rotation ? `icon--rotate-${rotation}` : '',
  );

  return <Component className={classes} style={style} />;
};

export default Icon;
