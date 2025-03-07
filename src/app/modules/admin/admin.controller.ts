import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsyncs';
import sendResponse from '../../utils/sendResponse';
import { AdminService } from './admin.service';

const blogUser = catchAsync(async (req, res) => {
  await AdminService.blockUser(req.params?.userId, req.user?.userId);

  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: httpStatus.OK,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  await AdminService.deleteBlog(req.params?.id);

  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: httpStatus.OK,
  });
});

export const AdminController = { blogUser, deleteBlog };
