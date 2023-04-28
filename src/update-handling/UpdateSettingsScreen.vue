<template>
  <div class="launcher-background">
    <LoadingSpinner :style="`visibility: ${isLoading ? 'visible' : 'hidden'}`" />
    <div class="panel">
      <div class="version-wrapper">
        <div>W3Champions Endpoint: {{selectedEndpoint.id}}</div>
        <div>W3Champions Version: {{w3cVersion}}</div>
        <div>Launcher Version: {{ currentLauncherVersion }}</div>
        <div v-if="currentUser">
          <span>{{ currentUser }}</span>
        </div>
      </div>
      <div class="settings-wrapper">
        <div>
          <div class="options-header w3font" style="margin-bottom: 10px">Directory Settings</div>
          <div class="location-wrapper">
            <div class="w3c-icon" :title="`Enter the location to wc3 (Usually ${defaultW3Location})`"></div>
            <div class="reset-button-line" :class="isW3LocationWrong ? 'path-is-wrong' : 'path-is-right'">
              <div :title="explanationW3Wrong">{{w3Path}}</div>
              <div class="reset-button" @click="resetW3Path"></div>
            </div>
            <div class="bnet-icon" :title="`Enter the location to wc3 (Usually ${defaultBnetLocation})`"></div>
            <div class="reset-button-line" :class="isBnetLocationWrong ? 'path-is-wrong' : 'path-is-right'">
              <div :title="explanationBnetWrong">{{battleNet}}</div>
              <div class="reset-button" @click="resetBnetPath"></div>
            </div>
          </div>
        </div>
        <div>
          <div class="options-header w3font" style="margin-top: 15px">Color Settings</div>
          <div class="color-pick-bar">
            <div style="display: flex">
              <div :class="isTeamColorsEnabled ? 'team-colors-on' : 'team-colors-off'" @click="toggleTeamColors"></div>
              <div style="line-height: 31px; margin-left: 5px">Team colors</div>
            </div>

            <ColorPicker text="Own Color" :color="ownColor" :onSwitchColor="switchOwnColor" />
            <ColorPicker text="Enemy Color" :color="enemyColor" :onSwitchColor="switchEnemyColor" />
            <ColorPicker text="Allies Color" :color="alliesColor" :onSwitchColor="switchAlliesColor" />
          </div>

          <div class="color-pick-bar">
            <div style="display: flex">
              <div :class="isCustomFontEnabled ? 'team-colors-on' : 'team-colors-off'" @click="toggleCustomFont"></div>
              <div style="line-height: 31px; margin-left: 5px">Custom Fonts</div>
            </div>
            <div v-if="isTest" style="display: flex">
              <div :class="isBlizzardPTREnabled ? 'team-colors-on' : 'team-colors-off'" @click="toggleBlizzardPTR"></div>
              <div style="line-height: 31px; margin-left: 5px">Blizzard PTR</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="button-bar">
      <div @click="repairW3c" :disabled="isLoading" class="button-bar-button w3font">
        Reset W3C
      </div>
      <div @click="redownloadW3c" :disabled="isLoading" class="button-bar-button w3font" :class="isW3LocationWrong ? 'disabled-option' : ''" :title="explanationW3Wrong">
        Redownload
      </div>
      <div @click="toggleVersion" class="button-bar-button w3font" :class="isW3LocationWrong ? 'disabled-option' : ''" :title="explanationW3Wrong">
        Switch to {{ !isTest ? "PTR" : "LIVE" }}
      </div>
      <div @click="resetAuthentication" class="button-bar-button w3font">
        Log out
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import LoadingSpinner from "@/home/LoadingSpinner.vue";
import ColorPicker from "@/color-picker/ColorPicker.vue";
import store from "@/globalState/vuex-store";
import {LoginGW} from "@/globalState/rootTypings";

@Component({
  components: {ColorPicker, LoadingSpinner}
})
export default class UpdateSettingsScreen extends Vue {
  private updateStrategy = store.getters.fileService.updateStrategy;

  get defaultBnetLocation() {
    return this.updateStrategy.getDefaultBnetPath();
  }

  get defaultW3Location() {
    return this.updateStrategy.getDefaultPathWc3().replace("\\_retail_", "").replace("_retail_", "");
  }

  get enemyColor() {
    return this.$store.direct.state.colorPicker.enemyColor;
  }

  get ownColor() {
    return this.$store.direct.state.colorPicker.ownColor;
  }

  get alliesColor() {
    return this.$store.direct.state.colorPicker.allyColor;
  }

  get selectedEndpoint() {
    return this.$store.direct.state.selectedEndpoint;
  }

  public switchOwnColor(newColor: string) {
    this.$store.direct.dispatch.colorPicker.switchOwnColor(newColor);
  }

  public async resetAuthentication() {
    this.$store.direct.dispatch.setLoginGateway(LoginGW.none);
    await this.$router.push("/");
    await this.$store.direct.dispatch.resetAuthentication(false);
  }

  public switchEnemyColor(newColor: string) {
    this.$store.direct.dispatch.colorPicker.switchEnemyColor(newColor);
  }

  public switchAlliesColor(newColor: string) {
    this.$store.direct.dispatch.colorPicker.switchAlliesColor(newColor);
  }

  get isTeamColorsEnabled() {
    return this.$store.direct.state.colorPicker.isTeamColorsEnabled;
  }

  public async toggleTeamColors() {
    await this.$store.direct.dispatch.colorPicker.saveIsTeamColorsEnabled(!this.isTeamColorsEnabled);
  }

  get isCustomFontEnabled() {
    return this.$store.direct.state.updateHandling.isCustomFontEnabled;
  }

