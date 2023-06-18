import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const academicSemester = {
  code: '01',
  year: '2025',
};

const createUser = async (user: IUser): Promise<IUser | null> => {
  // Auto generated incremental Id
  const id = await generateStudentId(academicSemester);

  user.id = id;
  // Default Password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(400, 'Failed To Create User!');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};
