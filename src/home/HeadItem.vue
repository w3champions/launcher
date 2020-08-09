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
  color: antiquewhite;
  font-size: 2em;
}

</style>
