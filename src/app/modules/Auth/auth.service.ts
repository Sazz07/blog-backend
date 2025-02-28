import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TRegister } from './auth.interface';
import { User } from '../user/user.model';
import { USER_ROLE } from '../user/user.utils';

const userRegisterIntoDB = async (payload: TRegister) => {
  const isUserExists = await User.isUserExists(payload.email);

  if (isUserExists) {
    throw new AppError(httpStatus.CONFLICT, 'User already exists');
  }

  const user = await User.create({ ...payload, role: USER_ROLE.user });

  const result = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  return result;
};

export const AuthService = {
  userRegisterIntoDB,
};
