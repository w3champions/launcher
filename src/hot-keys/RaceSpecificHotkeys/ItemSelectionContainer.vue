<template>
  <table v-if="!singleRow" class="selection-background">
    <tr v-for="line in selectionItems" :key="toKey(line)">
      <td class="item-selection-container" v-for="item in line" :key="item.icon" :class="item.icon + isClassicMode">
        <div class="item-selection" @click="() => onClick(item)">
          <div class="item-selection-hover-text w3font" :class="item.hasConflict ? 'has-conflict' : ''">
            {{ parseHotkey(item) }}
          </div>
        </div>
      </td>
    </tr>
  </table>
  <table v-else class="selection-background selection-background-single-line">
    <tr>
      <td class="item-selection-container" v-for="item in selectionItems" :key="item.icon" :class="item.icon + isClassicMode">
        <div class="item-selection" @click="() => onClick(item)">
          <div class="item-selection-hover-text w3font" :class="item.hasConflict ? 'has-conflict' : ''">
            {{ parseHotkey(item) }}
          </div>
        </div>
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {Ability, W3cIcon} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";

@Component
export default class ItemSelectionContainer extends Vue {
  @Prop() public selectionItems!: W3cIcon[][];
  @Prop() public singleRow!: boolean;
  @Prop() public isResearchAbilitySelected!: boolean;
  // eslint-disable-next-line no-unused-vars
  @Prop() public onClick!: (icon: W3cIcon) => void;

  public toKey(units: W3cIcon[]) {
    return units.map(u => u.icon).join("_");
  }

  public parseHotkey(item: Ability) {
    if (this.isResearchAbilitySelected) {
      return this.parseWithEscape(item.researchHotkey)
    }
    return this.parseWithEscape(item.currentHotkey);
  }

  private parseWithEscape(item: string) {
    return item ? item.replace("27", "ESC").replace("512", "ESC") : '';
  }

  get isClassicMode() {
    return this.$store.direct.state.hotKeys.isClassicMode ? '-classic' : '';
  }
}

</script>

<style type="text/css">
.has-conflict {
  color: #ff2828;
}

.item-selection-container {
  height: 64px;
  width: 64px;
  padding: 0 !important;
}

.item-selection{
  height: 100%;
  width: 100%;
}

.item-selection:hover{
  background: url("~@/assets/images/hotkeys/Hotkeys_Button_Highlight.png") no-repeat center;
  background-size: cover;
}

.selected-item{
  background: url("~@/assets/images/hotkeys/Hotkeys_Button_Highlight.png") no-repeat center;
  background-size: cover;
}

.item-selection-container {
  height: 64px;
  width: 64px;
  padding: 0 !important;
}

.item-selection{
  height: 100%;
  width: 100%;
}

.item-selection:hover{
  background: url("~@/assets/images/hotkeys/Hotkeys_Button_Highlight.png") no-repeat center;
  background-size: cover;
}

.item-selection-hover-text {
  text-align: right;
  padding-right: 5px;
  padding-top: 43px;
}

.selection-background {
  padding: 5px;
  background: url("~@/assets/images/hotkeys/Hotkeys_Full_Frame.png") no-repeat center;
  background-size: cover;
}

.selection-background-single-line {
  background: url("~@/assets/images/hotkeys/Hotkeys_Heroes_Frame.png") no-repeat center;
  background-size: cover;
}

/*This is hacky AF, but I did not get the dynamic styling to work with webpack and all that electron fuck....*/
.btnabomination {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnabomination.jpg') no-repeat center;
  background-size: cover;
}

.btnabsorbmagic {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnabsorbmagic.jpg') no-repeat center;
  background-size: cover;
}

.btnacidbomb {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnacidbomb.jpg') no-repeat center;
  background-size: cover;
}

.btnacolyte {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnacolyte.jpg') no-repeat center;
  background-size: cover;
}

.btnadvancedcreatureattack {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnadvancedcreatureattack.jpg') no-repeat center;
  background-size: cover;
}

.btnadvancedcreaturecarapace {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnadvancedcreaturecarapace.jpg') no-repeat center;
  background-size: cover;
}

.btnadvanceddeathtower {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnadvanceddeathtower.jpg') no-repeat center;
  background-size: cover;
}

.btnadvancedenergytower {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnadvancedenergytower.jpg') no-repeat center;
  background-size: cover;
}

.btnadvancedflametower {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnadvancedflametower.jpg') no-repeat center;
  background-size: cover;
}

.btnadvancedfrosttower {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnadvancedfrosttower.jpg') no-repeat center;
  background-size: cover;
}

.btnadvancedmoonarmor {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnadvancedmoonarmor.jpg') no-repeat center;
  background-size: cover;
}

.btnadvancedreinforcedhides {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnadvancedreinforcedhides.jpg') no-repeat center;
  background-size: cover;
}

.btnadvancedrocktower {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnadvancedrocktower.jpg') no-repeat center;
  background-size: cover;
}

.btnadvancedspikedbarricades {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnadvancedspikedbarricades.jpg') no-repeat center;
  background-size: cover;
}

.btnadvancedstrengthofthemoon {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnadvancedstrengthofthemoon.jpg') no-repeat center;
  background-size: cover;
}

.btnadvancedstrengthofthewild {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnadvancedstrengthofthewild.jpg') no-repeat center;
  background-size: cover;
}

.btnadvancedunholyarmor {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnadvancedunholyarmor.jpg') no-repeat center;
  background-size: cover;
}

.btnadvancedunholystrength {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnadvancedunholystrength.jpg') no-repeat center;
  background-size: cover;
}

.btnairattackon {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnairattackon.jpg') no-repeat center;
  background-size: cover;
}

.btnaltarofdarkness {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnaltarofdarkness.jpg') no-repeat center;
  background-size: cover;
}

.btnaltarofelders {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnaltarofelders.jpg') no-repeat center;
  background-size: cover;
}

.btnaltarofkings {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnaltarofkings.jpg') no-repeat center;
  background-size: cover;
}

.btnaltarofstorms {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnaltarofstorms.jpg') no-repeat center;
  background-size: cover;
}

.btnambush {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnambush.jpg') no-repeat center;
  background-size: cover;
}

.btnammodump {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnammodump.jpg') no-repeat center;
  background-size: cover;
}

.btnancestralspirit {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnancestralspirit.jpg') no-repeat center;
  background-size: cover;
}

.btnancienthydra {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnancienthydra.jpg') no-repeat center;
  background-size: cover;
}

.btnancientoflore {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnancientoflore.jpg') no-repeat center;
  background-size: cover;
}

.btnancientoftheearth {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnancientoftheearth.jpg') no-repeat center;
  background-size: cover;
}

.btnancientofthemoon {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnancientofthemoon.jpg') no-repeat center;
  background-size: cover;
}

.btnancientofwonders {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnancientofwonders.jpg') no-repeat center;
  background-size: cover;
}

.btnanimalwartraining {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnanimalwartraining.jpg') no-repeat center;
  background-size: cover;
}

.btnanimatedead {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnanimatedead.jpg') no-repeat center;
  background-size: cover;
}

.btnankh {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnankh.jpg') no-repeat center;
  background-size: cover;
}

.btnantimagicshell {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnantimagicshell.jpg') no-repeat center;
  background-size: cover;
}

.btnantonidas {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnantonidas.jpg') no-repeat center;
  background-size: cover;
}

.btnanubarak {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnanubarak.jpg') no-repeat center;
  background-size: cover;
}

.btnarachnathid {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnarachnathid.jpg') no-repeat center;
  background-size: cover;
}

.btnarcanesanctum {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnarcanesanctum.jpg') no-repeat center;
  background-size: cover;
}

.btnarcanevault {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnarcanevault.jpg') no-repeat center;
  background-size: cover;
}

.btnarcanitearchitecture {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnarcanitearchitecture.jpg') no-repeat center;
  background-size: cover;
}

.btnarcanitearmor {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnarcanitearmor.jpg') no-repeat center;
  background-size: cover;
}

.btnarcanitemelee {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnarcanitemelee.jpg') no-repeat center;
  background-size: cover;
}

.btnarcaniteranged {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnarcaniteranged.jpg') no-repeat center;
  background-size: cover;
}

.btnarcher {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnarcher.jpg') no-repeat center;
  background-size: cover;
}

.btnarchimonde {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnarchimonde.jpg') no-repeat center;
  background-size: cover;
}

.btnarmoredogre {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnarmoredogre.jpg') no-repeat center;
  background-size: cover;
}

.btnarmorgolem {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnarmorgolem.jpg') no-repeat center;
  background-size: cover;
}

.btnarthas {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnarthas.jpg') no-repeat center;
  background-size: cover;
}

.btnarthasevil {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnarthasevil.jpg') no-repeat center;
  background-size: cover;
}

.btnarthasfrost {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnarthasfrost.jpg') no-repeat center;
  background-size: cover;
}

.btnassassin {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnassassin.jpg') no-repeat center;
  background-size: cover;
}

.btnattack {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnattack.jpg') no-repeat center;
  background-size: cover;
}

.btnattackground {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnattackground.jpg') no-repeat center;
  background-size: cover;
}

.btnauraofdarkness {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnauraofdarkness.jpg') no-repeat center;
  background-size: cover;
}

.btnavatar {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnavatar.jpg') no-repeat center;
  background-size: cover;
}

.btnavataroff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnavataroff.jpg') no-repeat center;
  background-size: cover;
}

.btnavengingassassin {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnavengingassassin.jpg') no-repeat center;
  background-size: cover;
}

.btnavengingwatcher {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnavengingwatcher.jpg') no-repeat center;
  background-size: cover;
}

.btnavengingwatcheroff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnavengingwatcheroff.jpg') no-repeat center;
  background-size: cover;
}

.btnazgalor {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnazgalor.jpg') no-repeat center;
  background-size: cover;
}

.btnazuredragon {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnazuredragon.jpg') no-repeat center;
  background-size: cover;
}

.btnazuredragonwhelp {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnazuredragonwhelp.jpg') no-repeat center;
  background-size: cover;
}

.btnazuredrake {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnazuredrake.jpg') no-repeat center;
  background-size: cover;
}

.btnbacktowork {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbacktowork.jpg') no-repeat center;
  background-size: cover;
}

.btnballista {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnballista.jpg') no-repeat center;
  background-size: cover;
}

.btnbalnazzar {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbalnazzar.jpg') no-repeat center;
  background-size: cover;
}

.btnbanish {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbanish.jpg') no-repeat center;
  background-size: cover;
}

.btnbanshee {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbanshee.jpg') no-repeat center;
  background-size: cover;
}

.btnbansheeadept {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbansheeadept.jpg') no-repeat center;
  background-size: cover;
}

.btnbansheemaster {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbansheemaster.jpg') no-repeat center;
  background-size: cover;
}

.btnbansheeranger {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbansheeranger.jpg') no-repeat center;
  background-size: cover;
}

.btnbarracks {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbarracks.jpg') no-repeat center;
  background-size: cover;
}

.btnbarrel {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbarrel.jpg') no-repeat center;
  background-size: cover;
}

.btnbash {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbash.jpg') no-repeat center;
  background-size: cover;
}

.btnbasicstruct {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbasicstruct.jpg') no-repeat center;
  background-size: cover;
}

.btnbattleroar {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbattleroar.jpg') no-repeat center;
  background-size: cover;
}

.btnbattlestations {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbattlestations.jpg') no-repeat center;
  background-size: cover;
}

.btnbearblink {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbearblink.jpg') no-repeat center;
  background-size: cover;
}

.btnbearden {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbearden.jpg') no-repeat center;
  background-size: cover;
}

.btnbearform {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbearform.jpg') no-repeat center;
  background-size: cover;
}

.btnbeastiary {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbeastiary.jpg') no-repeat center;
  background-size: cover;
}

.btnbeastmaster {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbeastmaster.jpg') no-repeat center;
  background-size: cover;
}

.btnbelt {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbelt.jpg') no-repeat center;
  background-size: cover;
}

.btnberserk {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnberserk.jpg') no-repeat center;
  background-size: cover;
}

.btnberserkelemental {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnberserkelemental.jpg') no-repeat center;
  background-size: cover;
}

.btnberserkfortrolls {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnberserkfortrolls.jpg') no-repeat center;
  background-size: cover;
}

.btnberserkwildkin {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnberserkwildkin.jpg') no-repeat center;
  background-size: cover;
}

.btnbigbadvoodoospell {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbigbadvoodoospell.jpg') no-repeat center;
  background-size: cover;
}

.btnblackcitadel {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnblackcitadel.jpg') no-repeat center;
  background-size: cover;
}

.btnblackdragon {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnblackdragon.jpg') no-repeat center;
  background-size: cover;
}

.btnblackdragonroost {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnblackdragonroost.jpg') no-repeat center;
  background-size: cover;
}

.btnblackdragonwhelp {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnblackdragonwhelp.jpg') no-repeat center;
  background-size: cover;
}

.btnblackdrake {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnblackdrake.jpg') no-repeat center;
  background-size: cover;
}

.btnblackmammoth {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnblackmammoth.jpg') no-repeat center;
  background-size: cover;
}

.btnblackmarket {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnblackmarket.jpg') no-repeat center;
  background-size: cover;
}

.btnblacksmith {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnblacksmith.jpg') no-repeat center;
  background-size: cover;
}

.btnblink {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnblink.jpg') no-repeat center;
  background-size: cover;
}

.btnblizzard {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnblizzard.jpg') no-repeat center;
  background-size: cover;
}

.btnbloodelflieutenant {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbloodelflieutenant.jpg') no-repeat center;
  background-size: cover;
}

.btnbloodelfpeasant {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbloodelfpeasant.jpg') no-repeat center;
  background-size: cover;
}

.btnbloodelfworker {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbloodelfworker.jpg') no-repeat center;
  background-size: cover;
}

.btnbloodfiend {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbloodfiend.jpg') no-repeat center;
  background-size: cover;
}

.btnbloodlust {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbloodlust.jpg') no-repeat center;
  background-size: cover;
}

.btnbloodlustoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbloodlustoff.jpg') no-repeat center;
  background-size: cover;
}

.btnbloodmage2 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbloodmage2.jpg') no-repeat center;
  background-size: cover;
}

.btnbluedemoness {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbluedemoness.jpg') no-repeat center;
  background-size: cover;
}

.btnbluedragonroost {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbluedragonroost.jpg') no-repeat center;
  background-size: cover;
}

.btnbluedragonspawn {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbluedragonspawn.jpg') no-repeat center;
  background-size: cover;
}

.btnbluemagnataur {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbluemagnataur.jpg') no-repeat center;
  background-size: cover;
}

.btnbonechimes {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbonechimes.jpg') no-repeat center;
  background-size: cover;
}

.btnboneyard {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnboneyard.jpg') no-repeat center;
  background-size: cover;
}

.btnbookofthedead {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbookofthedead.jpg') no-repeat center;
  background-size: cover;
}

.btnboots {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnboots.jpg') no-repeat center;
  background-size: cover;
}

.btnbootsofspeed {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbootsofspeed.jpg') no-repeat center;
  background-size: cover;
}

.btnbreathoffire {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbreathoffire.jpg') no-repeat center;
  background-size: cover;
}

.btnbreathoffrost {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbreathoffrost.jpg') no-repeat center;
  background-size: cover;
}

.btnbrigand {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbrigand.jpg') no-repeat center;
  background-size: cover;
}

.btnbrilliance {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbrilliance.jpg') no-repeat center;
  background-size: cover;
}

.btnbronzedragon {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbronzedragon.jpg') no-repeat center;
  background-size: cover;
}

.btnbronzedragonroost {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbronzedragonroost.jpg') no-repeat center;
  background-size: cover;
}

.btnbronzedragonwhelp {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbronzedragonwhelp.jpg') no-repeat center;
  background-size: cover;
}

.btnbronzedrake {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbronzedrake.jpg') no-repeat center;
  background-size: cover;
}

.btnbroodmother {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbroodmother.jpg') no-repeat center;
  background-size: cover;
}

.btnbundleoflumber {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnbundleoflumber.jpg') no-repeat center;
  background-size: cover;
}

.btnburningarcher {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnburningarcher.jpg') no-repeat center;
  background-size: cover;
}

.btncairnebloodhoof {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncairnebloodhoof.jpg') no-repeat center;
  background-size: cover;
}

.btncalltoarms {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncalltoarms.jpg') no-repeat center;
  background-size: cover;
}

.btncancel {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncancel.jpg') no-repeat center;
  background-size: cover;
}

.btncannibalize {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncannibalize.jpg') no-repeat center;
  background-size: cover;
}

.btncannontower {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncannontower.jpg') no-repeat center;
  background-size: cover;
}

.btncarrionscarabs {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncarrionscarabs.jpg') no-repeat center;
  background-size: cover;
}

.btncarrionscarabslv1 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncarrionscarabslv1.jpg') no-repeat center;
  background-size: cover;
}

.btncarrionscarabslv2 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncarrionscarabslv2.jpg') no-repeat center;
  background-size: cover;
}

.btncarrionscarabslv3 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncarrionscarabslv3.jpg') no-repeat center;
  background-size: cover;
}

.btncarrionscarabsoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncarrionscarabsoff.jpg') no-repeat center;
  background-size: cover;
}

.btncarrionswarm {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncarrionswarm.jpg') no-repeat center;
  background-size: cover;
}

.btncastle {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncastle.jpg') no-repeat center;
  background-size: cover;
}

.btncenarius {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncenarius.jpg') no-repeat center;
  background-size: cover;
}

.btncentaur {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncentaur.jpg') no-repeat center;
  background-size: cover;
}

.btncentaurarcher {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncentaurarcher.jpg') no-repeat center;
  background-size: cover;
}

.btncentaurimpaler {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncentaurimpaler.jpg') no-repeat center;
  background-size: cover;
}

.btncentaurkhan {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncentaurkhan.jpg') no-repeat center;
  background-size: cover;
}

.btncentauroutrunner {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncentauroutrunner.jpg') no-repeat center;
  background-size: cover;
}

.btncentaursorcerer {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncentaursorcerer.jpg') no-repeat center;
  background-size: cover;
}

.btnchainlightning {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnchainlightning.jpg') no-repeat center;
  background-size: cover;
}

.btnchaosblademaster {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnchaosblademaster.jpg') no-repeat center;
  background-size: cover;
}

.btnchaosgrom {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnchaosgrom.jpg') no-repeat center;
  background-size: cover;
}

.btnchaosgrunt {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnchaosgrunt.jpg') no-repeat center;
  background-size: cover;
}

.btnchaoskodobeast {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnchaoskodobeast.jpg') no-repeat center;
  background-size: cover;
}

.btnchaospeon {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnchaospeon.jpg') no-repeat center;
  background-size: cover;
}

.btnchaoswarlock {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnchaoswarlock.jpg') no-repeat center;
  background-size: cover;
}

.btnchaoswarlockgreen {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnchaoswarlockgreen.jpg') no-repeat center;
  background-size: cover;
}

.btnchaoswarlord {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnchaoswarlord.jpg') no-repeat center;
  background-size: cover;
}

.btnchaoswolfrider {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnchaoswolfrider.jpg') no-repeat center;
  background-size: cover;
}

.btnchaplain {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnchaplain.jpg') no-repeat center;
  background-size: cover;
}

.btncharm {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncharm.jpg') no-repeat center;
  background-size: cover;
}

.btnchemicalrage {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnchemicalrage.jpg') no-repeat center;
  background-size: cover;
}

.btnchenstormstout {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnchenstormstout.jpg') no-repeat center;
  background-size: cover;
}

.btnchestofgold {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnchestofgold.jpg') no-repeat center;
  background-size: cover;
}

.btnchimaera {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnchimaera.jpg') no-repeat center;
  background-size: cover;
}

.btnchimaeraroost {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnchimaeraroost.jpg') no-repeat center;
  background-size: cover;
}

.btnchime {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnchime.jpg') no-repeat center;
  background-size: cover;
}

.btncirclet {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncirclet.jpg') no-repeat center;
  background-size: cover;
}

.btnclawsofattack {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnclawsofattack.jpg') no-repeat center;
  background-size: cover;
}

.btnclayfigurine {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnclayfigurine.jpg') no-repeat center;
  background-size: cover;
}

.btncleavingattack {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncleavingattack.jpg') no-repeat center;
  background-size: cover;
}

.btncloak {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncloak.jpg') no-repeat center;
  background-size: cover;
}

.btncloakofflames {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncloakofflames.jpg') no-repeat center;
  background-size: cover;
}

.btnclockwerkgoblin {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnclockwerkgoblin.jpg') no-repeat center;
  background-size: cover;
}

.btncloudoffog {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncloudoffog.jpg') no-repeat center;
  background-size: cover;
}

.btnclusterrockets {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnclusterrockets.jpg') no-repeat center;
  background-size: cover;
}

.btncoldarrows {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncoldarrows.jpg') no-repeat center;
  background-size: cover;
}

.btncoldarrowsoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncoldarrowsoff.jpg') no-repeat center;
  background-size: cover;
}

.btncoldtower {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncoldtower.jpg') no-repeat center;
  background-size: cover;
}

.btncommand {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncommand.jpg') no-repeat center;
  background-size: cover;
}

.btncontrolmagic {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncontrolmagic.jpg') no-repeat center;
  background-size: cover;
}

.btncoralbed {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncoralbed.jpg') no-repeat center;
  background-size: cover;
}

.btncorpseexplode {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncorpseexplode.jpg') no-repeat center;
  background-size: cover;
}

.btncorrosivebreath {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncorrosivebreath.jpg') no-repeat center;
  background-size: cover;
}

.btncorruptedancientofwar {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncorruptedancientofwar.jpg') no-repeat center;
  background-size: cover;
}

.btncorruptedancientprotector {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncorruptedancientprotector.jpg') no-repeat center;
  background-size: cover;
}

.btncorruptedent {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncorruptedent.jpg') no-repeat center;
  background-size: cover;
}

.btncorruptedmoonwell {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncorruptedmoonwell.jpg') no-repeat center;
  background-size: cover;
}

.btncorruptedtreeofages {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncorruptedtreeofages.jpg') no-repeat center;
  background-size: cover;
}

.btncorruptedtreeofeternity {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncorruptedtreeofeternity.jpg') no-repeat center;
  background-size: cover;
}

.btncorruptedtreeoflife {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncorruptedtreeoflife.jpg') no-repeat center;
  background-size: cover;
}

.btncreatureattack {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncreatureattack.jpg') no-repeat center;
  background-size: cover;
}

.btncreaturecarapace {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncreaturecarapace.jpg') no-repeat center;
  background-size: cover;
}

.btncripple {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncripple.jpg') no-repeat center;
  background-size: cover;
}

.btncriticalstrike {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncriticalstrike.jpg') no-repeat center;
  background-size: cover;
}

.btncrushingwave {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncrushingwave.jpg') no-repeat center;
  background-size: cover;
}

.btncrypt {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncrypt.jpg') no-repeat center;
  background-size: cover;
}

.btncryptfiend {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncryptfiend.jpg') no-repeat center;
  background-size: cover;
}

.btncryptfiendburrow {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncryptfiendburrow.jpg') no-repeat center;
  background-size: cover;
}

.btncryptfiendunburrow {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncryptfiendunburrow.jpg') no-repeat center;
  background-size: cover;
}

.btncrystalball {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncrystalball.jpg') no-repeat center;
  background-size: cover;
}

.btncurse {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncurse.jpg') no-repeat center;
  background-size: cover;
}

.btncurseoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncurseoff.jpg') no-repeat center;
  background-size: cover;
}

.btncyclone {
  background: url('~@/assets/images/hotkeys/icons/reforged/btncyclone.jpg') no-repeat center;
  background-size: cover;
}

.btndaggerofescape {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndaggerofescape.jpg') no-repeat center;
  background-size: cover;
}

.btndagrentheorcslayer {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndagrentheorcslayer.jpg') no-repeat center;
  background-size: cover;
}

.btndalaranguardtower {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndalaranguardtower.jpg') no-repeat center;
  background-size: cover;
}

.btndalaranmutant {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndalaranmutant.jpg') no-repeat center;
  background-size: cover;
}

.btndalaranreject {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndalaranreject.jpg') no-repeat center;
  background-size: cover;
}

.btndalvengyr {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndalvengyr.jpg') no-repeat center;
  background-size: cover;
}

.btndarkminion {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndarkminion.jpg') no-repeat center;
  background-size: cover;
}

.btndarkritual {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndarkritual.jpg') no-repeat center;
  background-size: cover;
}

.btndarksummoning {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndarksummoning.jpg') no-repeat center;
  background-size: cover;
}

.btndarktroll {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndarktroll.jpg') no-repeat center;
  background-size: cover;
}

.btndarktrollberserker {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndarktrollberserker.jpg') no-repeat center;
  background-size: cover;
}

.btndarktrollhighpriest {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndarktrollhighpriest.jpg') no-repeat center;
  background-size: cover;
}

.btndarktrollshadowpriest {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndarktrollshadowpriest.jpg') no-repeat center;
  background-size: cover;
}

.btndarktrolltrapper {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndarktrolltrapper.jpg') no-repeat center;
  background-size: cover;
}

.btndarktrollwarlord {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndarktrollwarlord.jpg') no-repeat center;
  background-size: cover;
}

.btndeathanddecay {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndeathanddecay.jpg') no-repeat center;
  background-size: cover;
}

.btndeathcoil {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndeathcoil.jpg') no-repeat center;
  background-size: cover;
}

.btndeathpact {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndeathpact.jpg') no-repeat center;
  background-size: cover;
}

.btndeathrevenant {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndeathrevenant.jpg') no-repeat center;
  background-size: cover;
}

.btndeathtower {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndeathtower.jpg') no-repeat center;
  background-size: cover;
}

.btndeceiver {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndeceiver.jpg') no-repeat center;
  background-size: cover;
}

.btndeeplordrevenant {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndeeplordrevenant.jpg') no-repeat center;
  background-size: cover;
}

.btndefend {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndefend.jpg') no-repeat center;
  background-size: cover;
}

.btndemolish {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndemolish.jpg') no-repeat center;
  background-size: cover;
}

.btndemolisher {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndemolisher.jpg') no-repeat center;
  background-size: cover;
}

.btndemoness {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndemoness.jpg') no-repeat center;
  background-size: cover;
}

.btndemonhunterdemonform {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndemonhunterdemonform.jpg') no-repeat center;
  background-size: cover;
}

.btndenofwonders {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndenofwonders.jpg') no-repeat center;
  background-size: cover;
}

.btndepthsrevenant {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndepthsrevenant.jpg') no-repeat center;
  background-size: cover;
}

.btndestroyer {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndestroyer.jpg') no-repeat center;
  background-size: cover;
}

.btndetheroc {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndetheroc.jpg') no-repeat center;
  background-size: cover;
}

.btndevotion {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndevotion.jpg') no-repeat center;
  background-size: cover;
}

.btndevour {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndevour.jpg') no-repeat center;
  background-size: cover;
}

.btndevourmagic {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndevourmagic.jpg') no-repeat center;
  background-size: cover;
}

.btndirewolf {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndirewolf.jpg') no-repeat center;
  background-size: cover;
}

.btndirewolflv2 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndirewolflv2.jpg') no-repeat center;
  background-size: cover;
}

.btndisenchant {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndisenchant.jpg') no-repeat center;
  background-size: cover;
}

.btndispelmagic {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndispelmagic.jpg') no-repeat center;
  background-size: cover;
}

