import classNames from 'classnames';
import * as React from 'react';

import { ReactComponent as ArrowDownLong } from './icons/arrow-down-long.svg';
import { ReactComponent as Check } from './icons/check.svg';
import { ReactComponent as CheckboxHover } from './icons/checkbox-hover.svg';
import { ReactComponent as CheckboxPressed } from './icons/checkbox-pressed.svg';
import { ReactComponent as Close } from './icons/close.svg';
import { ReactComponent as Dashboard } from './icons/dashboard.svg';
import { ReactComponent as ErrorCircle } from './icons/error-circle.svg';
import { ReactComponent as ExpandLess } from './icons/expand-less.svg';
import { ReactComponent as ExpandMore } from './icons/expand-more.svg';
import { ReactComponent as InfoCircle } from './icons/info-circle.svg';
import { ReactComponent as Sort } from './icons/sort.svg';
import { ReactComponent as SuccessCircle } from './icons/success-circle.svg';
import { ReactComponent as Times } from './icons/times.svg';
import { ReactComponent as WarningCircle } from './icons/warning-circle.svg';
import { ReactComponent as RadioDefault } from './icons/radio-default.svg';
import { ReactComponent as RadioSelected } from './icons/radio-selected.svg';
import { ReactComponent as Plus } from './icons/103681_plus_icon (1).svg';
import { ReactComponent as ArrowRight } from './icons/arrow.right.svg';
import { ReactComponent as ArrowRight2 } from './icons/arrow-right(2).svg';
import { ReactComponent as ArrowLeft } from './icons/arrow-left.svg';
import { ReactComponent as ArrowRightDouble } from './icons/arrow-right-double.svg';
import { ReactComponent as ArrowLeftDouble } from './icons/arrow-left-double.svg';
import { ReactComponent as CarretDown } from './icons/caret-down-solid.svg';
import { ReactComponent as SearchGlass } from './icons/search-glass.svg';
import { ReactComponent as MetroMenu } from './icons/134216_menu_lines_hamburger_icon.svg';
import { ReactComponent as CloseIcon } from './icons/211651_close_round_icon.svg';
import { ReactComponent as PenIcon } from './icons/8665767_pen_icon.svg';
import { ReactComponent as EyeIcon } from './icons/eye-icon.svg';
import { ReactComponent as EyeOffIcon } from './icons/eye-off-icon.svg';
import { ReactComponent as CheckRemember } from './icons/check-remember.svg';
import { ReactComponent as UploadIcon } from './icons/upload-icon.svg';
import { ReactComponent as DeleteUpload } from './icons/delete-upload.svg';
import { ReactComponent as ArrowDown } from './icons/arrow-down.svg';
import { ReactComponent as ArrowUp } from './icons/arrow-up-icon.svg';

import './Icon.scss';

export const ICONS = {
  DASHBOARD: Dashboard,
  CLOSE: Close,
  CHECK: Check,
  ERROR_CIRCLE: ErrorCircle,
  INFO_CIRCLE: InfoCircle,
  SUCCESS_CIRCLE: SuccessCircle,
  WARNING_CIRCLE: WarningCircle,
  EXPAND_MORE: ExpandMore,
  EXPAND_LESS: ExpandLess,
  TIMES: Times,
  SORT: Sort,
  ARROW_DOWN_LONG: ArrowDownLong,
  CHECKBOX_HOVER: CheckboxHover,
  CHECKBOX_PRESSED: CheckboxPressed,
  RADIO_DEFAULT: RadioDefault,
  RADIO_SELECTED: RadioSelected,
  PLUS: Plus,
  ARROW_RIGHT2: ArrowRight2,
  ARROW_RIGHT: ArrowRight,
  ARROW_LEFT: ArrowLeft,
  ARROW_RIGHT_DOUBLE: ArrowRightDouble,
  ARROW_LEFT_DOUBLE: ArrowLeftDouble,
  CARRET_DOWN: CarretDown,
  SEARCH_GLASS: SearchGlass,
  METRO_MENU: MetroMenu,
  CLOSE_ICON: CloseIcon,
  PEN_ICON: PenIcon,
  EYE_ICON: EyeIcon,
  EYE_OFF_ICON: EyeOffIcon,
  CHECK_REMEMBER: CheckRemember,
  UPLOAD_ICON: UploadIcon,
  DELETE_UPLOAD: DeleteUpload,
  ARROW_DOWN: ArrowDown,
  ARROW_UP: ArrowUp,
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
