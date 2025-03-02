/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.utils';

export type TUSerRole = keyof typeof USER_ROLE;

export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: TUSerRole;
  isBlocked?: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
