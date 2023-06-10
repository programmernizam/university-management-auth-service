import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemester.service';

const createAcademicSemester: RequestHandler = async (req, res, next) => {
  try {
    // Request Validation

    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );
    res.status(200).json({
      success: true,
      message: 'Academic semester created Successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AcademicSemesterController = {
  createAcademicSemester,
};
