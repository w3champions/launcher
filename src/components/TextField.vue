<template>
  <div class="settings-textfield">
    <label :for="id">{{ label }}</label>
    <input
      type="text"
      :placeholder="'Please set ' + label + ' path'"
      :class="value == '' ? 'settings-input-field-error' : ''"
      :id="id"
      :name="id"
      v-model="value"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class TextField extends Vue {
  @Prop({ default: "" }) readonly value!: string;
  @Prop(String) readonly id: string | undefined;
  @Prop(String) readonly label: string | undefined;

  get backgroundPicture() {
    return require("@/assets/images/backgrounds/arthas.png");
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/sass/styles.scss";

.settings-textfield {
  margin-top: 20px;

  label {
    font-size: 24px;
    font-family: "BlizQuadrata Web";
    color: #ffcf00;
    margin-left: 6px;
    text-transform: capitalize;
  }

  input[type="text"] {
    background: url("~@/assets/images/fields/war3_text_normal_4k.png");
    box-sizing: border-box;
    width: 470px;
    height: 70px;
    background-size: cover;
    outline: none;
    border: none;
    font-size: 20px;
    color: white;
    font-family: "BlizQuadrata Web";
    padding-left: 25px;
    padding-bottom: 10px;
    margin-top: 10px;
  }

  .settings-input-field-error[type="text"] {
    background: url("~@/assets/images/fields/war3_text_error_resting_4k.png");
    box-sizing: border-box;
    width: 470px;
    height: 70px;
    background-size: cover;
    outline: none;
    border: none;
    font-size: 20px;
    color: white;
    font-family: "BlizQuadrata Web";
    padding-left: 25px;
    padding-bottom: 10px;
    margin-top: 10px;
  }
  .settings-input-field-error[type="text"]::placeholder {
    color: #e23d19;
  }
}
</style>
