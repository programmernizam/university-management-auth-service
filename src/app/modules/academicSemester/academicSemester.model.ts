import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import {
  academicSemesterCode,
  academicSemesterMonth,
  academicSemesterTitles,
} from './academicSemester.constance';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: 'string',
      required: true,
      enum: academicSemesterTitles,
    },
    year: {
      type: 'string',
      required: true,
    },
    code: {
      type: 'string',
      required: true,
      enum: academicSemesterCode,
    },
    startMonth: {
      type: 'string',
      required: true,
      enum: academicSemesterMonth,
    },
    endMonth: {
      type: 'string',
      required: true,
      enum: academicSemesterMonth,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Unique Academic Semester titles
academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic Semester already exists!'
    );
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
