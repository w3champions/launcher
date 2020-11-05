<template>
  <div @click="onClick" class="header-item w3font">
    {{ text }}
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component({})
export default class ButtonWarcraft extends Vue {
  @Prop() public text!: string;
  @Prop() public onClick!: () => {};
}
</script>

<style scoped type="text/css">
.header-item {
  -webkit-app-region: no-drag;
  font-size: 1.5em;
  text-align: center;
  line-height: 56px;
  width: 215px;
  height: 55px;
  background: url("~@/assets/images/home/Button_Blue.png") center no-repeat;
  background-size: cover;
  cursor: pointer;
}

.header-item:active {
  background: url("~@/assets/images/home/Button_Blue_Active.png") center no-repeat;
  background-size: cover;
  cursor: pointer;
}

</style>
