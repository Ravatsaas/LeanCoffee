<template>
  <div id="app">
    <md-app>
      <md-app-toolbar>
        <h1>Lean Café</h1>
      </md-app-toolbar>
      <md-app-content>
        <Timer/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Timer from './components/Timer.vue';
import Cup from './components/Cup.vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'

Vue.use(VueMaterial);

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

h1 {
  font-family: 'Lobster', cursive;
  font-size: 3em;
}

button {
    font-family: Roboto, Helvetica, sans-serif;
    border: 0;
    padding: 10px;
    margin: 5px;
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