.btndivineintervention {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndivineintervention.jpg') no-repeat center;
  background-size: cover;
}

.btndivineshieldoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndivineshieldoff.jpg') no-repeat center;
  background-size: cover;
}

.btndizzy {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndizzy.jpg') no-repeat center;
  background-size: cover;
}

.btndocadepttraining {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndocadepttraining.jpg') no-repeat center;
  background-size: cover;
}

.btndocmastertraining {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndocmastertraining.jpg') no-repeat center;
  background-size: cover;
}

.btndoom {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndoom.jpg') no-repeat center;
  background-size: cover;
}

.btndoomguard {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndoomguard.jpg') no-repeat center;
  background-size: cover;
}

.btndotadepttraining {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndotadepttraining.jpg') no-repeat center;
  background-size: cover;
}

.btndotmastertraining {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndotmastertraining.jpg') no-repeat center;
  background-size: cover;
}

.btndragonhawk {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndragonhawk.jpg') no-repeat center;
  background-size: cover;
}

.btndragonhawkrider {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndragonhawkrider.jpg') no-repeat center;
  background-size: cover;
}

.btndragonhawkriderv0 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndragonhawkriderv0.jpg') no-repeat center;
  background-size: cover;
}

.btndragonroost {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndragonroost.jpg') no-repeat center;
  background-size: cover;
}

.btndragonspawnoverseer {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndragonspawnoverseer.jpg') no-repeat center;
  background-size: cover;
}

.btndragonturtlered {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndragonturtlered.jpg') no-repeat center;
  background-size: cover;
}

.btndrain {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndrain.jpg') no-repeat center;
  background-size: cover;
}

.btndranai {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndranai.jpg') no-repeat center;
  background-size: cover;
}

.btndranaiakama {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndranaiakama.jpg') no-repeat center;
  background-size: cover;
}

.btndranaibarracks {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndranaibarracks.jpg') no-repeat center;
  background-size: cover;
}

.btndranaichiefhut {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndranaichiefhut.jpg') no-repeat center;
  background-size: cover;
}

.btndranaidarkslayer {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndranaidarkslayer.jpg') no-repeat center;
  background-size: cover;
}

.btndranaidemolisher {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndranaidemolisher.jpg') no-repeat center;
  background-size: cover;
}

.btndranaiharbinger {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndranaiharbinger.jpg') no-repeat center;
  background-size: cover;
}

.btndranaihaven {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndranaihaven.jpg') no-repeat center;
  background-size: cover;
}

.btndranaihut {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndranaihut.jpg') no-repeat center;
  background-size: cover;
}

.btndranailaborer {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndranailaborer.jpg') no-repeat center;
  background-size: cover;
}

.btndranaimage {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndranaimage.jpg') no-repeat center;
  background-size: cover;
}

.btndranaiprotocter {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndranaiprotocter.jpg') no-repeat center;
  background-size: cover;
}

.btndranaiseer {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndranaiseer.jpg') no-repeat center;
  background-size: cover;
}

.btndranaistalker {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndranaistalker.jpg') no-repeat center;
  background-size: cover;
}

.btndranaivindicator {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndranaivindicator.jpg') no-repeat center;
  background-size: cover;
}

.btndranaiwatcher {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndranaiwatcher.jpg') no-repeat center;
  background-size: cover;
}

.btndrekthar {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndrekthar.jpg') no-repeat center;
  background-size: cover;
}

.btndruidoftheclaw {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndruidoftheclaw.jpg') no-repeat center;
  background-size: cover;
}

.btndruidofthetalon {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndruidofthetalon.jpg') no-repeat center;
  background-size: cover;
}

.btndrum {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndrum.jpg') no-repeat center;
  background-size: cover;
}

.btndrunkendodge {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndrunkendodge.jpg') no-repeat center;
  background-size: cover;
}

.btndryad {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndryad.jpg') no-repeat center;
  background-size: cover;
}

.btndryaddispelmagic {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndryaddispelmagic.jpg') no-repeat center;
  background-size: cover;
}

.btndryaddispelmagicoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndryaddispelmagicoff.jpg') no-repeat center;
  background-size: cover;
}

.btndustofappearance {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndustofappearance.jpg') no-repeat center;
  background-size: cover;
}

.btndwarvenlongrifle {
  background: url('~@/assets/images/hotkeys/icons/reforged/btndwarvenlongrifle.jpg') no-repeat center;
  background-size: cover;
}

.btnearthbrewmaster {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnearthbrewmaster.jpg') no-repeat center;
  background-size: cover;
}

.btnearthfurytower {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnearthfurytower.jpg') no-repeat center;
  background-size: cover;
}

.btnearthquake {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnearthquake.jpg') no-repeat center;
  background-size: cover;
}

.btneattree {
  background: url('~@/assets/images/hotkeys/icons/reforged/btneattree.jpg') no-repeat center;
  background-size: cover;
}

.btnelderhydra {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnelderhydra.jpg') no-repeat center;
  background-size: cover;
}

.btnelderjunglebeast {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnelderjunglebeast.jpg') no-repeat center;
  background-size: cover;
}

.btneldervoidwalker {
  background: url('~@/assets/images/hotkeys/icons/reforged/btneldervoidwalker.jpg') no-repeat center;
  background-size: cover;
}

.btnelfvillager {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnelfvillager.jpg') no-repeat center;
  background-size: cover;
}

.btnelunesblessing {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnelunesblessing.jpg') no-repeat center;
  background-size: cover;
}

.btnelvenfarm {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnelvenfarm.jpg') no-repeat center;
  background-size: cover;
}

.btnelvenguardtower {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnelvenguardtower.jpg') no-repeat center;
  background-size: cover;
}

.btnemissary {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnemissary.jpg') no-repeat center;
  background-size: cover;
}

.btnenchantedbears {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnenchantedbears.jpg') no-repeat center;
  background-size: cover;
}

.btnenchantedcrows {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnenchantedcrows.jpg') no-repeat center;
  background-size: cover;
}

.btnenergytower {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnenergytower.jpg') no-repeat center;
  background-size: cover;
}

.btnenforcer {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnenforcer.jpg') no-repeat center;
  background-size: cover;
}

.btnengineergazlowe {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnengineergazlowe.jpg') no-repeat center;
  background-size: cover;
}

.btnengineeringupgrade {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnengineeringupgrade.jpg') no-repeat center;
  background-size: cover;
}

.btnenragedelemental {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnenragedelemental.jpg') no-repeat center;
  background-size: cover;
}

.btnenragedjunglebeast {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnenragedjunglebeast.jpg') no-repeat center;
  background-size: cover;
}

.btnenragedwildkin {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnenragedwildkin.jpg') no-repeat center;
  background-size: cover;
}

.btnensnare {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnensnare.jpg') no-repeat center;
  background-size: cover;
}

.btnent {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnent.jpg') no-repeat center;
  background-size: cover;
}

.btnentanglemine {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnentanglemine.jpg') no-repeat center;
  background-size: cover;
}

.btnentanglingroots {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnentanglingroots.jpg') no-repeat center;
  background-size: cover;
}

.btnenvenomedspear {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnenvenomedspear.jpg') no-repeat center;
  background-size: cover;
}

.btneredarred {
  background: url('~@/assets/images/hotkeys/icons/reforged/btneredarred.jpg') no-repeat center;
  background-size: cover;
}

.btneredarsorcerer {
  background: url('~@/assets/images/hotkeys/icons/reforged/btneredarsorcerer.jpg') no-repeat center;
  background-size: cover;
}

.btneredarwarlock {
  background: url('~@/assets/images/hotkeys/icons/reforged/btneredarwarlock.jpg') no-repeat center;
  background-size: cover;
}

.btneredarwarlockpurple {
  background: url('~@/assets/images/hotkeys/icons/reforged/btneredarwarlockpurple.jpg') no-repeat center;
  background-size: cover;
}

.btnetherealformon {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnetherealformon.jpg') no-repeat center;
  background-size: cover;
}

.btnevasion {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnevasion.jpg') no-repeat center;
  background-size: cover;
}

.btnevilillidan {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnevilillidan.jpg') no-repeat center;
  background-size: cover;
}

.btnexhumecorpses {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnexhumecorpses.jpg') no-repeat center;
  background-size: cover;
}

.btnfacelessone {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfacelessone.jpg') no-repeat center;
  background-size: cover;
}

.btnfacelessonedeathbringer {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfacelessonedeathbringer.jpg') no-repeat center;
  background-size: cover;
}

.btnfacelessoneterror {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfacelessoneterror.jpg') no-repeat center;
  background-size: cover;
}

.btnfaeriedragon {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfaeriedragon.jpg') no-repeat center;
  background-size: cover;
}

.btnfaeriefire {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfaeriefire.jpg') no-repeat center;
  background-size: cover;
}

.btnfaeriefireoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfaeriefireoff.jpg') no-repeat center;
  background-size: cover;
}

.btnfallenpriest {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfallenpriest.jpg') no-repeat center;
  background-size: cover;
}

.btnfanofknives {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfanofknives.jpg') no-repeat center;
  background-size: cover;
}

.btnfarm {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfarm.jpg') no-repeat center;
  background-size: cover;
}

.btnfarsight {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfarsight.jpg') no-repeat center;
  background-size: cover;
}

.btnfeedback {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfeedback.jpg') no-repeat center;
  background-size: cover;
}

.btnfelboar {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfelboar.jpg') no-repeat center;
  background-size: cover;
}

.btnfelguard {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfelguard.jpg') no-repeat center;
  background-size: cover;
}

.btnfelguardblue {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfelguardblue.jpg') no-repeat center;
  background-size: cover;
}

.btnfelhound {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfelhound.jpg') no-repeat center;
  background-size: cover;
}

.btnfire {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfire.jpg') no-repeat center;
  background-size: cover;
}

.btnfirebolt {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfirebolt.jpg') no-repeat center;
  background-size: cover;
}

.btnfirebrewmaster {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfirebrewmaster.jpg') no-repeat center;
  background-size: cover;
}

.btnfirerevenant {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfirerevenant.jpg') no-repeat center;
  background-size: cover;
}

.btnfirerocks {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfirerocks.jpg') no-repeat center;
  background-size: cover;
}

.btnflakcannons {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnflakcannons.jpg') no-repeat center;
  background-size: cover;
}

.btnflametower {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnflametower.jpg') no-repeat center;
  background-size: cover;
}

.btnflamingarrows {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnflamingarrows.jpg') no-repeat center;
  background-size: cover;
}

.btnflare {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnflare.jpg') no-repeat center;
  background-size: cover;
}

.btnfleshgolem {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfleshgolem.jpg') no-repeat center;
  background-size: cover;
}

.btnflyingmachine {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnflyingmachine.jpg') no-repeat center;
  background-size: cover;
}

.btnfootman {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfootman.jpg') no-repeat center;
  background-size: cover;
}

.btnforesttroll {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnforesttroll.jpg') no-repeat center;
  background-size: cover;
}

.btnforesttrollberserker {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnforesttrollberserker.jpg') no-repeat center;
  background-size: cover;
}

.btnforesttrollhighpriest {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnforesttrollhighpriest.jpg') no-repeat center;
  background-size: cover;
}

.btnforesttrollshadowpriest {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnforesttrollshadowpriest.jpg') no-repeat center;
  background-size: cover;
}

.btnforesttrolltrapper {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnforesttrolltrapper.jpg') no-repeat center;
  background-size: cover;
}

.btnforesttrollwarlord {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnforesttrollwarlord.jpg') no-repeat center;
  background-size: cover;
}

.btnforge {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnforge.jpg') no-repeat center;
  background-size: cover;
}

.btnfortress {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfortress.jpg') no-repeat center;
  background-size: cover;
}

.btnfragmentationbombs {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfragmentationbombs.jpg') no-repeat center;
  background-size: cover;
}

.btnfreezingbreath {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfreezingbreath.jpg') no-repeat center;
  background-size: cover;
}

.btnfrost {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfrost.jpg') no-repeat center;
  background-size: cover;
}

.btnfrostarmor {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfrostarmor.jpg') no-repeat center;
  background-size: cover;
}

.btnfrostarmoroff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfrostarmoroff.jpg') no-repeat center;
  background-size: cover;
}

.btnfrostbear {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfrostbear.jpg') no-repeat center;
  background-size: cover;
}

.btnfrostbolt {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfrostbolt.jpg') no-repeat center;
  background-size: cover;
}

.btnfrostrevenant {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfrostrevenant.jpg') no-repeat center;
  background-size: cover;
}

.btnfrosttower {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfrosttower.jpg') no-repeat center;
  background-size: cover;
}

.btnfrostwyrm {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfrostwyrm.jpg') no-repeat center;
  background-size: cover;
}

.btnfurblogchampion {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfurblogchampion.jpg') no-repeat center;
  background-size: cover;
}

.btnfurbolg {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfurbolg.jpg') no-repeat center;
  background-size: cover;
}

.btnfurbolgelder {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfurbolgelder.jpg') no-repeat center;
  background-size: cover;
}

.btnfurbolgeldershaman {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfurbolgeldershaman.jpg') no-repeat center;
  background-size: cover;
}

.btnfurbolgpanda {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfurbolgpanda.jpg') no-repeat center;
  background-size: cover;
}

.btnfurbolgshaman {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfurbolgshaman.jpg') no-repeat center;
  background-size: cover;
}

.btnfurbolgtracker {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfurbolgtracker.jpg') no-repeat center;
  background-size: cover;
}

.btnfurion {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnfurion.jpg') no-repeat center;
  background-size: cover;
}

.btngargoyle {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngargoyle.jpg') no-repeat center;
  background-size: cover;
}

.btngarithos {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngarithos.jpg') no-repeat center;
  background-size: cover;
}

.btngarthok {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngarthok.jpg') no-repeat center;
  background-size: cover;
}

.btngathergold {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngathergold.jpg') no-repeat center;
  background-size: cover;
}

.btngauntletsofogrepower {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngauntletsofogrepower.jpg') no-repeat center;
  background-size: cover;
}

.btngem {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngem.jpg') no-repeat center;
  background-size: cover;
}

.btngenericspellimmunity {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngenericspellimmunity.jpg') no-repeat center;
  background-size: cover;
}

.btnghost {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnghost.jpg') no-repeat center;
  background-size: cover;
}

.btnghoul {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnghoul.jpg') no-repeat center;
  background-size: cover;
}

.btnghoulfrenzy {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnghoulfrenzy.jpg') no-repeat center;
  background-size: cover;
}

.btngiantfrostbear {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngiantfrostbear.jpg') no-repeat center;
  background-size: cover;
}

.btngiantskeletonwarrior {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngiantskeletonwarrior.jpg') no-repeat center;
  background-size: cover;
}

.btngiantspider {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngiantspider.jpg') no-repeat center;
  background-size: cover;
}

.btngiantwolf {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngiantwolf.jpg') no-repeat center;
  background-size: cover;
}

.btnglacier {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnglacier.jpg') no-repeat center;
  background-size: cover;
}

.btnglaivethrower {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnglaivethrower.jpg') no-repeat center;
  background-size: cover;
}

.btnglove {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnglove.jpg') no-repeat center;
  background-size: cover;
}

.btngnoll {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngnoll.jpg') no-repeat center;
  background-size: cover;
}

.btngnollarcher {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngnollarcher.jpg') no-repeat center;
  background-size: cover;
}

.btngnollassassin {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngnollassassin.jpg') no-repeat center;
  background-size: cover;
}

.btngnollbrute {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngnollbrute.jpg') no-repeat center;
  background-size: cover;
}

.btngnollcommandaura {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngnollcommandaura.jpg') no-repeat center;
  background-size: cover;
}

.btngnollking {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngnollking.jpg') no-repeat center;
  background-size: cover;
}

.btngnollwarden {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngnollwarden.jpg') no-repeat center;
  background-size: cover;
}

.btngoblinsapper {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngoblinsapper.jpg') no-repeat center;
  background-size: cover;
}

.btngoblinshipyard {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngoblinshipyard.jpg') no-repeat center;
  background-size: cover;
}

.btngoblinzeppelin {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngoblinzeppelin.jpg') no-repeat center;
  background-size: cover;
}

.btngoldmine {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngoldmine.jpg') no-repeat center;
  background-size: cover;
}

.btngolemstormbolt {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngolemstormbolt.jpg') no-repeat center;
  background-size: cover;
}

.btngolemthunderclap {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngolemthunderclap.jpg') no-repeat center;
  background-size: cover;
}

.btngrabtree {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngrabtree.jpg') no-repeat center;
  background-size: cover;
}

.btngranitegolem {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngranitegolem.jpg') no-repeat center;
  background-size: cover;
}

.btngraveyard {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngraveyard.jpg') no-repeat center;
  background-size: cover;
}

.btngreaterdarkminion {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngreaterdarkminion.jpg') no-repeat center;
  background-size: cover;
}

.btngreaterinvisibility {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngreaterinvisibility.jpg') no-repeat center;
  background-size: cover;
}

.btngreaterinvulneralbility {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngreaterinvulneralbility.jpg') no-repeat center;
  background-size: cover;
}

.btngreaterrejuvpotion {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngreaterrejuvpotion.jpg') no-repeat center;
  background-size: cover;
}

.btngreaterrejuvscroll {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngreaterrejuvscroll.jpg') no-repeat center;
  background-size: cover;
}

.btngreaterspiritbeast {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngreaterspiritbeast.jpg') no-repeat center;
  background-size: cover;
}

.btngreatervoidwalker {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngreatervoidwalker.jpg') no-repeat center;
  background-size: cover;
}

.btngreathall {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngreathall.jpg') no-repeat center;
  background-size: cover;
}

.btngreendragon {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngreendragon.jpg') no-repeat center;
  background-size: cover;
}

.btngreendragonroost {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngreendragonroost.jpg') no-repeat center;
  background-size: cover;
}

.btngreendragonspawn {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngreendragonspawn.jpg') no-repeat center;
  background-size: cover;
}

.btngreendragonspawnsorcerer {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngreendragonspawnsorcerer.jpg') no-repeat center;
  background-size: cover;
}

.btngreendragonwhelp {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngreendragonwhelp.jpg') no-repeat center;
  background-size: cover;
}

.btngreendrake {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngreendrake.jpg') no-repeat center;
  background-size: cover;
}

.btngreenhydra {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngreenhydra.jpg') no-repeat center;
  background-size: cover;
}

.btngrimward {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngrimward.jpg') no-repeat center;
  background-size: cover;
}

.btngrizzlybear {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngrizzlybear.jpg') no-repeat center;
  background-size: cover;
}

.btngrunt {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngrunt.jpg') no-repeat center;
  background-size: cover;
}

.btngryphonaviary {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngryphonaviary.jpg') no-repeat center;
  background-size: cover;
}

.btngryphonrider {
  background: url('~@/assets/images/hotkeys/icons/reforged/btngryphonrider.jpg') no-repeat center;
  background-size: cover;
}

.btnguardtower {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnguardtower.jpg') no-repeat center;
  background-size: cover;
}

.btnguldan {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnguldan.jpg') no-repeat center;
  background-size: cover;
}

.btnguldanskull {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnguldanskull.jpg') no-repeat center;
  background-size: cover;
}

.btnhalahkthelifebringer {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhalahkthelifebringer.jpg') no-repeat center;
  background-size: cover;
}

.btnhallofthedead {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhallofthedead.jpg') no-repeat center;
  background-size: cover;
}

.btnhammer {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhammer.jpg') no-repeat center;
  background-size: cover;
}

.btnhardenedskin {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhardenedskin.jpg') no-repeat center;
  background-size: cover;
}

.btnharpy {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnharpy.jpg') no-repeat center;
  background-size: cover;
}

.btnharpyqueen {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnharpyqueen.jpg') no-repeat center;
  background-size: cover;
}

.btnharpyrogue {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnharpyrogue.jpg') no-repeat center;
  background-size: cover;
}

.btnharpystormhag {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnharpystormhag.jpg') no-repeat center;
  background-size: cover;
}

.btnharpywitch {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnharpywitch.jpg') no-repeat center;
  background-size: cover;
}

.btnhauntedmine {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhauntedmine.jpg') no-repeat center;
  background-size: cover;
}

.btnheadhunter {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnheadhunter.jpg') no-repeat center;
  background-size: cover;
}

.btnheadhunterberserker {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnheadhunterberserker.jpg') no-repeat center;
  background-size: cover;
}

.btnheal {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnheal.jpg') no-repeat center;
  background-size: cover;
}

.btnhealingsalve {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhealingsalve.jpg') no-repeat center;
  background-size: cover;
}

.btnhealingspray {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhealingspray.jpg') no-repeat center;
  background-size: cover;
}

.btnhealingward {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhealingward.jpg') no-repeat center;
  background-size: cover;
}

.btnhealingwave {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhealingwave.jpg') no-repeat center;
  background-size: cover;
}

.btnhealoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhealoff.jpg') no-repeat center;
  background-size: cover;
}

.btnhealthstone {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhealthstone.jpg') no-repeat center;
  background-size: cover;
}

.btnheartofaszune {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnheartofaszune.jpg') no-repeat center;
  background-size: cover;
}

.btnheartofsearinox {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnheartofsearinox.jpg') no-repeat center;
  background-size: cover;
}

.btnhellscream {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhellscream.jpg') no-repeat center;
  background-size: cover;
}

.btnhelmofvalor {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhelmofvalor.jpg') no-repeat center;
  background-size: cover;
}

.btnhelmutpurple {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhelmutpurple.jpg') no-repeat center;
  background-size: cover;
}

.btnheretic {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnheretic.jpg') no-repeat center;
  background-size: cover;
}

.btnheroalchemist {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnheroalchemist.jpg') no-repeat center;
  background-size: cover;
}

.btnheroarchmage {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnheroarchmage.jpg') no-repeat center;
  background-size: cover;
}

.btnheroavatarofflame {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnheroavatarofflame.jpg') no-repeat center;
  background-size: cover;
}

.btnheroblademaster {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnheroblademaster.jpg') no-repeat center;
  background-size: cover;
}

.btnherobloodelfprince {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnherobloodelfprince.jpg') no-repeat center;
  background-size: cover;
}

.btnherocryptlord {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnherocryptlord.jpg') no-repeat center;
  background-size: cover;
}

.btnherodeathknight {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnherodeathknight.jpg') no-repeat center;
  background-size: cover;
}

.btnherodemonhunter {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnherodemonhunter.jpg') no-repeat center;
  background-size: cover;
}

.btnherodreadlord {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnherodreadlord.jpg') no-repeat center;
  background-size: cover;
}

.btnherofarseer {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnherofarseer.jpg') no-repeat center;
  background-size: cover;
}

.btnherolich {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnherolich.jpg') no-repeat center;
  background-size: cover;
}

.btnheromoonpriestess {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnheromoonpriestess.jpg') no-repeat center;
  background-size: cover;
}

.btnheromountainking {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnheromountainking.jpg') no-repeat center;
  background-size: cover;
}

.btnheropaladin {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnheropaladin.jpg') no-repeat center;
  background-size: cover;
}

.btnherotaurenchieftain {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnherotaurenchieftain.jpg') no-repeat center;
  background-size: cover;
}

.btnherotinker {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnherotinker.jpg') no-repeat center;
  background-size: cover;
}

.btnherowarden {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnherowarden.jpg') no-repeat center;
  background-size: cover;
}

.btnhex {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhex.jpg') no-repeat center;
  background-size: cover;
}

.btnhighelfrunner {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhighelfrunner.jpg') no-repeat center;
  background-size: cover;
}

.btnhighelvenarcher {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhighelvenarcher.jpg') no-repeat center;
  background-size: cover;
}

.btnhighelvenarcher_v1 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhighelvenarcher_v1.jpg') no-repeat center;
  background-size: cover;
}

.btnhippogriff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhippogriff.jpg') no-repeat center;
  background-size: cover;
}

.btnhippogriffrider {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhippogriffrider.jpg') no-repeat center;
  background-size: cover;
}

.btnholdposition {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnholdposition.jpg') no-repeat center;
  background-size: cover;
}

.btnholybolt {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnholybolt.jpg') no-repeat center;
  background-size: cover;
}

.btnholywater {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnholywater.jpg') no-repeat center;
  background-size: cover;
}

.btnhoodofcunning {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhoodofcunning.jpg') no-repeat center;
  background-size: cover;
}

.btnhornofcenarius {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhornofcenarius.jpg') no-repeat center;
  background-size: cover;
}

.btnhornofdoom {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhornofdoom.jpg') no-repeat center;
  background-size: cover;
}

.btnhornoffog {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhornoffog.jpg') no-repeat center;
  background-size: cover;
}

