import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createBlogIntoDB = async (author: string, payload: TBlog) => {
  const isAuthorExist = await User.findById(author);

  if (!isAuthorExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Author not found');
  }

  const result = (await Blog.create({ ...payload, author })).populate({
    path: 'author',
    select: '-role -isBlocked',
  });

  return result;
};

const updateBlogIntoDB = async (
  blogId: string,
  author: string,
  payload: Partial<TBlog>,
) => {
  const blog = await Blog.findById(blogId);

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  const isAuthorExist = await User.findById(author);

  if (!isAuthorExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Author not found');
  }

  const isAuthorBlog = blog.author.toString() === author.toString();

  if (!isAuthorBlog) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You can not update this blog');
  }

  const result = await Blog.findByIdAndUpdate(blogId, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteBlogFromDB = async (blogId: string, author: string) => {
  const blog = await Blog.findById(blogId);

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  const isAuthorExist = await User.findById(author);

  if (!isAuthorExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Author not found');
  }

  const isAuthorBlog = blog.author.toString() === author.toString();

  if (!isAuthorBlog) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You can not delete this blog');
  }

  await Blog.findByIdAndDelete(blogId);
};

const getBlogsFormDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(
    Blog.find().populate({
      path: 'author',
      select: '-role -isBlocked',
    }),
    query,
  )
    .search(['title, content'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await blogQuery.modelQuery;

  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
  getBlogsFormDB,
  deleteBlogFromDB,
};
