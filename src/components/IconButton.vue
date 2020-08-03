<template>
  <div class="small-button" @click="click">
    <img
      src="~@/assets/images/icons/folder-icon-resting.png"
      width="32"
      height="32"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class IconButton extends Vue {
  click() {
    this.$emit("click");
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/sass/styles.scss";

a,
a:hover,
a:focus {
  text-decoration: none;
}

.small-button {
  background: url("~@/assets/images/buttons/war3_btn_small_blue_normal_4k.png");
  width: 67px;
  height: 57px;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  cursor: pointer;
}
</style>
