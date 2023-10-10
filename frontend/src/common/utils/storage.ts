import { Cookies } from 'react-cookie';

export const storageKey = {
  TOKEN: 'token',
};

export enum CookieKeys {
  token = 'token',
}

const cookies = new Cookies();

export const storage = {
  setToken: (token: string) => localStorage.setItem(storageKey.TOKEN, token),
  getToken: () => localStorage.getItem(storageKey.TOKEN),
  removeToken: () => localStorage.removeItem(storageKey.TOKEN),

  set: (key: CookieKeys, value: string) => cookies.set(key, value),
  get: (key: CookieKeys) => cookies.get(key),
  remove: (key: CookieKeys) => cookies.remove(key),
};
