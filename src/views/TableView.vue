<template>
  <div>
    <h1>Student List</h1>
    <ul>
      <li v-for="student in students" :key="student.id">
        {{ student.name }} - {{ student.age }} - {{ student.grade }}
      </li>
    </ul>
    <h2>Add a new student</h2>
    <form @submit.prevent="addStudent">
      <input v-model="newStudent.name" placeholder="Name">
      <input v-model="newStudent.age" placeholder="Age" type="number">
      <input v-model="newStudent.grade" placeholder="Grade">
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script>
import StudentService from '../services/StudentService';

export default {
  data() {
    return {
      students: [],
      newStudent: {
        name: '',
        age: '',
        grade: ''
      }
    };
  },
  created() {
    this.fetchStudents();
  },
  methods: {
    fetchStudents() {
      StudentService.fetchStudents().then(response => {
        this.students = response.data;
      });
    },
    addStudent() {
      StudentService.addStudent(this.newStudent).then(() => {
        this.fetchStudents();
        this.newStudent.name = '';
        this.newStudent.age = '';
        this.newStudent.grade = '';
      });
    }
  }
};
</script>
