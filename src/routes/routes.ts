import { ValueOf } from "../utils/valueof";

export const ROUTES = {
  ROOT: '/',
  HOME: '/home',
  LOGIN : '/login',
  MAIN: '/main'
} as const;

export const RouteMap = ROUTES;

export type ROUTE = ValueOf<typeof ROUTES>;

export function tryGetRoute(value: string): ROUTE | null {
  return Object.values(RouteMap).includes(value as ROUTE)
    ? (value as ROUTE)
    : null;
}
