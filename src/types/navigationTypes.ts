export type MainStackParams = {
  Drawer: undefined;
  Login: undefined;
  Register: undefined;
};

export type DrawerStackParams = {
  UserStack: undefined;
};

export type UserStackParams = {
  UserList: undefined;
  UserProfile: {
    id: null | number;
  };
};