.btnhowlofterror {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhowlofterror.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanarcanetower {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhumanarcanetower.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanarmorupone {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhumanarmorupone.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanarmorupthree {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhumanarmorupthree.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanarmoruptwo {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhumanarmoruptwo.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanartilleryupone {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhumanartilleryupone.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanbarracks {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhumanbarracks.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanbattleship {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhumanbattleship.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanbuild {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhumanbuild.jpg') no-repeat center;
  background-size: cover;
}

.btnhumandestroyer {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhumandestroyer.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanlumbermill {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhumanlumbermill.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanlumberupgrade1 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhumanlumberupgrade1.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanlumberupgrade2 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhumanlumberupgrade2.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanmissileupone {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhumanmissileupone.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanmissileupthree {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhumanmissileupthree.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanmissileuptwo {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhumanmissileuptwo.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanshipyard {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhumanshipyard.jpg') no-repeat center;
  background-size: cover;
}

.btnhumantransport {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhumantransport.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanwatchtower {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhumanwatchtower.jpg') no-repeat center;
  background-size: cover;
}

.btnhuntershall {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhuntershall.jpg') no-repeat center;
  background-size: cover;
}

.btnhuntress {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhuntress.jpg') no-repeat center;
  background-size: cover;
}

.btnhydra {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhydra.jpg') no-repeat center;
  background-size: cover;
}

.btnhydralisk {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhydralisk.jpg') no-repeat center;
  background-size: cover;
}

.btnhydrawarstomp {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhydrawarstomp.jpg') no-repeat center;
  background-size: cover;
}

.btnhydromancer {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnhydromancer.jpg') no-repeat center;
  background-size: cover;
}

.btnicerevenant {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnicerevenant.jpg') no-repeat center;
  background-size: cover;
}

.btnicetroll {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnicetroll.jpg') no-repeat center;
  background-size: cover;
}

.btnicetrollberserker {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnicetrollberserker.jpg') no-repeat center;
  background-size: cover;
}

.btnicetrollbeserker {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnicetrollbeserker.jpg') no-repeat center;
  background-size: cover;
}

.btnicetrollshadowpriest {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnicetrollshadowpriest.jpg') no-repeat center;
  background-size: cover;
}

.btnicetrollshaman {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnicetrollshaman.jpg') no-repeat center;
  background-size: cover;
}

.btnicetrolltrapper {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnicetrolltrapper.jpg') no-repeat center;
  background-size: cover;
}

.btnicetrollwarlord {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnicetrollwarlord.jpg') no-repeat center;
  background-size: cover;
}

.btnicetuskmammoth {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnicetuskmammoth.jpg') no-repeat center;
  background-size: cover;
}

.btnillidan {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnillidan.jpg') no-repeat center;
  background-size: cover;
}

.btnillidandemonform {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnillidandemonform.jpg') no-repeat center;
  background-size: cover;
}

.btnimbuedmasonry {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnimbuedmasonry.jpg') no-repeat center;
  background-size: cover;
}

.btnimmolationoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnimmolationoff.jpg') no-repeat center;
  background-size: cover;
}

.btnimmolationon {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnimmolationon.jpg') no-repeat center;
  background-size: cover;
}

.btnimpale {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnimpale.jpg') no-repeat center;
  background-size: cover;
}

.btnimpalingbolt {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnimpalingbolt.jpg') no-repeat center;
  background-size: cover;
}

.btnimprovedbows {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnimprovedbows.jpg') no-repeat center;
  background-size: cover;
}

.btnimprovedcreatureattack {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnimprovedcreatureattack.jpg') no-repeat center;
  background-size: cover;
}

.btnimprovedcreaturecarapace {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnimprovedcreaturecarapace.jpg') no-repeat center;
  background-size: cover;
}

.btnimprovedmoonarmor {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnimprovedmoonarmor.jpg') no-repeat center;
  background-size: cover;
}

.btnimprovedreinforcedhides {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnimprovedreinforcedhides.jpg') no-repeat center;
  background-size: cover;
}

.btnimprovedspikedbarricades {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnimprovedspikedbarricades.jpg') no-repeat center;
  background-size: cover;
}

.btnimprovedstrengthofthemoon {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnimprovedstrengthofthemoon.jpg') no-repeat center;
  background-size: cover;
}

.btnimprovedstrengthofthewild {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnimprovedstrengthofthewild.jpg') no-repeat center;
  background-size: cover;
}

.btnimprovedunholyarmor {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnimprovedunholyarmor.jpg') no-repeat center;
  background-size: cover;
}

.btnimprovedunholystrength {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnimprovedunholystrength.jpg') no-repeat center;
  background-size: cover;
}

.btnincinerate {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnincinerate.jpg') no-repeat center;
  background-size: cover;
}

.btnincinerateoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnincinerateoff.jpg') no-repeat center;
  background-size: cover;
}

.btninfernal {
  background: url('~@/assets/images/hotkeys/icons/reforged/btninfernal.jpg') no-repeat center;
  background-size: cover;
}

.btninfernalcannon {
  background: url('~@/assets/images/hotkeys/icons/reforged/btninfernalcannon.jpg') no-repeat center;
  background-size: cover;
}

.btninfernalflamecannon {
  background: url('~@/assets/images/hotkeys/icons/reforged/btninfernalflamecannon.jpg') no-repeat center;
  background-size: cover;
}

.btninfernalmachine {
  background: url('~@/assets/images/hotkeys/icons/reforged/btninfernalmachine.jpg') no-repeat center;
  background-size: cover;
}

.btninfernalstone {
  background: url('~@/assets/images/hotkeys/icons/reforged/btninfernalstone.jpg') no-repeat center;
  background-size: cover;
}

.btninnerfire {
  background: url('~@/assets/images/hotkeys/icons/reforged/btninnerfire.jpg') no-repeat center;
  background-size: cover;
}

.btninnerfireoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btninnerfireoff.jpg') no-repeat center;
  background-size: cover;
}

.btninvisibility {
  background: url('~@/assets/images/hotkeys/icons/reforged/btninvisibility.jpg') no-repeat center;
  background-size: cover;
}

.btninvulnerable {
  background: url('~@/assets/images/hotkeys/icons/reforged/btninvulnerable.jpg') no-repeat center;
  background-size: cover;
}

.btnjailorkassan {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnjailorkassan.jpg') no-repeat center;
  background-size: cover;
}

.btnjaina {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnjaina.jpg') no-repeat center;
  background-size: cover;
}

.btnjanggo {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnjanggo.jpg') no-repeat center;
  background-size: cover;
}

.btnjuggernaut {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnjuggernaut.jpg') no-repeat center;
  background-size: cover;
}

.btnjunglebeast {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnjunglebeast.jpg') no-repeat center;
  background-size: cover;
}

.btnjunkgolem {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnjunkgolem.jpg') no-repeat center;
  background-size: cover;
}

.btnkeep {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnkeep.jpg') no-repeat center;
  background-size: cover;
}

.btnkeeperofthegrove {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnkeeperofthegrove.jpg') no-repeat center;
  background-size: cover;
}

.btnkelthuzad {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnkelthuzad.jpg') no-repeat center;
  background-size: cover;
}

.btnknight {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnknight.jpg') no-repeat center;
  background-size: cover;
}

.btnkobold {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnkobold.jpg') no-repeat center;
  background-size: cover;
}

.btnkoboldgeomancer {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnkoboldgeomancer.jpg') no-repeat center;
  background-size: cover;
}

.btnkoboldtaskmaster {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnkoboldtaskmaster.jpg') no-repeat center;
  background-size: cover;
}

.btnkoboldtunneler {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnkoboldtunneler.jpg') no-repeat center;
  background-size: cover;
}

.btnkodobeast {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnkodobeast.jpg') no-repeat center;
  background-size: cover;
}

.btnladyvashj {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnladyvashj.jpg') no-repeat center;
  background-size: cover;
}

.btnlavaspawn {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnlavaspawn.jpg') no-repeat center;
  background-size: cover;
}

.btnlavaspawnlv2 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnlavaspawnlv2.jpg') no-repeat center;
  background-size: cover;
}

.btnlavaspawnlv3 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnlavaspawnlv3.jpg') no-repeat center;
  background-size: cover;
}

.btnleatherupgradeone {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnleatherupgradeone.jpg') no-repeat center;
  background-size: cover;
}

.btnleatherupgradethree {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnleatherupgradethree.jpg') no-repeat center;
  background-size: cover;
}

.btnleatherupgradetwo {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnleatherupgradetwo.jpg') no-repeat center;
  background-size: cover;
}

.btnlesserclaritypotion {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnlesserclaritypotion.jpg') no-repeat center;
  background-size: cover;
}

.btnlesserdarkminion {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnlesserdarkminion.jpg') no-repeat center;
  background-size: cover;
}

.btnlesserinvisibility {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnlesserinvisibility.jpg') no-repeat center;
  background-size: cover;
}

.btnlesserinvulneralbility {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnlesserinvulneralbility.jpg') no-repeat center;
  background-size: cover;
}

.btnlesserrejuvpotion {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnlesserrejuvpotion.jpg') no-repeat center;
  background-size: cover;
}

.btnlesserrejuvscroll {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnlesserrejuvscroll.jpg') no-repeat center;
  background-size: cover;
}

.btnlesserspiritbeast {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnlesserspiritbeast.jpg') no-repeat center;
  background-size: cover;
}

.btnlesservoidwalker {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnlesservoidwalker.jpg') no-repeat center;
  background-size: cover;
}

.btnlichversion2 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnlichversion2.jpg') no-repeat center;
  background-size: cover;
}

.btnlifedrain {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnlifedrain.jpg') no-repeat center;
  background-size: cover;
}

.btnlightninglizard {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnlightninglizard.jpg') no-repeat center;
  background-size: cover;
}

.btnlightningrevenant {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnlightningrevenant.jpg') no-repeat center;
  background-size: cover;
}

.btnlightningshield {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnlightningshield.jpg') no-repeat center;
  background-size: cover;
}

.btnlionhorn {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnlionhorn.jpg') no-repeat center;
  background-size: cover;
}

.btnliquidfire {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnliquidfire.jpg') no-repeat center;
  background-size: cover;
}

.btnload {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnload.jpg') no-repeat center;
  background-size: cover;
}

.btnloaddwarf {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnloaddwarf.jpg') no-repeat center;
  background-size: cover;
}

.btnloadpeon {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnloadpeon.jpg') no-repeat center;
  background-size: cover;
}

.btnlobstrokkblue {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnlobstrokkblue.jpg') no-repeat center;
  background-size: cover;
}

.btnlobstrokkdeepseer {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnlobstrokkdeepseer.jpg') no-repeat center;
  background-size: cover;
}

.btnlobstrokkgreen {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnlobstrokkgreen.jpg') no-repeat center;
  background-size: cover;
}

.btnlobstrokkred {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnlobstrokkred.jpg') no-repeat center;
  background-size: cover;
}

.btnlobstrokkredpooldweller {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnlobstrokkredpooldweller.jpg') no-repeat center;
  background-size: cover;
}

.btnlobstrokkredsnapper {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnlobstrokkredsnapper.jpg') no-repeat center;
  background-size: cover;
}

.btnlocustswarm {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnlocustswarm.jpg') no-repeat center;
  background-size: cover;
}

.btnlordnicholasbuzan {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnlordnicholasbuzan.jpg') no-repeat center;
  background-size: cover;
}

.btnmagetower {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmagetower.jpg') no-repeat center;
  background-size: cover;
}

.btnmagicalsentry {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmagicalsentry.jpg') no-repeat center;
  background-size: cover;
}

.btnmagicimmunity {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmagicimmunity.jpg') no-repeat center;
  background-size: cover;
}

.btnmagiclariet {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmagiclariet.jpg') no-repeat center;
  background-size: cover;
}

.btnmagnataur {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmagnataur.jpg') no-repeat center;
  background-size: cover;
}

.btnmagnataurbrown {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmagnataurbrown.jpg') no-repeat center;
  background-size: cover;
}

.btnmagroththedefender {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmagroththedefender.jpg') no-repeat center;
  background-size: cover;
}

.btnmagtheridon {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmagtheridon.jpg') no-repeat center;
  background-size: cover;
}

.btnmaidenofpain {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmaidenofpain.jpg') no-repeat center;
  background-size: cover;
}

.btnmalfurion {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmalfurion.jpg') no-repeat center;
  background-size: cover;
}

.btnmalfurionwithoutstag {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmalfurionwithoutstag.jpg') no-repeat center;
  background-size: cover;
}

.btnmalganis {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmalganis.jpg') no-repeat center;
  background-size: cover;
}

.btnmammoth {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmammoth.jpg') no-repeat center;
  background-size: cover;
}

.btnmanaburn {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmanaburn.jpg') no-repeat center;
  background-size: cover;
}

.btnmanadrain {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmanadrain.jpg') no-repeat center;
  background-size: cover;
}

.btnmanaflare {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmanaflare.jpg') no-repeat center;
  background-size: cover;
}

.btnmanaflareoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmanaflareoff.jpg') no-repeat center;
  background-size: cover;
}

.btnmanarecharge {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmanarecharge.jpg') no-repeat center;
  background-size: cover;
}

.btnmanarechargeoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmanarechargeoff.jpg') no-repeat center;
  background-size: cover;
}

.btnmanashield {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmanashield.jpg') no-repeat center;
  background-size: cover;
}

.btnmanastone {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmanastone.jpg') no-repeat center;
  background-size: cover;
}

.btnmannoroth {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmannoroth.jpg') no-repeat center;
  background-size: cover;
}

.btnmantleofintelligence {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmantleofintelligence.jpg') no-repeat center;
  background-size: cover;
}

.btnmanual {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmanual.jpg') no-repeat center;
  background-size: cover;
}

.btnmanual2 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmanual2.jpg') no-repeat center;
  background-size: cover;
}

.btnmanual3 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmanual3.jpg') no-repeat center;
  background-size: cover;
}

.btnmarketplace {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmarketplace.jpg') no-repeat center;
  background-size: cover;
}

.btnmarkoffire {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmarkoffire.jpg') no-repeat center;
  background-size: cover;
}

.btnmarksmanship {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmarksmanship.jpg') no-repeat center;
  background-size: cover;
}

.btnmaskofdeath {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmaskofdeath.jpg') no-repeat center;
  background-size: cover;
}

.btnmassteleport {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmassteleport.jpg') no-repeat center;
  background-size: cover;
}

.btnmathog {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmathog.jpg') no-repeat center;
  background-size: cover;
}

.btnmeatapult {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmeatapult.jpg') no-repeat center;
  background-size: cover;
}

.btnmeatwagon {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmeatwagon.jpg') no-repeat center;
  background-size: cover;
}

.btnmechanicalcritter {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmechanicalcritter.jpg') no-repeat center;
  background-size: cover;
}

.btnmedalionofcourage {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmedalionofcourage.jpg') no-repeat center;
  background-size: cover;
}

.btnmedivh {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmedivh.jpg') no-repeat center;
  background-size: cover;
}

.btnmedivhravenform {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmedivhravenform.jpg') no-repeat center;
  background-size: cover;
}

.btnmercenarycamp {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmercenarycamp.jpg') no-repeat center;
  background-size: cover;
}

.btnmerchant {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmerchant.jpg') no-repeat center;
  background-size: cover;
}

.btnmetamorphosis {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmetamorphosis.jpg') no-repeat center;
  background-size: cover;
}

.btnmilitia {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmilitia.jpg') no-repeat center;
  background-size: cover;
}

.btnminorrejuvpotion {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnminorrejuvpotion.jpg') no-repeat center;
  background-size: cover;
}

.btnmirrorimage {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmirrorimage.jpg') no-repeat center;
  background-size: cover;
}

.btnmishalv1 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmishalv1.jpg') no-repeat center;
  background-size: cover;
}

.btnmishalv2 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmishalv2.jpg') no-repeat center;
  background-size: cover;
}

.btnmishalv3 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmishalv3.jpg') no-repeat center;
  background-size: cover;
}

.btnmishalv4 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmishalv4.jpg') no-repeat center;
  background-size: cover;
}

.btnmonsoon {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmonsoon.jpg') no-repeat center;
  background-size: cover;
}

.btnmonsterlure {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmonsterlure.jpg') no-repeat center;
  background-size: cover;
}

.btnmoonarmor {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmoonarmor.jpg') no-repeat center;
  background-size: cover;
}

.btnmoonstone {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmoonstone.jpg') no-repeat center;
  background-size: cover;
}

.btnmoonwell {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmoonwell.jpg') no-repeat center;
  background-size: cover;
}

.btnmortarteam {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmortarteam.jpg') no-repeat center;
  background-size: cover;
}

.btnmountaingiant {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmountaingiant.jpg') no-repeat center;
  background-size: cover;
}

.btnmove {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmove.jpg') no-repeat center;
  background-size: cover;
}

.btnmudgolem {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmudgolem.jpg') no-repeat center;
  background-size: cover;
}

.btnmuradinbronzebeard {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmuradinbronzebeard.jpg') no-repeat center;
  background-size: cover;
}

.btnmurgalslave {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmurgalslave.jpg') no-repeat center;
  background-size: cover;
}

.btnmurgulbloodgill {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmurgulbloodgill.jpg') no-repeat center;
  background-size: cover;
}

.btnmurgulcliffrunner {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmurgulcliffrunner.jpg') no-repeat center;
  background-size: cover;
}

.btnmurgulmarauder {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmurgulmarauder.jpg') no-repeat center;
  background-size: cover;
}

.btnmurgulreaver {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmurgulreaver.jpg') no-repeat center;
  background-size: cover;
}

.btnmurgulshadowcaster {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmurgulshadowcaster.jpg') no-repeat center;
  background-size: cover;
}

.btnmurgulsnarecaster {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmurgulsnarecaster.jpg') no-repeat center;
  background-size: cover;
}

.btnmurgultidewarrior {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmurgultidewarrior.jpg') no-repeat center;
  background-size: cover;
}

.btnmurloc {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmurloc.jpg') no-repeat center;
  background-size: cover;
}

.btnmurlocflesheater {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmurlocflesheater.jpg') no-repeat center;
  background-size: cover;
}

.btnmurlochuntsman {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmurlochuntsman.jpg') no-repeat center;
  background-size: cover;
}

.btnmurlocmutant {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmurlocmutant.jpg') no-repeat center;
  background-size: cover;
}

.btnmurlocnightcrawler {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmurlocnightcrawler.jpg') no-repeat center;
  background-size: cover;
}

.btnmurlocplaguebearer {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnmurlocplaguebearer.jpg') no-repeat center;
  background-size: cover;
}

.btnnagaarmorup1 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnagaarmorup1.jpg') no-repeat center;
  background-size: cover;
}

.btnnagaarmorup2 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnagaarmorup2.jpg') no-repeat center;
  background-size: cover;
}

.btnnagaarmorup3 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnagaarmorup3.jpg') no-repeat center;
  background-size: cover;
}

.btnnagaburrow {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnagaburrow.jpg') no-repeat center;
  background-size: cover;
}

.btnnagamyrmidon {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnagamyrmidon.jpg') no-repeat center;
  background-size: cover;
}

.btnnagamyrmidonroyalguard {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnagamyrmidonroyalguard.jpg') no-repeat center;
  background-size: cover;
}

.btnnagaseawitch {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnagaseawitch.jpg') no-repeat center;
  background-size: cover;
}

.btnnagasummoner {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnagasummoner.jpg') no-repeat center;
  background-size: cover;
}

.btnnagaunburrow {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnagaunburrow.jpg') no-repeat center;
  background-size: cover;
}

.btnnagaweaponup1 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnagaweaponup1.jpg') no-repeat center;
  background-size: cover;
}

.btnnagaweaponup2 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnagaweaponup2.jpg') no-repeat center;
  background-size: cover;
}

.btnnagaweaponup3 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnagaweaponup3.jpg') no-repeat center;
  background-size: cover;
}

.btnnaisha {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnaisha.jpg') no-repeat center;
  background-size: cover;
}

.btnnaturesblessing {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnaturesblessing.jpg') no-repeat center;
  background-size: cover;
}

.btnnaturetouchgrow {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnaturetouchgrow.jpg') no-repeat center;
  background-size: cover;
}

.btnnazgrel {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnazgrel.jpg') no-repeat center;
  background-size: cover;
}

.btnnecklace {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnecklace.jpg') no-repeat center;
  background-size: cover;
}

.btnnecromancer {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnecromancer.jpg') no-repeat center;
  background-size: cover;
}

.btnnecromanceradept {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnecromanceradept.jpg') no-repeat center;
  background-size: cover;
}

.btnnecromancermaster {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnecromancermaster.jpg') no-repeat center;
  background-size: cover;
}

.btnnecropolis {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnecropolis.jpg') no-repeat center;
  background-size: cover;
}

.btnnerubian {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnerubian.jpg') no-repeat center;
  background-size: cover;
}

.btnnerubianqueen {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnerubianqueen.jpg') no-repeat center;
  background-size: cover;
}

.btnnerubianseer {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnerubianseer.jpg') no-repeat center;
  background-size: cover;
}

.btnnerubianspiderlord {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnerubianspiderlord.jpg') no-repeat center;
  background-size: cover;
}

.btnnerubianwarrior {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnerubianwarrior.jpg') no-repeat center;
  background-size: cover;
}

.btnnerubianwebspinner {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnerubianwebspinner.jpg') no-repeat center;
  background-size: cover;
}

.btnnerubianziggurat {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnerubianziggurat.jpg') no-repeat center;
  background-size: cover;
}

.btnnetherdragon {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnetherdragon.jpg') no-repeat center;
  background-size: cover;
}

.btnnetherdragonroost {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnetherdragonroost.jpg') no-repeat center;
  background-size: cover;
}

.btnnetherdragonwhelp {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnetherdragonwhelp.jpg') no-repeat center;
  background-size: cover;
}

.btnnetherdrake {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnetherdrake.jpg') no-repeat center;
  background-size: cover;
}

.btnneutralmanashield {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnneutralmanashield.jpg') no-repeat center;
  background-size: cover;
}

.btnneutralmanashieldoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnneutralmanashieldoff.jpg') no-repeat center;
  background-size: cover;
}

.btnnightelfbattlecruiser {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnightelfbattlecruiser.jpg') no-repeat center;
  background-size: cover;
}

.btnnightelfbuild {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnightelfbuild.jpg') no-repeat center;
  background-size: cover;
}

.btnnightelfdestroyer {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnightelfdestroyer.jpg') no-repeat center;
  background-size: cover;
}

.btnnightelfrunner {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnightelfrunner.jpg') no-repeat center;
  background-size: cover;
}

.btnnightelfshipyard {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnightelfshipyard.jpg') no-repeat center;
  background-size: cover;
}

.btnnightelftransport {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnnightelftransport.jpg') no-repeat center;
  background-size: cover;
}

.btnobsidianstatue {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnobsidianstatue.jpg') no-repeat center;
  background-size: cover;
}

.btnogre {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnogre.jpg') no-repeat center;
  background-size: cover;
}

.btnogrelord {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnogrelord.jpg') no-repeat center;
  background-size: cover;
}

.btnogremagi {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnogremagi.jpg') no-repeat center;
  background-size: cover;
}

.btnogremauler {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnogremauler.jpg') no-repeat center;
  background-size: cover;
}

.btnoneheadedogre {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnoneheadedogre.jpg') no-repeat center;
  background-size: cover;
}

.btnoneheadedogremagi {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnoneheadedogremagi.jpg') no-repeat center;
  background-size: cover;
}

.btnorbofcorruption {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnorbofcorruption.jpg') no-repeat center;
  background-size: cover;
}

.btnorbofdarkness {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnorbofdarkness.jpg') no-repeat center;
  background-size: cover;
}

.btnorbofdeath {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnorbofdeath.jpg') no-repeat center;
  background-size: cover;
}

.btnorbofdeathoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnorbofdeathoff.jpg') no-repeat center;
  background-size: cover;
}

.btnorboffire {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnorboffire.jpg') no-repeat center;
  background-size: cover;
}

.btnorboffrost {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnorboffrost.jpg') no-repeat center;
  background-size: cover;
}

.btnorboflightning {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnorboflightning.jpg') no-repeat center;
  background-size: cover;
}

.btnorbofslowness {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnorbofslowness.jpg') no-repeat center;
  background-size: cover;
}

.btnorbofvenom {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnorbofvenom.jpg') no-repeat center;
  background-size: cover;
}

.btnorcdestroyer {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnorcdestroyer.jpg') no-repeat center;
  background-size: cover;
}

.btnorclumberupgradetwo {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnorclumberupgradetwo.jpg') no-repeat center;
  background-size: cover;
}

.btnorcmeleeupone {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnorcmeleeupone.jpg') no-repeat center;
  background-size: cover;
}

.btnorcmeleeupthree {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnorcmeleeupthree.jpg') no-repeat center;
  background-size: cover;
}

.btnorcmeleeuptwo {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnorcmeleeuptwo.jpg') no-repeat center;
  background-size: cover;
}

.btnorcrallypoint {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnorcrallypoint.jpg') no-repeat center;
  background-size: cover;
}

.btnorctower {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnorctower.jpg') no-repeat center;
  background-size: cover;
}

.btnorctransport {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnorctransport.jpg') no-repeat center;
  background-size: cover;
}

.btnorcwarlock {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnorcwarlock.jpg') no-repeat center;
  background-size: cover;
}

.btnorcwarlockapprentice {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnorcwarlockapprentice.jpg') no-repeat center;
  background-size: cover;
}

.btnorcwarlockhermit {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnorcwarlockhermit.jpg') no-repeat center;
  background-size: cover;
}

.btnorcwarlocknecrolyte {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnorcwarlocknecrolyte.jpg') no-repeat center;
  background-size: cover;
}

.btnorcwarlockred {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnorcwarlockred.jpg') no-repeat center;
  background-size: cover;
}

.btnowlbear {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnowlbear.jpg') no-repeat center;
  background-size: cover;
}

.btnowlscoutlv1 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnowlscoutlv1.jpg') no-repeat center;
  background-size: cover;
}

.btnowlscoutlv2 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnowlscoutlv2.jpg') no-repeat center;
  background-size: cover;
}

.btnowlscoutlv3 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnowlscoutlv3.jpg') no-repeat center;
  background-size: cover;
}

.btnpackbeast {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpackbeast.jpg') no-repeat center;
  background-size: cover;
}

.btnpandarenbrewmaster {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpandarenbrewmaster.jpg') no-repeat center;
  background-size: cover;
}

.btnpandataunt {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpandataunt.jpg') no-repeat center;
  background-size: cover;
}

.btnparasite {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnparasite.jpg') no-repeat center;
  background-size: cover;
}

.btnparasiteoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnparasiteoff.jpg') no-repeat center;
  background-size: cover;
}

.btnpatrol {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpatrol.jpg') no-repeat center;
  background-size: cover;
}

.btnpeasant {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpeasant.jpg') no-repeat center;
  background-size: cover;
}

.btnpendantofenergy {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpendantofenergy.jpg') no-repeat center;
  background-size: cover;
}

.btnpendantofmana {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpendantofmana.jpg') no-repeat center;
  background-size: cover;
}

.btnpeon {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpeon.jpg') no-repeat center;
  background-size: cover;
}

.btnperiapt {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnperiapt.jpg') no-repeat center;
  background-size: cover;
}

.btnperiapt1 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnperiapt1.jpg') no-repeat center;
  background-size: cover;
}

.btnphaseshift {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnphaseshift.jpg') no-repeat center;
  background-size: cover;
}

.btnphaseshiftoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnphaseshiftoff.jpg') no-repeat center;
  background-size: cover;
}

.btnphoenix {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnphoenix.jpg') no-repeat center;
  background-size: cover;
}

.btnphoenixegg {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnphoenixegg.jpg') no-repeat center;
  background-size: cover;
}

.btnpigfarm {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpigfarm.jpg') no-repeat center;
  background-size: cover;
}

.btnpillage {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpillage.jpg') no-repeat center;
  background-size: cover;
}

.btnpipeofinsight {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpipeofinsight.jpg') no-repeat center;
  background-size: cover;
}

.btnpitlord {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpitlord.jpg') no-repeat center;
  background-size: cover;
}

.btnplaguecloud {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnplaguecloud.jpg') no-repeat center;
  background-size: cover;
}

.btnplagueent {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnplagueent.jpg') no-repeat center;
  background-size: cover;
}

.btnpocketfactory {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpocketfactory.jpg') no-repeat center;
  background-size: cover;
}

.btnpocketfactorylv2 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpocketfactorylv2.jpg') no-repeat center;
  background-size: cover;
}

.btnpocketfactorylv3 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpocketfactorylv3.jpg') no-repeat center;
  background-size: cover;
}

.btnpoisonarrow {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpoisonarrow.jpg') no-repeat center;
  background-size: cover;
}

.btnpoisonent {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpoisonent.jpg') no-repeat center;
  background-size: cover;
}

.btnpoisonsting {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpoisonsting.jpg') no-repeat center;
  background-size: cover;
}

.btnpolarfurbolg {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpolarfurbolg.jpg') no-repeat center;
  background-size: cover;
}

.btnpolarfurbolgchampion {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpolarfurbolgchampion.jpg') no-repeat center;
  background-size: cover;
}

.btnpolarfurbolgelder {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpolarfurbolgelder.jpg') no-repeat center;
  background-size: cover;
}

.btnpolarfurbolgeldershaman {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpolarfurbolgeldershaman.jpg') no-repeat center;
  background-size: cover;
}

.btnpolarfurbolgshaman {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpolarfurbolgshaman.jpg') no-repeat center;
  background-size: cover;
}

.btnpolarfurbolgtracker {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpolarfurbolgtracker.jpg') no-repeat center;
  background-size: cover;
}

.btnpolymorph {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpolymorph.jpg') no-repeat center;
  background-size: cover;
}

.btnpossession {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpossession.jpg') no-repeat center;
  background-size: cover;
}

.btnpotionblue {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpotionblue.jpg') no-repeat center;
  background-size: cover;
}

.btnpotionbluebig {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpotionbluebig.jpg') no-repeat center;
  background-size: cover;
}

.btnpotionbluesmall {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpotionbluesmall.jpg') no-repeat center;
  background-size: cover;
}

.btnpotiongreen {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpotiongreen.jpg') no-repeat center;
  background-size: cover;
}

.btnpotiongreensmall {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpotiongreensmall.jpg') no-repeat center;
  background-size: cover;
}

.btnpotionofclarity {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpotionofclarity.jpg') no-repeat center;
  background-size: cover;
}

.btnpotionofdivinity {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpotionofdivinity.jpg') no-repeat center;
  background-size: cover;
}

.btnpotionofomniscience {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpotionofomniscience.jpg') no-repeat center;
  background-size: cover;
}

.btnpotionofrestoration {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpotionofrestoration.jpg') no-repeat center;
  background-size: cover;
}

