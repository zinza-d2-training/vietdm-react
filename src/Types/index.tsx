export type LoginParam = {
  email: string;
  password: string;
};

export type UserInterface = {
  id: number;
  hash: string;
  email: string;
  fullname: string;
  birthday: string;
  address: string;
};
