<template>
  <div class="modal-button">
    <div class="frame">
      <Button :buttonDisabled="buttonDisabled">
        <slot />
      </Button>
    </div>
    <div class="caps">
      <img
        src="@/assets/images/modal/button/left_cap.png"
        width="60"
        height="100"
      />
      <img
        src="@/assets/images/modal/button/right_cap.png"
        width="60"
        height="100"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Button from "./Button.vue";

@Component({
  components: {
    Button,
  },
})
export default class ModalButton extends Vue {
  @Prop(Boolean) readonly buttonDisabled: boolean | undefined;
}
</script>

<style scoped lang="scss">
@import "~@/assets/sass/styles.scss";
.modal-button {
  width: 456px;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .caps {
    top: 0;
    width: 456px;
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    position: absolute;
    pointer-events: none;
  }
  .frame {
    background: url("~@/assets/images/modal/button/frame.png");
    background-size: contain;
    height: 100px;
    width: 402px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
