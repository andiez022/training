import { identity, isEmpty, omit, pickBy } from 'lodash';

export const camelCaseToText = (str: string | undefined) =>
  str ? `${str[0].toUpperCase()}${str.slice(1).replace(/[A-Z]/g, (letter) => ` ${letter}`)}` : '';

export const dataUrlToFile = async (dataUrl: string, fileName: string): Promise<File> => {
  const res: Response = await fetch(dataUrl);
  const blob: Blob = await res.blob();
  return new File([blob], fileName, { type: 'image/png' });
};

export const filterKeyGenerator = (filters?: { [key: string]: any }) => {
  if (!filters) return 'empty';
  const omitFilters = omit(filters, ['after', 'before']);
  const pickFilters = pickBy(omitFilters, identity);

  if (isEmpty(pickFilters)) return 'empty';

  const ordered = Object.keys(pickFilters)
    .sort()
    .reduce((obj: any, key) => {
      obj[key] = pickFilters[key];
      return obj;
    }, {});
  return JSON.stringify(ordered);
};

export const filterDecoded = (filterKey?: string) => {
  if (filterKey === 'empty' || !filterKey) return {};

  return JSON.parse(filterKey);
};

export const calculatorAge = (birthday: Date, today: number = new Date().getTime()) => {
  const birthDate = new Date(birthday).getTime();

  const calc = new Date(Math.abs(today - birthDate));

  const daysPassed = Number(Math.abs(calc.getDate()) - 1);
  const monthsPassed = Number(Math.abs(calc.getMonth() + 1) - 1);
  const yearsPassed = Number(Math.abs(calc.getFullYear()) - 1970);

  // Set up custom text
  const yearsTxt = ['year', 'years'];
  const monthsTxt = ['month', 'months'];
  const daysTxt = ['day', 'days'];

  const result =
    (yearsPassed !== 0 ? `${yearsPassed} ${yearsTxt[yearsPassed > 1 ? 1 : 0]} ` : '') +
    (monthsPassed !== 0 ? `${monthsPassed} ${monthsTxt[monthsPassed > 1 ? 1 : 0]} ` : '') +
    (daysPassed !== 0 ? `${daysPassed} ${daysTxt[daysPassed > 1 ? 1 : 0]} ` : '');

  return daysPassed || monthsPassed || yearsPassed ? result.trim() : '0 day';
};

export const convertPhoneNumber = (phoneCode: string, phoneNumber: string) => {
  let result: string = phoneNumber;

  if (result.startsWith('0')) {
    result = result.substring(1);
  }

  if (result.startsWith(phoneCode)) {
    return result;
  }

  return phoneCode + result;
};

export const convertResendOtpTime = (time: number) => {
  const minute = Math.floor(time / 60000);
  const second = Math.round((time % 60000) / 1000);
  return { minute, second };
};

// eslint-disable-next-line no-promise-executor-return
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
