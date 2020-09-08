<template>
  <div @click="goToTarget" class="header-item">
    {{ text }}
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component({})
export default class HeadItem extends Vue {
  @Prop() public text!: string;
  @Prop() public target!: string;

  public goToTarget() {
    this.$router.push({
      path: this.target
    })
  }
}
</script>

<style scoped type="text/css">
.header-item {
  -webkit-app-region: no-drag;
  font-size: 1.5em;
  text-align: center;
  line-height: 56px;
  width: 215px;
  height: 56px;
  background: url("~@/assets/images/home/Button_Blue.png") center no-repeat;
  background-size: cover;
}

.header-item:active {
  background: url("~@/assets/images/home/Button_Blue_Active.png") center no-repeat;
  background-size: cover;
  cursor: pointer;
}

</style>
