import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .trim()
      .email('Invalid email address'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, 'Password must be at least 6 characters long')
      .max(128, 'Password must not exceed 128 characters'),
  }),
});

const registerValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .trim()
      .min(2, 'Name must be at least 2 characters long')
      .max(50, 'Name must not exceed 50 characters'),
    email: z
      .string({ required_error: 'Email is required' })
      .trim()
      .email('Invalid email address'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, 'Password must be at least 6 characters long')
      .max(128, 'Password must not exceed 128 characters'),
  }),
});

const changePasswordValidation = z.object({
  body: z.object({
    oldPassword: z
      .string({ required_error: 'Old password is required' })
      .min(6, 'Old password must be at least 6 characters long')
      .max(32, 'Old password must be at most 32 characters long'),
    newPassword: z
      .string({ required_error: 'New password is required' })
      .min(6, 'New password must be at least 6 characters long')
      .max(32, 'New password must be at most 32 characters long'),
  }),
});

const resetPasswordValidation = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .trim()
      .email('Invalid email format'),
    newPassword: z
      .string({ required_error: 'New password is required' })
      .min(6, 'New password must be at least 6 characters long')
      .max(32, 'New password must be at most 32 characters long'),
  }),
});

const forgetPasswordValidation = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .trim()
      .email('Invalid email format'),
  }),
});

const refreshTokenValidation = z.object({
  body: z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required' }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  registerValidationSchema,
  changePasswordValidation,
  resetPasswordValidation,
  forgetPasswordValidation,
  refreshTokenValidation,
};
