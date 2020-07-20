<template>
  <div id="app">
    <W3CLauncher/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import W3CLauncher from './components/W3CLauncher.vue';

@Component({
  components: {
    W3CLauncher,
  },
})
export default class App extends Vue {}
</script>
