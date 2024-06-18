<template>
  <div class="table-container">
    <h1>Student List</h1>
    <table class="styled-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Grade</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td>{{ student.name }}</td>
          <td>{{ student.age }}</td>
          <td>{{ student.grade }}</td>
       
          <td>
            <button @click="deleteStudent(student.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
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
import axios from 'axios';
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
      StudentService.fetchStudents()
        .then(response => {
          this.students = response.data;
        })
        .catch(error => {
          console.error('Error fetching students:', error);
        });
    },
    addStudent() {
      StudentService.addStudent(this.newStudent)
        .then(() => {
          this.fetchStudents();
          this.newStudent = { name: '', age: '', grade: '' };
        })
        .catch(error => {
          console.error('Error adding student:', error);
        });
    },
    deleteStudent(id) {
      StudentService.deleteStudent(id)
        .then(() => {
          this.fetchStudents();
        })
        .catch(error => {
          console.error('Error deleting student:', error);
        });
    }
  }
};
</script>
<style scoped>
.table-container {
  margin: 20px auto;
  max-width: 800px;
  overflow-x: auto;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 1.2em;
  font-family: 'Arial', sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table thead tr {
  background-color: #009879;
  color: #ffffff;
  text-align: left;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}
.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}

.styled-table tbody tr.active-row {
  font-weight: bold;
  color: #009879;
}
</style>
