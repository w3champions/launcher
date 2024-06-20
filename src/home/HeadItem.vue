<template>
  <ButtonWarcraft :on-click="goToTarget" :text="text" class="header-item w3font" />
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-facing-decorator";
import logger from "@/logger";
import ButtonWarcraft from "@/home/ButtonWarcraft.vue";

@Component({
  components: {ButtonWarcraft}
})
export default class HeadItem extends Vue {
  @Prop() public text!: string;
  @Prop() public target!: string;

  public goToTarget() {
    this.$router.push({
      path: this.target
    }).catch((err: any) => {
      if (
          err.name !== 'NavigationDuplicated' &&
          !err.message.includes('Avoided redundant navigation to current location')
      ) {
        logger.error(err);
      }
    });
  }
}
</script>
