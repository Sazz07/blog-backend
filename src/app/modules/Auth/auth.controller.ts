import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsyncs';
import { AuthService } from './auth.service';
import sendResponse from '../../utils/sendResponse';

const userRegister = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.userRegisterIntoDB(req.body);

  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

export const AuthController = {
  userRegister,
};
