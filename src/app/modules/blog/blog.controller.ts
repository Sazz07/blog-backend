import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsyncs';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.createBlogIntoDB(
    req.user?.userId,
    req.body,
  );

  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await BlogServices.getSingleBlogFromDB(id);

  sendResponse(res, {
    success: true,
    message: 'Blog fetched successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.updateBlogIntoDB(
    id,
    req.user?.userId,
    req.body,
  );

  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  await BlogServices.deleteBlogFromDB(id, req.user?.userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog deleted successfully',
  });
});

const getBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getBlogsFormDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blogs fetched successfully',
    data: result,
  });
});

export const BlogController = {
  createBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
};
