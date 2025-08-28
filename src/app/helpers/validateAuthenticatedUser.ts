import { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import AppError from '../errors/AppError';

// Helper function to validate authenticated user
export const validateAuthenticatedUser = (userData: JwtPayload | undefined) => {
  if (!userData) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not authenticated');
  }
  return userData;
};
