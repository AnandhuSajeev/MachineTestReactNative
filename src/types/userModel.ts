export type User = {
  id: number | null;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export interface CountState {
  users: Array<User>;
  currentUser: User | null;
  count: number;
  page: number;
}
