<template>
  <div class="loading-wrapper">
    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    <br />
    <span>Updating Warcraft 3 Champions...</span>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({})
export default class LoadingSpinner extends Vue {
}
</script>

<style scoped type="text/css">
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid antiquewhite;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: antiquewhite transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;

  background: rgba(0,0,0, 0.9);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
