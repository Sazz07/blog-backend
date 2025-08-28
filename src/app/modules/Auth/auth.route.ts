import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.utils';

const router = express.Router();

router.post(
  '/register',
  validateRequest(AuthValidation.registerValidationSchema),
  AuthController.userRegister,
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.userLogin,
);

router.post('/logout', AuthController.userLogout);

router.post(
  '/change-password',
  auth(USER_ROLE.user, USER_ROLE.admin),

  validateRequest(AuthValidation.changePasswordValidation),
  AuthController.changePassword,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidation),
  AuthController.refreshToken,
);

router.post(
  '/forget-password',
  validateRequest(AuthValidation.forgetPasswordValidation),
  AuthController.forgetPassword,
);

router.post(
  '/reset-password',
  validateRequest(AuthValidation.resetPasswordValidation),
  AuthController.resetPassword,
);

export const AuthRoutes = router;
