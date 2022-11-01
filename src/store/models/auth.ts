import {createModel} from '@rematch/core';
import keys from '../../helpers/keys';
import localStorage from '../../helpers/localStorage';
import {RootModel} from '../models';
import {registerParam, registerUser} from '../services/auth';

export const auth = createModel<RootModel>()({
  state: {
    isLoggedIn: false,
  },
  reducers: {
    onLoginSuccess(state, data: boolean) {
      console.log('datasssss', data);
      return {
        ...state,
        isLoggedIn: data,
      };
    },
  },
  effects: dispatch => ({
    async onLogin(payload: {email: string; password: string}) {
      try {
        //login validation for given credential hardcoded
        if (
          payload.email.toLowerCase() === 'test@opentrends.net' &&
          payload.password === 'Opentrend1'
        ) {
          const token = 'sampleToken';
          //Set token on local storage to keep user logged in
          localStorage.set(keys.token, token);
          dispatch.auth.onLoginSuccess(true);
        }
      } catch (error) {
        console.log('error ==========>>>>', error);
      }
    },
    async onLogout() {
      try {
        //remove token from local storage
        localStorage.remove(keys.token);
        dispatch.auth.onLoginSuccess(false);
      } catch (error) {
        console.log('error ==========>>>>', error);
      }
    },
    async register(payload: registerParam) {
      try {
        const res = await registerUser(payload);
        return res;
      } catch (error) {
        console.log('error ==========>>>>', error);
      }
    },
    async checkLogin() {
      try {
        //Checking token from local storage to identify user logged in or not
        const value = await localStorage.get(keys.token);
        await dispatch.auth.onLoginSuccess(value ? true : false);
        return value;
      } catch (error) {
        console.log('error ==========>>>>', error);
      }
    },
  }),
});
