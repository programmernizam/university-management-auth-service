import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await UserService.createUser(user);
    sendResponse(res, {
      statusCode: httpStatus.Ok as number,
      success: true,
      message: 'User created Successfully',
      data: result,
    });
    next();
  }
);

export const UserController = {
  createUser,
};
