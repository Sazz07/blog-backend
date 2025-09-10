import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.utils';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidations } from './blog.validation';
import { BlogController } from './blog.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BlogValidations.createBlogSchema),
  BlogController.createBlog,
);

router.patch(
  '/:id',
  auth(USER_ROLE.user),
  validateRequest(BlogValidations.updateBlogSchema),
  BlogController.updateBlog,
);

router.delete('/:id', auth(USER_ROLE.user), BlogController.deleteBlog);

router.get('/', BlogController.getBlogs);

router.get('/:id', BlogController.getSingleBlog);

export const BlogRoutes = router;
