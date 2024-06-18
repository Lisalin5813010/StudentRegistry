// src/services/StudentService.js
import Api from './Api';

export default {
  fetchStudents() {
    return Api().get('students');
  },
  addStudent(student) {
    return Api().post('students', student);
  },
  deleteStudent(id) {
    return Api().delete(`students/${id}`);
  }
};
