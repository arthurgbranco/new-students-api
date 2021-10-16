import { Student } from "../entities/Student";
import { getConnection } from "typeorm";

/**
 * Add new student to list
 * @param student New student
 * @returns new student
 */
const addStudent = async (student: Student) => {
  const newStudent = new Student(student);
  newStudent.name = student.name;
  newStudent.email = student.email;
  newStudent.city = student.city;
  newStudent.birth = student.birth;

  const repository = getConnection().getRepository(Student);
  const createdStudent = await repository.save(newStudent);

  return createdStudent;
};

/**
 * Returns student list
 * @returns Students
 */
const getStudents = () => getConnection().getRepository(Student).find();

const updateStudent = async (id: number, student: Student) => {
  await getConnection().getRepository(Student).update(id, student);

  const updatedStudent = await getConnection()
    .getRepository(Student)
    .findOne(id);

  return updatedStudent;
};

const deleteStudent = async (id: number) => {
  await getConnection().getRepository(Student).delete(id);
};

export { addStudent, getStudents, updateStudent, deleteStudent };
