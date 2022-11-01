import {createModel} from '@rematch/core';
import {RootModel} from '../models';
import {userService} from '../services';
import {CountState, User} from '../../types';
import {getUserDetailProps, getUsersProps} from '../services/userService';

type userListProp = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: [User];
  pageNo: number | string;
};
export const user = createModel<RootModel>()({
  state: {
    users: [],
    currentUser: null,
    count: 0,
    page: 0,
  } as CountState, // typed complex state
  reducers: {
    getUsersSuccess(state, data: userListProp) {
      return {
        ...state,
        users: data.pageNo === 1 ? data.data : [...state.users, ...data.data],
        count: data.total,
        page: data.page,
      };
    },
    getUserDetailSuccess(
      state,
      data: {
        data: User;
      },
    ) {
      return {
        ...state,
        currentUser: data.data,
      };
    },
    clearUser(state) {
      return {
        ...state,
        currentUser: null,
      };
    },
  },
  effects: dispatch => ({
    async getUsers(payload: getUsersProps) {
      try {
        const res: userListProp = await userService.getUsers(payload);
        res.pageNo = payload.pageNo;
        dispatch.user.getUsersSuccess(res);
      } catch (error) {
        console.log('error ==========>>>>', error);
      }
    },
    async getUserDetail(payload: getUserDetailProps) {
      try {
        const res: {
          data: User;
        } = await userService.getUserDetail(payload);
        dispatch.user.getUserDetailSuccess(res);
      } catch (error) {
        console.log('error ==========>>>>', error);
      }
    },
  }),
});
