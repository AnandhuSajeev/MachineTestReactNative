import axios from 'axios';

//type import
import {ErrorResponse} from '../types';
import config from '../config';

const customHeader = () => ({
  'Content-type': 'application/json; charset=UTF-8',
});

const api = {
  request: async (value?: string) => {
    //since we use multiple base domine in demo added condition
    const domainUrl =
      value === 'register' ? config.api.register : config.api.user;

    const opts = {
      baseURL: domainUrl.trim(),
      headers: customHeader(),
    };
    return axios.create(opts);
  },
};

async function catchHandler<T extends ErrorResponse>(e: T) {
  //network errors handle
  const res = e?.response?.data
    ? e.response.data
    : {message: 'Network failed! Please try again'};

  throw res;
}

export {catchHandler, api};
