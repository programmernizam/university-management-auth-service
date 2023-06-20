import { SortOrder } from 'mongoose';
import { PaginationHelper } from '../../helpers/paginationHelper';
import { IGenericResponse } from '../../interface/common';
import { IPaginationOptions } from '../../interface/pagination';
import { studentSearchableFields } from './student.constant';
import { IStudent, IStudentFilter } from './student.interface';
import { Student } from './student.model';

const getStudents = async (
  filters: IStudentFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortOrder, sortBy } =
    PaginationHelper.calculatePagination(paginationOptions);

  // SearchTerm
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: studentSearchableFields.map(filed => ({
        [filed]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // Filters
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([filed, value]) => ({
        [filed]: value,
      })),
    });
  }

  // Sorts
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  // When no filters are applied,
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  // Find Method
  const result = await Student.find(whereConditions)
    .populate('academicSemester')
    .populate('academicFaculty')
    .populate('academicDepartment')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Student.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id);
  return result;
};

const updateSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findByIdAndUpdate(id);
  return result;
};

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findByIdAndDelete(id);
  return result;
};

export const StudentService = {
  getStudents,
  getSingleStudent,
  updateSingleStudent,
  deleteStudent,
};
