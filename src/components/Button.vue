<template>
  <button class="big-button" type="button" :disabled="buttonDisabled">
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Button extends Vue {
  @Prop(Boolean) readonly buttonDisabled: boolean | undefined;

  isDisabled() {
    console.log(this.buttonDisabled);
    return this.buttonDisabled;
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

.big-button {
  background: url("~@/assets/images/buttons/wc3_btn_blue_normal_4k.png");
  width: 340px;
  height: 55px;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  font-family: "BlizQuadrata Web";
  text-transform: uppercase;
  color: #ffcf00;
  outline: none;
  border: none;
  cursor: pointer;
}
.big-button:disabled,
.big-button[disabled] {
  background: url("~@/assets/images/buttons/wc3_btn_disabled_normal_4k.png");
  width: 340px;
  height: 55px;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  font-family: "BlizQuadrata Web";
  text-transform: uppercase;
  color: #535353;
  outline: none;
  border: none;
  cursor: not-allowed;
}
</style>
