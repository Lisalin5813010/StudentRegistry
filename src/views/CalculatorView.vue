<template>
  <div id="app">
    <h1>Calculator</h1>
    <div>
      <input type="text" v-model="num1" placeholder="Enter first number" />
      <input type="text" v-model="num2" placeholder="Enter second number" />
    </div>
    <div>
      <button @click="add" class="btn btn-info">+</button>
      <button @click="subtract" class="btn btn-info">-</button>
      <button @click="multiply" class="btn btn-info">*</button>
      <button @click="divide" class="btn btn-info">/</button>
    </div>
    <p>Result: {{ result }}</p>
  </div>
</template>


<script>
export default {
  name: 'CalculatorView',
  data() {
    return {
      num1: null,
      num2: null,
      result: null,
    };
  },
  methods: {
    add() {
      this.result = parseFloat(this.num1) + parseFloat(this.num2);
    },
    subtract() {
      this.result = parseFloat(this.num1) - parseFloat(this.num2);
    },
    multiply() {
      this.result = parseFloat(this.num1) * parseFloat(this.num2);
    },
    divide() {
      if (parseFloat(this.num2) === 0) {
        this.result = 'Cannot divide by zero';
      } else {
        this.result = parseFloat(this.num1) / parseFloat(this.num2);
      }
    },
  },
};
</script>