.btnpotionofvampirism {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpotionofvampirism.jpg') no-repeat center;
  background-size: cover;
}

.btnpotionpurple {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpotionpurple.jpg') no-repeat center;
  background-size: cover;
}

.btnpotionred {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpotionred.jpg') no-repeat center;
  background-size: cover;
}

.btnpriest {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpriest.jpg') no-repeat center;
  background-size: cover;
}

.btnpriestadept {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpriestadept.jpg') no-repeat center;
  background-size: cover;
}

.btnpriestessofthemoon {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpriestessofthemoon.jpg') no-repeat center;
  background-size: cover;
}

.btnpriestmaster {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpriestmaster.jpg') no-repeat center;
  background-size: cover;
}

.btnpriestv0 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpriestv0.jpg') no-repeat center;
  background-size: cover;
}

.btnproudmoore {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnproudmoore.jpg') no-repeat center;
  background-size: cover;
}

.btnpurge {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpurge.jpg') no-repeat center;
  background-size: cover;
}

.btnpurpledragonspawn {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpurpledragonspawn.jpg') no-repeat center;
  background-size: cover;
}

.btnpurplefelhound {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnpurplefelhound.jpg') no-repeat center;
  background-size: cover;
}

.btnqueenofsuffering {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnqueenofsuffering.jpg') no-repeat center;
  background-size: cover;
}

.btnquillbeast {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnquillbeast.jpg') no-repeat center;
  background-size: cover;
}

.btnquillbeastlv2 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnquillbeastlv2.jpg') no-repeat center;
  background-size: cover;
}

.btnquillbeastlv3 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnquillbeastlv3.jpg') no-repeat center;
  background-size: cover;
}

.btnquillbeastlv4 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnquillbeastlv4.jpg') no-repeat center;
  background-size: cover;
}

.btnquillboar {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnquillboar.jpg') no-repeat center;
  background-size: cover;
}

.btnquillboarhunter {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnquillboarhunter.jpg') no-repeat center;
  background-size: cover;
}

.btnquillspray {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnquillspray.jpg') no-repeat center;
  background-size: cover;
}

.btnquillsprayoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnquillsprayoff.jpg') no-repeat center;
  background-size: cover;
}

.btnragingbear {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnragingbear.jpg') no-repeat center;
  background-size: cover;
}

.btnraider {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnraider.jpg') no-repeat center;
  background-size: cover;
}

.btnraisedead {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnraisedead.jpg') no-repeat center;
  background-size: cover;
}

.btnraisedeadoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnraisedeadoff.jpg') no-repeat center;
  background-size: cover;
}

.btnrallypoint {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnrallypoint.jpg') no-repeat center;
  background-size: cover;
}

.btnrallypointnightelf {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnrallypointnightelf.jpg') no-repeat center;
  background-size: cover;
}

.btnrallypointundead {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnrallypointundead.jpg') no-repeat center;
  background-size: cover;
}

.btnravenform {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnravenform.jpg') no-repeat center;
  background-size: cover;
}

.btnrazorback {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnrazorback.jpg') no-repeat center;
  background-size: cover;
}

.btnrazorbackbrute {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnrazorbackbrute.jpg') no-repeat center;
  background-size: cover;
}

.btnrazormanechief {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnrazormanechief.jpg') no-repeat center;
  background-size: cover;
}

.btnrazormanemedicineman {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnrazormanemedicineman.jpg') no-repeat center;
  background-size: cover;
}

.btnreddragon {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnreddragon.jpg') no-repeat center;
  background-size: cover;
}

.btnreddragondevour {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnreddragondevour.jpg') no-repeat center;
  background-size: cover;
}

.btnreddragonwhelp {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnreddragonwhelp.jpg') no-repeat center;
  background-size: cover;
}

.btnreddrake {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnreddrake.jpg') no-repeat center;
  background-size: cover;
}

.btnreefelemental {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnreefelemental.jpg') no-repeat center;
  background-size: cover;
}

.btnregenerate {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnregenerate.jpg') no-repeat center;
  background-size: cover;
}

.btnregeneration {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnregeneration.jpg') no-repeat center;
  background-size: cover;
}

.btnregenerationaura {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnregenerationaura.jpg') no-repeat center;
  background-size: cover;
}

.btnreincarnation {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnreincarnation.jpg') no-repeat center;
  background-size: cover;
}

.btnreinforcedburrows {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnreinforcedburrows.jpg') no-repeat center;
  background-size: cover;
}

.btnreinforcedhides {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnreinforcedhides.jpg') no-repeat center;
  background-size: cover;
}

.btnrejuvenation {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnrejuvenation.jpg') no-repeat center;
  background-size: cover;
}

.btnrejuvenationpotion {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnrejuvenationpotion.jpg') no-repeat center;
  background-size: cover;
}

.btnrejuvpotion {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnrejuvpotion.jpg') no-repeat center;
  background-size: cover;
}

.btnrenegadewizard {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnrenegadewizard.jpg') no-repeat center;
  background-size: cover;
}

.btnrepair {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnrepair.jpg') no-repeat center;
  background-size: cover;
}

.btnrepairoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnrepairoff.jpg') no-repeat center;
  background-size: cover;
}

.btnreplenishhealth {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnreplenishhealth.jpg') no-repeat center;
  background-size: cover;
}

.btnreplenishhealthoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnreplenishhealthoff.jpg') no-repeat center;
  background-size: cover;
}

.btnreplenishmana {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnreplenishmana.jpg') no-repeat center;
  background-size: cover;
}

.btnreplenishmanaoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnreplenishmanaoff.jpg') no-repeat center;
  background-size: cover;
}

.btnresistantskin {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnresistantskin.jpg') no-repeat center;
  background-size: cover;
}

.btnresurrection {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnresurrection.jpg') no-repeat center;
  background-size: cover;
}

.btnreveal {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnreveal.jpg') no-repeat center;
  background-size: cover;
}

.btnrevenant {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnrevenant.jpg') no-repeat center;
  background-size: cover;
}

.btnrexxar {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnrexxar.jpg') no-repeat center;
  background-size: cover;
}

.btnriderlesshorse {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnriderlesshorse.jpg') no-repeat center;
  background-size: cover;
}

.btnriderlesskodo {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnriderlesskodo.jpg') no-repeat center;
  background-size: cover;
}

.btnrifleman {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnrifleman.jpg') no-repeat center;
  background-size: cover;
}

.btnringgreen {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnringgreen.jpg') no-repeat center;
  background-size: cover;
}

.btnringjadefalcon {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnringjadefalcon.jpg') no-repeat center;
  background-size: cover;
}

.btnringlionhead {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnringlionhead.jpg') no-repeat center;
  background-size: cover;
}

.btnringpurple {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnringpurple.jpg') no-repeat center;
  background-size: cover;
}

.btnringskull {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnringskull.jpg') no-repeat center;
  background-size: cover;
}

.btnringvioletspider {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnringvioletspider.jpg') no-repeat center;
  background-size: cover;
}

.btnrobeofthemagi {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnrobeofthemagi.jpg') no-repeat center;
  background-size: cover;
}

.btnrobogoblin {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnrobogoblin.jpg') no-repeat center;
  background-size: cover;
}

.btnrockgolem {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnrockgolem.jpg') no-repeat center;
  background-size: cover;
}

.btnrocktower {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnrocktower.jpg') no-repeat center;
  background-size: cover;
}

.btnrodofnecromancy {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnrodofnecromancy.jpg') no-repeat center;
  background-size: cover;
}

.btnrogue {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnrogue.jpg') no-repeat center;
  background-size: cover;
}

.btnroguewizard {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnroguewizard.jpg') no-repeat center;
  background-size: cover;
}

.btnrokhan {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnrokhan.jpg') no-repeat center;
  background-size: cover;
}

.btnroot {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnroot.jpg') no-repeat center;
  background-size: cover;
}

.btnrune {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnrune.jpg') no-repeat center;
  background-size: cover;
}

.btnrunedbracers {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnrunedbracers.jpg') no-repeat center;
  background-size: cover;
}

.btnsacrifice {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsacrifice.jpg') no-repeat center;
  background-size: cover;
}

.btnsacrificialdagger {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsacrificialdagger.jpg') no-repeat center;
  background-size: cover;
}

.btnsacrificialpit {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsacrificialpit.jpg') no-repeat center;
  background-size: cover;
}

.btnsacrificialskull {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsacrificialskull.jpg') no-repeat center;
  background-size: cover;
}

.btnsalamanderhatchling {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsalamanderhatchling.jpg') no-repeat center;
  background-size: cover;
}

.btnsalamanderlord {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsalamanderlord.jpg') no-repeat center;
  background-size: cover;
}

.btnsamuro {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsamuro.jpg') no-repeat center;
  background-size: cover;
}

.btnsapphironliving {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsapphironliving.jpg') no-repeat center;
  background-size: cover;
}

.btnsapphironundead {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsapphironundead.jpg') no-repeat center;
  background-size: cover;
}

.btnsasquatch {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsasquatch.jpg') no-repeat center;
  background-size: cover;
}

.btnsasquatchancient {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsasquatchancient.jpg') no-repeat center;
  background-size: cover;
}

.btnsasquatchoracle {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsasquatchoracle.jpg') no-repeat center;
  background-size: cover;
}

.btnsasquatchshaman {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsasquatchshaman.jpg') no-repeat center;
  background-size: cover;
}

.btnsatyr {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsatyr.jpg') no-repeat center;
  background-size: cover;
}

.btnsatyrhellcaller {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsatyrhellcaller.jpg') no-repeat center;
  background-size: cover;
}

.btnsatyrshadowdancer {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsatyrshadowdancer.jpg') no-repeat center;
  background-size: cover;
}

.btnsatyrsoulstealer {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsatyrsoulstealer.jpg') no-repeat center;
  background-size: cover;
}

.btnsatyrtrickster {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsatyrtrickster.jpg') no-repeat center;
  background-size: cover;
}

.btnscatterrockets {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnscatterrockets.jpg') no-repeat center;
  background-size: cover;
}

.btnscepterofmastery {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnscepterofmastery.jpg') no-repeat center;
  background-size: cover;
}

.btnscourgebuild {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnscourgebuild.jpg') no-repeat center;
  background-size: cover;
}

.btnscout {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnscout.jpg') no-repeat center;
  background-size: cover;
}

.btnscroll {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnscroll.jpg') no-repeat center;
  background-size: cover;
}

.btnscrollofhaste {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnscrollofhaste.jpg') no-repeat center;
  background-size: cover;
}

.btnscrollofhealing {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnscrollofhealing.jpg') no-repeat center;
  background-size: cover;
}

.btnscrollofprotection {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnscrollofprotection.jpg') no-repeat center;
  background-size: cover;
}

.btnscrollofregeneration {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnscrollofregeneration.jpg') no-repeat center;
  background-size: cover;
}

.btnscrollofregenerationgreen {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnscrollofregenerationgreen.jpg') no-repeat center;
  background-size: cover;
}

.btnscrolloftownportal {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnscrolloftownportal.jpg') no-repeat center;
  background-size: cover;
}

.btnscrolluber {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnscrolluber.jpg') no-repeat center;
  background-size: cover;
}

.btnseaelemental {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnseaelemental.jpg') no-repeat center;
  background-size: cover;
}

.btnseagiant {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnseagiant.jpg') no-repeat center;
  background-size: cover;
}

.btnseagiantbehemoth {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnseagiantbehemoth.jpg') no-repeat center;
  background-size: cover;
}

.btnseagiantgreen {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnseagiantgreen.jpg') no-repeat center;
  background-size: cover;
}

.btnseagiantpulverize {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnseagiantpulverize.jpg') no-repeat center;
  background-size: cover;
}

.btnseagiantwarstomp {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnseagiantwarstomp.jpg') no-repeat center;
  background-size: cover;
}

.btnsearingarrows {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsearingarrows.jpg') no-repeat center;
  background-size: cover;
}

.btnsearingarrowsoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsearingarrowsoff.jpg') no-repeat center;
  background-size: cover;
}

.btnseasrevenant {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnseasrevenant.jpg') no-repeat center;
  background-size: cover;
}

.btnseaturtlegreen {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnseaturtlegreen.jpg') no-repeat center;
  background-size: cover;
}

.btnseaturtlegreengargantuan {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnseaturtlegreengargantuan.jpg') no-repeat center;
  background-size: cover;
}

.btnseaturtlegreengiant {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnseaturtlegreengiant.jpg') no-repeat center;
  background-size: cover;
}

.btnseaturtlegreenhatchling {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnseaturtlegreenhatchling.jpg') no-repeat center;
  background-size: cover;
}

.btnseaturtlered {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnseaturtlered.jpg') no-repeat center;
  background-size: cover;
}

.btnseawitch {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnseawitch.jpg') no-repeat center;
  background-size: cover;
}

.btnseersden {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnseersden.jpg') no-repeat center;
  background-size: cover;
}

.btnseigeengine {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnseigeengine.jpg') no-repeat center;
  background-size: cover;
}

.btnseigeenginewithmissles {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnseigeenginewithmissles.jpg') no-repeat center;
  background-size: cover;
}

.btnselectunit {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnselectunit.jpg') no-repeat center;
  background-size: cover;
}

.btnselfdestruct {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnselfdestruct.jpg') no-repeat center;
  background-size: cover;
}

.btnselfdestructoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnselfdestructoff.jpg') no-repeat center;
  background-size: cover;
}

.btnsentinel {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsentinel.jpg') no-repeat center;
  background-size: cover;
}

.btnsentry {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsentry.jpg') no-repeat center;
  background-size: cover;
}

.btnsentryward {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsentryward.jpg') no-repeat center;
  background-size: cover;
}

.btnserpentward {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnserpentward.jpg') no-repeat center;
  background-size: cover;
}

.btnserpentwardlv2 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnserpentwardlv2.jpg') no-repeat center;
  background-size: cover;
}

.btnserpentwardlv3 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnserpentwardlv3.jpg') no-repeat center;
  background-size: cover;
}

.btnserpentwardlv4 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnserpentwardlv4.jpg') no-repeat center;
  background-size: cover;
}

.btnshade {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnshade.jpg') no-repeat center;
  background-size: cover;
}

.btnshadowhunter {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnshadowhunter.jpg') no-repeat center;
  background-size: cover;
}

.btnshadowmeld {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnshadowmeld.jpg') no-repeat center;
  background-size: cover;
}

.btnshadowpact {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnshadowpact.jpg') no-repeat center;
  background-size: cover;
}

.btnshadowstrike {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnshadowstrike.jpg') no-repeat center;
  background-size: cover;
}

.btnshadowwolflv3 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnshadowwolflv3.jpg') no-repeat center;
  background-size: cover;
}

.btnshaman {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnshaman.jpg') no-repeat center;
  background-size: cover;
}

.btnshamanadept {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnshamanadept.jpg') no-repeat center;
  background-size: cover;
}

.btnshamanmaster {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnshamanmaster.jpg') no-repeat center;
  background-size: cover;
}

.btnshandris {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnshandris.jpg') no-repeat center;
  background-size: cover;
}

.btnsheep {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsheep.jpg') no-repeat center;
  background-size: cover;
}

.btnshockwave {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnshockwave.jpg') no-repeat center;
  background-size: cover;
}

.btnshrineofaszhara {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnshrineofaszhara.jpg') no-repeat center;
  background-size: cover;
}

.btnsiegegolem {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsiegegolem.jpg') no-repeat center;
  background-size: cover;
}

.btnsilence {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsilence.jpg') no-repeat center;
  background-size: cover;
}

.btnsirenadept {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsirenadept.jpg') no-repeat center;
  background-size: cover;
}

.btnsirenmaster {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsirenmaster.jpg') no-repeat center;
  background-size: cover;
}

.btnsirgregoryedmunson {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsirgregoryedmunson.jpg') no-repeat center;
  background-size: cover;
}

.btnskeletallongevity {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnskeletallongevity.jpg') no-repeat center;
  background-size: cover;
}

.btnskeletalmarskman {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnskeletalmarskman.jpg') no-repeat center;
  background-size: cover;
}

.btnskeletalorc {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnskeletalorc.jpg') no-repeat center;
  background-size: cover;
}

.btnskeletalorcchampion {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnskeletalorcchampion.jpg') no-repeat center;
  background-size: cover;
}

.btnskeletalorcgrunt {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnskeletalorcgrunt.jpg') no-repeat center;
  background-size: cover;
}

.btnskeletonarcher {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnskeletonarcher.jpg') no-repeat center;
  background-size: cover;
}

.btnskeletonmage {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnskeletonmage.jpg') no-repeat center;
  background-size: cover;
}

.btnskeletonminion {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnskeletonminion.jpg') no-repeat center;
  background-size: cover;
}

.btnskeletonwarrior {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnskeletonwarrior.jpg') no-repeat center;
  background-size: cover;
}

.btnskillz {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnskillz.jpg') no-repeat center;
  background-size: cover;
}

.btnskyfurytower {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnskyfurytower.jpg') no-repeat center;
  background-size: cover;
}

.btnslaughterhouse {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnslaughterhouse.jpg') no-repeat center;
  background-size: cover;
}

.btnsleep {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsleep.jpg') no-repeat center;
  background-size: cover;
}

.btnslow {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnslow.jpg') no-repeat center;
  background-size: cover;
}

.btnslowoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnslowoff.jpg') no-repeat center;
  background-size: cover;
}

.btnslowpoison {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnslowpoison.jpg') no-repeat center;
  background-size: cover;
}

.btnsludgecreature {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsludgecreature.jpg') no-repeat center;
  background-size: cover;
}

.btnsludgeflinger {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsludgeflinger.jpg') no-repeat center;
  background-size: cover;
}

.btnsludgemontrosity {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsludgemontrosity.jpg') no-repeat center;
  background-size: cover;
}

.btnsmash {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsmash.jpg') no-repeat center;
  background-size: cover;
}

.btnsnapdragon {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsnapdragon.jpg') no-repeat center;
  background-size: cover;
}

.btnsnazzypotion {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsnazzypotion.jpg') no-repeat center;
  background-size: cover;
}

.btnsnazzyscroll {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsnazzyscroll.jpg') no-repeat center;
  background-size: cover;
}

.btnsnazzyscrollgreen {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsnazzyscrollgreen.jpg') no-repeat center;
  background-size: cover;
}

.btnsobimask {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsobimask.jpg') no-repeat center;
  background-size: cover;
}

.btnsorceress {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsorceress.jpg') no-repeat center;
  background-size: cover;
}

.btnsorceressadept {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsorceressadept.jpg') no-repeat center;
  background-size: cover;
}

.btnsorceressmaster {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsorceressmaster.jpg') no-repeat center;
  background-size: cover;
}

.btnsorceressv0 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsorceressv0.jpg') no-repeat center;
  background-size: cover;
}

.btnsoulburn {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsoulburn.jpg') no-repeat center;
  background-size: cover;
}

.btnspawninggrounds {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnspawninggrounds.jpg') no-repeat center;
  background-size: cover;
}

.btnspellbreaker {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnspellbreaker.jpg') no-repeat center;
  background-size: cover;
}

.btnspellbreakermagicdefend {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnspellbreakermagicdefend.jpg') no-repeat center;
  background-size: cover;
}

.btnspellbreakermagicundefend {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnspellbreakermagicundefend.jpg') no-repeat center;
  background-size: cover;
}

.btnspellshieldamulet {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnspellshieldamulet.jpg') no-repeat center;
  background-size: cover;
}

.btnspellsteal {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnspellsteal.jpg') no-repeat center;
  background-size: cover;
}

.btnspellstealoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnspellstealoff.jpg') no-repeat center;
  background-size: cover;
}

.btnspider {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnspider.jpg') no-repeat center;
  background-size: cover;
}

.btnspiderblack {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnspiderblack.jpg') no-repeat center;
  background-size: cover;
}

.btnspiderblue {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnspiderblue.jpg') no-repeat center;
  background-size: cover;
}

.btnspidercrab {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnspidercrab.jpg') no-repeat center;
  background-size: cover;
}

.btnspidercrabbehemoth {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnspidercrabbehemoth.jpg') no-repeat center;
  background-size: cover;
}

.btnspidercrablimbripper {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnspidercrablimbripper.jpg') no-repeat center;
  background-size: cover;
}

.btnspidergreen {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnspidergreen.jpg') no-repeat center;
  background-size: cover;
}

.btnspiderling {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnspiderling.jpg') no-repeat center;
  background-size: cover;
}

.btnspidersilkbroach {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnspidersilkbroach.jpg') no-repeat center;
  background-size: cover;
}

.btnspikedbarricades {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnspikedbarricades.jpg') no-repeat center;
  background-size: cover;
}

.btnspiritbear {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnspiritbear.jpg') no-repeat center;
  background-size: cover;
}

.btnspiritbeast {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnspiritbeast.jpg') no-repeat center;
  background-size: cover;
}

.btnspirithawk {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnspirithawk.jpg') no-repeat center;
  background-size: cover;
}

.btnspiritlink {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnspiritlink.jpg') no-repeat center;
  background-size: cover;
}

.btnspiritlodge {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnspiritlodge.jpg') no-repeat center;
  background-size: cover;
}

.btnspiritofvengeance {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnspiritofvengeance.jpg') no-repeat center;
  background-size: cover;
}

.btnspiritpig {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnspiritpig.jpg') no-repeat center;
  background-size: cover;
}

.btnspiritwalker {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnspiritwalker.jpg') no-repeat center;
  background-size: cover;
}

.btnspiritwalkeradepttraining {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnspiritwalkeradepttraining.jpg') no-repeat center;
  background-size: cover;
}

.btnspiritwalkermastertraining {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnspiritwalkermastertraining.jpg') no-repeat center;
  background-size: cover;
}

.btnspiritwolf {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnspiritwolf.jpg') no-repeat center;
  background-size: cover;
}

.btnspiritwyvern {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnspiritwyvern.jpg') no-repeat center;
  background-size: cover;
}

.btnstaffofnegation {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnstaffofnegation.jpg') no-repeat center;
  background-size: cover;
}

.btnstaffofpreservation {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnstaffofpreservation.jpg') no-repeat center;
  background-size: cover;
}

.btnstaffofpurification {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnstaffofpurification.jpg') no-repeat center;
  background-size: cover;
}

.btnstaffofsanctuary {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnstaffofsanctuary.jpg') no-repeat center;
  background-size: cover;
}

.btnstaffofsilence {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnstaffofsilence.jpg') no-repeat center;
  background-size: cover;
}

.btnstaffofteleportation {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnstaffofteleportation.jpg') no-repeat center;
  background-size: cover;
}

.btnstampede {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnstampede.jpg') no-repeat center;
  background-size: cover;
}

.btnstarfall {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnstarfall.jpg') no-repeat center;
  background-size: cover;
}

.btnstarwand {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnstarwand.jpg') no-repeat center;
  background-size: cover;
}

.btnstasistrap {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnstasistrap.jpg') no-repeat center;
  background-size: cover;
}

.btnstatup {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnstatup.jpg') no-repeat center;
  background-size: cover;
}

.btnsteelarmor {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsteelarmor.jpg') no-repeat center;
  background-size: cover;
}

.btnsteelmelee {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsteelmelee.jpg') no-repeat center;
  background-size: cover;
}

.btnsteelranged {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsteelranged.jpg') no-repeat center;
  background-size: cover;
}

.btnstone {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnstone.jpg') no-repeat center;
  background-size: cover;
}

.btnstonearchitecture {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnstonearchitecture.jpg') no-repeat center;
  background-size: cover;
}

.btnstoneform {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnstoneform.jpg') no-repeat center;
  background-size: cover;
}

.btnstop {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnstop.jpg') no-repeat center;
  background-size: cover;
}

.btnstormbolt {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnstormbolt.jpg') no-repeat center;
  background-size: cover;
}

.btnstormbrewmaster {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnstormbrewmaster.jpg') no-repeat center;
  background-size: cover;
}

.btnstormearthfire {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnstormearthfire.jpg') no-repeat center;
  background-size: cover;
}

.btnstormhammer {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnstormhammer.jpg') no-repeat center;
  background-size: cover;
}

.btnstormwyrm {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnstormwyrm.jpg') no-repeat center;
  background-size: cover;
}

.btnstrengthofthemoon {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnstrengthofthemoon.jpg') no-repeat center;
  background-size: cover;
}

.btnstrengthofthewild {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnstrengthofthewild.jpg') no-repeat center;
  background-size: cover;
}

.btnstrongdrink {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnstrongdrink.jpg') no-repeat center;
  background-size: cover;
}

.btnstronghold {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnstronghold.jpg') no-repeat center;
  background-size: cover;
}

.btnstun {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnstun.jpg') no-repeat center;
  background-size: cover;
}

.btnsummonwaterelemental {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsummonwaterelemental.jpg') no-repeat center;
  background-size: cover;
}

.btnsunderingblades {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsunderingblades.jpg') no-repeat center;
  background-size: cover;
}

.btnswordsman {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnswordsman.jpg') no-repeat center;
  background-size: cover;
}

.btnswordsman_v1 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnswordsman_v1.jpg') no-repeat center;
  background-size: cover;
}

.btnsylvanas {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsylvanas.jpg') no-repeat center;
  background-size: cover;
}

.btnsylvanasghost {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsylvanasghost.jpg') no-repeat center;
  background-size: cover;
}

.btnsylvanuswindrunner {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnsylvanuswindrunner.jpg') no-repeat center;
  background-size: cover;
}

.btntalisman {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntalisman.jpg') no-repeat center;
  background-size: cover;
}

.btntamehippogriff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntamehippogriff.jpg') no-repeat center;
  background-size: cover;
}

.btntaunt {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntaunt.jpg') no-repeat center;
  background-size: cover;
}

.btntauren {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntauren.jpg') no-repeat center;
  background-size: cover;
}

.btntaurentotem {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntaurentotem.jpg') no-repeat center;
  background-size: cover;
}

.btntavern {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntavern.jpg') no-repeat center;
  background-size: cover;
}

.btntelescope {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntelescope.jpg') no-repeat center;
  background-size: cover;
}

.btntempleofthedamned {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntempleofthedamned.jpg') no-repeat center;
  background-size: cover;
}

.btntempleoftides {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntempleoftides.jpg') no-repeat center;
  background-size: cover;
}

.btntheblackarrow {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntheblackarrow.jpg') no-repeat center;
  background-size: cover;
}

.btntheblackarrowoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntheblackarrowoff.jpg') no-repeat center;
  background-size: cover;
}

.btnthecaptain {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnthecaptain.jpg') no-repeat center;
  background-size: cover;
}

.btnthickfur {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnthickfur.jpg') no-repeat center;
  background-size: cover;
}

.btnthoriumarmor {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnthoriumarmor.jpg') no-repeat center;
  background-size: cover;
}

.btnthoriummelee {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnthoriummelee.jpg') no-repeat center;
  background-size: cover;
}

.btnthoriumranged {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnthoriumranged.jpg') no-repeat center;
  background-size: cover;
}

.btnthorns {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnthorns.jpg') no-repeat center;
  background-size: cover;
}

.btnthornshield {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnthornshield.jpg') no-repeat center;
  background-size: cover;
}

.btnthornyshieldoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnthornyshieldoff.jpg') no-repeat center;
  background-size: cover;
}

.btnthrall {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnthrall.jpg') no-repeat center;
  background-size: cover;
}

.btnthunderclap {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnthunderclap.jpg') no-repeat center;
  background-size: cover;
}

.btnthunderhawk {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnthunderhawk.jpg') no-repeat center;
  background-size: cover;
}

.btnthunderlizard {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnthunderlizard.jpg') no-repeat center;
  background-size: cover;
}

