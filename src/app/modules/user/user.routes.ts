import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserController } from './user.controller';
import { UserValidator } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(UserValidator.createUserZodSchema),
  UserController.createStudent
);

export const UserRoutes = router;
