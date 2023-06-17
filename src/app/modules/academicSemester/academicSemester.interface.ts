import { Model } from 'mongoose';

// Months type
export type IAcademicSemesterMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

// Title type
export type IAcademicSemesterTitle = 'Autumn' | 'Summer' | 'Fall';

// Code type
export type IAcademicSemesterCode = '01' | '02' | '03';

// Academic Semester Type
export type IAcademicSemester = {
  title: IAcademicSemesterTitle;
  year: string;
  code: IAcademicSemesterCode;
  startMonth: IAcademicSemesterMonth;
  endMonth: IAcademicSemesterMonth;
};
// Academic Filters
export type IAcademicSemesterFilter = {
  searchTerm?: string;
};

//
export type AcademicSemesterModel = Model<IAcademicSemester>;
