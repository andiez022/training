import { storage } from './storage';

export const routes = {
  DEFAULT: '/',
  LOGIN: '/login',
};

export interface RouteGuard {
  /**
   * If the condition is not met then either redirect to onFail or don't render the route
   */
  failCondition: boolean;
  /**
   * If request is still in progress we don't want to call onFail yet
   */
  requestDone: boolean;
  /**
   * URL where to redirect to, when condition is not met
   */
  onFail?: string | null;
}

export const unAuthGuard: RouteGuard = {
  failCondition: !!storage.getToken(),
  requestDone: true,
  onFail: routes.DEFAULT,
};

export const authGuard: RouteGuard = {
  failCondition: !storage.getToken(),
  requestDone: true,
  onFail: routes.LOGIN,
};
