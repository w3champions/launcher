<template>
  <div>
    <div>
      logging you in
    </div>
    <div>
      {{ code }}
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import LoadingSpinner from "@/home/LoadingSpinner.vue";
import logger from "@/logger";

@Component({
  components: {LoadingSpinner}
})
export default class LoginScreen extends Vue {
  @Prop() public code!: string;

  async mounted() {
    logger.info("code: " + this.code);
    await this.$store.direct.dispatch.authorizeWithCode(this.code);
    this.$router.push({
      path: '/',
    });
  }
}
</script>

<style scoped type="text/css">
</style>
