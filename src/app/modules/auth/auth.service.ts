import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;
  // Crate instance of user
  const user = new User();
  const isUserExist = await user.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  // Match Password
  if (
    isUserExist.password &&
    !user.isPasswordMatched(password, isUserExist?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // create access token
  return {
    // isUserExist?.needPasswordChange
  };
};

export const AuthService = {
  loginUser,
};
