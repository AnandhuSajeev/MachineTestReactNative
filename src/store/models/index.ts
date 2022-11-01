import {Models} from '@rematch/core';
import {user} from './user';
import {auth} from './auth';
export interface RootModel extends Models<RootModel> {
  user: typeof user;
  auth: typeof auth;
}
export const models: RootModel = {user, auth};