.btnthunderlizardsalamander {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnthunderlizardsalamander.jpg') no-repeat center;
  background-size: cover;
}

.btnthunderlizardvizier {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnthunderlizardvizier.jpg') no-repeat center;
  background-size: cover;
}

.btntichondrius {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntichondrius.jpg') no-repeat center;
  background-size: cover;
}

.btntidalguardian {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntidalguardian.jpg') no-repeat center;
  background-size: cover;
}

.btntidesrevenant {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntidesrevenant.jpg') no-repeat center;
  background-size: cover;
}

.btntimberwolf {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntimberwolf.jpg') no-repeat center;
  background-size: cover;
}

.btntinycastle {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntinycastle.jpg') no-repeat center;
  background-size: cover;
}

.btntombofrelics {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntombofrelics.jpg') no-repeat center;
  background-size: cover;
}

.btntome {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntome.jpg') no-repeat center;
  background-size: cover;
}

.btntomebrown {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntomebrown.jpg') no-repeat center;
  background-size: cover;
}

.btntomeofretraining {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntomeofretraining.jpg') no-repeat center;
  background-size: cover;
}

.btntomered {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntomered.jpg') no-repeat center;
  background-size: cover;
}

.btntornado {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntornado.jpg') no-repeat center;
  background-size: cover;
}

.btntownhall {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntownhall.jpg') no-repeat center;
  background-size: cover;
}

.btntranquility {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntranquility.jpg') no-repeat center;
  background-size: cover;
}

.btntransmute {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntransmute.jpg') no-repeat center;
  background-size: cover;
}

.btntransport {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntransport.jpg') no-repeat center;
  background-size: cover;
}

.btntreant {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntreant.jpg') no-repeat center;
  background-size: cover;
}

.btntreeofages {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntreeofages.jpg') no-repeat center;
  background-size: cover;
}

.btntreeofeternity {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntreeofeternity.jpg') no-repeat center;
  background-size: cover;
}

.btntreeoflife {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntreeoflife.jpg') no-repeat center;
  background-size: cover;
}

.btntrollbatrider {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntrollbatrider.jpg') no-repeat center;
  background-size: cover;
}

.btntrollburrow {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntrollburrow.jpg') no-repeat center;
  background-size: cover;
}

.btntrueshot {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntrueshot.jpg') no-repeat center;
  background-size: cover;
}

.btntuskaarblack {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntuskaarblack.jpg') no-repeat center;
  background-size: cover;
}

.btntuskaarbrown {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntuskaarbrown.jpg') no-repeat center;
  background-size: cover;
}

.btntuskaarbrownhealer {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntuskaarbrownhealer.jpg') no-repeat center;
  background-size: cover;
}

.btntuskaargold {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntuskaargold.jpg') no-repeat center;
  background-size: cover;
}

.btntuskaarnomad {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntuskaarnomad.jpg') no-repeat center;
  background-size: cover;
}

.btntuskaarsorcerer {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntuskaarsorcerer.jpg') no-repeat center;
  background-size: cover;
}

.btntuskaartrapper {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntuskaartrapper.jpg') no-repeat center;
  background-size: cover;
}

.btntuskaarwarrior {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntuskaarwarrior.jpg') no-repeat center;
  background-size: cover;
}

.btntyrande {
  background: url('~@/assets/images/hotkeys/icons/reforged/btntyrande.jpg') no-repeat center;
  background-size: cover;
}

.btnultravision {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnultravision.jpg') no-repeat center;
  background-size: cover;
}

.btnunbroken {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnunbroken.jpg') no-repeat center;
  background-size: cover;
}

.btnunbrokendarkweaver {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnunbrokendarkweaver.jpg') no-repeat center;
  background-size: cover;
}

.btnunbrokenrager {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnunbrokenrager.jpg') no-repeat center;
  background-size: cover;
}

.btnundeadairbarge {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnundeadairbarge.jpg') no-repeat center;
  background-size: cover;
}

.btnundeadbattleship {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnundeadbattleship.jpg') no-repeat center;
  background-size: cover;
}

.btnundeaddestroyer {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnundeaddestroyer.jpg') no-repeat center;
  background-size: cover;
}

.btnundeadload {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnundeadload.jpg') no-repeat center;
  background-size: cover;
}

.btnundeadloadoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnundeadloadoff.jpg') no-repeat center;
  background-size: cover;
}

.btnundeadshipyard {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnundeadshipyard.jpg') no-repeat center;
  background-size: cover;
}

.btnundeadtransport {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnundeadtransport.jpg') no-repeat center;
  background-size: cover;
}

.btnundeadunload {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnundeadunload.jpg') no-repeat center;
  background-size: cover;
}

.btnunholyarmor {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnunholyarmor.jpg') no-repeat center;
  background-size: cover;
}

.btnunholyaura {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnunholyaura.jpg') no-repeat center;
  background-size: cover;
}

.btnunholyfrenzy {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnunholyfrenzy.jpg') no-repeat center;
  background-size: cover;
}

.btnunholystrength {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnunholystrength.jpg') no-repeat center;
  background-size: cover;
}

.btnunload {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnunload.jpg') no-repeat center;
  background-size: cover;
}

.btnunloaddwarf {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnunloaddwarf.jpg') no-repeat center;
  background-size: cover;
}

.btnunloadpeon {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnunloadpeon.jpg') no-repeat center;
  background-size: cover;
}

.btnunstableconcoction {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnunstableconcoction.jpg') no-repeat center;
  background-size: cover;
}

.btnunsummonbuilding {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnunsummonbuilding.jpg') no-repeat center;
  background-size: cover;
}

.btnupgrademoonglaive {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnupgrademoonglaive.jpg') no-repeat center;
  background-size: cover;
}

.btnuproot {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnuproot.jpg') no-repeat center;
  background-size: cover;
}

.btnuther {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnuther.jpg') no-repeat center;
  background-size: cover;
}

.btnvampiricaura {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnvampiricaura.jpg') no-repeat center;
  background-size: cover;
}

.btnvarimathras {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnvarimathras.jpg') no-repeat center;
  background-size: cover;
}

.btnvengeanceincarnate {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnvengeanceincarnate.jpg') no-repeat center;
  background-size: cover;
}

.btnviletemptress {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnviletemptress.jpg') no-repeat center;
  background-size: cover;
}

.btnvoidwalker {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnvoidwalker.jpg') no-repeat center;
  background-size: cover;
}

.btnvolcano {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnvolcano.jpg') no-repeat center;
  background-size: cover;
}

.btnvoljin {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnvoljin.jpg') no-repeat center;
  background-size: cover;
}

.btnvoodoolounge {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnvoodoolounge.jpg') no-repeat center;
  background-size: cover;
}

.btnvorpalblades {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnvorpalblades.jpg') no-repeat center;
  background-size: cover;
}

.btnwalloffire {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwalloffire.jpg') no-repeat center;
  background-size: cover;
}

.btnwand {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwand.jpg') no-repeat center;
  background-size: cover;
}

.btnwandofcyclone {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwandofcyclone.jpg') no-repeat center;
  background-size: cover;
}

.btnwandofmanasteal {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwandofmanasteal.jpg') no-repeat center;
  background-size: cover;
}

.btnwandofneutralization {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwandofneutralization.jpg') no-repeat center;
  background-size: cover;
}

.btnwandofshadowsight {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwandofshadowsight.jpg') no-repeat center;
  background-size: cover;
}

.btnwandskull {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwandskull.jpg') no-repeat center;
  background-size: cover;
}

.btnwarden2 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwarden2.jpg') no-repeat center;
  background-size: cover;
}

.btnwareagle {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwareagle.jpg') no-repeat center;
  background-size: cover;
}

.btnwargolem {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwargolem.jpg') no-repeat center;
  background-size: cover;
}

.btnwarriorarachnathid {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwarriorarachnathid.jpg') no-repeat center;
  background-size: cover;
}

.btnwarstomp {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwarstomp.jpg') no-repeat center;
  background-size: cover;
}

.btnwatcherward {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwatcherward.jpg') no-repeat center;
  background-size: cover;
}

.btnwaterelemental {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwaterelemental.jpg') no-repeat center;
  background-size: cover;
}

.btnwaterelementallv2 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwaterelementallv2.jpg') no-repeat center;
  background-size: cover;
}

.btnwaterelementallv3 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwaterelementallv3.jpg') no-repeat center;
  background-size: cover;
}

.btnwateryminion {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwateryminion.jpg') no-repeat center;
  background-size: cover;
}

.btnwateryminioncaster {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwateryminioncaster.jpg') no-repeat center;
  background-size: cover;
}

.btnwateryminionlv2 {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwateryminionlv2.jpg') no-repeat center;
  background-size: cover;
}

.btnweb {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnweb.jpg') no-repeat center;
  background-size: cover;
}

.btnweboff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnweboff.jpg') no-repeat center;
  background-size: cover;
}

.btnwellspring {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwellspring.jpg') no-repeat center;
  background-size: cover;
}

.btnwendigo {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwendigo.jpg') no-repeat center;
  background-size: cover;
}

.btnwendigoancient {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwendigoancient.jpg') no-repeat center;
  background-size: cover;
}

.btnwendigoelder {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwendigoelder.jpg') no-repeat center;
  background-size: cover;
}

.btnwendigoshaman {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwendigoshaman.jpg') no-repeat center;
  background-size: cover;
}

.btnwhirlwind {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwhirlwind.jpg') no-repeat center;
  background-size: cover;
}

.btnwindserpent {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwindserpent.jpg') no-repeat center;
  background-size: cover;
}

.btnwindwalkoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwindwalkoff.jpg') no-repeat center;
  background-size: cover;
}

.btnwindwalkon {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwindwalkon.jpg') no-repeat center;
  background-size: cover;
}

.btnwisp {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwisp.jpg') no-repeat center;
  background-size: cover;
}

.btnwisphealoff {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwisphealoff.jpg') no-repeat center;
  background-size: cover;
}

.btnwispsplode {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwispsplode.jpg') no-repeat center;
  background-size: cover;
}

.btnwitchdoctor {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwitchdoctor.jpg') no-repeat center;
  background-size: cover;
}

.btnwitchdoctoradept {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwitchdoctoradept.jpg') no-repeat center;
  background-size: cover;
}

.btnwitchdoctormaster {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwitchdoctormaster.jpg') no-repeat center;
  background-size: cover;
}

.btnworkshop {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnworkshop.jpg') no-repeat center;
  background-size: cover;
}

.btnwraith {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwraith.jpg') no-repeat center;
  background-size: cover;
}

.btnwyvern {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwyvern.jpg') no-repeat center;
  background-size: cover;
}

.btnwyvernrider {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnwyvernrider.jpg') no-repeat center;
  background-size: cover;
}

.btnzergling {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnzergling.jpg') no-repeat center;
  background-size: cover;
}

.btnziggurat {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnziggurat.jpg') no-repeat center;
  background-size: cover;
}

.btnzigguratupgrade {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnzigguratupgrade.jpg') no-repeat center;
  background-size: cover;
}

.btnzombie {
  background: url('~@/assets/images/hotkeys/icons/reforged/btnzombie.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnadvancedspikedbarricades {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnadvancedspikedbarricades.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnanimalwartraining {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnanimalwartraining.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnbash {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnbash.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnbattleroar {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnbattleroar.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnberserk {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnberserk.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnbrilliance {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnbrilliance.jpg') no-repeat center;
  background-size: cover;
}

.pasbtncleavingattack {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtncleavingattack.jpg') no-repeat center;
  background-size: cover;
}

.pasbtncommand {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtncommand.jpg') no-repeat center;
  background-size: cover;
}

.pasbtncorrosivebreath {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtncorrosivebreath.jpg') no-repeat center;
  background-size: cover;
}

.pasbtncriticalstrike {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtncriticalstrike.jpg') no-repeat center;
  background-size: cover;
}

.pasbtndemolish {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtndemolish.jpg') no-repeat center;
  background-size: cover;
}

.pasbtndevotion {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtndevotion.jpg') no-repeat center;
  background-size: cover;
}

.pasbtndrum {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtndrum.jpg') no-repeat center;
  background-size: cover;
}

.pasbtndrunkendodge {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtndrunkendodge.jpg') no-repeat center;
  background-size: cover;
}

.pasbtndwarvenlongrifle {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtndwarvenlongrifle.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnelunesblessing {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnelunesblessing.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnengineeringupgrade {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnengineeringupgrade.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnenvenomedspear {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnenvenomedspear.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnevasion {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnevasion.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnexhumecorpses {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnexhumecorpses.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnfeedback {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnfeedback.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnfirerocks {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnfirerocks.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnflakcannons {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnflakcannons.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnflyingmachinetruesight {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnflyingmachinetruesight.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnfragmentationbombs {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnfragmentationbombs.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnfreezingbreath {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnfreezingbreath.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnfrost {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnfrost.jpg') no-repeat center;
  background-size: cover;
}

.pasbtngenericspellimmunity {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtngenericspellimmunity.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnghoulfrenzy {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnghoulfrenzy.jpg') no-repeat center;
  background-size: cover;
}

.pasbtngnollcommandaura {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtngnollcommandaura.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnhardenedskin {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnhardenedskin.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnheadhunterberserker {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnheadhunterberserker.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnhumanartilleryupone {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnhumanartilleryupone.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnhumanlumberupgrade1 {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnhumanlumberupgrade1.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnhumanlumberupgrade2 {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnhumanlumberupgrade2.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnimmolation {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnimmolation.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnimpalingbolt {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnimpalingbolt.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnimprovedbows {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnimprovedbows.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnimprovedspikedbarricades {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnimprovedspikedbarricades.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnliquidfire {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnliquidfire.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnmagicalsentry {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnmagicalsentry.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnmagicimmunity {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnmagicimmunity.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnmarkoffire {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnmarkoffire.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnmarksmanship {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnmarksmanship.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnpillage {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnpillage.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnplaguecloud {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnplaguecloud.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnpoisonsting {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnpoisonsting.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnregenerate {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnregenerate.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnreincarnation {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnreincarnation.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnreinforcedburrows {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnreinforcedburrows.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnresistantskin {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnresistantskin.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnscatterrockets {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnscatterrockets.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnscout {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnscout.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnseagiantpulverize {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnseagiantpulverize.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnshade {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnshade.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnshadetruesight {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnshadetruesight.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnskeletonmage {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnskeletonmage.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnslowpoison {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnslowpoison.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnsmash {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnsmash.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnspikedbarricades {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnspikedbarricades.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnspiritofvengeance {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnspiritofvengeance.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnstatup {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnstatup.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnstormhammer {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnstormhammer.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnsunderingblades {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnsunderingblades.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnthickfur {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnthickfur.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnthorns {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnthorns.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnthornshield {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnthornshield.jpg') no-repeat center;
  background-size: cover;
}

.pasbtntrueshot {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtntrueshot.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnunholyaura {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnunholyaura.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnupgrademoonglaive {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnupgrademoonglaive.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnvampiricaura {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnvampiricaura.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnvorpalblades {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnvorpalblades.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnwellspring {
  background: url('~@/assets/images/hotkeys/icons/reforged/pasbtnwellspring.jpg') no-repeat center;
  background-size: cover;
}

.btnabomination-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnabomination.png') no-repeat center;
  background-size: cover;
}

.btnabsorbmagic-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnabsorbmagic.png') no-repeat center;
  background-size: cover;
}

.btnacidbomb-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnacidbomb.png') no-repeat center;
  background-size: cover;
}

.btnacolyte-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnacolyte.png') no-repeat center;
  background-size: cover;
}

.btnadvancedcreatureattack-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnadvancedcreatureattack.png') no-repeat center;
  background-size: cover;
}

.btnadvancedcreaturecarapace-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnadvancedcreaturecarapace.png') no-repeat center;
  background-size: cover;
}

.btnadvanceddeathtower-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnadvanceddeathtower.png') no-repeat center;
  background-size: cover;
}

.btnadvancedenergytower-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnadvancedenergytower.png') no-repeat center;
  background-size: cover;
}

.btnadvancedflametower-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnadvancedflametower.png') no-repeat center;
  background-size: cover;
}

.btnadvancedfrosttower-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnadvancedfrosttower.png') no-repeat center;
  background-size: cover;
}

.btnadvancedmoonarmor-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnadvancedmoonarmor.png') no-repeat center;
  background-size: cover;
}

.btnadvancedreinforcedhides-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnadvancedreinforcedhides.png') no-repeat center;
  background-size: cover;
}

.btnadvancedrocktower-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnadvancedrocktower.png') no-repeat center;
  background-size: cover;
}

.btnadvancedspikedbarricades-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnadvancedspikedbarricades.png') no-repeat center;
  background-size: cover;
}

.btnadvancedstrengthofthemoon-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnadvancedstrengthofthemoon.png') no-repeat center;
  background-size: cover;
}

.btnadvancedstrengthofthewild-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnadvancedstrengthofthewild.png') no-repeat center;
  background-size: cover;
}

.btnadvancedunholyarmor-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnadvancedunholyarmor.png') no-repeat center;
  background-size: cover;
}

.btnadvancedunholystrength-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnadvancedunholystrength.png') no-repeat center;
  background-size: cover;
}

.btnadvstruct-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnadvstruct.png') no-repeat center;
  background-size: cover;
}

.btnairattackoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnairattackoff.png') no-repeat center;
  background-size: cover;
}

.btnairattackon-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnairattackon.png') no-repeat center;
  background-size: cover;
}

.btnakama-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnakama.png') no-repeat center;
  background-size: cover;
}

.btnalleriaflute-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnalleriaflute.png') no-repeat center;
  background-size: cover;
}

.btnaltarofdarkness-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnaltarofdarkness.png') no-repeat center;
  background-size: cover;
}

.btnaltarofdepths-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnaltarofdepths.png') no-repeat center;
  background-size: cover;
}

.btnaltarofelders-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnaltarofelders.png') no-repeat center;
  background-size: cover;
}

.btnaltarofkings-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnaltarofkings.png') no-repeat center;
  background-size: cover;
}

.btnaltarofstorms-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnaltarofstorms.png') no-repeat center;
  background-size: cover;
}

.btnambush-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnambush.png') no-repeat center;
  background-size: cover;
}

.btnambushday-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnambushday.png') no-repeat center;
  background-size: cover;
}

.btnammodump-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnammodump.png') no-repeat center;
  background-size: cover;
}

.btnancestralspirit-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnancestralspirit.png') no-repeat center;
  background-size: cover;
}

.btnancientoflore-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnancientoflore.png') no-repeat center;
  background-size: cover;
}

.btnancientoftheearth-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnancientoftheearth.png') no-repeat center;
  background-size: cover;
}

.btnancientofthemoon-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnancientofthemoon.png') no-repeat center;
  background-size: cover;
}

.btnancientofwonders-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnancientofwonders.png') no-repeat center;
  background-size: cover;
}

.btnanimalwartraining-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnanimalwartraining.png') no-repeat center;
  background-size: cover;
}

.btnanimatedead-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnanimatedead.png') no-repeat center;
  background-size: cover;
}

.btnankh-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnankh.png') no-repeat center;
  background-size: cover;
}

.btnantimagicshell-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnantimagicshell.png') no-repeat center;
  background-size: cover;
}

.btnarachnathid-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnarachnathid.png') no-repeat center;
  background-size: cover;
}

.btnarachnathidgreen-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnarachnathidgreen.png') no-repeat center;
  background-size: cover;
}

.btnarachnathidpurple-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnarachnathidpurple.png') no-repeat center;
  background-size: cover;
}

.btnarcanesanctum-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnarcanesanctum.png') no-repeat center;
  background-size: cover;
}

.btnarcanevault-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnarcanevault.png') no-repeat center;
  background-size: cover;
}

.btnarcanitearchitecture-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnarcanitearchitecture.png') no-repeat center;
  background-size: cover;
}

.btnarcanitearmor-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnarcanitearmor.png') no-repeat center;
  background-size: cover;
}

.btnarcanitemelee-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnarcanitemelee.png') no-repeat center;
  background-size: cover;
}

.btnarcaniteranged-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnarcaniteranged.png') no-repeat center;
  background-size: cover;
}

.btnarcher-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnarcher.png') no-repeat center;
  background-size: cover;
}

.btnarchimonde-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnarchimonde.png') no-repeat center;
  background-size: cover;
}

.btnarmoredogre-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnarmoredogre.png') no-repeat center;
  background-size: cover;
}

.btnarmorgolem-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnarmorgolem.png') no-repeat center;
  background-size: cover;
}

.btnarthas-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnarthas.png') no-repeat center;
  background-size: cover;
}

.btnassassin-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnassassin.png') no-repeat center;
  background-size: cover;
}

.btnattack-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnattack.png') no-repeat center;
  background-size: cover;
}

.btnattackground-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnattackground.png') no-repeat center;
  background-size: cover;
}

.btnauraofdarkness-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnauraofdarkness.png') no-repeat center;
  background-size: cover;
}

.btnavatar-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnavatar.png') no-repeat center;
  background-size: cover;
}

.btnavataroff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnavataroff.png') no-repeat center;
  background-size: cover;
}

.btnavengingassassin-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnavengingassassin.png') no-repeat center;
  background-size: cover;
}

.btnavengingwatcher-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnavengingwatcher.png') no-repeat center;
  background-size: cover;
}

.btnavengingwatcheroff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnavengingwatcheroff.png') no-repeat center;
  background-size: cover;
}

.btnazuredragon-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnazuredragon.png') no-repeat center;
  background-size: cover;
}

.btnbacktowork-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbacktowork.png') no-repeat center;
  background-size: cover;
}

.btnballista-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnballista.png') no-repeat center;
  background-size: cover;
}

.btnbandit-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbandit.png') no-repeat center;
  background-size: cover;
}

.btnbanditlord-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbanditlord.png') no-repeat center;
  background-size: cover;
}

.btnbanditmage-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbanditmage.png') no-repeat center;
  background-size: cover;
}

.btnbanditspearthrower-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbanditspearthrower.png') no-repeat center;
  background-size: cover;
}

.btnbanish-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbanish.png') no-repeat center;
  background-size: cover;
}

.btnbanshee-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbanshee.png') no-repeat center;
  background-size: cover;
}

.btnbansheeadept-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbansheeadept.png') no-repeat center;
  background-size: cover;
}

.btnbansheemaster-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbansheemaster.png') no-repeat center;
  background-size: cover;
}

.btnbansheeranger-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbansheeranger.png') no-repeat center;
  background-size: cover;
}

.btnbarracks-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbarracks.png') no-repeat center;
  background-size: cover;
}

.btnbarrel-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbarrel.png') no-repeat center;
  background-size: cover;
}

.btnbash-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbash.png') no-repeat center;
  background-size: cover;
}

.btnbasicstruct-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbasicstruct.png') no-repeat center;
  background-size: cover;
}

.btnbattleroar-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbattleroar.png') no-repeat center;
  background-size: cover;
}

.btnbattlestations-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbattlestations.png') no-repeat center;
  background-size: cover;
}

.btnbearblink-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbearblink.png') no-repeat center;
  background-size: cover;
}

.btnbearden-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbearden.png') no-repeat center;
  background-size: cover;
}

.btnbearform-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbearform.png') no-repeat center;
  background-size: cover;
}

.btnbeastiary-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbeastiary.png') no-repeat center;
  background-size: cover;
}

.btnbeastmaster-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbeastmaster.png') no-repeat center;
  background-size: cover;
}

.btnbelt-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbelt.png') no-repeat center;
  background-size: cover;
}

.btnberserk-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnberserk.png') no-repeat center;
  background-size: cover;
}

.btnberserkfortrolls-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnberserkfortrolls.png') no-repeat center;
  background-size: cover;
}

.btnbigbadvoodoospell-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbigbadvoodoospell.png') no-repeat center;
  background-size: cover;
}

.btnblackcitadel-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnblackcitadel.png') no-repeat center;
  background-size: cover;
}

.btnblackdragon-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnblackdragon.png') no-repeat center;
  background-size: cover;
}

.btnblackdragonroost-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnblackdragonroost.png') no-repeat center;
  background-size: cover;
}

.btnblackmammoth-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnblackmammoth.png') no-repeat center;
  background-size: cover;
}

.btnblackmarket-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnblackmarket.png') no-repeat center;
  background-size: cover;
}

.btnblacksmith-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnblacksmith.png') no-repeat center;
  background-size: cover;
}

.btnblink-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnblink.png') no-repeat center;
  background-size: cover;
}

.btnblizzard-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnblizzard.png') no-repeat center;
  background-size: cover;
}

.btnbloodelfpeasant-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbloodelfpeasant.png') no-repeat center;
  background-size: cover;
}

.btnbloodlust-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbloodlust.png') no-repeat center;
  background-size: cover;
}

.btnbloodlustoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbloodlustoff.png') no-repeat center;
  background-size: cover;
}

.btnbloodmage2-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbloodmage2.png') no-repeat center;
  background-size: cover;
}

.btnbluedemoness-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbluedemoness.png') no-repeat center;
  background-size: cover;
}

.btnbluedragonroost-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbluedragonroost.png') no-repeat center;
  background-size: cover;
}

.btnbluedragonspawn-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbluedragonspawn.png') no-repeat center;
  background-size: cover;
}

.btnbluemagnataur-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbluemagnataur.png') no-repeat center;
  background-size: cover;
}

.btnbonechimes-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbonechimes.png') no-repeat center;
  background-size: cover;
}

.btnboneyard-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnboneyard.png') no-repeat center;
  background-size: cover;
}

.btnbookofthedead-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbookofthedead.png') no-repeat center;
  background-size: cover;
}

.btnboots-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnboots.png') no-repeat center;
  background-size: cover;
}

.btnbootsofspeed-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbootsofspeed.png') no-repeat center;
  background-size: cover;
}

.btnbreathoffire-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbreathoffire.png') no-repeat center;
  background-size: cover;
}

.btnbreathoffrost-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbreathoffrost.png') no-repeat center;
  background-size: cover;
}

.btnbrilliance-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbrilliance.png') no-repeat center;
  background-size: cover;
}

.btnbronzedragon-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbronzedragon.png') no-repeat center;
  background-size: cover;
}

.btnbundleoflumber-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnbundleoflumber.png') no-repeat center;
  background-size: cover;
}

.btncalltoarms-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncalltoarms.png') no-repeat center;
  background-size: cover;
}

.btncancel-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncancel.png') no-repeat center;
  background-size: cover;
}

.btncannibalize-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncannibalize.png') no-repeat center;
  background-size: cover;
}

.btncannontower-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncannontower.png') no-repeat center;
  background-size: cover;
}

.btncarrionscarabslv3-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncarrionscarabs.png') no-repeat center;
  background-size: cover;
}

.btncarrionscarabsoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncarrionscarabsoff.png') no-repeat center;
  background-size: cover;
}

.btncarrionswarm-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncarrionswarm.png') no-repeat center;
  background-size: cover;
}

.btncastle-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncastle.png') no-repeat center;
  background-size: cover;
}

.btncatapult-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncatapult.png') no-repeat center;
  background-size: cover;
}

.btncentaur-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncentaur.png') no-repeat center;
  background-size: cover;
}

.btncentaurarcher-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncentaurarcher.png') no-repeat center;
  background-size: cover;
}

.btncentaurkhan-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncentaurkhan.png') no-repeat center;
  background-size: cover;
}

.btnchainlightning-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnchainlightning.png') no-repeat center;
  background-size: cover;
}

.btnchaosblademaster-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnchaosblademaster.png') no-repeat center;
  background-size: cover;
}

.btnchaosgrom-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnchaosgrom.png') no-repeat center;
  background-size: cover;
}

