import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsyncs';
import { AuthService } from './auth.service';
import sendResponse from '../../utils/sendResponse';

const userRegister = catchAsync(async (req, res) => {
  const result = await AuthService.userRegisterIntoDB(req.body);

  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const userLogin = catchAsync(async (req, res) => {
  const result = await AuthService.userLogin(req.body);

  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const AuthController = {
  userRegister,
  userLogin,
};
