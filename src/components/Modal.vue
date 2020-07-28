<template>
  <div class="modal-wrapper">
    <div class="modal-container" :style="getContainerStyle()">
      <div class="modal-background" :style="getBackgroundStyle()">
        <slot />
      </div>
      <img
        src="~@/assets/images/modal/frame.png"
        class="modal-frame"
        :style="getFrameStyle()"
      />
      <div class="modal-button-container" :style="getButtonStyle()">
        <ModalButton
          v-if="buttonLabel !== undefined"
          @click="onButtonClick"
          :disabled="buttonDisabled"
          >{{ buttonLabel }}</ModalButton
        >
      </div>
    </div>
    <div class="modal-clasp" :style="getClaspStyle()">
      <img src="~@/assets/images/modal/clasp.png" />
      <img src="~@/assets/images/modal/clasp.png" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ModalButton from "./ModalButton.vue";

@Component({
  components: {
    ModalButton,
  },
})
export default class MainScreen extends Vue {
  @Prop({ default: 885 }) readonly width!: number;
  @Prop(String) readonly buttonLabel: string | undefined;
  @Prop(Boolean) readonly buttonDisabled: boolean | undefined;
  @Prop(Function) readonly onButtonClick: Function | undefined;

  get framePicture() {
    return require("@/assets/images/backgrounds/arthas.png");
  }

  transformNumberToPixel(style: { width: number; height: number }) {
    return { ...style, width: style.width + "px", height: style.height + "px" };
  }

  getContainerStyle() {
    return this.transformNumberToPixel({
      width: this.width,
      height: 50 + 100 + (747 / 885) * this.width,
    });
  }

  getBackgroundStyle() {
    return this.transformNumberToPixel({
      width: (845 / 885) * this.width,
      height: (720 / 885) * this.width,
    });
  }

  getFrameStyle() {
    return this.transformNumberToPixel({
      width: this.width,
      height: (747 / 885) * this.width,
    });
  }

  getClaspStyle() {
    return this.transformNumberToPixel({
      width: (750 / 885) * this.width,
      height: 118,
    });
  }

  getButtonStyle() {
    return { bottom: 12 + (30 / 885) * this.width + "px" };
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/sass/styles.scss";

.modal-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
}

.modal-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
}

.modal-background {
  background: url("~@/assets/images/modal/background.png");
}

.modal-frame {
  position: absolute;
  pointer-events: none;
}

.modal-clasp {
  top: 0;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  img {
    width: 108px;
    height: 118px;
  }
}

.modal-content {
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.modal-button-container {
  position: absolute;
}
</style>
