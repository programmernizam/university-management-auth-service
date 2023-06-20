import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserController } from './user.controller';
import { UserValidator } from './user.validation';

const router = express.Router();

// Create Student
router.post(
  '/create-student',
  validateRequest(UserValidator.createUserZodSchema),
  UserController.createStudent
);

// Create Faculty
router.post('/create-faculty');

// Create Administrator
router.post('/create-admin');

export const UserRoutes = router;
