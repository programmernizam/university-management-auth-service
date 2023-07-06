import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelper } from '../../helpers/jwtHelper';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get Authorization Token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      // Verify Token
      let verifyUser = null;

      verifyUser = jwtHelper.verifyToken(token, config.jwt.secret as Secret);
      req.user = verifyUser;
      // Guard by Roles
      if (requiredRoles.length && !requiredRoles.includes(verifyUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden Access!');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
