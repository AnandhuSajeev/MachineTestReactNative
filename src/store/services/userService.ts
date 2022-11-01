import {axios} from '../../helpers';
const {api, catchHandler} = axios;

export type getUsersProps = {pageNo: string | number};
export type getUserDetailProps = {id: null | number};
export async function getUsers(data: getUsersProps) {
  return (await api.request())
    .get(`?page=${data.pageNo}`)
    .then(res => res.data)
    .catch(catchHandler);
}

export async function getUserDetail(data: getUserDetailProps) {
  return (await api.request())
    .get(`/${data.id}`)
    .then(res => res.data)
    .catch(catchHandler);
}
