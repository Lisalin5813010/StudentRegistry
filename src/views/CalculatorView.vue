<template>
  <div id="app">
    <h1>Calculator</h1>
    <div>
      <input type="text" v-model="num1" placeholder="Enter first number" />
      <input type="text" v-model="num2" placeholder="Enter second number" />
    </div>
    <div>
      <button @click="add">+</button>
      <button @click="subtract">-</button>
      <button @click="multiply">*</button>
      <button @click="divide">/</button>
    </div>
    <p>Result: {{ result }}</p>
  </div>
</template>

<script>
//import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      num1: '',
      num2: '',
      result: null,
    };
  },
  methods: {
    async add() {
      try {
        const response = await axios.post('/api/add', {
          num1: parseFloat(this.num1),
          num2: parseFloat(this.num2),
        });
        this.result = response.data.result;
      } catch (error) {
        console.error(error);
      }
    },
    async subtract() {
      try {
        const response = await axios.post('/api/subtract', {
          num1: parseFloat(this.num1),
          num2: parseFloat(this.num2),
        });
        this.result = response.data.result;
      } catch (error) {
        console.error(error);
      }
    },
    async multiply() {
      try {
        const response = await axios.post('/api/multiply', {
          num1: parseFloat(this.num1),
          num2: parseFloat(this.num2),
        });
        this.result = response.data.result;
      } catch (error) {
        console.error(error);
      }
    },
    async divide() {
      try {
        const response = await axios.post('/api/divide', {
          num1: parseFloat(this.num1),
          num2: parseFloat(this.num2),
        });
        this.result = response.data.result;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>