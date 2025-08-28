import { TUSerRole } from '../user/user.interface';

export type TLoginUser = {
  email: string;
  password: string;
};

export type TRegister = {
  name: string;
  email: string;
  password: string;
};

export type TJwtPayload = {
  userId: string;
  email: string;
  role: TUSerRole;
};

export type TChangePassword = {
  oldPassword: string;
  newPassword: string;
};
