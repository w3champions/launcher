<template>
  <div class="launcher-background">
    <LoadingSpinner :style="`visibility: ${isLoading ? 'visible' : 'hidden'}`" />
    <div style="padding-top: 40px; position: relative">
      <div class="options-header w3font" style="margin-bottom: 10px">Directory Settings</div>
        <div class="location-wrapper">
        <div class="w3c-icon" :title="`Enter the location to wc3 (Usually ${defaultW3Location})`"/>
        <div class="reset-button-line"  :class="isW3LocationWrong ? 'path-is-wrong' : 'path-is-right'">
          <div :title="explanationW3Wrong">{{w3Path}}</div>
          <div class="reset-button" @click="resetW3Path" />
        </div>
        <div class="bnet-icon" :title="`Enter the location to wc3 (Usually ${defaultBnetLocation})`" />
        <div class="reset-button-line" :class="isBnetLocationWrong ? 'path-is-wrong' : 'path-is-right'">
          <div :title="explanationBnetWrong">{{battleNet}}</div>
          <div class="reset-button" @click="resetBnetPath" />
        </div>
      </div>
      <div class="options-header w3font" style="margin-top: 20px">Color Settings</div>
      <div class="color-pick-bar">
        <div style="display: flex">
          <div :class="isTeamColorsEnabled ? 'toggle-on' : 'toggle-off'" @click="toggleTeamColors"/>
          <div style="line-height: 31px; margin-left: 5px">Team colors</div>
        </div>

        <ColorPicker text="Own Color" :color="ownColor" :onSwitchColor="switchOwnColor"/>
        <ColorPicker text="Enemy Color" :color="enemyColor" :onSwitchColor="switchEnemyColor"/>
        <ColorPicker text="Allies Color" :color="alliesColor" :onSwitchColor="switchAlliesColor"/>
      </div>
      <div class="options-header w3font" style="margin-top: 20px">Misc</div>
      <div class="misc-wrapper">
        <div style="display: flex">
          <div :class="isChinaProxyEnabled ? 'toggle-on' : 'toggle-off'" @click="toggleChinaProxy"/>
          <div style="line-height: 31px; margin-left: 5px">China proxy</div>
        </div>
      </div>
      <div class="button-bar">
        <template v-if="isChinaProxyEnabled">
          <div @click="repairW3cChina" :disabled="isLoading" class="button-bar-button w3font">
            修复客户端
          </div>
        </template>
        <template v-else>
          <div @click="repairW3c" :disabled="isLoading" class="button-bar-button w3font">
            Reset W3C
          </div>
          <div @click="redownloadW3c" :disabled="isLoading" class="button-bar-button w3font" :class="isW3LocationWrong ? 'disabled-option' : ''" :title="explanationW3Wrong">
            Redownload
          </div>
          <div @click="toggleVersion" class="button-bar-button w3font" :class="isW3LocationWrong ? 'disabled-option' : ''" :title="explanationW3Wrong">
            Switch to {{ !isTest ? "PTR" : "LIVE" }}
          </div>
        </template>
      </div>
      <div class="version-wrapper">
        <div>Warcraft 3 Champions Version: {{w3cVersion}}</div>
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
          <div class="options-header w3font" style="margin-top: 20px">Color Settings</div>
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

  get isChinaProxyEnabled() {
    return this.$store.direct.state.isChinaProxyEnabled
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
  
  public async toggleChinaProxy() {
    await this.$store.direct.dispatch.setChinaProxy(!this.isChinaProxyEnabled);
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

    public async repairW3cChina() {
    if (this.isLoading) return;

    await this.updateStrategy.repairChina();
  }

  private isWindows() {
    return this.$store.state.isWindows;
  }
}
</script>

<style scoped type="text/css">
.launcher-background {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.button-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  margin-top: 50px;
  width: 915px;
  height: 71px;

  background: url("~@/assets/images/home/Header_Buttons_Frame_Slim.png") center no-repeat;
  background-size: cover;
}

.button-bar-button {
  font-size: 20px;
  width: 208px;
  height: 54px;
  text-align: center;
  cursor: pointer;
  line-height: 56px;
  background: url("~@/assets/images/home/Button_Blue.png") center no-repeat;
  background-size: cover;
}

.button-bar-button:active {
  background: url("~@/assets/images/home/Button_Blue_Active.png") center no-repeat;
  background-size: cover;
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

.toggle-off {
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
  position: absolute;
  right: 0;
  top: 0;
}

.color-pick-bar {
  margin-top: 10px;
  background: url("~@/assets/images/home/Header_Buttons_Frame.png") no-repeat center;
  height: 71px;
  width: 671px;
  background-size: cover;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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

.misc-wrapper {
  margin-top: 10px;
  background: url("~@/assets/images/home/Header_Buttons_Frame.png") no-repeat center;
  height: 71px;
  width: 671px;
  background-size: cover;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
