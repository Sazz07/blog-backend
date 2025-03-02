import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TLoginUser, TRegister } from './auth.interface';
import { User } from '../user/user.model';
import { USER_ROLE } from '../user/user.utils';
import { createToken } from './auth.utils';
import config from '../../config';

const userRegisterIntoDB = async (payload: TRegister) => {
  const isUserExists = await User.isUserExists(payload.email);

  if (isUserExists) {
    throw new AppError(httpStatus.CONFLICT, 'User already exists');
  }

  const user = await User.create({ ...payload, role: USER_ROLE.user });

  const result = {
    _id: user._id,
    name: user.name,
    email: user.email,
  };

  return result;
};

const userLogin = async (payload: TLoginUser) => {
  const user = await User.isUserExists(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  if (user?.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!');
  }

  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    token,
  };
};

export const AuthService = {
  userRegisterIntoDB,
  userLogin,
};