.btnchaosgrunt-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnchaosgrunt.png') no-repeat center;
  background-size: cover;
}

.btnchaoskodobeast-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnchaoskodobeast.png') no-repeat center;
  background-size: cover;
}

.btnchaospeon-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnchaospeon.png') no-repeat center;
  background-size: cover;
}

.btnchaoswarlock-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnchaoswarlock.png') no-repeat center;
  background-size: cover;
}

.btnchaoswarlockgreen-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnchaoswarlockgreen.png') no-repeat center;
  background-size: cover;
}

.btnchaoswarlord-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnchaoswarlord.png') no-repeat center;
  background-size: cover;
}

.btnchaoswolfrider-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnchaoswolfrider.png') no-repeat center;
  background-size: cover;
}

.btncharm-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncharm.png') no-repeat center;
  background-size: cover;
}

.btnchemicalrage-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnchemicalrage.png') no-repeat center;
  background-size: cover;
}

.btnchestofgold-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnchestofgold.png') no-repeat center;
  background-size: cover;
}

.btnchimaera-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnchimaera.png') no-repeat center;
  background-size: cover;
}

.btnchimaeraroost-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnchimaeraroost.png') no-repeat center;
  background-size: cover;
}

.btnchime-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnchime.png') no-repeat center;
  background-size: cover;
}

.btncirclet-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncirclet.png') no-repeat center;
  background-size: cover;
}

.btnclawsofattack-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnclawsofattack.png') no-repeat center;
  background-size: cover;
}

.btnclayfigurine-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnclayfigurine.png') no-repeat center;
  background-size: cover;
}

.btncleavingattack-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncleavingattack.png') no-repeat center;
  background-size: cover;
}

.btncloak-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncloak.png') no-repeat center;
  background-size: cover;
}

.btncloakofflames-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncloakofflames.png') no-repeat center;
  background-size: cover;
}

.btnclockwerkgoblin-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnclockwerkgoblin.png') no-repeat center;
  background-size: cover;
}

.btncloudoffog-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncloudoffog.png') no-repeat center;
  background-size: cover;
}

.btnclusterrockets-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnclusterrockets.png') no-repeat center;
  background-size: cover;
}

.btncoldarrows-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncoldarrows.png') no-repeat center;
  background-size: cover;
}

.btncoldarrowsoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncoldarrowsoff.png') no-repeat center;
  background-size: cover;
}

.btncoldtower-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncoldtower.png') no-repeat center;
  background-size: cover;
}

.btncommand-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncommand.png') no-repeat center;
  background-size: cover;
}

.btncontrolmagic-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncontrolmagic.png') no-repeat center;
  background-size: cover;
}

.btncoralbed-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncoralbed.png') no-repeat center;
  background-size: cover;
}

.btncorpseexplode-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncorpseexplode.png') no-repeat center;
  background-size: cover;
}

.btncorrosivebreath-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncorrosivebreath.png') no-repeat center;
  background-size: cover;
}

.btncorruptedancientofwar-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncorruptedancientofwar.png') no-repeat center;
  background-size: cover;
}

.btncorruptedancientprotector-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncorruptedancientprotector.png') no-repeat center;
  background-size: cover;
}

.btncorruptedent-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncorruptedent.png') no-repeat center;
  background-size: cover;
}

.btncorruptedmoonwell-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncorruptedmoonwell.png') no-repeat center;
  background-size: cover;
}

.btncorruptedtreeoflife-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncorruptedtreeoflife.png') no-repeat center;
  background-size: cover;
}

.btncreatureattack-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncreatureattack.png') no-repeat center;
  background-size: cover;
}

.btncreaturecarapace-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncreaturecarapace.png') no-repeat center;
  background-size: cover;
}

.btncripple-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncripple.png') no-repeat center;
  background-size: cover;
}

.btncriticalstrike-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncriticalstrike.png') no-repeat center;
  background-size: cover;
}

.btncrushingwave-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncrushingwave.png') no-repeat center;
  background-size: cover;
}

.btncrypt-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncrypt.png') no-repeat center;
  background-size: cover;
}

.btncryptfiend-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncryptfiend.png') no-repeat center;
  background-size: cover;
}

.btncryptfiendburrow-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncryptfiendburrow.png') no-repeat center;
  background-size: cover;
}

.btncryptfiendunburrow-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncryptfiendunburrow.png') no-repeat center;
  background-size: cover;
}

.btncrystalball-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncrystalball.png') no-repeat center;
  background-size: cover;
}

.btncurse-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncurse.png') no-repeat center;
  background-size: cover;
}

.btncurseoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncurseoff.png') no-repeat center;
  background-size: cover;
}

.btncyclone-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btncyclone.png') no-repeat center;
  background-size: cover;
}

.btndaggerofescape-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndaggerofescape.png') no-repeat center;
  background-size: cover;
}

.btndalaranguardtower-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndalaranguardtower.png') no-repeat center;
  background-size: cover;
}

.btndalaranmutant-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndalaranmutant.png') no-repeat center;
  background-size: cover;
}

.btndalaranreject-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndalaranreject.png') no-repeat center;
  background-size: cover;
}

.btndarkritual-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndarkritual.png') no-repeat center;
  background-size: cover;
}

.btndarksummoning-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndarksummoning.png') no-repeat center;
  background-size: cover;
}

.btndarktroll-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndarktroll.png') no-repeat center;
  background-size: cover;
}

.btndarktrollshadowpriest-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndarktrollshadowpriest.png') no-repeat center;
  background-size: cover;
}

.btndarktrolltrapper-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndarktrolltrapper.png') no-repeat center;
  background-size: cover;
}

.btndeathanddecay-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndeathanddecay.png') no-repeat center;
  background-size: cover;
}

.btndeathcoil-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndeathcoil.png') no-repeat center;
  background-size: cover;
}

.btndeathpact-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndeathpact.png') no-repeat center;
  background-size: cover;
}

.btndeathtower-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndeathtower.png') no-repeat center;
  background-size: cover;
}

.btndeeplordrevenant-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndeeplordrevenant.png') no-repeat center;
  background-size: cover;
}

.btndefend-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndefend.png') no-repeat center;
  background-size: cover;
}

.btndefendstop-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndefendstop.png') no-repeat center;
  background-size: cover;
}

.btndemolish-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndemolish.png') no-repeat center;
  background-size: cover;
}

.btndemolisher-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndemolisher.png') no-repeat center;
  background-size: cover;
}

.btndemoness-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndemoness.png') no-repeat center;
  background-size: cover;
}

.btndenofwonders-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndenofwonders.png') no-repeat center;
  background-size: cover;
}

.btndestroyer-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndestroyer.png') no-repeat center;
  background-size: cover;
}

.btndevotion-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndevotion.png') no-repeat center;
  background-size: cover;
}

.btndevour-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndevour.png') no-repeat center;
  background-size: cover;
}

.btndevourmagic-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndevourmagic.png') no-repeat center;
  background-size: cover;
}

.btndirewolf-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndirewolf.png') no-repeat center;
  background-size: cover;
}

.btndisenchant-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndisenchant.png') no-repeat center;
  background-size: cover;
}

.btndispelmagic-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndispelmagic.png') no-repeat center;
  background-size: cover;
}

.btndivineintervention-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndivineintervention.png') no-repeat center;
  background-size: cover;
}

.btndivineshieldoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndivineshieldoff.png') no-repeat center;
  background-size: cover;
}

.btndizzy-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndizzy.png') no-repeat center;
  background-size: cover;
}

.btndocadepttraining-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndocadepttraining.png') no-repeat center;
  background-size: cover;
}

.btndocmastertraining-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndocmastertraining.png') no-repeat center;
  background-size: cover;
}

.btndoom-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndoom.png') no-repeat center;
  background-size: cover;
}

.btndoomguard-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndoomguard.png') no-repeat center;
  background-size: cover;
}

.btndotadepttraining-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndotadepttraining.png') no-repeat center;
  background-size: cover;
}

.btndotmastertraining-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndotmastertraining.png') no-repeat center;
  background-size: cover;
}

.btndragonhawkrider-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndragonhawk.png') no-repeat center;
  background-size: cover;
}

.btndragonroost-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndragonroost.png') no-repeat center;
  background-size: cover;
}

.btndrain-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndrain.png') no-repeat center;
  background-size: cover;
}

.btndranai-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndranai.png') no-repeat center;
  background-size: cover;
}

.btndranaiakama-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndranaiakama.png') no-repeat center;
  background-size: cover;
}

.btndranaichiefhut-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndranaichiefhut.png') no-repeat center;
  background-size: cover;
}

.btndranaihut-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndranaihut.png') no-repeat center;
  background-size: cover;
}

.btndranaimage-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndranaimage.png') no-repeat center;
  background-size: cover;
}

.btndruidoftheclaw-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndruidoftheclaw.png') no-repeat center;
  background-size: cover;
}

.btndruidofthetalon-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndruidofthetalon.png') no-repeat center;
  background-size: cover;
}

.btndrum-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndrum.png') no-repeat center;
  background-size: cover;
}

.btndrunkendodge-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndrunkendodge.png') no-repeat center;
  background-size: cover;
}

.btndryad-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndryad.png') no-repeat center;
  background-size: cover;
}

.btndryaddispelmagic-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndryaddispelmagic.png') no-repeat center;
  background-size: cover;
}

.btndryaddispelmagicoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndryaddispelmagicoff.png') no-repeat center;
  background-size: cover;
}

.btndustofappearance-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndustofappearance.png') no-repeat center;
  background-size: cover;
}

.btndwarvenlongrifle-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btndwarvenlongrifle.png') no-repeat center;
  background-size: cover;
}

.btnearthbrewmaster-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnearthbrewmaster.png') no-repeat center;
  background-size: cover;
}

.btnearthquake-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnearthquake.png') no-repeat center;
  background-size: cover;
}

.btneattree-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btneattree.png') no-repeat center;
  background-size: cover;
}

.btnelfvillager-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnelfvillager.png') no-repeat center;
  background-size: cover;
}

.btnelunesblessing-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnelunesblessing.png') no-repeat center;
  background-size: cover;
}

.btnelvenfarm-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnelvenfarm.png') no-repeat center;
  background-size: cover;
}

.btnelvenguardtower-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnelvenguardtower.png') no-repeat center;
  background-size: cover;
}

.btnenchantedbears-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnenchantedbears.png') no-repeat center;
  background-size: cover;
}

.btnenchantedcrows-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnenchantedcrows.png') no-repeat center;
  background-size: cover;
}

.btnenergytower-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnenergytower.png') no-repeat center;
  background-size: cover;
}

.btnengineeringupgrade-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnengineeringupgrade.png') no-repeat center;
  background-size: cover;
}

.btnensnare-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnensnare.png') no-repeat center;
  background-size: cover;
}

.btnent-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnent.png') no-repeat center;
  background-size: cover;
}

.btnentanglemine-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnentanglemine.png') no-repeat center;
  background-size: cover;
}

.btnentanglingroots-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnentanglingroots.png') no-repeat center;
  background-size: cover;
}

.btnenvenomedspear-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnenvenomedspear.png') no-repeat center;
  background-size: cover;
}

.btneredarred-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btneredarred.png') no-repeat center;
  background-size: cover;
}

.btneredarwarlockpurple-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btneredarwarlockpurple.png') no-repeat center;
  background-size: cover;
}

.btnetherealformon-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnetherealformon.png') no-repeat center;
  background-size: cover;
}

.btnevasion-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnevasion.png') no-repeat center;
  background-size: cover;
}

.btnevilillidan-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnevilillidan.png') no-repeat center;
  background-size: cover;
}

.btnexhumecorpses-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnexhumecorpses.png') no-repeat center;
  background-size: cover;
}

.btnfacelessone-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfacelessone.png') no-repeat center;
  background-size: cover;
}

.btnfaeriedragon-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfaeriedragon.png') no-repeat center;
  background-size: cover;
}

.btnfaeriefire-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfaeriefire.png') no-repeat center;
  background-size: cover;
}

.btnfaeriefireoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfaeriefireoff.png') no-repeat center;
  background-size: cover;
}

.btnfanofknives-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfanofknives.png') no-repeat center;
  background-size: cover;
}

.btnfarm-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfarm.png') no-repeat center;
  background-size: cover;
}

.btnfarsight-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfarsight.png') no-repeat center;
  background-size: cover;
}

.btnfeedback-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfeedback.png') no-repeat center;
  background-size: cover;
}

.btnfelboar-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfelboar.png') no-repeat center;
  background-size: cover;
}

.btnfelguard-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfelguard.png') no-repeat center;
  background-size: cover;
}

.btnfelguardblue-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfelguardblue.png') no-repeat center;
  background-size: cover;
}

.btnfelhound-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfelhound.png') no-repeat center;
  background-size: cover;
}

.btnfire-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfire.png') no-repeat center;
  background-size: cover;
}

.btnfirebolt-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfirebolt.png') no-repeat center;
  background-size: cover;
}

.btnfirebrewmaster-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfirebrewmaster.png') no-repeat center;
  background-size: cover;
}

.btnfirerocks-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfirerocks.png') no-repeat center;
  background-size: cover;
}

.btnflakcannons-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnflakcannons.png') no-repeat center;
  background-size: cover;
}

.btnflametower-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnflametower.png') no-repeat center;
  background-size: cover;
}

.btnflamingarrows-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnflamingarrows.png') no-repeat center;
  background-size: cover;
}

.btnflare-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnflare.png') no-repeat center;
  background-size: cover;
}

.btnfleshgolem-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfleshgolem.png') no-repeat center;
  background-size: cover;
}

.btnflyingmachine-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnflyingmachine.png') no-repeat center;
  background-size: cover;
}

.btnfootman-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfootman.png') no-repeat center;
  background-size: cover;
}

.btnforesttroll-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnforesttroll.png') no-repeat center;
  background-size: cover;
}

.btnforesttrollshadowpriest-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnforesttrollshadowpriest.png') no-repeat center;
  background-size: cover;
}

.btnforesttrolltrapper-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnforesttrolltrapper.png') no-repeat center;
  background-size: cover;
}

.btnforge-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnforge.png') no-repeat center;
  background-size: cover;
}

.btnfortress-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfortress.png') no-repeat center;
  background-size: cover;
}

.btnfragmentationbombs-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfragmentationbombs.png') no-repeat center;
  background-size: cover;
}

.btnfreezingbreath-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfreezingbreath.png') no-repeat center;
  background-size: cover;
}

.btnfrost-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfrost.png') no-repeat center;
  background-size: cover;
}

.btnfrostarmor-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfrostarmor.png') no-repeat center;
  background-size: cover;
}

.btnfrostarmoroff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfrostarmoroff.png') no-repeat center;
  background-size: cover;
}

.btnfrostbear-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfrostbear.png') no-repeat center;
  background-size: cover;
}

.btnfrostbolt-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfrostbolt.png') no-repeat center;
  background-size: cover;
}

.btnfrosttower-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfrosttower.png') no-repeat center;
  background-size: cover;
}

.btnfrostwyrm-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfrostwyrm.png') no-repeat center;
  background-size: cover;
}

.btnfurbolg-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfurbolg.png') no-repeat center;
  background-size: cover;
}

.btnfurbolgelder-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfurbolgelder.png') no-repeat center;
  background-size: cover;
}

.btnfurbolgpanda-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfurbolgpanda.png') no-repeat center;
  background-size: cover;
}

.btnfurbolgshaman-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfurbolgshaman.png') no-repeat center;
  background-size: cover;
}

.btnfurbolgtracker-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfurbolgtracker.png') no-repeat center;
  background-size: cover;
}

.btnfurion-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnfurion.png') no-repeat center;
  background-size: cover;
}

.btngargoyle-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngargoyle.png') no-repeat center;
  background-size: cover;
}

.btngarithos-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngarithos.png') no-repeat center;
  background-size: cover;
}

.btngathergold-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngathergold.png') no-repeat center;
  background-size: cover;
}

.btngauntletsofogrepower-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngauntletsofogrepower.png') no-repeat center;
  background-size: cover;
}

.btngem-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngem.png') no-repeat center;
  background-size: cover;
}

.btngenericspellimmunity-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngenericspellimmunity.png') no-repeat center;
  background-size: cover;
}

.btnghost-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnghost.png') no-repeat center;
  background-size: cover;
}

.btnghoul-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnghoul.png') no-repeat center;
  background-size: cover;
}

.btnghoulfrenzy-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnghoulfrenzy.png') no-repeat center;
  background-size: cover;
}

.btnglacier-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnglacier.png') no-repeat center;
  background-size: cover;
}

.btnglaivethrower-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnglaivethrower.png') no-repeat center;
  background-size: cover;
}

.btnglove-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnglove.png') no-repeat center;
  background-size: cover;
}

.btngnoll-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngnoll.png') no-repeat center;
  background-size: cover;
}

.btngnollarcher-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngnollarcher.png') no-repeat center;
  background-size: cover;
}

.btngnollcommandaura-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngnollcommandaura.png') no-repeat center;
  background-size: cover;
}

.btngnollking-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngnollking.png') no-repeat center;
  background-size: cover;
}

.btngnollwarden-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngnollwarden.png') no-repeat center;
  background-size: cover;
}

.btngoblinsapper-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngoblinsapper.png') no-repeat center;
  background-size: cover;
}

.btngoblinshipyard-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngoblinshipyard.png') no-repeat center;
  background-size: cover;
}

.btngoblinzeppelin-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngoblinzeppelin.png') no-repeat center;
  background-size: cover;
}

.btngoldmine-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngoldmine.png') no-repeat center;
  background-size: cover;
}

.btngolemstormbolt-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngolemstormbolt.png') no-repeat center;
  background-size: cover;
}

.btngolemthunderclap-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngolemthunderclap.png') no-repeat center;
  background-size: cover;
}

.btngrabtree-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngrabtree.png') no-repeat center;
  background-size: cover;
}

.btngraveyard-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngraveyard.png') no-repeat center;
  background-size: cover;
}

.btngreaterinvisibility-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngreaterinvisibility.png') no-repeat center;
  background-size: cover;
}

.btngreaterinvulneralbility-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngreaterinvulneralbility.png') no-repeat center;
  background-size: cover;
}

.btngreaterrejuvpotion-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngreaterrejuvpotion.png') no-repeat center;
  background-size: cover;
}

.btngreaterrejuvscroll-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngreaterrejuvscroll.png') no-repeat center;
  background-size: cover;
}

.btngreathall-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngreathall.png') no-repeat center;
  background-size: cover;
}

.btngreendragon-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngreendragon.png') no-repeat center;
  background-size: cover;
}

.btngreendragonroost-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngreendragonroost.png') no-repeat center;
  background-size: cover;
}

.btngreendragonspawn-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngreendragonspawn.png') no-repeat center;
  background-size: cover;
}

.btngreenhydra-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngreenhydra.png') no-repeat center;
  background-size: cover;
}

.btngrimward-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngrimward.png') no-repeat center;
  background-size: cover;
}

.btnspiritbear-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnspiritbear.png') no-repeat center;
  background-size: cover;
}

.btngrunt-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngrunt.png') no-repeat center;
  background-size: cover;
}

.btngryphonaviary-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngryphonaviary.png') no-repeat center;
  background-size: cover;
}

.btngryphonrider-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btngryphonrider.png') no-repeat center;
  background-size: cover;
}

.btnguardtower-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnguardtower.png') no-repeat center;
  background-size: cover;
}

.btnguldan-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnguldan.png') no-repeat center;
  background-size: cover;
}

.btnguldanskull-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnguldanskull.png') no-repeat center;
  background-size: cover;
}

.btnhallofthedead-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhallofthedead.png') no-repeat center;
  background-size: cover;
}

.btnhammer-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhammer.png') no-repeat center;
  background-size: cover;
}

.btnhardenedskin-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhardenedskin.png') no-repeat center;
  background-size: cover;
}

.btnharpy-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnharpy.png') no-repeat center;
  background-size: cover;
}

.btnharpyqueen-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnharpyqueen.png') no-repeat center;
  background-size: cover;
}

.btnharpywitch-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnharpywitch.png') no-repeat center;
  background-size: cover;
}

.btnhauntedmine-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhauntedmine.png') no-repeat center;
  background-size: cover;
}

.btnheadhunter-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnheadhunter.png') no-repeat center;
  background-size: cover;
}

.btnheadhunterberserker-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnheadhunterberserker.png') no-repeat center;
  background-size: cover;
}

.btnheal-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnheal.png') no-repeat center;
  background-size: cover;
}

.btnhealingsalve-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhealingsalve.png') no-repeat center;
  background-size: cover;
}

.btnhealingspray-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhealingspray.png') no-repeat center;
  background-size: cover;
}

.btnhealingward-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhealingward.png') no-repeat center;
  background-size: cover;
}

.btnhealingwave-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhealingwave.png') no-repeat center;
  background-size: cover;
}

.btnhealoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhealoff.png') no-repeat center;
  background-size: cover;
}

.btnhealthstone-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhealthstone.png') no-repeat center;
  background-size: cover;
}

.btnheartofaszune-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnheartofaszune.png') no-repeat center;
  background-size: cover;
}

.btnheartofsearinox-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnheartofsearinox.png') no-repeat center;
  background-size: cover;
}

.btnhellscream-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhellscream.png') no-repeat center;
  background-size: cover;
}

.btnhelmofvalor-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhelmofvalor.png') no-repeat center;
  background-size: cover;
}

.btnhelmutpurple-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhelmutpurple.png') no-repeat center;
  background-size: cover;
}

.btnheroalchemist-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnheroalchemist.png') no-repeat center;
  background-size: cover;
}

.btnheroarchmage-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnheroarchmage.png') no-repeat center;
  background-size: cover;
}

.btnheroavatarofflame-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnheroavatarofflame.png') no-repeat center;
  background-size: cover;
}

.btnheroblademaster-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnheroblademaster.png') no-repeat center;
  background-size: cover;
}

.btnherobloodelfprince-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnherobloodelfprince.png') no-repeat center;
  background-size: cover;
}

.btnherocryptlord-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnherocryptlord.png') no-repeat center;
  background-size: cover;
}

.btnherodeathknight-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnherodeathknight.png') no-repeat center;
  background-size: cover;
}

.btnherodemonhunter-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnherodemonhunter.png') no-repeat center;
  background-size: cover;
}

.btnherodreadlord-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnherodreadlord.png') no-repeat center;
  background-size: cover;
}

.btnherofarseer-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnherofarseer.png') no-repeat center;
  background-size: cover;
}

.btnherolich-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnherolich.png') no-repeat center;
  background-size: cover;
}

.btnheromountainking-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnheromountainking.png') no-repeat center;
  background-size: cover;
}

.btnheropaladin-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnheropaladin.png') no-repeat center;
  background-size: cover;
}

.btnherotaurenchieftain-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnherotaurenchieftain.png') no-repeat center;
  background-size: cover;
}

.btnherotinker-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnherotinker.png') no-repeat center;
  background-size: cover;
}

.btnherowarden-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnherowarden.png') no-repeat center;
  background-size: cover;
}

.btnhex-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhex.png') no-repeat center;
  background-size: cover;
}

.btnhighelvenarcher-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhighelvenarcher.png') no-repeat center;
  background-size: cover;
}

.btnhippogriff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhippogriff.png') no-repeat center;
  background-size: cover;
}

.btnhippogriffrider-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhippogriffrider.png') no-repeat center;
  background-size: cover;
}

.btnholdposition-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnholdposition.png') no-repeat center;
  background-size: cover;
}

.btnholybolt-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnholybolt.png') no-repeat center;
  background-size: cover;
}

.btnholywater-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnholywater.png') no-repeat center;
  background-size: cover;
}

.btnhoodofcunning-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhoodofcunning.png') no-repeat center;
  background-size: cover;
}

.btnhornofcenarius-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhornofcenarius.png') no-repeat center;
  background-size: cover;
}

.btnhornofdoom-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhornofdoom.png') no-repeat center;
  background-size: cover;
}

.btnhornoffog-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhornoffog.png') no-repeat center;
  background-size: cover;
}

.btnhowlofterror-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhowlofterror.png') no-repeat center;
  background-size: cover;
}

.btnhumanarcanetower-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhumanarcanetower.png') no-repeat center;
  background-size: cover;
}

.btnhumanarmorupone-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhumanarmorupone.png') no-repeat center;
  background-size: cover;
}

.btnhumanarmorupthree-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhumanarmorupthree.png') no-repeat center;
  background-size: cover;
}

.btnhumanarmoruptwo-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhumanarmoruptwo.png') no-repeat center;
  background-size: cover;
}

.btnhumanartilleryupone-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhumanartilleryupone.png') no-repeat center;
  background-size: cover;
}

.btnhumanbarracks-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhumanbarracks.png') no-repeat center;
  background-size: cover;
}

.btnhumanbattleship-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhumanbattleship.png') no-repeat center;
  background-size: cover;
}

.btnhumanbuild-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhumanbuild.png') no-repeat center;
  background-size: cover;
}

.btnhumandestroyer-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhumandestroyer.png') no-repeat center;
  background-size: cover;
}

.btnhumanlumbermill-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhumanlumbermill.png') no-repeat center;
  background-size: cover;
}

.btnhumanlumberupgrade1-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhumanlumberupgrade1.png') no-repeat center;
  background-size: cover;
}

.btnhumanlumberupgrade2-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhumanlumberupgrade2.png') no-repeat center;
  background-size: cover;
}

.btnhumanmissileupone-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhumanmissileupone.png') no-repeat center;
  background-size: cover;
}

.btnhumanmissileupthree-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhumanmissileupthree.png') no-repeat center;
  background-size: cover;
}

.btnhumanmissileuptwo-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhumanmissileuptwo.png') no-repeat center;
  background-size: cover;
}

.btnhumanshipyard-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhumanshipyard.png') no-repeat center;
  background-size: cover;
}

.btnhumantransport-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhumantransport.png') no-repeat center;
  background-size: cover;
}

.btnhumanwatchtower-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhumanwatchtower.png') no-repeat center;
  background-size: cover;
}

.btnhuntershall-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhuntershall.png') no-repeat center;
  background-size: cover;
}

.btnhuntress-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhuntress.png') no-repeat center;
  background-size: cover;
}

.btnhydra-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhydra.png') no-repeat center;
  background-size: cover;
}

.btnhydralisk-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhydralisk.png') no-repeat center;
  background-size: cover;
}

.btnhydrawarstomp-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnhydrawarstomp.png') no-repeat center;
  background-size: cover;
}

.btnicetroll-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnicetroll.png') no-repeat center;
  background-size: cover;
}

.btnicetrollberserker-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnicetrollberserker.png') no-repeat center;
  background-size: cover;
}

.btnicetrollshadowpriest-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnicetrollshadowpriest.png') no-repeat center;
  background-size: cover;
}

.btnicetrollshaman-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnicetrollshaman.png') no-repeat center;
  background-size: cover;
}

.btnimbuedmasonry-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnimbuedmasonry.png') no-repeat center;
  background-size: cover;
}

.btnimmolationoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnimmolationoff.png') no-repeat center;
  background-size: cover;
}

.btnimmolationon-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnimmolationon.png') no-repeat center;
  background-size: cover;
}

.btnimpale-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnimpale.png') no-repeat center;
  background-size: cover;
}

.btnimpalingbolt-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnimpalingbolt.png') no-repeat center;
  background-size: cover;
}

.btnimprovedbows-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnimprovedbows.png') no-repeat center;
  background-size: cover;
}

