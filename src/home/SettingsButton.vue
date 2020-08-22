<template>
  <div @click="goToTarget" class="settings-button">
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class SettingsButton extends Vue {
  public goToTarget() {
    this.$router.push({
      path: "/Settings"
    })
  }
}
</script>

<style scoped type="text/css">
.settings-button {
  -webkit-app-region: no-drag;

  width: 50px;
  height: 50px;
  cursor: pointer;

  background: url("~@/assets/images/icons/settings-icon-resting.png") center no-repeat;
  background-size: cover;
}

.settings-button:active {
  background: url("~@/assets/images/icons/settings-icon-pressed.png") center no-repeat;
  background-size: cover;
}

.settings-button:hover {
  background: url("~@/assets/images/icons/settings-icon-hover.png") center no-repeat;
  background-size: cover;
}

</style>
