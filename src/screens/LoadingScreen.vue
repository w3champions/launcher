<template>
  <div class="doors-wrapper">
    <div class="doors-container">
      <transition name="fade">
        <img
          src="~@/assets/images/backgrounds/doors_intro.png"
          class="doors-intro"
          height="885"
          v-if="loading"
        />
      </transition>
      <transition name="slide-left">
        <div class="doors-left" v-if="closedDoors">
          <img src="~@/assets/images/backgrounds/doors_left.png" height="885" />
        </div>
      </transition>
      <transition name="slide-right">
        <div class="doors-right" v-if="closedDoors">
          <img
            src="~@/assets/images/backgrounds/doors_right.png"
            height="885"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Modal from "@/components/Modal.vue";

@Component
@Component({
  components: {
    Modal,
  },
})
export default class LoadingScreen extends Vue {
  private loading = true;
  private closedDoors = true;
  private visible = true;

  created() {
    setTimeout(() => {
      this.loading = false;
      setTimeout(() => {
        this.closedDoors = false;
      }, 700);
    }, 3000);
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/sass/styles.scss";
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 1s linear;
}

.slide-left-enter,
.slide-left-leave-to {
  transform: translateX(-1000px);
}

.slide-right-enter,
.slide-right-leave-to {
  transform: translateX(1000px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.doors-wrapper {
  width: 1575px;
  height: 885px;
  z-index: 9999;
  position: absolute;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  pointer-events: none;

  .doors-container {
    width: 1678px;
    height: 885px;
    position: relative;
    display: flex;

    .doors-intro {
      position: absolute;
      z-index: 1;
    }

    .doors-left {
      position: absolute;
      left: 0;
    }
    .doors-right {
      position: absolute;
      right: 3px;
    }
  }
}

.doors-container {
  width: 1678px;
  height: 885px;
  position: absolute;
}
</style>
