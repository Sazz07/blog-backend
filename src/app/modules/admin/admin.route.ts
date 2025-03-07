import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.utils';
import { AdminController } from './admin.controller';

const router = express.Router();

router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  AdminController.blogUser,
);

router.delete('/blogs/:id', auth(USER_ROLE.admin), AdminController.deleteBlog);

export const AdminRoutes = router;
