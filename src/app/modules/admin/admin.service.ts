import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Blog } from '../blog/blog.model';

const blockUser = async (selectedUserId: string, userId: string) => {
  const selectedUser = await User.findById(selectedUserId);

  if (!selectedUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isSameUser = selectedUser._id.toString() === userId.toString();

  if (isSameUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'You can not block yourself');
  }

  await User.findByIdAndUpdate(selectedUser, { isBlocked: true });
};

const deleteBlog = async (id: string) => {
  const blog = await Blog.findByIdAndDelete(id);

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }
};

export const AdminService = { blockUser, deleteBlog };
