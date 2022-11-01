import {axios} from '../../helpers';
const {api, catchHandler} = axios;
import config from '../../config';

export type registerParam = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};
export async function registerUser(data: registerParam) {
  return (await api.request('register'))
    .post(config.routes.create, data)
    .then(res => res.data)
    .catch(catchHandler);
}