.btnimprovedcreatureattack-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnimprovedcreatureattack.png') no-repeat center;
  background-size: cover;
}

.btnimprovedcreaturecarapace-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnimprovedcreaturecarapace.png') no-repeat center;
  background-size: cover;
}

.btnimprovedmoonarmor-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnimprovedmoonarmor.png') no-repeat center;
  background-size: cover;
}

.btnimprovedreinforcedhides-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnimprovedreinforcedhides.png') no-repeat center;
  background-size: cover;
}

.btnimprovedspikedbarricades-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnimprovedspikedbarricades.png') no-repeat center;
  background-size: cover;
}

.btnimprovedstrengthofthemoon-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnimprovedstrengthofthemoon.png') no-repeat center;
  background-size: cover;
}

.btnimprovedstrengthofthewild-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnimprovedstrengthofthewild.png') no-repeat center;
  background-size: cover;
}

.btnimprovedunholyarmor-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnimprovedunholyarmor.png') no-repeat center;
  background-size: cover;
}

.btnimprovedunholystrength-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnimprovedunholystrength.png') no-repeat center;
  background-size: cover;
}

.btnincinerate-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnincinerate.png') no-repeat center;
  background-size: cover;
}

.btnincinerateoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnincinerateoff.png') no-repeat center;
  background-size: cover;
}

.btninfernal-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btninfernal.png') no-repeat center;
  background-size: cover;
}

.btninfernalcannon-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btninfernalcannon.png') no-repeat center;
  background-size: cover;
}

.btninfernalflamecannon-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btninfernalflamecannon.png') no-repeat center;
  background-size: cover;
}

.btninfernalstone-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btninfernalstone.png') no-repeat center;
  background-size: cover;
}

.btninnerfire-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btninnerfire.png') no-repeat center;
  background-size: cover;
}

.btninnerfireoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btninnerfireoff.png') no-repeat center;
  background-size: cover;
}

.btninvisibility-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btninvisibility.png') no-repeat center;
  background-size: cover;
}

.btninvulnerable-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btninvulnerable.png') no-repeat center;
  background-size: cover;
}

.btnjaina-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnjaina.png') no-repeat center;
  background-size: cover;
}

.btnjanggo-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnjanggo.png') no-repeat center;
  background-size: cover;
}

.btnjuggernaut-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnjuggernaut.png') no-repeat center;
  background-size: cover;
}

.btnjunglebeast-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnjunglebeast.png') no-repeat center;
  background-size: cover;
}

.btnjunkgolem-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnjunkgolem.png') no-repeat center;
  background-size: cover;
}

.btnkeep-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnkeep.png') no-repeat center;
  background-size: cover;
}

.btnkeeperofthegrove-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnkeeperofthegrove.png') no-repeat center;
  background-size: cover;
}

.btnkelthuzad-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnkelthuzad.png') no-repeat center;
  background-size: cover;
}

.btnknight-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnknight.png') no-repeat center;
  background-size: cover;
}

.btnkobold-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnkobold.png') no-repeat center;
  background-size: cover;
}

.btnkoboldgeomancer-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnkoboldgeomancer.png') no-repeat center;
  background-size: cover;
}

.btnkodobeast-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnkodobeast.png') no-repeat center;
  background-size: cover;
}

.btnlavaspawn-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnlavaspawn.png') no-repeat center;
  background-size: cover;
}

.btnleatherupgradeone-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnleatherupgradeone.png') no-repeat center;
  background-size: cover;
}

.btnleatherupgradethree-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnleatherupgradethree.png') no-repeat center;
  background-size: cover;
}

.btnleatherupgradetwo-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnleatherupgradetwo.png') no-repeat center;
  background-size: cover;
}

.btnlesserclaritypotion-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnlesserclaritypotion.png') no-repeat center;
  background-size: cover;
}

.btnlesserinvisibility-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnlesserinvisibility.png') no-repeat center;
  background-size: cover;
}

.btnlesserinvulneralbility-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnlesserinvulneralbility.png') no-repeat center;
  background-size: cover;
}

.btnlesserrejuvpotion-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnlesserrejuvpotion.png') no-repeat center;
  background-size: cover;
}

.btnlesserrejuvscroll-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnlesserrejuvscroll.png') no-repeat center;
  background-size: cover;
}

.btnlichversion2-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnlichversion2.png') no-repeat center;
  background-size: cover;
}

.btnlifedrain-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnlifedrain.png') no-repeat center;
  background-size: cover;
}

.btnlightningshield-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnlightningshield.png') no-repeat center;
  background-size: cover;
}

.btnlionhorn-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnlionhorn.png') no-repeat center;
  background-size: cover;
}

.btnliquidfire-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnliquidfire.png') no-repeat center;
  background-size: cover;
}

.btnload-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnload.png') no-repeat center;
  background-size: cover;
}

.btnloaddwarf-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnloaddwarf.png') no-repeat center;
  background-size: cover;
}

.btnloadpeon-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnloadpeon.png') no-repeat center;
  background-size: cover;
}

.btnlobstrokkblue-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnlobstrokkblue.png') no-repeat center;
  background-size: cover;
}

.btnlobstrokkgreen-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnlobstrokkgreen.png') no-repeat center;
  background-size: cover;
}

.btnlobstrokkred-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnlobstrokkred.png') no-repeat center;
  background-size: cover;
}

.btnlocustswarm-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnlocustswarm.png') no-repeat center;
  background-size: cover;
}

.btnmagetower-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmagetower.png') no-repeat center;
  background-size: cover;
}

.btnmagicalsentry-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmagicalsentry.png') no-repeat center;
  background-size: cover;
}

.btnmagicimmunity-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmagicimmunity.png') no-repeat center;
  background-size: cover;
}

.btnmagiclariet-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmagiclariet.png') no-repeat center;
  background-size: cover;
}

.btnmagnataur-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmagnataur.png') no-repeat center;
  background-size: cover;
}

.btnmagnataurbrown-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmagnataurbrown.png') no-repeat center;
  background-size: cover;
}

.btnmammoth-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmammoth.png') no-repeat center;
  background-size: cover;
}

.btnmanaburn-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmanaburn.png') no-repeat center;
  background-size: cover;
}

.btnmanadrain-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmanadrain.png') no-repeat center;
  background-size: cover;
}

.btnmanaflare-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmanaflare.png') no-repeat center;
  background-size: cover;
}

.btnmanaflareoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmanaflareoff.png') no-repeat center;
  background-size: cover;
}

.btnmanarecharge-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmanarecharge.png') no-repeat center;
  background-size: cover;
}

.btnmanarechargeoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmanarechargeoff.png') no-repeat center;
  background-size: cover;
}

.btnmanashield-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmanashield.png') no-repeat center;
  background-size: cover;
}

.btnmanastone-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmanastone.png') no-repeat center;
  background-size: cover;
}

.btnmannoroth-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmannoroth.png') no-repeat center;
  background-size: cover;
}

.btnmantleofintelligence-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmantleofintelligence.png') no-repeat center;
  background-size: cover;
}

.btnmanual-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmanual.png') no-repeat center;
  background-size: cover;
}

.btnmanual2-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmanual2.png') no-repeat center;
  background-size: cover;
}

.btnmanual3-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmanual3.png') no-repeat center;
  background-size: cover;
}

.btnmarketplace-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmarketplace.png') no-repeat center;
  background-size: cover;
}

.btnmarkoffire-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmarkoffire.png') no-repeat center;
  background-size: cover;
}

.btnmarksmanship-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmarksmanship.png') no-repeat center;
  background-size: cover;
}

.btnmaskofdeath-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmaskofdeath.png') no-repeat center;
  background-size: cover;
}

.btnmassteleport-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmassteleport.png') no-repeat center;
  background-size: cover;
}

.btnmeatapult-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmeatapult.png') no-repeat center;
  background-size: cover;
}

.btnmeatwagon-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmeatwagon.png') no-repeat center;
  background-size: cover;
}

.btnmechanicalcritter-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmechanicalcritter.png') no-repeat center;
  background-size: cover;
}

.btnmedalionofcourage-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmedalionofcourage.png') no-repeat center;
  background-size: cover;
}

.btnmedivh-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmedivh.png') no-repeat center;
  background-size: cover;
}

.btnmercenarycamp-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmercenarycamp.png') no-repeat center;
  background-size: cover;
}

.btnmerchant-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmerchant.png') no-repeat center;
  background-size: cover;
}

.btnmetamorphosis-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmetamorphosis.png') no-repeat center;
  background-size: cover;
}

.btnmilitia-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmilitia.png') no-repeat center;
  background-size: cover;
}

.btnminorrejuvpotion-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnminorrejuvpotion.png') no-repeat center;
  background-size: cover;
}

.btnmirrorimage-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmirrorimage.png') no-repeat center;
  background-size: cover;
}

.btnmonsoon-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmonsoon.png') no-repeat center;
  background-size: cover;
}

.btnmonsterlure-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmonsterlure.png') no-repeat center;
  background-size: cover;
}

.btnmoonarmor-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmoonarmor.png') no-repeat center;
  background-size: cover;
}

.btnmoonstone-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmoonstone.png') no-repeat center;
  background-size: cover;
}

.btnmoonwell-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmoonwell.png') no-repeat center;
  background-size: cover;
}

.btnmortarteam-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmortarteam.png') no-repeat center;
  background-size: cover;
}

.btnmountaingiant-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmountaingiant.png') no-repeat center;
  background-size: cover;
}

.btnmove-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmove.png') no-repeat center;
  background-size: cover;
}

.btnmurgalslave-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmurgalslave.png') no-repeat center;
  background-size: cover;
}

.btnmurgulbloodgill-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmurgulbloodgill.png') no-repeat center;
  background-size: cover;
}

.btnmurgulshadowcaster-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmurgulshadowcaster.png') no-repeat center;
  background-size: cover;
}

.btnmurgultidewarrior-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmurgultidewarrior.png') no-repeat center;
  background-size: cover;
}

.btnmurloc-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmurloc.png') no-repeat center;
  background-size: cover;
}

.btnmurlocflesheater-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmurlocflesheater.png') no-repeat center;
  background-size: cover;
}

.btnmurlocmutant-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmurlocmutant.png') no-repeat center;
  background-size: cover;
}

.btnmurlocnightcrawler-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmurlocnightcrawler.png') no-repeat center;
  background-size: cover;
}

.btnnagaarmorup1-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnagaarmorup1.png') no-repeat center;
  background-size: cover;
}

.btnnagaarmorup2-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnagaarmorup2.png') no-repeat center;
  background-size: cover;
}

.btnnagaarmorup3-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnagaarmorup3.png') no-repeat center;
  background-size: cover;
}

.btnnagaburrow-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnagaburrow.png') no-repeat center;
  background-size: cover;
}

.btnnagamyrmidon-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnagamyrmidon.png') no-repeat center;
  background-size: cover;
}

.btnnagamyrmidonroyalguard-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnagamyrmidonroyalguard.png') no-repeat center;
  background-size: cover;
}

.btnnagaseawitch-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnagaseawitch.png') no-repeat center;
  background-size: cover;
}

.btnnagasummoner-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnagasummoner.png') no-repeat center;
  background-size: cover;
}

.btnnagaunburrow-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnagaunburrow.png') no-repeat center;
  background-size: cover;
}

.btnnagaweaponup1-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnagaweaponup1.png') no-repeat center;
  background-size: cover;
}

.btnnagaweaponup2-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnagaweaponup2.png') no-repeat center;
  background-size: cover;
}

.btnnagaweaponup3-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnagaweaponup3.png') no-repeat center;
  background-size: cover;
}

.btnnaturesblessing-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnaturesblessing.png') no-repeat center;
  background-size: cover;
}

.btnnaturetouchgrow-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnaturetouchgrow.png') no-repeat center;
  background-size: cover;
}

.btnnecklace-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnecklace.png') no-repeat center;
  background-size: cover;
}

.btnnecromancer-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnecromancer.png') no-repeat center;
  background-size: cover;
}

.btnnecromanceradept-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnecromanceradept.png') no-repeat center;
  background-size: cover;
}

.btnnecromancermaster-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnecromancermaster.png') no-repeat center;
  background-size: cover;
}

.btnnecropolis-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnecropolis.png') no-repeat center;
  background-size: cover;
}

.btnnerubian-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnerubian.png') no-repeat center;
  background-size: cover;
}

.btnnerubianqueen-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnerubianqueen.png') no-repeat center;
  background-size: cover;
}

.btnnerubianspiderlord-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnerubianspiderlord.png') no-repeat center;
  background-size: cover;
}

.btnnerubianziggurat-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnerubianziggurat.png') no-repeat center;
  background-size: cover;
}

.btnnetherdragon-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnetherdragon.png') no-repeat center;
  background-size: cover;
}

.btnneutralmanashield-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnneutralmanashield.png') no-repeat center;
  background-size: cover;
}

.btnneutralmanashieldoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnneutralmanashieldoff.png') no-repeat center;
  background-size: cover;
}

.btnnightelfbattlecruiser-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnightelfbattlecruiser.png') no-repeat center;
  background-size: cover;
}

.btnnightelfbuild-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnightelfbuild.png') no-repeat center;
  background-size: cover;
}

.btnnightelfdestroyer-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnightelfdestroyer.png') no-repeat center;
  background-size: cover;
}

.btnnightelfrunner-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnightelfrunner.png') no-repeat center;
  background-size: cover;
}

.btnnightelfshipyard-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnightelfshipyard.png') no-repeat center;
  background-size: cover;
}

.btnnightelftransport-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnnightelftransport.png') no-repeat center;
  background-size: cover;
}

.btnobsidianstatue-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnobsidianstatue.png') no-repeat center;
  background-size: cover;
}

.btnogre-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnogre.png') no-repeat center;
  background-size: cover;
}

.btnogrelord-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnogrelord.png') no-repeat center;
  background-size: cover;
}

.btnogremagi-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnogremagi.png') no-repeat center;
  background-size: cover;
}

.btnoneheadedogre-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnoneheadedogre.png') no-repeat center;
  background-size: cover;
}

.btnorbofcorruption-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnorbofcorruption.png') no-repeat center;
  background-size: cover;
}

.btnorbofdarkness-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnorbofdarkness.png') no-repeat center;
  background-size: cover;
}

.btnorbofdeath-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnorbofdeath.png') no-repeat center;
  background-size: cover;
}

.btnorbofdeathoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnorbofdeathoff.png') no-repeat center;
  background-size: cover;
}

.btnorboffire-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnorboffire.png') no-repeat center;
  background-size: cover;
}

.btnorboffrost-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnorboffrost.png') no-repeat center;
  background-size: cover;
}

.btnorboflightning-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnorboflightning.png') no-repeat center;
  background-size: cover;
}

.btnorbofslowness-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnorbofslowness.png') no-repeat center;
  background-size: cover;
}

.btnorbofvenom-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnorbofvenom.png') no-repeat center;
  background-size: cover;
}

.btnorcdestroyer-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnorcdestroyer.png') no-repeat center;
  background-size: cover;
}

.btnorclumberupgradetwo-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnorclumberupgradetwo.png') no-repeat center;
  background-size: cover;
}

.btnorcmeleeupone-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnorcmeleeupone.png') no-repeat center;
  background-size: cover;
}

.btnorcmeleeupthree-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnorcmeleeupthree.png') no-repeat center;
  background-size: cover;
}

.btnorcmeleeuptwo-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnorcmeleeuptwo.png') no-repeat center;
  background-size: cover;
}

.btnorcrallypoint-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnorcrallypoint.png') no-repeat center;
  background-size: cover;
}

.btnorctower-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnorctower.png') no-repeat center;
  background-size: cover;
}

.btnorctransport-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnorctransport.png') no-repeat center;
  background-size: cover;
}

.btnorcwarlock-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnorcwarlock.png') no-repeat center;
  background-size: cover;
}

.btnorcwarlockred-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnorcwarlockred.png') no-repeat center;
  background-size: cover;
}

.btnowlbear-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnowlbear.png') no-repeat center;
  background-size: cover;
}

.btnpackbeast-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpackbeast.png') no-repeat center;
  background-size: cover;
}

.btnpandarenbrewmaster-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpandarenbrewmaster.png') no-repeat center;
  background-size: cover;
}

.btnpandataunt-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpandataunt.png') no-repeat center;
  background-size: cover;
}

.btnparasite-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnparasite.png') no-repeat center;
  background-size: cover;
}

.btnparasiteoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnparasiteoff.png') no-repeat center;
  background-size: cover;
}

.btnpatrol-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpatrol.png') no-repeat center;
  background-size: cover;
}

.btnpeasant-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpeasant.png') no-repeat center;
  background-size: cover;
}

.btnpendantofenergy-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpendantofenergy.png') no-repeat center;
  background-size: cover;
}

.btnpendantofmana-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpendantofmana.png') no-repeat center;
  background-size: cover;
}

.btnpeon-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpeon.png') no-repeat center;
  background-size: cover;
}

.btnperiapt-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnperiapt.png') no-repeat center;
  background-size: cover;
}

.btnperiapt1-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnperiapt1.png') no-repeat center;
  background-size: cover;
}

.btnphaseshift-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnphaseshift.png') no-repeat center;
  background-size: cover;
}

.btnphaseshiftoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnphaseshiftoff.png') no-repeat center;
  background-size: cover;
}

.btnpigfarm-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpigfarm.png') no-repeat center;
  background-size: cover;
}

.btnpillage-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpillage.png') no-repeat center;
  background-size: cover;
}

.btnpipeofinsight-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpipeofinsight.png') no-repeat center;
  background-size: cover;
}

.btnpitlord-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpitlord.png') no-repeat center;
  background-size: cover;
}

.btnplaguecloud-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnplaguecloud.png') no-repeat center;
  background-size: cover;
}

.btnpocketfactory-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpocketfactory.png') no-repeat center;
  background-size: cover;
}

.btnpoisonarrow-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpoisonarrow.png') no-repeat center;
  background-size: cover;
}

.btnpoisonsting-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpoisonsting.png') no-repeat center;
  background-size: cover;
}

.btnpolarfurbolg-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpolarfurbolg.png') no-repeat center;
  background-size: cover;
}

.btnpolarfurbolgelder-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpolarfurbolgelder.png') no-repeat center;
  background-size: cover;
}

.btnpolarfurbolgshaman-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpolarfurbolgshaman.png') no-repeat center;
  background-size: cover;
}

.btnpolarfurbolgtracker-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpolarfurbolgtracker.png') no-repeat center;
  background-size: cover;
}

.btnpolymorph-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpolymorph.png') no-repeat center;
  background-size: cover;
}

.btnpossession-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpossession.png') no-repeat center;
  background-size: cover;
}

.btnpotionblue-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpotionblue.png') no-repeat center;
  background-size: cover;
}

.btnpotionbluebig-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpotionbluebig.png') no-repeat center;
  background-size: cover;
}

.btnpotionbluesmall-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpotionbluesmall.png') no-repeat center;
  background-size: cover;
}

.btnpotiongreen-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpotiongreen.png') no-repeat center;
  background-size: cover;
}

.btnpotiongreensmall-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpotiongreensmall.png') no-repeat center;
  background-size: cover;
}

.btnpotionofclarity-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpotionofclarity.png') no-repeat center;
  background-size: cover;
}

.btnpotionofdivinity-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpotionofdivinity.png') no-repeat center;
  background-size: cover;
}

.btnpotionofomniscience-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpotionofomniscience.png') no-repeat center;
  background-size: cover;
}

.btnpotionofrestoration-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpotionofrestoration.png') no-repeat center;
  background-size: cover;
}

.btnpotionofvampirism-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpotionofvampirism.png') no-repeat center;
  background-size: cover;
}

.btnpotionpurple-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpotionpurple.png') no-repeat center;
  background-size: cover;
}

.btnpotionred-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpotionred.png') no-repeat center;
  background-size: cover;
}

.btnpriest-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpriest.png') no-repeat center;
  background-size: cover;
}

.btnpriestadept-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpriestadept.png') no-repeat center;
  background-size: cover;
}

.btnpriestessofthemoon-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpriestessofthemoon.png') no-repeat center;
  background-size: cover;
}

.btnpriestmaster-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpriestmaster.png') no-repeat center;
  background-size: cover;
}

.btnproudmoore-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnproudmoore.png') no-repeat center;
  background-size: cover;
}

.btnpurge-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpurge.png') no-repeat center;
  background-size: cover;
}

.btnpurpledragonspawn-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpurpledragonspawn.png') no-repeat center;
  background-size: cover;
}

.btnpurplefelhound-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnpurplefelhound.png') no-repeat center;
  background-size: cover;
}

.btnquillbeastlv2-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnquillbeastlv2.png') no-repeat center;
  background-size: cover;
}

.btnquillspray-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnquillspray.png') no-repeat center;
  background-size: cover;
}

.btnquillsprayoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnquillsprayoff.png') no-repeat center;
  background-size: cover;
}

.btnraider-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnraider.png') no-repeat center;
  background-size: cover;
}

.btnraisedead-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnraisedead.png') no-repeat center;
  background-size: cover;
}

.btnraisedeadoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnraisedeadoff.png') no-repeat center;
  background-size: cover;
}

.btnrallypoint-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnrallypoint.png') no-repeat center;
  background-size: cover;
}

.btnrallypointnightelf-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnrallypointnightelf.png') no-repeat center;
  background-size: cover;
}

.btnrallypointundead-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnrallypointundead.png') no-repeat center;
  background-size: cover;
}

.btnravenform-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnravenform.png') no-repeat center;
  background-size: cover;
}

.btnrazorback-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnrazorback.png') no-repeat center;
  background-size: cover;
}

.btnrazormanechief-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnrazormanechief.png') no-repeat center;
  background-size: cover;
}

.btnreddragon-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnreddragon.png') no-repeat center;
  background-size: cover;
}

.btnreddragondevour-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnreddragondevour.png') no-repeat center;
  background-size: cover;
}

.btnregenerate-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnregenerate.png') no-repeat center;
  background-size: cover;
}

.btnregeneration-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnregeneration.png') no-repeat center;
  background-size: cover;
}

.btnregenerationaura-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnregenerationaura.png') no-repeat center;
  background-size: cover;
}

.btnreincarnation-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnreincarnation.png') no-repeat center;
  background-size: cover;
}

.btnreinforcedburrows-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnreinforcedburrows.png') no-repeat center;
  background-size: cover;
}

.btnreinforcedhides-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnreinforcedhides.png') no-repeat center;
  background-size: cover;
}

.btnrejuvenation-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnrejuvenation.png') no-repeat center;
  background-size: cover;
}

.btnrejuvenationpotion-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnrejuvenationpotion.png') no-repeat center;
  background-size: cover;
}

.btnrejuvpotion-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnrejuvpotion.png') no-repeat center;
  background-size: cover;
}

.btnrepair-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnrepair.png') no-repeat center;
  background-size: cover;
}

.btnrepairoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnrepairoff.png') no-repeat center;
  background-size: cover;
}

.btnreplenishhealth-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnreplenishhealth.png') no-repeat center;
  background-size: cover;
}

.btnreplenishhealthoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnreplenishhealthoff.png') no-repeat center;
  background-size: cover;
}

.btnreplenishmana-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnreplenishmana.png') no-repeat center;
  background-size: cover;
}

.btnreplenishmanaoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnreplenishmanaoff.png') no-repeat center;
  background-size: cover;
}

.btnresistantskin-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnresistantskin.png') no-repeat center;
  background-size: cover;
}

.btnresurrection-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnresurrection.png') no-repeat center;
  background-size: cover;
}

.btnreveal-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnreveal.png') no-repeat center;
  background-size: cover;
}

.btnrevenant-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnrevenant.png') no-repeat center;
  background-size: cover;
}

.btnriderlesshorse-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnriderlesshorse.png') no-repeat center;
  background-size: cover;
}

.btnriderlesskodo-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnriderlesskodo.png') no-repeat center;
  background-size: cover;
}

.btnrifleman-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnrifleman.png') no-repeat center;
  background-size: cover;
}

.btnringgreen-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnringgreen.png') no-repeat center;
  background-size: cover;
}

.btnringjadefalcon-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnringjadefalcon.png') no-repeat center;
  background-size: cover;
}

.btnringlionhead-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnringlionhead.png') no-repeat center;
  background-size: cover;
}

.btnringpurple-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnringpurple.png') no-repeat center;
  background-size: cover;
}

.btnringskull-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnringskull.png') no-repeat center;
  background-size: cover;
}

.btnringvioletspider-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnringvioletspider.png') no-repeat center;
  background-size: cover;
}

.btnrobeofthemagi-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnrobeofthemagi.png') no-repeat center;
  background-size: cover;
}

.btnrobogoblin-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnrobogoblin.png') no-repeat center;
  background-size: cover;
}

.btnmudgolem-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnmudgolem.png') no-repeat center;
  background-size: cover;
}

.btnrocktower-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnrocktower.png') no-repeat center;
  background-size: cover;
}

.btnrodofnecromancy-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnrodofnecromancy.png') no-repeat center;
  background-size: cover;
}

.btnroot-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnroot.png') no-repeat center;
  background-size: cover;
}

.btnrune-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnrune.png') no-repeat center;
  background-size: cover;
}

.btnrunedbracers-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnrunedbracers.png') no-repeat center;
  background-size: cover;
}

.btnsacrifice-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsacrifice.png') no-repeat center;
  background-size: cover;
}

.btnsacrificialdagger-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsacrificialdagger.png') no-repeat center;
  background-size: cover;
}

.btnsacrificialpit-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsacrificialpit.png') no-repeat center;
  background-size: cover;
}

.btnsacrificialskull-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsacrificialskull.png') no-repeat center;
  background-size: cover;
}

.btnsasquatch-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsasquatch.png') no-repeat center;
  background-size: cover;
}

.btnsasquatchshaman-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsasquatchshaman.png') no-repeat center;
  background-size: cover;
}

.btnsatyr-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsatyr.png') no-repeat center;
  background-size: cover;
}

.btnsatyrtrickster-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsatyrtrickster.png') no-repeat center;
  background-size: cover;
}

.btnscatterrockets-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnscatterrockets.png') no-repeat center;
  background-size: cover;
}

.btnscepterofmastery-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnscepterofmastery.png') no-repeat center;
  background-size: cover;
}

.btnscourgebuild-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnscourgebuild.png') no-repeat center;
  background-size: cover;
}

.btnscout-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnscout.png') no-repeat center;
  background-size: cover;
}

.btnscroll-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnscroll.png') no-repeat center;
  background-size: cover;
}

.btnscrollofhaste-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnscrollofhaste.png') no-repeat center;
  background-size: cover;
}

.btnscrollofhealing-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnscrollofhealing.png') no-repeat center;
  background-size: cover;
}

.btnscrollofprotection-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnscrollofprotection.png') no-repeat center;
  background-size: cover;
}

.btnscrollofregeneration-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnscrollofregeneration.png') no-repeat center;
  background-size: cover;
}

.btnscrollofregenerationgreen-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnscrollofregenerationgreen.png') no-repeat center;
  background-size: cover;
}

.btnscrolloftownportal-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnscrolloftownportal.png') no-repeat center;
  background-size: cover;
}

.btnscrolluber-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnscrolluber.png') no-repeat center;
  background-size: cover;
}

.btnseaelemental-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnseaelemental.png') no-repeat center;
  background-size: cover;
}

.btnseagiant-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnseagiant.png') no-repeat center;
  background-size: cover;
}

.btnseagiantgreen-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnseagiantgreen.png') no-repeat center;
  background-size: cover;
}

.btnseagiantpulverize-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnseagiantpulverize.png') no-repeat center;
  background-size: cover;
}

.btnseagiantwarstomp-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnseagiantwarstomp.png') no-repeat center;
  background-size: cover;
}

.btnsearingarrows-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsearingarrows.png') no-repeat center;
  background-size: cover;
}

.btnsearingarrowsoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsearingarrowsoff.png') no-repeat center;
  background-size: cover;
}

.btnseaturtlegreen-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnseaturtlegreen.png') no-repeat center;
  background-size: cover;
}

.btnseaturtlered-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnseaturtlered.png') no-repeat center;
  background-size: cover;
}

.btnseawitch-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnseawitch.png') no-repeat center;
  background-size: cover;
}

.btnseigeengine-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnseigeengine.png') no-repeat center;
  background-size: cover;
}

.btnseigeenginewithmissles-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnseigeenginewithmissles.png') no-repeat center;
  background-size: cover;
}

.btnselectunit-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnselectunit.png') no-repeat center;
  background-size: cover;
}

.btnselfdestruct-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnselfdestruct.png') no-repeat center;
  background-size: cover;
}

.btnselfdestructoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnselfdestructoff.png') no-repeat center;
  background-size: cover;
}

.btnsentinel-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsentinel.png') no-repeat center;
  background-size: cover;
}

.btnsentryward-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsentryward.png') no-repeat center;
  background-size: cover;
}

.btnserpentward-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnserpentward.png') no-repeat center;
  background-size: cover;
}

.btnshade-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnshade.png') no-repeat center;
  background-size: cover;
}

.btnshadowhunter-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnshadowhunter.png') no-repeat center;
  background-size: cover;
}

.btnshadowmeld-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnshadowmeld.png') no-repeat center;
  background-size: cover;
}

.btnshadowpact-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnshadowpact.png') no-repeat center;
  background-size: cover;
}

.btnshadowstrike-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnshadowstrike.png') no-repeat center;
  background-size: cover;
}

.btnshaman-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnshaman.png') no-repeat center;
  background-size: cover;
}

.btnshamanadept-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnshamanadept.png') no-repeat center;
  background-size: cover;
}

.btnshamanmaster-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnshamanmaster.png') no-repeat center;
  background-size: cover;
}

.btnshandris-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnshandris.png') no-repeat center;
  background-size: cover;
}

.btnsheep-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsheep.png') no-repeat center;
  background-size: cover;
}

.btnshockwave-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnshockwave.png') no-repeat center;
  background-size: cover;
}

.btnshrineofaszhara-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnshrineofaszhara.png') no-repeat center;
  background-size: cover;
}

.btnsilence-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsilence.png') no-repeat center;
  background-size: cover;
}

.btnsirenadept-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsirenadept.png') no-repeat center;
  background-size: cover;
}

.btnsirenmaster-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsirenmaster.png') no-repeat center;
  background-size: cover;
}

.btnskeletallongevity-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnskeletallongevity.png') no-repeat center;
  background-size: cover;
}

.btnskeletalorc-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnskeletalorc.png') no-repeat center;
  background-size: cover;
}

.btnskeletalorcchampion-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnskeletalorcchampion.png') no-repeat center;
  background-size: cover;
}

.btnskeletalorcgrunt-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnskeletalorcgrunt.png') no-repeat center;
  background-size: cover;
}

.btnskeletonarcher-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnskeletonarcher.png') no-repeat center;
  background-size: cover;
}

.btnskeletonmage-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnskeletonmage.png') no-repeat center;
  background-size: cover;
}

.btnskeletonwarrior-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnskeletonwarrior.png') no-repeat center;
  background-size: cover;
}

.btnskillz-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnskillz.png') no-repeat center;
  background-size: cover;
}

.btnslaughterhouse-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnslaughterhouse.png') no-repeat center;
  background-size: cover;
}

.btnsleep-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsleep.png') no-repeat center;
  background-size: cover;
}

.btnslow-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnslow.png') no-repeat center;
  background-size: cover;
}

.btnslowoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnslowoff.png') no-repeat center;
  background-size: cover;
}

.btnslowpoison-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnslowpoison.png') no-repeat center;
  background-size: cover;
}

.btnsludgecreature-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsludgecreature.png') no-repeat center;
  background-size: cover;
}

.btnsmash-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsmash.png') no-repeat center;
  background-size: cover;
}

.btnsnapdragon-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsnapdragon.png') no-repeat center;
  background-size: cover;
}

.btnsnazzypotion-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsnazzypotion.png') no-repeat center;
  background-size: cover;
}

.btnsnazzyscroll-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsnazzyscroll.png') no-repeat center;
  background-size: cover;
}

.btnsnazzyscrollgreen-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsnazzyscrollgreen.png') no-repeat center;
  background-size: cover;
}

.btnsobimask-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsobimask.png') no-repeat center;
  background-size: cover;
}

.btnsorceress-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsorceress.png') no-repeat center;
  background-size: cover;
}

.btnsorceressadept-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsorceressadept.png') no-repeat center;
  background-size: cover;
}

.btnsorceressmaster-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsorceressmaster.png') no-repeat center;
  background-size: cover;
}

.btnsoulburn-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsoulburn.png') no-repeat center;
  background-size: cover;
}

.btnspawninggrounds-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnspawninggrounds.png') no-repeat center;
  background-size: cover;
}

.btnspellbreaker-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnspellbreaker.png') no-repeat center;
  background-size: cover;
}

.btnspellbreakermagicdefend-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnspellbreakermagicdefend.png') no-repeat center;
  background-size: cover;
}

.btnspellbreakermagicundefend-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnspellbreakermagicundefend.png') no-repeat center;
  background-size: cover;
}

.btnspellshieldamulet-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnspellshieldamulet.png') no-repeat center;
  background-size: cover;
}

.btnspellsteal-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnspellsteal.png') no-repeat center;
  background-size: cover;
}

.btnspellstealoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnspellstealoff.png') no-repeat center;
  background-size: cover;
}

.btnspider-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnspider.png') no-repeat center;
  background-size: cover;
}

.btnspiderblack-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnspiderblack.png') no-repeat center;
  background-size: cover;
}

.btnspiderblue-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnspiderblue.png') no-repeat center;
  background-size: cover;
}

.btnspidercrab-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnspidercrab.png') no-repeat center;
  background-size: cover;
}

.btnspidergreen-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnspidergreen.png') no-repeat center;
  background-size: cover;
}

.btnspiderling-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnspiderling.png') no-repeat center;
  background-size: cover;
}

.btnspidersilkbroach-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnspidersilkbroach.png') no-repeat center;
  background-size: cover;
}

.btnspikedbarricades-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnspikedbarricades.png') no-repeat center;
  background-size: cover;
}

.btnspiritlink-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnspiritlink.png') no-repeat center;
  background-size: cover;
}

.btnspiritlodge-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnspiritlodge.png') no-repeat center;
  background-size: cover;
}

.btnspiritofvengeance-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnspiritofvengeance.png') no-repeat center;
  background-size: cover;
}

.btnspiritwalker-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnspiritwalker.png') no-repeat center;
  background-size: cover;
}

.btnspiritwalkeradepttraining-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnspiritwalkeradepttraining.png') no-repeat center;
  background-size: cover;
}

.btnspiritwalkermastertraining-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnspiritwalkermastertraining.png') no-repeat center;
  background-size: cover;
}

.btnspiritwolf-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnspiritwolf.png') no-repeat center;
  background-size: cover;
}

.btnspiritwyvern-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnspiritwyvern.png') no-repeat center;
  background-size: cover;
}

.btnstaffofnegation-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnstaffofnegation.png') no-repeat center;
  background-size: cover;
}

.btnstaffofpreservation-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnstaffofpreservation.png') no-repeat center;
  background-size: cover;
}

.btnstaffofpurification-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnstaffofpurification.png') no-repeat center;
  background-size: cover;
}

.btnstaffofsanctuary-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnstaffofsanctuary.png') no-repeat center;
  background-size: cover;
}

.btnstaffofsilence-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnstaffofsilence.png') no-repeat center;
  background-size: cover;
}

.btnstaffofteleportation-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnstaffofteleportation.png') no-repeat center;
  background-size: cover;
}

.btnstampede-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnstampede.png') no-repeat center;
  background-size: cover;
}

.btnstarfall-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnstarfall.png') no-repeat center;
  background-size: cover;
}

.btnstarwand-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnstarwand.png') no-repeat center;
  background-size: cover;
}

.btnstasistrap-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnstasistrap.png') no-repeat center;
  background-size: cover;
}

.btnstatup-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnstatup.png') no-repeat center;
  background-size: cover;
}

.btnsteamtank-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsteamtank.png') no-repeat center;
  background-size: cover;
}

.btnsteelarmor-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsteelarmor.png') no-repeat center;
  background-size: cover;
}

.btnsteelmelee-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsteelmelee.png') no-repeat center;
  background-size: cover;
}

.btnsteelranged-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsteelranged.png') no-repeat center;
  background-size: cover;
}

.btnstone-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnstone.png') no-repeat center;
  background-size: cover;
}

.btnstonearchitecture-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnstonearchitecture.png') no-repeat center;
  background-size: cover;
}

.btnstoneform-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnstoneform.png') no-repeat center;
  background-size: cover;
}

.btnstop-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnstop.png') no-repeat center;
  background-size: cover;
}

.btnstormbolt-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnstormbolt.png') no-repeat center;
  background-size: cover;
}

.btnstormbrewmaster-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnstormbrewmaster.png') no-repeat center;
  background-size: cover;
}

.btnstormearthfire-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnstormearthfire.png') no-repeat center;
  background-size: cover;
}

.btnstormhammer-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnstormhammer.png') no-repeat center;
  background-size: cover;
}

.btnstrengthofthemoon-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnstrengthofthemoon.png') no-repeat center;
  background-size: cover;
}

.btnstrengthofthewild-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnstrengthofthewild.png') no-repeat center;
  background-size: cover;
}

.btnstrongdrink-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnstrongdrink.png') no-repeat center;
  background-size: cover;
}

.btnstronghold-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnstronghold.png') no-repeat center;
  background-size: cover;
}

.btnstun-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnstun.png') no-repeat center;
  background-size: cover;
}

.btnsummonwaterelemental-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsummonwaterelemental.png') no-repeat center;
  background-size: cover;
}

.btnsunderingblades-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsunderingblades.png') no-repeat center;
  background-size: cover;
}

.btnsylvanuswindrunner-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnsylvanuswindrunner.png') no-repeat center;
  background-size: cover;
}

.btntalisman-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntalisman.png') no-repeat center;
  background-size: cover;
}

.btntamehippogriff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntamehippogriff.png') no-repeat center;
  background-size: cover;
}

.btntaunt-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntaunt.png') no-repeat center;
  background-size: cover;
}

.btntauren-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntauren.png') no-repeat center;
  background-size: cover;
}

.btntaurentotem-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntaurentotem.png') no-repeat center;
  background-size: cover;
}

.btntavern-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntavern.png') no-repeat center;
  background-size: cover;
}

.btntelescope-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntelescope.png') no-repeat center;
  background-size: cover;
}

.btntempleofthedamned-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntempleofthedamned.png') no-repeat center;
  background-size: cover;
}

.btntempleoftides-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntempleoftides.png') no-repeat center;
  background-size: cover;
}

.btntheblackarrow-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntheblackarrow.png') no-repeat center;
  background-size: cover;
}

.btntheblackarrowoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntheblackarrowoff.png') no-repeat center;
  background-size: cover;
}

.btnthecaptain-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnthecaptain.png') no-repeat center;
  background-size: cover;
}

.btnthickfur-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnthickfur.png') no-repeat center;
  background-size: cover;
}

.btnthoriumarmor-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnthoriumarmor.png') no-repeat center;
  background-size: cover;
}

.btnthoriummelee-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnthoriummelee.png') no-repeat center;
  background-size: cover;
}

.btnthoriumranged-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnthoriumranged.png') no-repeat center;
  background-size: cover;
}

.btnthorns-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnthorns.png') no-repeat center;
  background-size: cover;
}

.btnthornshield-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnthornshield.png') no-repeat center;
  background-size: cover;
}

.btnthornyshieldoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnthornyshieldoff.png') no-repeat center;
  background-size: cover;
}

.btnthrall-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnthrall.png') no-repeat center;
  background-size: cover;
}

.btnthunderclap-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnthunderclap.png') no-repeat center;
  background-size: cover;
}

.btnthunderlizard-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnthunderlizard.png') no-repeat center;
  background-size: cover;
}

.btnthunderlizardsalamander-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnthunderlizardsalamander.png') no-repeat center;
  background-size: cover;
}

.btnthunderlizardvizier-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnthunderlizardvizier.png') no-repeat center;
  background-size: cover;
}

.btntichondrius-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntichondrius.png') no-repeat center;
  background-size: cover;
}

.btntidalguardian-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntidalguardian.png') no-repeat center;
  background-size: cover;
}

.btntimberwolf-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntimberwolf.png') no-repeat center;
  background-size: cover;
}

.btntinycastle-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntinycastle.png') no-repeat center;
  background-size: cover;
}

.btntombofrelics-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntombofrelics.png') no-repeat center;
  background-size: cover;
}

.btntome-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntome.png') no-repeat center;
  background-size: cover;
}

.btntomebrown-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntomebrown.png') no-repeat center;
  background-size: cover;
}

.btntomeofretraining-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntomeofretraining.png') no-repeat center;
  background-size: cover;
}

.btntomered-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntomered.png') no-repeat center;
  background-size: cover;
}

.btntornado-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntornado.png') no-repeat center;
  background-size: cover;
}

.btntownhall-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntownhall.png') no-repeat center;
  background-size: cover;
}

.btntranquility-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntranquility.png') no-repeat center;
  background-size: cover;
}

.btntransmute-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntransmute.png') no-repeat center;
  background-size: cover;
}

.btntransport-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntransport.png') no-repeat center;
  background-size: cover;
}

.btntreant-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntreant.png') no-repeat center;
  background-size: cover;
}

.btntreeofages-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntreeofages.png') no-repeat center;
  background-size: cover;
}

.btntreeofeternity-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntreeofeternity.png') no-repeat center;
  background-size: cover;
}

.btntreeoflife-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntreeoflife.png') no-repeat center;
  background-size: cover;
}

.btntrollbatrider-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntrollbatrider.png') no-repeat center;
  background-size: cover;
}

.btntrollburrow-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntrollburrow.png') no-repeat center;
  background-size: cover;
}

.btntrueshot-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntrueshot.png') no-repeat center;
  background-size: cover;
}

.btntuskaarblack-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntuskaarblack.png') no-repeat center;
  background-size: cover;
}

.btntuskaarbrown-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntuskaarbrown.png') no-repeat center;
  background-size: cover;
}

.btntuskaargold-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntuskaargold.png') no-repeat center;
  background-size: cover;
}

.btntuskaarnomad-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btntuskaarnomad.png') no-repeat center;
  background-size: cover;
}

.btnultravision-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnultravision.png') no-repeat center;
  background-size: cover;
}

.btnunbroken-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnunbroken.png') no-repeat center;
  background-size: cover;
}

.btnundeadairbarge-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnundeadairbarge.png') no-repeat center;
  background-size: cover;
}

.btnundeadbattleship-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnundeadbattleship.png') no-repeat center;
  background-size: cover;
}

.btnundeaddestroyer-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnundeaddestroyer.png') no-repeat center;
  background-size: cover;
}

.btnundeadload-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnundeadload.png') no-repeat center;
  background-size: cover;
}

.btnundeadloadoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnundeadloadoff.png') no-repeat center;
  background-size: cover;
}

.btnundeadshipyard-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnundeadshipyard.png') no-repeat center;
  background-size: cover;
}

.btnundeadtransport-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnundeadtransport.png') no-repeat center;
  background-size: cover;
}

.btnundeadunload-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnundeadunload.png') no-repeat center;
  background-size: cover;
}

.btnunholyarmor-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnunholyarmor.png') no-repeat center;
  background-size: cover;
}

.btnunholyaura-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnunholyaura.png') no-repeat center;
  background-size: cover;
}

.btnunholyfrenzy-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnunholyfrenzy.png') no-repeat center;
  background-size: cover;
}

.btnunholystrength-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnunholystrength.png') no-repeat center;
  background-size: cover;
}

.btnunload-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnunload.png') no-repeat center;
  background-size: cover;
}

.btnunloaddwarf-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnunloaddwarf.png') no-repeat center;
  background-size: cover;
}

.btnunloadpeon-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnunloadpeon.png') no-repeat center;
  background-size: cover;
}

.btnunstableconcoction-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnunstableconcoction.png') no-repeat center;
  background-size: cover;
}

.btnunsummonbuilding-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnunsummonbuilding.png') no-repeat center;
  background-size: cover;
}

.btnupgrademoonglaive-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnupgrademoonglaive.png') no-repeat center;
  background-size: cover;
}

.btnuproot-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnuproot.png') no-repeat center;
  background-size: cover;
}

.btnvampiricaura-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnvampiricaura.png') no-repeat center;
  background-size: cover;
}

.btnvoidwalker-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnvoidwalker.png') no-repeat center;
  background-size: cover;
}

.btnvolcano-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnvolcano.png') no-repeat center;
  background-size: cover;
}

.btnvoodoolounge-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnvoodoolounge.png') no-repeat center;
  background-size: cover;
}

.btnvorpalblades-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnvorpalblades.png') no-repeat center;
  background-size: cover;
}

.btnwalloffire-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnwalloffire.png') no-repeat center;
  background-size: cover;
}

.btnwand-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnwand.png') no-repeat center;
  background-size: cover;
}

.btnwandofcyclone-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnwandofcyclone.png') no-repeat center;
  background-size: cover;
}

.btnwandofmanasteal-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnwandofmanasteal.png') no-repeat center;
  background-size: cover;
}

.btnwandofneutralization-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnwandofneutralization.png') no-repeat center;
  background-size: cover;
}

.btnwandofshadowsight-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnwandofshadowsight.png') no-repeat center;
  background-size: cover;
}

.btnwandskull-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnwandskull.png') no-repeat center;
  background-size: cover;
}

.btnwarden2-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnwarden2.png') no-repeat center;
  background-size: cover;
}

.btnwareagle-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnwareagle.png') no-repeat center;
  background-size: cover;
}

.btnwarstomp-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnwarstomp.png') no-repeat center;
  background-size: cover;
}

.btnweb-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnweb.png') no-repeat center;
  background-size: cover;
}

.btnweboff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnweboff.png') no-repeat center;
  background-size: cover;
}

.btnwellspring-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnwellspring.png') no-repeat center;
  background-size: cover;
}

.btnwendigo-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnwendigo.png') no-repeat center;
  background-size: cover;
}

.btnwhirlwind-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnwhirlwind.png') no-repeat center;
  background-size: cover;
}

.btnwindserpent-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnwindserpent.png') no-repeat center;
  background-size: cover;
}

.btnwindwalkoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnwindwalkoff.png') no-repeat center;
  background-size: cover;
}

.btnwindwalkon-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnwindwalkon.png') no-repeat center;
  background-size: cover;
}

.btnwisp-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnwisp.png') no-repeat center;
  background-size: cover;
}

.btnwisphealoff-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnwisphealoff.png') no-repeat center;
  background-size: cover;
}

.btnwispsplode-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnwispsplode.png') no-repeat center;
  background-size: cover;
}

.btnwitchdoctor-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnwitchdoctor.png') no-repeat center;
  background-size: cover;
}

.btnwitchdoctoradept-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnwitchdoctoradept.png') no-repeat center;
  background-size: cover;
}

.btnwitchdoctormaster-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnwitchdoctormaster.png') no-repeat center;
  background-size: cover;
}

.btnworkshop-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnworkshop.png') no-repeat center;
  background-size: cover;
}

.btnwyvern-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnwyvern.png') no-repeat center;
  background-size: cover;
}

.btnwyvernrider-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnwyvernrider.png') no-repeat center;
  background-size: cover;
}

.btnzergling-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnzergling.png') no-repeat center;
  background-size: cover;
}

.btnziggurat-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnziggurat.png') no-repeat center;
  background-size: cover;
}

.btnzigguratupgrade-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnzigguratupgrade.png') no-repeat center;
  background-size: cover;
}

.btnzombie-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/btnzombie.png') no-repeat center;
  background-size: cover;
}

.pasbtnanimalwartraining-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnanimalwartraining.png') no-repeat center;
  background-size: cover;
}

.pasbtnbash-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnbash.png') no-repeat center;
  background-size: cover;
}

.pasbtnbattleroar-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnbattleroar.png') no-repeat center;
  background-size: cover;
}

.pasbtnberserk-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnberserk.png') no-repeat center;
  background-size: cover;
}

.pasbtnbrilliance-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnbrilliance.png') no-repeat center;
  background-size: cover;
}

.pasbtncleavingattack-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtncleavingattack.png') no-repeat center;
  background-size: cover;
}

.pasbtncommand-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtncommand.png') no-repeat center;
  background-size: cover;
}

.pasbtncorrosivebreath-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtncorrosivebreath.png') no-repeat center;
  background-size: cover;
}

.pasbtncriticalstrike-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtncriticalstrike.png') no-repeat center;
  background-size: cover;
}

.pasbtndemolish-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtndemolish.png') no-repeat center;
  background-size: cover;
}

.pasbtndevotion-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtndevotion.png') no-repeat center;
  background-size: cover;
}

.pasbtndrum-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtndrum.png') no-repeat center;
  background-size: cover;
}

.pasbtndrunkendodge-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtndrunkendodge.png') no-repeat center;
  background-size: cover;
}

.pasbtndwarvenlongrifle-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtndwarvenlongrifle.png') no-repeat center;
  background-size: cover;
}

.pasbtnelunesblessing-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnelunesblessing.png') no-repeat center;
  background-size: cover;
}

.pasbtnengineeringupgrade-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnengineeringupgrade.png') no-repeat center;
  background-size: cover;
}

.pasbtnenvenomedspear-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnenvenomedspear.png') no-repeat center;
  background-size: cover;
}

.pasbtnevasion-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnevasion.png') no-repeat center;
  background-size: cover;
}

.pasbtnexhumecorpses-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnexhumecorpses.png') no-repeat center;
  background-size: cover;
}

.pasbtnfeedback-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnfeedback.png') no-repeat center;
  background-size: cover;
}

.pasbtnfirerocks-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnfirerocks.png') no-repeat center;
  background-size: cover;
}

.pasbtnflakcannons-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnflakcannons.png') no-repeat center;
  background-size: cover;
}

.pasbtnflyingmachinetruesight-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnflyingmachinetruesight.png') no-repeat center;
  background-size: cover;
}

.pasbtnfragmentationbombs-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnfragmentationbombs.png') no-repeat center;
  background-size: cover;
}

.pasbtnfreezingbreath-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnfreezingbreath.png') no-repeat center;
  background-size: cover;
}

.pasbtnfrost-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnfrost.png') no-repeat center;
  background-size: cover;
}

.pasbtngenericspellimmunity-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtngenericspellimmunity.png') no-repeat center;
  background-size: cover;
}

.pasbtnghoulfrenzy-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnghoulfrenzy.png') no-repeat center;
  background-size: cover;
}

.pasbtngnollcommandaura-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtngnollcommandaura.png') no-repeat center;
  background-size: cover;
}

.pasbtnhardenedskin-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnhardenedskin.png') no-repeat center;
  background-size: cover;
}

.pasbtnheadhunterberserker-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnheadhunterberserker.png') no-repeat center;
  background-size: cover;
}

.pasbtnhumanartilleryupone-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnhumanartilleryupone.png') no-repeat center;
  background-size: cover;
}

.pasbtnhumanlumberupgrade1-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnhumanlumberupgrade1.png') no-repeat center;
  background-size: cover;
}

.pasbtnhumanlumberupgrade2-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnhumanlumberupgrade2.png') no-repeat center;
  background-size: cover;
}

.pasbtnimmolation-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnimmolation.png') no-repeat center;
  background-size: cover;
}

.pasbtnimpalingbolt-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnimpalingbolt.png') no-repeat center;
  background-size: cover;
}

.pasbtnimprovedbows-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnimprovedbows.png') no-repeat center;
  background-size: cover;
}

.pasbtnimprovedspikedbarricades-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnimprovedspikedbarricades.png') no-repeat center;
  background-size: cover;
}

.pasbtnliquidfire-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnliquidfire.png') no-repeat center;
  background-size: cover;
}

.pasbtnmagicalsentry-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnmagicalsentry.png') no-repeat center;
  background-size: cover;
}

.pasbtnmagicimmunity-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnmagicimmunity.png') no-repeat center;
  background-size: cover;
}

.pasbtnmarkoffire-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnmarkoffire.png') no-repeat center;
  background-size: cover;
}

.pasbtnmarksmanship-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnmarksmanship.png') no-repeat center;
  background-size: cover;
}

.pasbtnpillage-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnpillage.png') no-repeat center;
  background-size: cover;
}

.pasbtnplaguecloud-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnplaguecloud.png') no-repeat center;
  background-size: cover;
}

.pasbtnpoisonsting-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnpoisonsting.png') no-repeat center;
  background-size: cover;
}

.pasbtnregenerate-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnregenerate.png') no-repeat center;
  background-size: cover;
}

.pasbtnreincarnation-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnreincarnation.png') no-repeat center;
  background-size: cover;
}

.pasbtnreinforcedburrows-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnreinforcedburrows.png') no-repeat center;
  background-size: cover;
}

.pasbtnresistantskin-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnresistantskin.png') no-repeat center;
  background-size: cover;
}

.pasbtnscatterrockets-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnscatterrockets.png') no-repeat center;
  background-size: cover;
}

.pasbtnscout-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnscout.png') no-repeat center;
  background-size: cover;
}

.pasbtnseagiantpulverize-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnseagiantpulverize.png') no-repeat center;
  background-size: cover;
}

.pasbtnshade-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnshade.png') no-repeat center;
  background-size: cover;
}

.pasbtnshadetruesight-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnshadetruesight.png') no-repeat center;
  background-size: cover;
}

.pasbtnskeletonmage-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnskeletonmage.png') no-repeat center;
  background-size: cover;
}

.pasbtnslowpoison-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnslowpoison.png') no-repeat center;
  background-size: cover;
}

.pasbtnsmash-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnsmash.png') no-repeat center;
  background-size: cover;
}

.pasbtnspikedbarricades-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnspikedbarricades.png') no-repeat center;
  background-size: cover;
}

.pasbtnspiritofvengeance-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnspiritofvengeance.png') no-repeat center;
  background-size: cover;
}

.pasbtnstatup-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnstatup.png') no-repeat center;
  background-size: cover;
}

.pasbtnstormhammer-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnstormhammer.png') no-repeat center;
  background-size: cover;
}

.pasbtnsunderingblades-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnsunderingblades.png') no-repeat center;
  background-size: cover;
}

.pasbtnthickfur-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnthickfur.png') no-repeat center;
  background-size: cover;
}

.pasbtnthorns-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnthorns.png') no-repeat center;
  background-size: cover;
}

.pasbtnthornshield-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnthornshield.png') no-repeat center;
  background-size: cover;
}

.pasbtntrueshot-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtntrueshot.png') no-repeat center;
  background-size: cover;
}

.pasbtnunholyaura-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnunholyaura.png') no-repeat center;
  background-size: cover;
}

.pasbtnupgrademoonglaive-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnupgrademoonglaive.png') no-repeat center;
  background-size: cover;
}

.pasbtnvampiricaura-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnvampiricaura.png') no-repeat center;
  background-size: cover;
}

.pasbtnvorpalblades-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnvorpalblades.png') no-repeat center;
  background-size: cover;
}

.pasbtnwellspring-classic {
  background: url('~@/assets/images/hotkeys/icons/classic/pasbtnwellspring.png') no-repeat center;
  background-size: cover;
}

</style>
