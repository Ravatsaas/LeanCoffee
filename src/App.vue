<template>
  <div id="app">
    <h1>Lean Coffee</h1>
    <Timer/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Timer from './components/Timer.vue';
import Cup from './components/Cup.vue';

@Component({
  components: {
    Timer,
    Cup
  },
})
export default class App extends Vue {}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lobster|Roboto&display=swap');

body {
  background-color: #eee;
}

#app {
  font-family: Roboto, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  font-family: 'Lobster', cursive;
  font-size: 4em;
}

button {
    font-family: Roboto, Helvetica, sans-serif;
    border: 0;
    padding: 10px;
    margin: 5px;
    font-size: 1.4em;
    border-radius: 10px;
    cursor: pointer;
}

button.btn-primary {
    background-color: #ccc;
}

button.btn-primary:hover:not(:disabled) {
    background-color: #8cd;
}

button.btn-secondary:hover:not(:disabled) {
    background-color: #ddd;
}

button:disabled,
    button[disabled] {
    color: #aaa;
    cursor: not-allowed;
}

</style>
