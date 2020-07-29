<template>
  <div
    class="background"
    :style="{ 'background-image': 'url(' + backgroundPicture + ')' }"
  >
    <Modal :width="885" v-bind:buttonLabel="buttonLabel">
      <div class="header">
        <div>
          <span>
            <span class="primary">W3Champions</span> join the battlefield
          </span>
          <div class="settings-icon">
            <a href="#">
              <img
                src="@/assets/images/icons/settings-icon-resting.png"
                class="settings-icon-resting"
              />
              <img
                src="@/assets/images/icons/settings-icon-hover.png"
                class="settings-icon-hover"
              />
            </a>
          </div>
        </div>
      </div>
      <div class="content"></div>
    </Modal>
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
export default class MainScreen extends Vue {
  private buttonLabel = "Launch";
  get backgroundPicture() {
    return require("@/assets/images/backgrounds/arthas.png");
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/sass/styles.scss";

.background {
  width: 1575px;
  height: 885px;
  display: flex;
  flex-direction: column;
}

.header {
  width: 826px;
  height: 186px;
  background: url("~@/assets/images/modal/header.png");

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-size: 20px;
    font-weight: 700;
    padding: 60px 67px 0 67px;
    box-sizing: border-box;
    font-family: "BlizQuadrata Web";
    text-transform: uppercase;
  }
}

.settings-icon {
  width: 46px;
  height: 46px;

  .settings-icon-resting {
    width: 46px;
    height: 46px;
    display: block;
  }

  .settings-icon-hover {
    width: 46px;
    height: 46px;
    display: none;
  }
}

.settings-icon:hover {
  .settings-icon-resting {
    display: none;
  }

  .settings-icon-hover {
    display: block;
  }
}
</style>