  public async toggleCustomFont() {
    let value = !this.isCustomFontEnabled;

    this.$store.direct.dispatch.updateHandling.saveIsCustomFontEnabled(value);

    this.updateStrategy.setCustomFont(value);
  }

  get isBlizzardPTREnabled() {
    return this.$store.direct.state.updateHandling.isBlizzardPTRKey;
  }

  public async toggleBlizzardPTR() {
    this.$store.direct.dispatch.updateHandling.saveIsBlizzardPTREnabled(!this.isBlizzardPTREnabled);
    this.$store.direct.dispatch.reloadFloWorkers();
  }


  get explanationW3Wrong() {
    if (this.isW3LocationWrong) {
      return "Warcraft III location wrong, please select a different Folder"
    }

    return ""
  }

  get explanationBnetWrong() {
    if (this.isBnetLocationWrong) {
      return "BattleNet location wrong, please select a different Folder"
    }

    return ""
  }

  get isW3LocationWrong() {
    return this.$store.direct.state.updateHandling.w3PathIsInvalid;
  }

  get isBnetLocationWrong() {
    return this.$store.direct.state.updateHandling.bnetPathIsInvalid;
  }

  public async toggleVersion() {
    this.isTest ? await this.updateStrategy.switchToProd() : await this.updateStrategy.switchToPtr();
  }

  public async resetBnetPath() {
    await this.updateStrategy.hardSetBnetPath();
  }

  public async resetW3Path() {
    await this.updateStrategy.hardSetW3cPath();
  }

  public async redownloadW3c() {
    await this.updateStrategy.redownloadW3c();
  }

  get isTest() {
    return this.$store.direct.state.isTest;
  }

  get battleNet(): string {
    return this.$store.direct.state.updateHandling.bnetPath;
  }

  get w3cVersion(): string {
    return this.$store.direct.state.updateHandling.localW3cVersion;
  }

  get currentLauncherVersion(): string {
    return this.$store.direct.state.updateHandling.localLauncherVersion;
  }

  get currentUser(): string {
    return this.$store.direct.state.w3cToken?.battleTag ?? '';
  }

  get w3Path(): string {
    return this.updateStrategy.w3PathWithOutRetail;
  }

  get news() {
    return this.$store.direct.state.news;
  }

  public async tryStartWc3() {
    if (this.isLoading) return;
    await this.updateStrategy.updateIfNeeded();
  }

  get isLoading() {
    return this.$store.state.updateHandling.isUpdatingMaps || this.$store.state.updateHandling.isUpdatingWebUI;
  }

  public async repairW3c() {
    if (this.isLoading) return;

    await this.updateStrategy.repairWc3();
  }
}
</script>

<style scoped type="text/css">
.launcher-background {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.button-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  position:fixed;
  bottom: 5vh;
  width: 82%;
  height: 70px;

  background: url("~@/assets/images/home/Header_Buttons_Frame_Slim.png") center no-repeat;
  background-size: 100% 100%;
}

.button-bar-button {
  font-size: 20px;
  width: 20vw;
  height: 50px;
  text-align: center;
  cursor: pointer;
  line-height: 50px;
  background: url("~@/assets/images/home/Button_Blue.png") center no-repeat;
  background-size: 100% 100%;
}

.button-bar-button:active {
  background: url("~@/assets/images/home/Button_Blue_Active.png") center no-repeat;
  background-size: 100% 100%;
}

.reset-button-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 540px;
  height: 42px;
  padding-bottom: 8px;
  padding-left: 32px;
  padding-right: 32px;
  user-select: text;
}

.team-colors-on {
  background: url("~@/assets/images/settings/Settings_Toggle_On.png") center no-repeat;
  background-size: cover;
  width: 31px;
  height: 30px;
}

.team-colors-off {
  background: url("~@/assets/images/settings/Settings_Toggle_Off.png") center no-repeat;
  background-size: cover;
  width: 31px;
  height: 30px;
}

.path-is-wrong {
  background: url("~@/assets/images/settings/Settings_Directory_Frame_Error.png") no-repeat center;
  background-size: cover;
}

.path-is-right {
  background: url("~@/assets/images/settings/Settings_Directory_Frame.png") no-repeat center;
  background-size: cover;
}

.disabled-option {
  color: rgb(140, 137, 137) !important;
  filter: grayscale();
}

.reset-button {
  width: 36px;
  height: 36px;
  background: url("~@/assets/images/icons/folder-icon-resting.png") no-repeat center;
  background-size: cover;
}

.reset-button:hover {
  background: url("~@/assets/images/icons/folder-icon-hover.png") no-repeat center;
  background-size: cover;
  cursor: pointer;
}

.version-wrapper {
  text-align: right;
  position: fixed;
  right: 5.5vw;
  top: 20vh;
  font-size: 12px;
}

.color-pick-bar {
  margin-top: 1vh;
  background: url("~@/assets/images/home/Header_Buttons_Frame.png") no-repeat center;
  height: 72px;
  width: 671px;
  background-size: 100% 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.options-header {
  font-size: 18px;
}

.bnet-icon {
  background: url("~@/assets/images/settings/Settings_Bnet_Icon.png") no-repeat center;
  background-size: cover;
  margin-left: 10px;
  margin-bottom: 5px;
  height: 24px;
  width: 24px;
}

.w3c-icon {
  background: url("~@/assets/images/settings/Settings_W3_Icon.png") no-repeat center;
  background-size: cover;
  margin-left: 10px;
  margin-bottom: 5px;
  height: 26px;
  width: 30px;
}

.location-wrapper {
  background: url("~@/assets/images/settings/Settings_Directory_Text_Frame.png") no-repeat center;
  background-size: cover;
  padding: 28px 30px 30px;
  height: 154px;
  width: 605px;
}

.settings-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.panel {
  overflow-y: scroll;
  scroll-behavior: smooth;
}
</style>