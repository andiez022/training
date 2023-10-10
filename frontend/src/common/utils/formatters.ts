import { format, isValid } from 'date-fns';
import dayjs from 'dayjs';
import { t } from 'i18next';

export const defaultDayFormat = 'dd/MM/yyyy';
export const backendDayFormat = 'yyyy-MM-dd HH:mm:ss';

/**
 * formatDate
 * @param value: Date
 * @param formatString: string - defaults to 'dd.MM.yyyy'
 * @returns date: string - date as string formatted according to the provided format string
 * @example formatDate(new Date(), 'HH:mm MM-dd-yyyy') // returns ex. '16:35 11-21-2018'
 */
export const formatDate = (value: Date, formatString = defaultDayFormat): string => {
  if (isValid(value)) {
    return format(value, formatString);
  }
  return '';
};

export const calculateColumnCount = (width: string) => {
  switch (width) {
    case 'xxl':
      return 5;
    case 'xl':
      return 4;
    case 'lg':
      return 3;
    case 'md':
      return 2;
    case 'sm':
      return 2;
    default:
      return 1;
  }
};

export const formatTime = (data: { [key: string]: any }, key: 'day' | 'month' | 'year') => {
  if (data[key] === 0) return '';
  return ` ${data[key]} ${data[key] > 1 ? `${key}s` : key}`;
};

export const formatDayString = (date: Date) => {
  const dayDiff = dayjs().diff(dayjs(date), 'day');
  if (dayDiff === 0) return t('common.text.today');
  if (dayDiff === 1) return t('common.text.aDayAgo');
  if (dayDiff <= 7) return `${dayDiff}${t('common.text.daysAgo')}`;
  return dayjs(date).format('MMM DD YYYY');
};
