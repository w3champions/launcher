<template>
  <table v-if="!singleRow" class="selection-background">
    <tr v-for="line in selectionItems" :key="toKey(line)">
      <td class="item-selection-container" v-for="item in line" :key="item.icon" :class="item.icon">
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
      <td class="item-selection-container" v-for="item in selectionItems" :key="item.icon" :class="item.icon">
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
// eslint-disable-next-line no-unused-vars
import {Ability, W3cIcon} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";

@Component
export default class ItemSelectionContainer extends Vue {
  @Prop() public selectionItems!: W3cIcon[][];
  @Prop() public singleRow!: boolean;
  @Prop() public onClick!: (icon: W3cIcon) => {};

  public toKey(units: W3cIcon[]) {
    return units.map(u => u.icon).join("_");
  }

  public parseHotkey(item: Ability) {
    return item ? item.currentHotkey?.replace("512", "ESC") : '';
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
.btnairattackon {
  background: url('~@/assets/images/hotkeys/icons/all/btnairattackon.jpg') no-repeat center;
  background-size: cover;
}

.btnabomination {
  background: url('~@/assets/images/hotkeys/icons/all/btnabomination.jpg') no-repeat center;
  background-size: cover;
}

.btnabsorbmagic {
  background: url('~@/assets/images/hotkeys/icons/all/btnabsorbmagic.jpg') no-repeat center;
  background-size: cover;
}

.btnacidbomb {
  background: url('~@/assets/images/hotkeys/icons/all/btnacidbomb.jpg') no-repeat center;
  background-size: cover;
}

.btnacolyte {
  background: url('~@/assets/images/hotkeys/icons/all/btnacolyte.jpg') no-repeat center;
  background-size: cover;
}

.btnadvancedcreatureattack {
  background: url('~@/assets/images/hotkeys/icons/all/btnadvancedcreatureattack.jpg') no-repeat center;
  background-size: cover;
}

.btnadvancedcreaturecarapace {
  background: url('~@/assets/images/hotkeys/icons/all/btnadvancedcreaturecarapace.jpg') no-repeat center;
  background-size: cover;
}

.btnadvanceddeathtower {
  background: url('~@/assets/images/hotkeys/icons/all/btnadvanceddeathtower.jpg') no-repeat center;
  background-size: cover;
}

.btnadvancedenergytower {
  background: url('~@/assets/images/hotkeys/icons/all/btnadvancedenergytower.jpg') no-repeat center;
  background-size: cover;
}

.btnadvancedflametower {
  background: url('~@/assets/images/hotkeys/icons/all/btnadvancedflametower.jpg') no-repeat center;
  background-size: cover;
}

.btnadvancedfrosttower {
  background: url('~@/assets/images/hotkeys/icons/all/btnadvancedfrosttower.jpg') no-repeat center;
  background-size: cover;
}

.btnadvancedmoonarmor {
  background: url('~@/assets/images/hotkeys/icons/all/btnadvancedmoonarmor.jpg') no-repeat center;
  background-size: cover;
}

.btnadvancedreinforcedhides {
  background: url('~@/assets/images/hotkeys/icons/all/btnadvancedreinforcedhides.jpg') no-repeat center;
  background-size: cover;
}

.btnadvancedrocktower {
  background: url('~@/assets/images/hotkeys/icons/all/btnadvancedrocktower.jpg') no-repeat center;
  background-size: cover;
}

.btnadvancedspikedbarricades {
  background: url('~@/assets/images/hotkeys/icons/all/btnadvancedspikedbarricades.jpg') no-repeat center;
  background-size: cover;
}

.btnadvancedstrengthofthemoon {
  background: url('~@/assets/images/hotkeys/icons/all/btnadvancedstrengthofthemoon.jpg') no-repeat center;
  background-size: cover;
}

.btnadvancedstrengthofthewild {
  background: url('~@/assets/images/hotkeys/icons/all/btnadvancedstrengthofthewild.jpg') no-repeat center;
  background-size: cover;
}

.btnadvancedunholyarmor {
  background: url('~@/assets/images/hotkeys/icons/all/btnadvancedunholyarmor.jpg') no-repeat center;
  background-size: cover;
}

.btnadvancedunholystrength {
  background: url('~@/assets/images/hotkeys/icons/all/btnadvancedunholystrength.jpg') no-repeat center;
  background-size: cover;
}

.btnaltarofdarkness {
  background: url('~@/assets/images/hotkeys/icons/all/btnaltarofdarkness.jpg') no-repeat center;
  background-size: cover;
}

.btnaltarofelders {
  background: url('~@/assets/images/hotkeys/icons/all/btnaltarofelders.jpg') no-repeat center;
  background-size: cover;
}

.btnaltarofkings {
  background: url('~@/assets/images/hotkeys/icons/all/btnaltarofkings.jpg') no-repeat center;
  background-size: cover;
}

.btnaltarofstorms {
  background: url('~@/assets/images/hotkeys/icons/all/btnaltarofstorms.jpg') no-repeat center;
  background-size: cover;
}

.btnambush {
  background: url('~@/assets/images/hotkeys/icons/all/btnambush.jpg') no-repeat center;
  background-size: cover;
}

.btnammodump {
  background: url('~@/assets/images/hotkeys/icons/all/btnammodump.jpg') no-repeat center;
  background-size: cover;
}

.btnancestralspirit {
  background: url('~@/assets/images/hotkeys/icons/all/btnancestralspirit.jpg') no-repeat center;
  background-size: cover;
}

.btnancienthydra {
  background: url('~@/assets/images/hotkeys/icons/all/btnancienthydra.jpg') no-repeat center;
  background-size: cover;
}

.btnancientoflore {
  background: url('~@/assets/images/hotkeys/icons/all/btnancientoflore.jpg') no-repeat center;
  background-size: cover;
}

.btnancientoftheearth {
  background: url('~@/assets/images/hotkeys/icons/all/btnancientoftheearth.jpg') no-repeat center;
  background-size: cover;
}

.btnancientofthemoon {
  background: url('~@/assets/images/hotkeys/icons/all/btnancientofthemoon.jpg') no-repeat center;
  background-size: cover;
}

.btnancientofwonders {
  background: url('~@/assets/images/hotkeys/icons/all/btnancientofwonders.jpg') no-repeat center;
  background-size: cover;
}

.btnanimalwartraining {
  background: url('~@/assets/images/hotkeys/icons/all/btnanimalwartraining.jpg') no-repeat center;
  background-size: cover;
}

.btnanimatedead {
  background: url('~@/assets/images/hotkeys/icons/all/btnanimatedead.jpg') no-repeat center;
  background-size: cover;
}

.btnankh {
  background: url('~@/assets/images/hotkeys/icons/all/btnankh.jpg') no-repeat center;
  background-size: cover;
}

.btnantimagicshell {
  background: url('~@/assets/images/hotkeys/icons/all/btnantimagicshell.jpg') no-repeat center;
  background-size: cover;
}

.btnantonidas {
  background: url('~@/assets/images/hotkeys/icons/all/btnantonidas.jpg') no-repeat center;
  background-size: cover;
}

.btnanubarak {
  background: url('~@/assets/images/hotkeys/icons/all/btnanubarak.jpg') no-repeat center;
  background-size: cover;
}

.btnarachnathid {
  background: url('~@/assets/images/hotkeys/icons/all/btnarachnathid.jpg') no-repeat center;
  background-size: cover;
}

.btnarcanesanctum {
  background: url('~@/assets/images/hotkeys/icons/all/btnarcanesanctum.jpg') no-repeat center;
  background-size: cover;
}

.btnarcanevault {
  background: url('~@/assets/images/hotkeys/icons/all/btnarcanevault.jpg') no-repeat center;
  background-size: cover;
}

.btnarcanitearchitecture {
  background: url('~@/assets/images/hotkeys/icons/all/btnarcanitearchitecture.jpg') no-repeat center;
  background-size: cover;
}

.btnarcanitearmor {
  background: url('~@/assets/images/hotkeys/icons/all/btnarcanitearmor.jpg') no-repeat center;
  background-size: cover;
}

.btnarcanitemelee {
  background: url('~@/assets/images/hotkeys/icons/all/btnarcanitemelee.jpg') no-repeat center;
  background-size: cover;
}

.btnarcaniteranged {
  background: url('~@/assets/images/hotkeys/icons/all/btnarcaniteranged.jpg') no-repeat center;
  background-size: cover;
}

.btnarcher {
  background: url('~@/assets/images/hotkeys/icons/all/btnarcher.jpg') no-repeat center;
  background-size: cover;
}

.btnarchimonde {
  background: url('~@/assets/images/hotkeys/icons/all/btnarchimonde.jpg') no-repeat center;
  background-size: cover;
}

.btnarmoredogre {
  background: url('~@/assets/images/hotkeys/icons/all/btnarmoredogre.jpg') no-repeat center;
  background-size: cover;
}

.btnarmorgolem {
  background: url('~@/assets/images/hotkeys/icons/all/btnarmorgolem.jpg') no-repeat center;
  background-size: cover;
}

.btnarthas {
  background: url('~@/assets/images/hotkeys/icons/all/btnarthas.jpg') no-repeat center;
  background-size: cover;
}

.btnarthasevil {
  background: url('~@/assets/images/hotkeys/icons/all/btnarthasevil.jpg') no-repeat center;
  background-size: cover;
}

.btnarthasfrost {
  background: url('~@/assets/images/hotkeys/icons/all/btnarthasfrost.jpg') no-repeat center;
  background-size: cover;
}

.btnassassin {
  background: url('~@/assets/images/hotkeys/icons/all/btnassassin.jpg') no-repeat center;
  background-size: cover;
}

.btnattack {
  background: url('~@/assets/images/hotkeys/icons/all/btnattack.jpg') no-repeat center;
  background-size: cover;
}

.btnattackground {
  background: url('~@/assets/images/hotkeys/icons/all/btnattackground.jpg') no-repeat center;
  background-size: cover;
}

.btnauraofdarkness {
  background: url('~@/assets/images/hotkeys/icons/all/btnauraofdarkness.jpg') no-repeat center;
  background-size: cover;
}

.btnavatar {
  background: url('~@/assets/images/hotkeys/icons/all/btnavatar.jpg') no-repeat center;
  background-size: cover;
}

.btnavataroff {
  background: url('~@/assets/images/hotkeys/icons/all/btnavataroff.jpg') no-repeat center;
  background-size: cover;
}

.btnavengingassassin {
  background: url('~@/assets/images/hotkeys/icons/all/btnavengingassassin.jpg') no-repeat center;
  background-size: cover;
}

.btnavengingwatcher {
  background: url('~@/assets/images/hotkeys/icons/all/btnavengingwatcher.jpg') no-repeat center;
  background-size: cover;
}

.btnavengingwatcheroff {
  background: url('~@/assets/images/hotkeys/icons/all/btnavengingwatcheroff.jpg') no-repeat center;
  background-size: cover;
}

.btnazgalor {
  background: url('~@/assets/images/hotkeys/icons/all/btnazgalor.jpg') no-repeat center;
  background-size: cover;
}

.btnazuredragon {
  background: url('~@/assets/images/hotkeys/icons/all/btnazuredragon.jpg') no-repeat center;
  background-size: cover;
}

.btnazuredragonwhelp {
  background: url('~@/assets/images/hotkeys/icons/all/btnazuredragonwhelp.jpg') no-repeat center;
  background-size: cover;
}

.btnazuredrake {
  background: url('~@/assets/images/hotkeys/icons/all/btnazuredrake.jpg') no-repeat center;
  background-size: cover;
}

.btnbacktowork {
  background: url('~@/assets/images/hotkeys/icons/all/btnbacktowork.jpg') no-repeat center;
  background-size: cover;
}

.btnballista {
  background: url('~@/assets/images/hotkeys/icons/all/btnballista.jpg') no-repeat center;
  background-size: cover;
}

.btnbalnazzar {
  background: url('~@/assets/images/hotkeys/icons/all/btnbalnazzar.jpg') no-repeat center;
  background-size: cover;
}

.btnbanish {
  background: url('~@/assets/images/hotkeys/icons/all/btnbanish.jpg') no-repeat center;
  background-size: cover;
}

.btnbanshee {
  background: url('~@/assets/images/hotkeys/icons/all/btnbanshee.jpg') no-repeat center;
  background-size: cover;
}

.btnbansheeadept {
  background: url('~@/assets/images/hotkeys/icons/all/btnbansheeadept.jpg') no-repeat center;
  background-size: cover;
}

.btnbansheemaster {
  background: url('~@/assets/images/hotkeys/icons/all/btnbansheemaster.jpg') no-repeat center;
  background-size: cover;
}

.btnbansheeranger {
  background: url('~@/assets/images/hotkeys/icons/all/btnbansheeranger.jpg') no-repeat center;
  background-size: cover;
}

.btnbarracks {
  background: url('~@/assets/images/hotkeys/icons/all/btnbarracks.jpg') no-repeat center;
  background-size: cover;
}

.btnbarrel {
  background: url('~@/assets/images/hotkeys/icons/all/btnbarrel.jpg') no-repeat center;
  background-size: cover;
}

.btnbash {
  background: url('~@/assets/images/hotkeys/icons/all/btnbash.jpg') no-repeat center;
  background-size: cover;
}

.btnbasicstruct {
  background: url('~@/assets/images/hotkeys/icons/all/btnbasicstruct.jpg') no-repeat center;
  background-size: cover;
}

.btnbattleroar {
  background: url('~@/assets/images/hotkeys/icons/all/btnbattleroar.jpg') no-repeat center;
  background-size: cover;
}

.btnbattlestations {
  background: url('~@/assets/images/hotkeys/icons/all/btnbattlestations.jpg') no-repeat center;
  background-size: cover;
}

.btnbearblink {
  background: url('~@/assets/images/hotkeys/icons/all/btnbearblink.jpg') no-repeat center;
  background-size: cover;
}

.btnbearden {
  background: url('~@/assets/images/hotkeys/icons/all/btnbearden.jpg') no-repeat center;
  background-size: cover;
}

.btnbearform {
  background: url('~@/assets/images/hotkeys/icons/all/btnbearform.jpg') no-repeat center;
  background-size: cover;
}

.btnbeastiary {
  background: url('~@/assets/images/hotkeys/icons/all/btnbeastiary.jpg') no-repeat center;
  background-size: cover;
}

.btnbeastmaster {
  background: url('~@/assets/images/hotkeys/icons/all/btnbeastmaster.jpg') no-repeat center;
  background-size: cover;
}

.btnbelt {
  background: url('~@/assets/images/hotkeys/icons/all/btnbelt.jpg') no-repeat center;
  background-size: cover;
}

.btnberserk {
  background: url('~@/assets/images/hotkeys/icons/all/btnberserk.jpg') no-repeat center;
  background-size: cover;
}

.btnberserkelemental {
  background: url('~@/assets/images/hotkeys/icons/all/btnberserkelemental.jpg') no-repeat center;
  background-size: cover;
}

.btnberserkfortrolls {
  background: url('~@/assets/images/hotkeys/icons/all/btnberserkfortrolls.jpg') no-repeat center;
  background-size: cover;
}

.btnberserkwildkin {
  background: url('~@/assets/images/hotkeys/icons/all/btnberserkwildkin.jpg') no-repeat center;
  background-size: cover;
}

.btnbigbadvoodoospell {
  background: url('~@/assets/images/hotkeys/icons/all/btnbigbadvoodoospell.jpg') no-repeat center;
  background-size: cover;
}

.btnblackcitadel {
  background: url('~@/assets/images/hotkeys/icons/all/btnblackcitadel.jpg') no-repeat center;
  background-size: cover;
}

.btnblackdragon {
  background: url('~@/assets/images/hotkeys/icons/all/btnblackdragon.jpg') no-repeat center;
  background-size: cover;
}

.btnblackdragonroost {
  background: url('~@/assets/images/hotkeys/icons/all/btnblackdragonroost.jpg') no-repeat center;
  background-size: cover;
}

.btnblackdragonwhelp {
  background: url('~@/assets/images/hotkeys/icons/all/btnblackdragonwhelp.jpg') no-repeat center;
  background-size: cover;
}

.btnblackdrake {
  background: url('~@/assets/images/hotkeys/icons/all/btnblackdrake.jpg') no-repeat center;
  background-size: cover;
}

.btnblackmammoth {
  background: url('~@/assets/images/hotkeys/icons/all/btnblackmammoth.jpg') no-repeat center;
  background-size: cover;
}

.btnblackmarket {
  background: url('~@/assets/images/hotkeys/icons/all/btnblackmarket.jpg') no-repeat center;
  background-size: cover;
}

.btnblacksmith {
  background: url('~@/assets/images/hotkeys/icons/all/btnblacksmith.jpg') no-repeat center;
  background-size: cover;
}

.btnblink {
  background: url('~@/assets/images/hotkeys/icons/all/btnblink.jpg') no-repeat center;
  background-size: cover;
}

.btnblizzard {
  background: url('~@/assets/images/hotkeys/icons/all/btnblizzard.jpg') no-repeat center;
  background-size: cover;
}

.btnbloodelflieutenant {
  background: url('~@/assets/images/hotkeys/icons/all/btnbloodelflieutenant.jpg') no-repeat center;
  background-size: cover;
}

.btnbloodelfpeasant {
  background: url('~@/assets/images/hotkeys/icons/all/btnbloodelfpeasant.jpg') no-repeat center;
  background-size: cover;
}

.btnbloodelfworker {
  background: url('~@/assets/images/hotkeys/icons/all/btnbloodelfworker.jpg') no-repeat center;
  background-size: cover;
}

.btnbloodfiend {
  background: url('~@/assets/images/hotkeys/icons/all/btnbloodfiend.jpg') no-repeat center;
  background-size: cover;
}

.btnbloodlust {
  background: url('~@/assets/images/hotkeys/icons/all/btnbloodlust.jpg') no-repeat center;
  background-size: cover;
}

.btnbloodlustoff {
  background: url('~@/assets/images/hotkeys/icons/all/btnbloodlustoff.jpg') no-repeat center;
  background-size: cover;
}

.btnbloodmage2 {
  background: url('~@/assets/images/hotkeys/icons/all/btnbloodmage2.jpg') no-repeat center;
  background-size: cover;
}

.btnbluedemoness {
  background: url('~@/assets/images/hotkeys/icons/all/btnbluedemoness.jpg') no-repeat center;
  background-size: cover;
}

.btnbluedragonroost {
  background: url('~@/assets/images/hotkeys/icons/all/btnbluedragonroost.jpg') no-repeat center;
  background-size: cover;
}

.btnbluedragonspawn {
  background: url('~@/assets/images/hotkeys/icons/all/btnbluedragonspawn.jpg') no-repeat center;
  background-size: cover;
}

.btnbluemagnataur {
  background: url('~@/assets/images/hotkeys/icons/all/btnbluemagnataur.jpg') no-repeat center;
  background-size: cover;
}

.btnbonechimes {
  background: url('~@/assets/images/hotkeys/icons/all/btnbonechimes.jpg') no-repeat center;
  background-size: cover;
}

.btnboneyard {
  background: url('~@/assets/images/hotkeys/icons/all/btnboneyard.jpg') no-repeat center;
  background-size: cover;
}

.btnbookofthedead {
  background: url('~@/assets/images/hotkeys/icons/all/btnbookofthedead.jpg') no-repeat center;
  background-size: cover;
}

.btnboots {
  background: url('~@/assets/images/hotkeys/icons/all/btnboots.jpg') no-repeat center;
  background-size: cover;
}

.btnbootsofspeed {
  background: url('~@/assets/images/hotkeys/icons/all/btnbootsofspeed.jpg') no-repeat center;
  background-size: cover;
}

.btnbreathoffire {
  background: url('~@/assets/images/hotkeys/icons/all/btnbreathoffire.jpg') no-repeat center;
  background-size: cover;
}

.btnbreathoffrost {
  background: url('~@/assets/images/hotkeys/icons/all/btnbreathoffrost.jpg') no-repeat center;
  background-size: cover;
}

.btnbrigand {
  background: url('~@/assets/images/hotkeys/icons/all/btnbrigand.jpg') no-repeat center;
  background-size: cover;
}

.btnbrilliance {
  background: url('~@/assets/images/hotkeys/icons/all/btnbrilliance.jpg') no-repeat center;
  background-size: cover;
}

.btnbronzedragon {
  background: url('~@/assets/images/hotkeys/icons/all/btnbronzedragon.jpg') no-repeat center;
  background-size: cover;
}

.btnbronzedragonroost {
  background: url('~@/assets/images/hotkeys/icons/all/btnbronzedragonroost.jpg') no-repeat center;
  background-size: cover;
}

.btnbronzedragonwhelp {
  background: url('~@/assets/images/hotkeys/icons/all/btnbronzedragonwhelp.jpg') no-repeat center;
  background-size: cover;
}

.btnbronzedrake {
  background: url('~@/assets/images/hotkeys/icons/all/btnbronzedrake.jpg') no-repeat center;
  background-size: cover;
}

.btnbroodmother {
  background: url('~@/assets/images/hotkeys/icons/all/btnbroodmother.jpg') no-repeat center;
  background-size: cover;
}

.btnbundleoflumber {
  background: url('~@/assets/images/hotkeys/icons/all/btnbundleoflumber.jpg') no-repeat center;
  background-size: cover;
}

.btnburningarcher {
  background: url('~@/assets/images/hotkeys/icons/all/btnburningarcher.jpg') no-repeat center;
  background-size: cover;
}

.btncairnebloodhoof {
  background: url('~@/assets/images/hotkeys/icons/all/btncairnebloodhoof.jpg') no-repeat center;
  background-size: cover;
}

.btncalltoarms {
  background: url('~@/assets/images/hotkeys/icons/all/btncalltoarms.jpg') no-repeat center;
  background-size: cover;
}

.btncancel {
  background: url('~@/assets/images/hotkeys/icons/all/btncancel.jpg') no-repeat center;
  background-size: cover;
}

.btncannibalize {
  background: url('~@/assets/images/hotkeys/icons/all/btncannibalize.jpg') no-repeat center;
  background-size: cover;
}

.btncannontower {
  background: url('~@/assets/images/hotkeys/icons/all/btncannontower.jpg') no-repeat center;
  background-size: cover;
}

.btncarrionscarabs {
  background: url('~@/assets/images/hotkeys/icons/all/btncarrionscarabs.jpg') no-repeat center;
  background-size: cover;
}

.btncarrionscarabslv1 {
  background: url('~@/assets/images/hotkeys/icons/all/btncarrionscarabslv1.jpg') no-repeat center;
  background-size: cover;
}

.btncarrionscarabslv2 {
  background: url('~@/assets/images/hotkeys/icons/all/btncarrionscarabslv2.jpg') no-repeat center;
  background-size: cover;
}

.btncarrionscarabslv3 {
  background: url('~@/assets/images/hotkeys/icons/all/btncarrionscarabslv3.jpg') no-repeat center;
  background-size: cover;
}

.btncarrionscarabsoff {
  background: url('~@/assets/images/hotkeys/icons/all/btncarrionscarabsoff.jpg') no-repeat center;
  background-size: cover;
}

.btncarrionswarm {
  background: url('~@/assets/images/hotkeys/icons/all/btncarrionswarm.jpg') no-repeat center;
  background-size: cover;
}

.btncastle {
  background: url('~@/assets/images/hotkeys/icons/all/btncastle.jpg') no-repeat center;
  background-size: cover;
}

.btncenarius {
  background: url('~@/assets/images/hotkeys/icons/all/btncenarius.jpg') no-repeat center;
  background-size: cover;
}

.btncentaur {
  background: url('~@/assets/images/hotkeys/icons/all/btncentaur.jpg') no-repeat center;
  background-size: cover;
}

.btncentaurarcher {
  background: url('~@/assets/images/hotkeys/icons/all/btncentaurarcher.jpg') no-repeat center;
  background-size: cover;
}

.btncentaurimpaler {
  background: url('~@/assets/images/hotkeys/icons/all/btncentaurimpaler.jpg') no-repeat center;
  background-size: cover;
}

.btncentaurkhan {
  background: url('~@/assets/images/hotkeys/icons/all/btncentaurkhan.jpg') no-repeat center;
  background-size: cover;
}

.btncentauroutrunner {
  background: url('~@/assets/images/hotkeys/icons/all/btncentauroutrunner.jpg') no-repeat center;
  background-size: cover;
}

.btncentaursorcerer {
  background: url('~@/assets/images/hotkeys/icons/all/btncentaursorcerer.jpg') no-repeat center;
  background-size: cover;
}

.btnchainlightning {
  background: url('~@/assets/images/hotkeys/icons/all/btnchainlightning.jpg') no-repeat center;
  background-size: cover;
}

.btnchaosblademaster {
  background: url('~@/assets/images/hotkeys/icons/all/btnchaosblademaster.jpg') no-repeat center;
  background-size: cover;
}

.btnchaosgrom {
  background: url('~@/assets/images/hotkeys/icons/all/btnchaosgrom.jpg') no-repeat center;
  background-size: cover;
}

.btnchaosgrunt {
  background: url('~@/assets/images/hotkeys/icons/all/btnchaosgrunt.jpg') no-repeat center;
  background-size: cover;
}

.btnchaoskodobeast {
  background: url('~@/assets/images/hotkeys/icons/all/btnchaoskodobeast.jpg') no-repeat center;
  background-size: cover;
}

.btnchaospeon {
  background: url('~@/assets/images/hotkeys/icons/all/btnchaospeon.jpg') no-repeat center;
  background-size: cover;
}

.btnchaoswarlock {
  background: url('~@/assets/images/hotkeys/icons/all/btnchaoswarlock.jpg') no-repeat center;
  background-size: cover;
}

.btnchaoswarlockgreen {
  background: url('~@/assets/images/hotkeys/icons/all/btnchaoswarlockgreen.jpg') no-repeat center;
  background-size: cover;
}

.btnchaoswarlord {
  background: url('~@/assets/images/hotkeys/icons/all/btnchaoswarlord.jpg') no-repeat center;
  background-size: cover;
}

.btnchaoswolfrider {
  background: url('~@/assets/images/hotkeys/icons/all/btnchaoswolfrider.jpg') no-repeat center;
  background-size: cover;
}

.btnchaplain {
  background: url('~@/assets/images/hotkeys/icons/all/btnchaplain.jpg') no-repeat center;
  background-size: cover;
}

.btncharm {
  background: url('~@/assets/images/hotkeys/icons/all/btncharm.jpg') no-repeat center;
  background-size: cover;
}

.btnchemicalrage {
  background: url('~@/assets/images/hotkeys/icons/all/btnchemicalrage.jpg') no-repeat center;
  background-size: cover;
}

.btnchenstormstout {
  background: url('~@/assets/images/hotkeys/icons/all/btnchenstormstout.jpg') no-repeat center;
  background-size: cover;
}

.btnchestofgold {
  background: url('~@/assets/images/hotkeys/icons/all/btnchestofgold.jpg') no-repeat center;
  background-size: cover;
}

.btnchimaera {
  background: url('~@/assets/images/hotkeys/icons/all/btnchimaera.jpg') no-repeat center;
  background-size: cover;
}

.btnchimaeraroost {
  background: url('~@/assets/images/hotkeys/icons/all/btnchimaeraroost.jpg') no-repeat center;
  background-size: cover;
}

.btnchime {
  background: url('~@/assets/images/hotkeys/icons/all/btnchime.jpg') no-repeat center;
  background-size: cover;
}

.btncirclet {
  background: url('~@/assets/images/hotkeys/icons/all/btncirclet.jpg') no-repeat center;
  background-size: cover;
}

.btnclawsofattack {
  background: url('~@/assets/images/hotkeys/icons/all/btnclawsofattack.jpg') no-repeat center;
  background-size: cover;
}

.btnclayfigurine {
  background: url('~@/assets/images/hotkeys/icons/all/btnclayfigurine.jpg') no-repeat center;
  background-size: cover;
}

.btncleavingattack {
  background: url('~@/assets/images/hotkeys/icons/all/btncleavingattack.jpg') no-repeat center;
  background-size: cover;
}

.btncloak {
  background: url('~@/assets/images/hotkeys/icons/all/btncloak.jpg') no-repeat center;
  background-size: cover;
}

.btncloakofflames {
  background: url('~@/assets/images/hotkeys/icons/all/btncloakofflames.jpg') no-repeat center;
  background-size: cover;
}

.btnclockwerkgoblin {
  background: url('~@/assets/images/hotkeys/icons/all/btnclockwerkgoblin.jpg') no-repeat center;
  background-size: cover;
}

.btncloudoffog {
  background: url('~@/assets/images/hotkeys/icons/all/btncloudoffog.jpg') no-repeat center;
  background-size: cover;
}

.btnclusterrockets {
  background: url('~@/assets/images/hotkeys/icons/all/btnclusterrockets.jpg') no-repeat center;
  background-size: cover;
}

.btncoldarrows {
  background: url('~@/assets/images/hotkeys/icons/all/btncoldarrows.jpg') no-repeat center;
  background-size: cover;
}

.btncoldarrowsoff {
  background: url('~@/assets/images/hotkeys/icons/all/btncoldarrowsoff.jpg') no-repeat center;
  background-size: cover;
}

.btncoldtower {
  background: url('~@/assets/images/hotkeys/icons/all/btncoldtower.jpg') no-repeat center;
  background-size: cover;
}

.btncommand {
  background: url('~@/assets/images/hotkeys/icons/all/btncommand.jpg') no-repeat center;
  background-size: cover;
}

.btncontrolmagic {
  background: url('~@/assets/images/hotkeys/icons/all/btncontrolmagic.jpg') no-repeat center;
  background-size: cover;
}

.btncoralbed {
  background: url('~@/assets/images/hotkeys/icons/all/btncoralbed.jpg') no-repeat center;
  background-size: cover;
}

.btncorpseexplode {
  background: url('~@/assets/images/hotkeys/icons/all/btncorpseexplode.jpg') no-repeat center;
  background-size: cover;
}

.btncorrosivebreath {
  background: url('~@/assets/images/hotkeys/icons/all/btncorrosivebreath.jpg') no-repeat center;
  background-size: cover;
}

.btncorruptedancientofwar {
  background: url('~@/assets/images/hotkeys/icons/all/btncorruptedancientofwar.jpg') no-repeat center;
  background-size: cover;
}

.btncorruptedancientprotector {
  background: url('~@/assets/images/hotkeys/icons/all/btncorruptedancientprotector.jpg') no-repeat center;
  background-size: cover;
}

.btncorruptedent {
  background: url('~@/assets/images/hotkeys/icons/all/btncorruptedent.jpg') no-repeat center;
  background-size: cover;
}

.btncorruptedmoonwell {
  background: url('~@/assets/images/hotkeys/icons/all/btncorruptedmoonwell.jpg') no-repeat center;
  background-size: cover;
}

.btncorruptedtreeofages {
  background: url('~@/assets/images/hotkeys/icons/all/btncorruptedtreeofages.jpg') no-repeat center;
  background-size: cover;
}

.btncorruptedtreeofeternity {
  background: url('~@/assets/images/hotkeys/icons/all/btncorruptedtreeofeternity.jpg') no-repeat center;
  background-size: cover;
}

.btncorruptedtreeoflife {
  background: url('~@/assets/images/hotkeys/icons/all/btncorruptedtreeoflife.jpg') no-repeat center;
  background-size: cover;
}

.btncreatureattack {
  background: url('~@/assets/images/hotkeys/icons/all/btncreatureattack.jpg') no-repeat center;
  background-size: cover;
}

.btncreaturecarapace {
  background: url('~@/assets/images/hotkeys/icons/all/btncreaturecarapace.jpg') no-repeat center;
  background-size: cover;
}

.btncripple {
  background: url('~@/assets/images/hotkeys/icons/all/btncripple.jpg') no-repeat center;
  background-size: cover;
}

.btncriticalstrike {
  background: url('~@/assets/images/hotkeys/icons/all/btncriticalstrike.jpg') no-repeat center;
  background-size: cover;
}

.btncrushingwave {
  background: url('~@/assets/images/hotkeys/icons/all/btncrushingwave.jpg') no-repeat center;
  background-size: cover;
}

.btncrypt {
  background: url('~@/assets/images/hotkeys/icons/all/btncrypt.jpg') no-repeat center;
  background-size: cover;
}

.btncryptfiend {
  background: url('~@/assets/images/hotkeys/icons/all/btncryptfiend.jpg') no-repeat center;
  background-size: cover;
}

.btncryptfiendburrow {
  background: url('~@/assets/images/hotkeys/icons/all/btncryptfiendburrow.jpg') no-repeat center;
  background-size: cover;
}

.btncryptfiendunburrow {
  background: url('~@/assets/images/hotkeys/icons/all/btncryptfiendunburrow.jpg') no-repeat center;
  background-size: cover;
}

.btncrystalball {
  background: url('~@/assets/images/hotkeys/icons/all/btncrystalball.jpg') no-repeat center;
  background-size: cover;
}

.btncurse {
  background: url('~@/assets/images/hotkeys/icons/all/btncurse.jpg') no-repeat center;
  background-size: cover;
}

.btncurseoff {
  background: url('~@/assets/images/hotkeys/icons/all/btncurseoff.jpg') no-repeat center;
  background-size: cover;
}

.btncyclone {
  background: url('~@/assets/images/hotkeys/icons/all/btncyclone.jpg') no-repeat center;
  background-size: cover;
}

.btndaggerofescape {
  background: url('~@/assets/images/hotkeys/icons/all/btndaggerofescape.jpg') no-repeat center;
  background-size: cover;
}

.btndagrentheorcslayer {
  background: url('~@/assets/images/hotkeys/icons/all/btndagrentheorcslayer.jpg') no-repeat center;
  background-size: cover;
}

.btndalaranguardtower {
  background: url('~@/assets/images/hotkeys/icons/all/btndalaranguardtower.jpg') no-repeat center;
  background-size: cover;
}

.btndalaranmutant {
  background: url('~@/assets/images/hotkeys/icons/all/btndalaranmutant.jpg') no-repeat center;
  background-size: cover;
}

.btndalaranreject {
  background: url('~@/assets/images/hotkeys/icons/all/btndalaranreject.jpg') no-repeat center;
  background-size: cover;
}

.btndalvengyr {
  background: url('~@/assets/images/hotkeys/icons/all/btndalvengyr.jpg') no-repeat center;
  background-size: cover;
}

.btndarkminion {
  background: url('~@/assets/images/hotkeys/icons/all/btndarkminion.jpg') no-repeat center;
  background-size: cover;
}

.btndarkritual {
  background: url('~@/assets/images/hotkeys/icons/all/btndarkritual.jpg') no-repeat center;
  background-size: cover;
}

.btndarksummoning {
  background: url('~@/assets/images/hotkeys/icons/all/btndarksummoning.jpg') no-repeat center;
  background-size: cover;
}

.btndarktroll {
  background: url('~@/assets/images/hotkeys/icons/all/btndarktroll.jpg') no-repeat center;
  background-size: cover;
}

.btndarktrollberserker {
  background: url('~@/assets/images/hotkeys/icons/all/btndarktrollberserker.jpg') no-repeat center;
  background-size: cover;
}

.btndarktrollhighpriest {
  background: url('~@/assets/images/hotkeys/icons/all/btndarktrollhighpriest.jpg') no-repeat center;
  background-size: cover;
}

.btndarktrollshadowpriest {
  background: url('~@/assets/images/hotkeys/icons/all/btndarktrollshadowpriest.jpg') no-repeat center;
  background-size: cover;
}

.btndarktrolltrapper {
  background: url('~@/assets/images/hotkeys/icons/all/btndarktrolltrapper.jpg') no-repeat center;
  background-size: cover;
}

.btndarktrollwarlord {
  background: url('~@/assets/images/hotkeys/icons/all/btndarktrollwarlord.jpg') no-repeat center;
  background-size: cover;
}

.btndeathanddecay {
  background: url('~@/assets/images/hotkeys/icons/all/btndeathanddecay.jpg') no-repeat center;
  background-size: cover;
}

.btndeathcoil {
  background: url('~@/assets/images/hotkeys/icons/all/btndeathcoil.jpg') no-repeat center;
  background-size: cover;
}

.btndeathpact {
  background: url('~@/assets/images/hotkeys/icons/all/btndeathpact.jpg') no-repeat center;
  background-size: cover;
}

.btndeathrevenant {
  background: url('~@/assets/images/hotkeys/icons/all/btndeathrevenant.jpg') no-repeat center;
  background-size: cover;
}

.btndeathtower {
  background: url('~@/assets/images/hotkeys/icons/all/btndeathtower.jpg') no-repeat center;
  background-size: cover;
}

.btndeceiver {
  background: url('~@/assets/images/hotkeys/icons/all/btndeceiver.jpg') no-repeat center;
  background-size: cover;
}

.btndeeplordrevenant {
  background: url('~@/assets/images/hotkeys/icons/all/btndeeplordrevenant.jpg') no-repeat center;
  background-size: cover;
}

.btndefend {
  background: url('~@/assets/images/hotkeys/icons/all/btndefend.jpg') no-repeat center;
  background-size: cover;
}

.btndemolish {
  background: url('~@/assets/images/hotkeys/icons/all/btndemolish.jpg') no-repeat center;
  background-size: cover;
}

.btndemolisher {
  background: url('~@/assets/images/hotkeys/icons/all/btndemolisher.jpg') no-repeat center;
  background-size: cover;
}

.btndemoness {
  background: url('~@/assets/images/hotkeys/icons/all/btndemoness.jpg') no-repeat center;
  background-size: cover;
}

.btndemonhunterdemonform {
  background: url('~@/assets/images/hotkeys/icons/all/btndemonhunterdemonform.jpg') no-repeat center;
  background-size: cover;
}

.btndenofwonders {
  background: url('~@/assets/images/hotkeys/icons/all/btndenofwonders.jpg') no-repeat center;
  background-size: cover;
}

.btndepthsrevenant {
  background: url('~@/assets/images/hotkeys/icons/all/btndepthsrevenant.jpg') no-repeat center;
  background-size: cover;
}

.btndestroyer {
  background: url('~@/assets/images/hotkeys/icons/all/btndestroyer.jpg') no-repeat center;
  background-size: cover;
}

.btndetheroc {
  background: url('~@/assets/images/hotkeys/icons/all/btndetheroc.jpg') no-repeat center;
  background-size: cover;
}

.btndevotion {
  background: url('~@/assets/images/hotkeys/icons/all/btndevotion.jpg') no-repeat center;
  background-size: cover;
}

.btndevour {
  background: url('~@/assets/images/hotkeys/icons/all/btndevour.jpg') no-repeat center;
  background-size: cover;
}

.btndevourmagic {
  background: url('~@/assets/images/hotkeys/icons/all/btndevourmagic.jpg') no-repeat center;
  background-size: cover;
}

.btndirewolf {
  background: url('~@/assets/images/hotkeys/icons/all/btndirewolf.jpg') no-repeat center;
  background-size: cover;
}

.btndirewolflv2 {
  background: url('~@/assets/images/hotkeys/icons/all/btndirewolflv2.jpg') no-repeat center;
  background-size: cover;
}

.btndisenchant {
  background: url('~@/assets/images/hotkeys/icons/all/btndisenchant.jpg') no-repeat center;
  background-size: cover;
}

.btndispelmagic {
  background: url('~@/assets/images/hotkeys/icons/all/btndispelmagic.jpg') no-repeat center;
  background-size: cover;
}

.btndivineintervention {
  background: url('~@/assets/images/hotkeys/icons/all/btndivineintervention.jpg') no-repeat center;
  background-size: cover;
}

.btndivineshieldoff {
  background: url('~@/assets/images/hotkeys/icons/all/btndivineshieldoff.jpg') no-repeat center;
  background-size: cover;
}

.btndizzy {
  background: url('~@/assets/images/hotkeys/icons/all/btndizzy.jpg') no-repeat center;
  background-size: cover;
}

.btndocadepttraining {
  background: url('~@/assets/images/hotkeys/icons/all/btndocadepttraining.jpg') no-repeat center;
  background-size: cover;
}

.btndocmastertraining {
  background: url('~@/assets/images/hotkeys/icons/all/btndocmastertraining.jpg') no-repeat center;
  background-size: cover;
}

.btndoom {
  background: url('~@/assets/images/hotkeys/icons/all/btndoom.jpg') no-repeat center;
  background-size: cover;
}

.btndoomguard {
  background: url('~@/assets/images/hotkeys/icons/all/btndoomguard.jpg') no-repeat center;
  background-size: cover;
}

.btndotadepttraining {
  background: url('~@/assets/images/hotkeys/icons/all/btndotadepttraining.jpg') no-repeat center;
  background-size: cover;
}

.btndotmastertraining {
  background: url('~@/assets/images/hotkeys/icons/all/btndotmastertraining.jpg') no-repeat center;
  background-size: cover;
}

.btndragonhawk {
  background: url('~@/assets/images/hotkeys/icons/all/btndragonhawk.jpg') no-repeat center;
  background-size: cover;
}

.btndragonhawkrider {
  background: url('~@/assets/images/hotkeys/icons/all/btndragonhawkrider.jpg') no-repeat center;
  background-size: cover;
}

.btndragonhawkriderv0 {
  background: url('~@/assets/images/hotkeys/icons/all/btndragonhawkriderv0.jpg') no-repeat center;
  background-size: cover;
}

.btndragonroost {
  background: url('~@/assets/images/hotkeys/icons/all/btndragonroost.jpg') no-repeat center;
  background-size: cover;
}

.btndragonspawnoverseer {
  background: url('~@/assets/images/hotkeys/icons/all/btndragonspawnoverseer.jpg') no-repeat center;
  background-size: cover;
}

.btndragonturtlered {
  background: url('~@/assets/images/hotkeys/icons/all/btndragonturtlered.jpg') no-repeat center;
  background-size: cover;
}

.btndrain {
  background: url('~@/assets/images/hotkeys/icons/all/btndrain.jpg') no-repeat center;
  background-size: cover;
}

.btndranai {
  background: url('~@/assets/images/hotkeys/icons/all/btndranai.jpg') no-repeat center;
  background-size: cover;
}

.btndranaiakama {
  background: url('~@/assets/images/hotkeys/icons/all/btndranaiakama.jpg') no-repeat center;
  background-size: cover;
}

.btndranaibarracks {
  background: url('~@/assets/images/hotkeys/icons/all/btndranaibarracks.jpg') no-repeat center;
  background-size: cover;
}

.btndranaichiefhut {
  background: url('~@/assets/images/hotkeys/icons/all/btndranaichiefhut.jpg') no-repeat center;
  background-size: cover;
}

.btndranaidarkslayer {
  background: url('~@/assets/images/hotkeys/icons/all/btndranaidarkslayer.jpg') no-repeat center;
  background-size: cover;
}

.btndranaidemolisher {
  background: url('~@/assets/images/hotkeys/icons/all/btndranaidemolisher.jpg') no-repeat center;
  background-size: cover;
}

.btndranaiharbinger {
  background: url('~@/assets/images/hotkeys/icons/all/btndranaiharbinger.jpg') no-repeat center;
  background-size: cover;
}

.btndranaihaven {
  background: url('~@/assets/images/hotkeys/icons/all/btndranaihaven.jpg') no-repeat center;
  background-size: cover;
}

.btndranaihut {
  background: url('~@/assets/images/hotkeys/icons/all/btndranaihut.jpg') no-repeat center;
  background-size: cover;
}

.btndranailaborer {
  background: url('~@/assets/images/hotkeys/icons/all/btndranailaborer.jpg') no-repeat center;
  background-size: cover;
}

.btndranaimage {
  background: url('~@/assets/images/hotkeys/icons/all/btndranaimage.jpg') no-repeat center;
  background-size: cover;
}

.btndranaiprotocter {
  background: url('~@/assets/images/hotkeys/icons/all/btndranaiprotocter.jpg') no-repeat center;
  background-size: cover;
}

.btndranaiseer {
  background: url('~@/assets/images/hotkeys/icons/all/btndranaiseer.jpg') no-repeat center;
  background-size: cover;
}

.btndranaistalker {
  background: url('~@/assets/images/hotkeys/icons/all/btndranaistalker.jpg') no-repeat center;
  background-size: cover;
}

.btndranaivindicator {
  background: url('~@/assets/images/hotkeys/icons/all/btndranaivindicator.jpg') no-repeat center;
  background-size: cover;
}

.btndranaiwatcher {
  background: url('~@/assets/images/hotkeys/icons/all/btndranaiwatcher.jpg') no-repeat center;
  background-size: cover;
}

.btndrekthar {
  background: url('~@/assets/images/hotkeys/icons/all/btndrekthar.jpg') no-repeat center;
  background-size: cover;
}

.btndruidoftheclaw {
  background: url('~@/assets/images/hotkeys/icons/all/btndruidoftheclaw.jpg') no-repeat center;
  background-size: cover;
}

.btndruidofthetalon {
  background: url('~@/assets/images/hotkeys/icons/all/btndruidofthetalon.jpg') no-repeat center;
  background-size: cover;
}

.btndrum {
  background: url('~@/assets/images/hotkeys/icons/all/btndrum.jpg') no-repeat center;
  background-size: cover;
}

.btndrunkendodge {
  background: url('~@/assets/images/hotkeys/icons/all/btndrunkendodge.jpg') no-repeat center;
  background-size: cover;
}

.btndryad {
  background: url('~@/assets/images/hotkeys/icons/all/btndryad.jpg') no-repeat center;
  background-size: cover;
}

.btndryaddispelmagic {
  background: url('~@/assets/images/hotkeys/icons/all/btndryaddispelmagic.jpg') no-repeat center;
  background-size: cover;
}

.btndryaddispelmagicoff {
  background: url('~@/assets/images/hotkeys/icons/all/btndryaddispelmagicoff.jpg') no-repeat center;
  background-size: cover;
}

.btndustofappearance {
  background: url('~@/assets/images/hotkeys/icons/all/btndustofappearance.jpg') no-repeat center;
  background-size: cover;
}

.btndwarvenlongrifle {
  background: url('~@/assets/images/hotkeys/icons/all/btndwarvenlongrifle.jpg') no-repeat center;
  background-size: cover;
}

.btnearthbrewmaster {
  background: url('~@/assets/images/hotkeys/icons/all/btnearthbrewmaster.jpg') no-repeat center;
  background-size: cover;
}

.btnearthfurytower {
  background: url('~@/assets/images/hotkeys/icons/all/btnearthfurytower.jpg') no-repeat center;
  background-size: cover;
}

.btnearthquake {
  background: url('~@/assets/images/hotkeys/icons/all/btnearthquake.jpg') no-repeat center;
  background-size: cover;
}

.btneattree {
  background: url('~@/assets/images/hotkeys/icons/all/btneattree.jpg') no-repeat center;
  background-size: cover;
}

.btnelderhydra {
  background: url('~@/assets/images/hotkeys/icons/all/btnelderhydra.jpg') no-repeat center;
  background-size: cover;
}

.btnelderjunglebeast {
  background: url('~@/assets/images/hotkeys/icons/all/btnelderjunglebeast.jpg') no-repeat center;
  background-size: cover;
}

.btneldervoidwalker {
  background: url('~@/assets/images/hotkeys/icons/all/btneldervoidwalker.jpg') no-repeat center;
  background-size: cover;
}

.btnelfvillager {
  background: url('~@/assets/images/hotkeys/icons/all/btnelfvillager.jpg') no-repeat center;
  background-size: cover;
}

.btnelunesblessing {
  background: url('~@/assets/images/hotkeys/icons/all/btnelunesblessing.jpg') no-repeat center;
  background-size: cover;
}

.btnelvenfarm {
  background: url('~@/assets/images/hotkeys/icons/all/btnelvenfarm.jpg') no-repeat center;
  background-size: cover;
}

.btnelvenguardtower {
  background: url('~@/assets/images/hotkeys/icons/all/btnelvenguardtower.jpg') no-repeat center;
  background-size: cover;
}

.btnemissary {
  background: url('~@/assets/images/hotkeys/icons/all/btnemissary.jpg') no-repeat center;
  background-size: cover;
}

.btnenchantedbears {
  background: url('~@/assets/images/hotkeys/icons/all/btnenchantedbears.jpg') no-repeat center;
  background-size: cover;
}

.btnenchantedcrows {
  background: url('~@/assets/images/hotkeys/icons/all/btnenchantedcrows.jpg') no-repeat center;
  background-size: cover;
}

.btnenergytower {
  background: url('~@/assets/images/hotkeys/icons/all/btnenergytower.jpg') no-repeat center;
  background-size: cover;
}

.btnenforcer {
  background: url('~@/assets/images/hotkeys/icons/all/btnenforcer.jpg') no-repeat center;
  background-size: cover;
}

.btnengineergazlowe {
  background: url('~@/assets/images/hotkeys/icons/all/btnengineergazlowe.jpg') no-repeat center;
  background-size: cover;
}

.btnengineeringupgrade {
  background: url('~@/assets/images/hotkeys/icons/all/btnengineeringupgrade.jpg') no-repeat center;
  background-size: cover;
}

.btnenragedelemental {
  background: url('~@/assets/images/hotkeys/icons/all/btnenragedelemental.jpg') no-repeat center;
  background-size: cover;
}

.btnenragedjunglebeast {
  background: url('~@/assets/images/hotkeys/icons/all/btnenragedjunglebeast.jpg') no-repeat center;
  background-size: cover;
}

.btnenragedwildkin {
  background: url('~@/assets/images/hotkeys/icons/all/btnenragedwildkin.jpg') no-repeat center;
  background-size: cover;
}

.btnensnare {
  background: url('~@/assets/images/hotkeys/icons/all/btnensnare.jpg') no-repeat center;
  background-size: cover;
}

.btnent {
  background: url('~@/assets/images/hotkeys/icons/all/btnent.jpg') no-repeat center;
  background-size: cover;
}

.btnentanglemine {
  background: url('~@/assets/images/hotkeys/icons/all/btnentanglemine.jpg') no-repeat center;
  background-size: cover;
}

.btnentanglingroots {
  background: url('~@/assets/images/hotkeys/icons/all/btnentanglingroots.jpg') no-repeat center;
  background-size: cover;
}

.btnenvenomedspear {
  background: url('~@/assets/images/hotkeys/icons/all/btnenvenomedspear.jpg') no-repeat center;
  background-size: cover;
}

.btneredarred {
  background: url('~@/assets/images/hotkeys/icons/all/btneredarred.jpg') no-repeat center;
  background-size: cover;
}

.btneredarsorcerer {
  background: url('~@/assets/images/hotkeys/icons/all/btneredarsorcerer.jpg') no-repeat center;
  background-size: cover;
}

.btneredarwarlock {
  background: url('~@/assets/images/hotkeys/icons/all/btneredarwarlock.jpg') no-repeat center;
  background-size: cover;
}

.btneredarwarlockpurple {
  background: url('~@/assets/images/hotkeys/icons/all/btneredarwarlockpurple.jpg') no-repeat center;
  background-size: cover;
}

.btnetherealformon {
  background: url('~@/assets/images/hotkeys/icons/all/btnetherealformon.jpg') no-repeat center;
  background-size: cover;
}

.btnevasion {
  background: url('~@/assets/images/hotkeys/icons/all/btnevasion.jpg') no-repeat center;
  background-size: cover;
}

.btnevilillidan {
  background: url('~@/assets/images/hotkeys/icons/all/btnevilillidan.jpg') no-repeat center;
  background-size: cover;
}

.btnexhumecorpses {
  background: url('~@/assets/images/hotkeys/icons/all/btnexhumecorpses.jpg') no-repeat center;
  background-size: cover;
}

.btnfacelessone {
  background: url('~@/assets/images/hotkeys/icons/all/btnfacelessone.jpg') no-repeat center;
  background-size: cover;
}

.btnfacelessonedeathbringer {
  background: url('~@/assets/images/hotkeys/icons/all/btnfacelessonedeathbringer.jpg') no-repeat center;
  background-size: cover;
}

.btnfacelessoneterror {
  background: url('~@/assets/images/hotkeys/icons/all/btnfacelessoneterror.jpg') no-repeat center;
  background-size: cover;
}

.btnfaeriedragon {
  background: url('~@/assets/images/hotkeys/icons/all/btnfaeriedragon.jpg') no-repeat center;
  background-size: cover;
}

.btnfaeriefire {
  background: url('~@/assets/images/hotkeys/icons/all/btnfaeriefire.jpg') no-repeat center;
  background-size: cover;
}

.btnfaeriefireoff {
  background: url('~@/assets/images/hotkeys/icons/all/btnfaeriefireoff.jpg') no-repeat center;
  background-size: cover;
}

.btnfallenpriest {
  background: url('~@/assets/images/hotkeys/icons/all/btnfallenpriest.jpg') no-repeat center;
  background-size: cover;
}

.btnfanofknives {
  background: url('~@/assets/images/hotkeys/icons/all/btnfanofknives.jpg') no-repeat center;
  background-size: cover;
}

.btnfarm {
  background: url('~@/assets/images/hotkeys/icons/all/btnfarm.jpg') no-repeat center;
  background-size: cover;
}

.btnfarsight {
  background: url('~@/assets/images/hotkeys/icons/all/btnfarsight.jpg') no-repeat center;
  background-size: cover;
}

.btnfeedback {
  background: url('~@/assets/images/hotkeys/icons/all/btnfeedback.jpg') no-repeat center;
  background-size: cover;
}

.btnfelboar {
  background: url('~@/assets/images/hotkeys/icons/all/btnfelboar.jpg') no-repeat center;
  background-size: cover;
}

.btnfelguard {
  background: url('~@/assets/images/hotkeys/icons/all/btnfelguard.jpg') no-repeat center;
  background-size: cover;
}

.btnfelguardblue {
  background: url('~@/assets/images/hotkeys/icons/all/btnfelguardblue.jpg') no-repeat center;
  background-size: cover;
}

.btnfelhound {
  background: url('~@/assets/images/hotkeys/icons/all/btnfelhound.jpg') no-repeat center;
  background-size: cover;
}

.btnfire {
  background: url('~@/assets/images/hotkeys/icons/all/btnfire.jpg') no-repeat center;
  background-size: cover;
}

.btnfirebolt {
  background: url('~@/assets/images/hotkeys/icons/all/btnfirebolt.jpg') no-repeat center;
  background-size: cover;
}

.btnfirebrewmaster {
  background: url('~@/assets/images/hotkeys/icons/all/btnfirebrewmaster.jpg') no-repeat center;
  background-size: cover;
}

.btnfirerevenant {
  background: url('~@/assets/images/hotkeys/icons/all/btnfirerevenant.jpg') no-repeat center;
  background-size: cover;
}

.btnfirerocks {
  background: url('~@/assets/images/hotkeys/icons/all/btnfirerocks.jpg') no-repeat center;
  background-size: cover;
}

.btnflakcannons {
  background: url('~@/assets/images/hotkeys/icons/all/btnflakcannons.jpg') no-repeat center;
  background-size: cover;
}

.btnflametower {
  background: url('~@/assets/images/hotkeys/icons/all/btnflametower.jpg') no-repeat center;
  background-size: cover;
}

.btnflamingarrows {
  background: url('~@/assets/images/hotkeys/icons/all/btnflamingarrows.jpg') no-repeat center;
  background-size: cover;
}

.btnflare {
  background: url('~@/assets/images/hotkeys/icons/all/btnflare.jpg') no-repeat center;
  background-size: cover;
}

.btnfleshgolem {
  background: url('~@/assets/images/hotkeys/icons/all/btnfleshgolem.jpg') no-repeat center;
  background-size: cover;
}

.btnflyingmachine {
  background: url('~@/assets/images/hotkeys/icons/all/btnflyingmachine.jpg') no-repeat center;
  background-size: cover;
}

.btnfootman {
  background: url('~@/assets/images/hotkeys/icons/all/btnfootman.jpg') no-repeat center;
  background-size: cover;
}

.btnforesttroll {
  background: url('~@/assets/images/hotkeys/icons/all/btnforesttroll.jpg') no-repeat center;
  background-size: cover;
}

.btnforesttrollberserker {
  background: url('~@/assets/images/hotkeys/icons/all/btnforesttrollberserker.jpg') no-repeat center;
  background-size: cover;
}

.btnforesttrollhighpriest {
  background: url('~@/assets/images/hotkeys/icons/all/btnforesttrollhighpriest.jpg') no-repeat center;
  background-size: cover;
}

.btnforesttrollshadowpriest {
  background: url('~@/assets/images/hotkeys/icons/all/btnforesttrollshadowpriest.jpg') no-repeat center;
  background-size: cover;
}

.btnforesttrolltrapper {
  background: url('~@/assets/images/hotkeys/icons/all/btnforesttrolltrapper.jpg') no-repeat center;
  background-size: cover;
}

.btnforesttrollwarlord {
  background: url('~@/assets/images/hotkeys/icons/all/btnforesttrollwarlord.jpg') no-repeat center;
  background-size: cover;
}

.btnforge {
  background: url('~@/assets/images/hotkeys/icons/all/btnforge.jpg') no-repeat center;
  background-size: cover;
}

.btnfortress {
  background: url('~@/assets/images/hotkeys/icons/all/btnfortress.jpg') no-repeat center;
  background-size: cover;
}

.btnfragmentationbombs {
  background: url('~@/assets/images/hotkeys/icons/all/btnfragmentationbombs.jpg') no-repeat center;
  background-size: cover;
}

.btnfreezingbreath {
  background: url('~@/assets/images/hotkeys/icons/all/btnfreezingbreath.jpg') no-repeat center;
  background-size: cover;
}

.btnfrost {
  background: url('~@/assets/images/hotkeys/icons/all/btnfrost.jpg') no-repeat center;
  background-size: cover;
}

.btnfrostarmor {
  background: url('~@/assets/images/hotkeys/icons/all/btnfrostarmor.jpg') no-repeat center;
  background-size: cover;
}

.btnfrostarmoroff {
  background: url('~@/assets/images/hotkeys/icons/all/btnfrostarmoroff.jpg') no-repeat center;
  background-size: cover;
}

.btnfrostbear {
  background: url('~@/assets/images/hotkeys/icons/all/btnfrostbear.jpg') no-repeat center;
  background-size: cover;
}

.btnfrostbolt {
  background: url('~@/assets/images/hotkeys/icons/all/btnfrostbolt.jpg') no-repeat center;
  background-size: cover;
}

.btnfrostrevenant {
  background: url('~@/assets/images/hotkeys/icons/all/btnfrostrevenant.jpg') no-repeat center;
  background-size: cover;
}

.btnfrosttower {
  background: url('~@/assets/images/hotkeys/icons/all/btnfrosttower.jpg') no-repeat center;
  background-size: cover;
}

.btnfrostwyrm {
  background: url('~@/assets/images/hotkeys/icons/all/btnfrostwyrm.jpg') no-repeat center;
  background-size: cover;
}

.btnfurblogchampion {
  background: url('~@/assets/images/hotkeys/icons/all/btnfurblogchampion.jpg') no-repeat center;
  background-size: cover;
}

.btnfurbolg {
  background: url('~@/assets/images/hotkeys/icons/all/btnfurbolg.jpg') no-repeat center;
  background-size: cover;
}

.btnfurbolgelder {
  background: url('~@/assets/images/hotkeys/icons/all/btnfurbolgelder.jpg') no-repeat center;
  background-size: cover;
}

.btnfurbolgeldershaman {
  background: url('~@/assets/images/hotkeys/icons/all/btnfurbolgeldershaman.jpg') no-repeat center;
  background-size: cover;
}

.btnfurbolgpanda {
  background: url('~@/assets/images/hotkeys/icons/all/btnfurbolgpanda.jpg') no-repeat center;
  background-size: cover;
}

.btnfurbolgshaman {
  background: url('~@/assets/images/hotkeys/icons/all/btnfurbolgshaman.jpg') no-repeat center;
  background-size: cover;
}

.btnfurbolgtracker {
  background: url('~@/assets/images/hotkeys/icons/all/btnfurbolgtracker.jpg') no-repeat center;
  background-size: cover;
}

.btnfurion {
  background: url('~@/assets/images/hotkeys/icons/all/btnfurion.jpg') no-repeat center;
  background-size: cover;
}

.btngargoyle {
  background: url('~@/assets/images/hotkeys/icons/all/btngargoyle.jpg') no-repeat center;
  background-size: cover;
}

.btngarithos {
  background: url('~@/assets/images/hotkeys/icons/all/btngarithos.jpg') no-repeat center;
  background-size: cover;
}

.btngarthok {
  background: url('~@/assets/images/hotkeys/icons/all/btngarthok.jpg') no-repeat center;
  background-size: cover;
}

.btngathergold {
  background: url('~@/assets/images/hotkeys/icons/all/btngathergold.jpg') no-repeat center;
  background-size: cover;
}

.btngauntletsofogrepower {
  background: url('~@/assets/images/hotkeys/icons/all/btngauntletsofogrepower.jpg') no-repeat center;
  background-size: cover;
}

.btngem {
  background: url('~@/assets/images/hotkeys/icons/all/btngem.jpg') no-repeat center;
  background-size: cover;
}

.btngenericspellimmunity {
  background: url('~@/assets/images/hotkeys/icons/all/btngenericspellimmunity.jpg') no-repeat center;
  background-size: cover;
}

.btnghost {
  background: url('~@/assets/images/hotkeys/icons/all/btnghost.jpg') no-repeat center;
  background-size: cover;
}

.btnghoul {
  background: url('~@/assets/images/hotkeys/icons/all/btnghoul.jpg') no-repeat center;
  background-size: cover;
}

.btnghoulfrenzy {
  background: url('~@/assets/images/hotkeys/icons/all/btnghoulfrenzy.jpg') no-repeat center;
  background-size: cover;
}

.btngiantfrostbear {
  background: url('~@/assets/images/hotkeys/icons/all/btngiantfrostbear.jpg') no-repeat center;
  background-size: cover;
}

.btngiantskeletonwarrior {
  background: url('~@/assets/images/hotkeys/icons/all/btngiantskeletonwarrior.jpg') no-repeat center;
  background-size: cover;
}

.btngiantspider {
  background: url('~@/assets/images/hotkeys/icons/all/btngiantspider.jpg') no-repeat center;
  background-size: cover;
}

.btngiantwolf {
  background: url('~@/assets/images/hotkeys/icons/all/btngiantwolf.jpg') no-repeat center;
  background-size: cover;
}

.btnglacier {
  background: url('~@/assets/images/hotkeys/icons/all/btnglacier.jpg') no-repeat center;
  background-size: cover;
}

.btnglaivethrower {
  background: url('~@/assets/images/hotkeys/icons/all/btnglaivethrower.jpg') no-repeat center;
  background-size: cover;
}

.btnglove {
  background: url('~@/assets/images/hotkeys/icons/all/btnglove.jpg') no-repeat center;
  background-size: cover;
}

.btngnoll {
  background: url('~@/assets/images/hotkeys/icons/all/btngnoll.jpg') no-repeat center;
  background-size: cover;
}

.btngnollarcher {
  background: url('~@/assets/images/hotkeys/icons/all/btngnollarcher.jpg') no-repeat center;
  background-size: cover;
}

.btngnollassassin {
  background: url('~@/assets/images/hotkeys/icons/all/btngnollassassin.jpg') no-repeat center;
  background-size: cover;
}

.btngnollbrute {
  background: url('~@/assets/images/hotkeys/icons/all/btngnollbrute.jpg') no-repeat center;
  background-size: cover;
}

.btngnollcommandaura {
  background: url('~@/assets/images/hotkeys/icons/all/btngnollcommandaura.jpg') no-repeat center;
  background-size: cover;
}

.btngnollking {
  background: url('~@/assets/images/hotkeys/icons/all/btngnollking.jpg') no-repeat center;
  background-size: cover;
}

.btngnollwarden {
  background: url('~@/assets/images/hotkeys/icons/all/btngnollwarden.jpg') no-repeat center;
  background-size: cover;
}

.btngoblinsapper {
  background: url('~@/assets/images/hotkeys/icons/all/btngoblinsapper.jpg') no-repeat center;
  background-size: cover;
}

.btngoblinshipyard {
  background: url('~@/assets/images/hotkeys/icons/all/btngoblinshipyard.jpg') no-repeat center;
  background-size: cover;
}

.btngoblinzeppelin {
  background: url('~@/assets/images/hotkeys/icons/all/btngoblinzeppelin.jpg') no-repeat center;
  background-size: cover;
}

.btngoldmine {
  background: url('~@/assets/images/hotkeys/icons/all/btngoldmine.jpg') no-repeat center;
  background-size: cover;
}

.btngolemstormbolt {
  background: url('~@/assets/images/hotkeys/icons/all/btngolemstormbolt.jpg') no-repeat center;
  background-size: cover;
}

.btngolemthunderclap {
  background: url('~@/assets/images/hotkeys/icons/all/btngolemthunderclap.jpg') no-repeat center;
  background-size: cover;
}

.btngrabtree {
  background: url('~@/assets/images/hotkeys/icons/all/btngrabtree.jpg') no-repeat center;
  background-size: cover;
}

.btngranitegolem {
  background: url('~@/assets/images/hotkeys/icons/all/btngranitegolem.jpg') no-repeat center;
  background-size: cover;
}

.btngraveyard {
  background: url('~@/assets/images/hotkeys/icons/all/btngraveyard.jpg') no-repeat center;
  background-size: cover;
}

.btngreaterdarkminion {
  background: url('~@/assets/images/hotkeys/icons/all/btngreaterdarkminion.jpg') no-repeat center;
  background-size: cover;
}

.btngreaterinvisibility {
  background: url('~@/assets/images/hotkeys/icons/all/btngreaterinvisibility.jpg') no-repeat center;
  background-size: cover;
}

.btngreaterinvulneralbility {
  background: url('~@/assets/images/hotkeys/icons/all/btngreaterinvulneralbility.jpg') no-repeat center;
  background-size: cover;
}

.btngreaterrejuvpotion {
  background: url('~@/assets/images/hotkeys/icons/all/btngreaterrejuvpotion.jpg') no-repeat center;
  background-size: cover;
}

.btngreaterrejuvscroll {
  background: url('~@/assets/images/hotkeys/icons/all/btngreaterrejuvscroll.jpg') no-repeat center;
  background-size: cover;
}

.btngreaterspiritbeast {
  background: url('~@/assets/images/hotkeys/icons/all/btngreaterspiritbeast.jpg') no-repeat center;
  background-size: cover;
}

.btngreatervoidwalker {
  background: url('~@/assets/images/hotkeys/icons/all/btngreatervoidwalker.jpg') no-repeat center;
  background-size: cover;
}

.btngreathall {
  background: url('~@/assets/images/hotkeys/icons/all/btngreathall.jpg') no-repeat center;
  background-size: cover;
}

.btngreendragon {
  background: url('~@/assets/images/hotkeys/icons/all/btngreendragon.jpg') no-repeat center;
  background-size: cover;
}

.btngreendragonroost {
  background: url('~@/assets/images/hotkeys/icons/all/btngreendragonroost.jpg') no-repeat center;
  background-size: cover;
}

.btngreendragonspawn {
  background: url('~@/assets/images/hotkeys/icons/all/btngreendragonspawn.jpg') no-repeat center;
  background-size: cover;
}

.btngreendragonspawnsorcerer {
  background: url('~@/assets/images/hotkeys/icons/all/btngreendragonspawnsorcerer.jpg') no-repeat center;
  background-size: cover;
}

.btngreendragonwhelp {
  background: url('~@/assets/images/hotkeys/icons/all/btngreendragonwhelp.jpg') no-repeat center;
  background-size: cover;
}

.btngreendrake {
  background: url('~@/assets/images/hotkeys/icons/all/btngreendrake.jpg') no-repeat center;
  background-size: cover;
}

.btngreenhydra {
  background: url('~@/assets/images/hotkeys/icons/all/btngreenhydra.jpg') no-repeat center;
  background-size: cover;
}

.btngrimward {
  background: url('~@/assets/images/hotkeys/icons/all/btngrimward.jpg') no-repeat center;
  background-size: cover;
}

.btngrizzlybear {
  background: url('~@/assets/images/hotkeys/icons/all/btngrizzlybear.jpg') no-repeat center;
  background-size: cover;
}

.btngrunt {
  background: url('~@/assets/images/hotkeys/icons/all/btngrunt.jpg') no-repeat center;
  background-size: cover;
}

.btngryphonaviary {
  background: url('~@/assets/images/hotkeys/icons/all/btngryphonaviary.jpg') no-repeat center;
  background-size: cover;
}

.btngryphonrider {
  background: url('~@/assets/images/hotkeys/icons/all/btngryphonrider.jpg') no-repeat center;
  background-size: cover;
}

.btnguardtower {
  background: url('~@/assets/images/hotkeys/icons/all/btnguardtower.jpg') no-repeat center;
  background-size: cover;
}

.btnguldan {
  background: url('~@/assets/images/hotkeys/icons/all/btnguldan.jpg') no-repeat center;
  background-size: cover;
}

.btnguldanskull {
  background: url('~@/assets/images/hotkeys/icons/all/btnguldanskull.jpg') no-repeat center;
  background-size: cover;
}

.btnhalahkthelifebringer {
  background: url('~@/assets/images/hotkeys/icons/all/btnhalahkthelifebringer.jpg') no-repeat center;
  background-size: cover;
}

.btnhallofthedead {
  background: url('~@/assets/images/hotkeys/icons/all/btnhallofthedead.jpg') no-repeat center;
  background-size: cover;
}

.btnhammer {
  background: url('~@/assets/images/hotkeys/icons/all/btnhammer.jpg') no-repeat center;
  background-size: cover;
}

.btnhardenedskin {
  background: url('~@/assets/images/hotkeys/icons/all/btnhardenedskin.jpg') no-repeat center;
  background-size: cover;
}

.btnharpy {
  background: url('~@/assets/images/hotkeys/icons/all/btnharpy.jpg') no-repeat center;
  background-size: cover;
}

.btnharpyqueen {
  background: url('~@/assets/images/hotkeys/icons/all/btnharpyqueen.jpg') no-repeat center;
  background-size: cover;
}

.btnharpyrogue {
  background: url('~@/assets/images/hotkeys/icons/all/btnharpyrogue.jpg') no-repeat center;
  background-size: cover;
}

.btnharpystormhag {
  background: url('~@/assets/images/hotkeys/icons/all/btnharpystormhag.jpg') no-repeat center;
  background-size: cover;
}

.btnharpywitch {
  background: url('~@/assets/images/hotkeys/icons/all/btnharpywitch.jpg') no-repeat center;
  background-size: cover;
}

.btnhauntedmine {
  background: url('~@/assets/images/hotkeys/icons/all/btnhauntedmine.jpg') no-repeat center;
  background-size: cover;
}

.btnheadhunter {
  background: url('~@/assets/images/hotkeys/icons/all/btnheadhunter.jpg') no-repeat center;
  background-size: cover;
}

.btnheadhunterberserker {
  background: url('~@/assets/images/hotkeys/icons/all/btnheadhunterberserker.jpg') no-repeat center;
  background-size: cover;
}

.btnheal {
  background: url('~@/assets/images/hotkeys/icons/all/btnheal.jpg') no-repeat center;
  background-size: cover;
}

.btnhealingsalve {
  background: url('~@/assets/images/hotkeys/icons/all/btnhealingsalve.jpg') no-repeat center;
  background-size: cover;
}

.btnhealingspray {
  background: url('~@/assets/images/hotkeys/icons/all/btnhealingspray.jpg') no-repeat center;
  background-size: cover;
}

.btnhealingward {
  background: url('~@/assets/images/hotkeys/icons/all/btnhealingward.jpg') no-repeat center;
  background-size: cover;
}

.btnhealingwave {
  background: url('~@/assets/images/hotkeys/icons/all/btnhealingwave.jpg') no-repeat center;
  background-size: cover;
}

.btnhealoff {
  background: url('~@/assets/images/hotkeys/icons/all/btnhealoff.jpg') no-repeat center;
  background-size: cover;
}

.btnhealthstone {
  background: url('~@/assets/images/hotkeys/icons/all/btnhealthstone.jpg') no-repeat center;
  background-size: cover;
}

.btnheartofaszune {
  background: url('~@/assets/images/hotkeys/icons/all/btnheartofaszune.jpg') no-repeat center;
  background-size: cover;
}

.btnheartofsearinox {
  background: url('~@/assets/images/hotkeys/icons/all/btnheartofsearinox.jpg') no-repeat center;
  background-size: cover;
}

.btnhellscream {
  background: url('~@/assets/images/hotkeys/icons/all/btnhellscream.jpg') no-repeat center;
  background-size: cover;
}

.btnhelmofvalor {
  background: url('~@/assets/images/hotkeys/icons/all/btnhelmofvalor.jpg') no-repeat center;
  background-size: cover;
}

.btnhelmutpurple {
  background: url('~@/assets/images/hotkeys/icons/all/btnhelmutpurple.jpg') no-repeat center;
  background-size: cover;
}

.btnheretic {
  background: url('~@/assets/images/hotkeys/icons/all/btnheretic.jpg') no-repeat center;
  background-size: cover;
}

.btnheroalchemist {
  background: url('~@/assets/images/hotkeys/icons/all/btnheroalchemist.jpg') no-repeat center;
  background-size: cover;
}

.btnheroarchmage {
  background: url('~@/assets/images/hotkeys/icons/all/btnheroarchmage.jpg') no-repeat center;
  background-size: cover;
}

.btnheroavatarofflame {
  background: url('~@/assets/images/hotkeys/icons/all/btnheroavatarofflame.jpg') no-repeat center;
  background-size: cover;
}

.btnheroblademaster {
  background: url('~@/assets/images/hotkeys/icons/all/btnheroblademaster.jpg') no-repeat center;
  background-size: cover;
}

.btnherobloodelfprince {
  background: url('~@/assets/images/hotkeys/icons/all/btnherobloodelfprince.jpg') no-repeat center;
  background-size: cover;
}

.btnherocryptlord {
  background: url('~@/assets/images/hotkeys/icons/all/btnherocryptlord.jpg') no-repeat center;
  background-size: cover;
}

.btnherodeathknight {
  background: url('~@/assets/images/hotkeys/icons/all/btnherodeathknight.jpg') no-repeat center;
  background-size: cover;
}

.btnherodemonhunter {
  background: url('~@/assets/images/hotkeys/icons/all/btnherodemonhunter.jpg') no-repeat center;
  background-size: cover;
}

.btnherodreadlord {
  background: url('~@/assets/images/hotkeys/icons/all/btnherodreadlord.jpg') no-repeat center;
  background-size: cover;
}

.btnherofarseer {
  background: url('~@/assets/images/hotkeys/icons/all/btnherofarseer.jpg') no-repeat center;
  background-size: cover;
}

.btnherolich {
  background: url('~@/assets/images/hotkeys/icons/all/btnherolich.jpg') no-repeat center;
  background-size: cover;
}

.btnheromoonpriestess {
  background: url('~@/assets/images/hotkeys/icons/all/btnheromoonpriestess.jpg') no-repeat center;
  background-size: cover;
}

.btnheromountainking {
  background: url('~@/assets/images/hotkeys/icons/all/btnheromountainking.jpg') no-repeat center;
  background-size: cover;
}

.btnheropaladin {
  background: url('~@/assets/images/hotkeys/icons/all/btnheropaladin.jpg') no-repeat center;
  background-size: cover;
}

.btnherotaurenchieftain {
  background: url('~@/assets/images/hotkeys/icons/all/btnherotaurenchieftain.jpg') no-repeat center;
  background-size: cover;
}

.btnherotinker {
  background: url('~@/assets/images/hotkeys/icons/all/btnherotinker.jpg') no-repeat center;
  background-size: cover;
}

.btnherowarden {
  background: url('~@/assets/images/hotkeys/icons/all/btnherowarden.jpg') no-repeat center;
  background-size: cover;
}

.btnhex {
  background: url('~@/assets/images/hotkeys/icons/all/btnhex.jpg') no-repeat center;
  background-size: cover;
}

.btnhighelfrunner {
  background: url('~@/assets/images/hotkeys/icons/all/btnhighelfrunner.jpg') no-repeat center;
  background-size: cover;
}

.btnhighelvenarcher {
  background: url('~@/assets/images/hotkeys/icons/all/btnhighelvenarcher.jpg') no-repeat center;
  background-size: cover;
}

.btnhighelvenarcher_v1 {
  background: url('~@/assets/images/hotkeys/icons/all/btnhighelvenarcher_v1.jpg') no-repeat center;
  background-size: cover;
}

.btnhippogriff {
  background: url('~@/assets/images/hotkeys/icons/all/btnhippogriff.jpg') no-repeat center;
  background-size: cover;
}

.btnhippogriffrider {
  background: url('~@/assets/images/hotkeys/icons/all/btnhippogriffrider.jpg') no-repeat center;
  background-size: cover;
}

.btnholdposition {
  background: url('~@/assets/images/hotkeys/icons/all/btnholdposition.jpg') no-repeat center;
  background-size: cover;
}

.btnholybolt {
  background: url('~@/assets/images/hotkeys/icons/all/btnholybolt.jpg') no-repeat center;
  background-size: cover;
}

.btnholywater {
  background: url('~@/assets/images/hotkeys/icons/all/btnholywater.jpg') no-repeat center;
  background-size: cover;
}

.btnhoodofcunning {
  background: url('~@/assets/images/hotkeys/icons/all/btnhoodofcunning.jpg') no-repeat center;
  background-size: cover;
}

.btnhornofcenarius {
  background: url('~@/assets/images/hotkeys/icons/all/btnhornofcenarius.jpg') no-repeat center;
  background-size: cover;
}

.btnhornofdoom {
  background: url('~@/assets/images/hotkeys/icons/all/btnhornofdoom.jpg') no-repeat center;
  background-size: cover;
}

.btnhornoffog {
  background: url('~@/assets/images/hotkeys/icons/all/btnhornoffog.jpg') no-repeat center;
  background-size: cover;
}

.btnhowlofterror {
  background: url('~@/assets/images/hotkeys/icons/all/btnhowlofterror.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanarcanetower {
  background: url('~@/assets/images/hotkeys/icons/all/btnhumanarcanetower.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanarmorupone {
  background: url('~@/assets/images/hotkeys/icons/all/btnhumanarmorupone.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanarmorupthree {
  background: url('~@/assets/images/hotkeys/icons/all/btnhumanarmorupthree.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanarmoruptwo {
  background: url('~@/assets/images/hotkeys/icons/all/btnhumanarmoruptwo.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanartilleryupone {
  background: url('~@/assets/images/hotkeys/icons/all/btnhumanartilleryupone.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanbarracks {
  background: url('~@/assets/images/hotkeys/icons/all/btnhumanbarracks.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanbattleship {
  background: url('~@/assets/images/hotkeys/icons/all/btnhumanbattleship.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanbuild {
  background: url('~@/assets/images/hotkeys/icons/all/btnhumanbuild.jpg') no-repeat center;
  background-size: cover;
}

.btnhumandestroyer {
  background: url('~@/assets/images/hotkeys/icons/all/btnhumandestroyer.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanlumbermill {
  background: url('~@/assets/images/hotkeys/icons/all/btnhumanlumbermill.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanlumberupgrade1 {
  background: url('~@/assets/images/hotkeys/icons/all/btnhumanlumberupgrade1.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanlumberupgrade2 {
  background: url('~@/assets/images/hotkeys/icons/all/btnhumanlumberupgrade2.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanmissileupone {
  background: url('~@/assets/images/hotkeys/icons/all/btnhumanmissileupone.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanmissileupthree {
  background: url('~@/assets/images/hotkeys/icons/all/btnhumanmissileupthree.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanmissileuptwo {
  background: url('~@/assets/images/hotkeys/icons/all/btnhumanmissileuptwo.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanshipyard {
  background: url('~@/assets/images/hotkeys/icons/all/btnhumanshipyard.jpg') no-repeat center;
  background-size: cover;
}

.btnhumantransport {
  background: url('~@/assets/images/hotkeys/icons/all/btnhumantransport.jpg') no-repeat center;
  background-size: cover;
}

.btnhumanwatchtower {
  background: url('~@/assets/images/hotkeys/icons/all/btnhumanwatchtower.jpg') no-repeat center;
  background-size: cover;
}

.btnhuntershall {
  background: url('~@/assets/images/hotkeys/icons/all/btnhuntershall.jpg') no-repeat center;
  background-size: cover;
}

.btnhuntress {
  background: url('~@/assets/images/hotkeys/icons/all/btnhuntress.jpg') no-repeat center;
  background-size: cover;
}

.btnhydra {
  background: url('~@/assets/images/hotkeys/icons/all/btnhydra.jpg') no-repeat center;
  background-size: cover;
}

.btnhydralisk {
  background: url('~@/assets/images/hotkeys/icons/all/btnhydralisk.jpg') no-repeat center;
  background-size: cover;
}

.btnhydrawarstomp {
  background: url('~@/assets/images/hotkeys/icons/all/btnhydrawarstomp.jpg') no-repeat center;
  background-size: cover;
}

.btnhydromancer {
  background: url('~@/assets/images/hotkeys/icons/all/btnhydromancer.jpg') no-repeat center;
  background-size: cover;
}

.btnicerevenant {
  background: url('~@/assets/images/hotkeys/icons/all/btnicerevenant.jpg') no-repeat center;
  background-size: cover;
}

.btnicetroll {
  background: url('~@/assets/images/hotkeys/icons/all/btnicetroll.jpg') no-repeat center;
  background-size: cover;
}

.btnicetrollberserker {
  background: url('~@/assets/images/hotkeys/icons/all/btnicetrollberserker.jpg') no-repeat center;
  background-size: cover;
}

.btnicetrollbeserker {
  background: url('~@/assets/images/hotkeys/icons/all/btnicetrollbeserker.jpg') no-repeat center;
  background-size: cover;
}

.btnicetrollshadowpriest {
  background: url('~@/assets/images/hotkeys/icons/all/btnicetrollshadowpriest.jpg') no-repeat center;
  background-size: cover;
}

.btnicetrollshaman {
  background: url('~@/assets/images/hotkeys/icons/all/btnicetrollshaman.jpg') no-repeat center;
  background-size: cover;
}

.btnicetrolltrapper {
  background: url('~@/assets/images/hotkeys/icons/all/btnicetrolltrapper.jpg') no-repeat center;
  background-size: cover;
}

.btnicetrollwarlord {
  background: url('~@/assets/images/hotkeys/icons/all/btnicetrollwarlord.jpg') no-repeat center;
  background-size: cover;
}

.btnicetuskmammoth {
  background: url('~@/assets/images/hotkeys/icons/all/btnicetuskmammoth.jpg') no-repeat center;
  background-size: cover;
}

.btnillidan {
  background: url('~@/assets/images/hotkeys/icons/all/btnillidan.jpg') no-repeat center;
  background-size: cover;
}

.btnillidandemonform {
  background: url('~@/assets/images/hotkeys/icons/all/btnillidandemonform.jpg') no-repeat center;
  background-size: cover;
}

.btnimbuedmasonry {
  background: url('~@/assets/images/hotkeys/icons/all/btnimbuedmasonry.jpg') no-repeat center;
  background-size: cover;
}

.btnimmolationoff {
  background: url('~@/assets/images/hotkeys/icons/all/btnimmolationoff.jpg') no-repeat center;
  background-size: cover;
}

.btnimmolationon {
  background: url('~@/assets/images/hotkeys/icons/all/btnimmolationon.jpg') no-repeat center;
  background-size: cover;
}

.btnimpale {
  background: url('~@/assets/images/hotkeys/icons/all/btnimpale.jpg') no-repeat center;
  background-size: cover;
}

.btnimpalingbolt {
  background: url('~@/assets/images/hotkeys/icons/all/btnimpalingbolt.jpg') no-repeat center;
  background-size: cover;
}

.btnimprovedbows {
  background: url('~@/assets/images/hotkeys/icons/all/btnimprovedbows.jpg') no-repeat center;
  background-size: cover;
}

.btnimprovedcreatureattack {
  background: url('~@/assets/images/hotkeys/icons/all/btnimprovedcreatureattack.jpg') no-repeat center;
  background-size: cover;
}

.btnimprovedcreaturecarapace {
  background: url('~@/assets/images/hotkeys/icons/all/btnimprovedcreaturecarapace.jpg') no-repeat center;
  background-size: cover;
}

.btnimprovedmoonarmor {
  background: url('~@/assets/images/hotkeys/icons/all/btnimprovedmoonarmor.jpg') no-repeat center;
  background-size: cover;
}

.btnimprovedreinforcedhides {
  background: url('~@/assets/images/hotkeys/icons/all/btnimprovedreinforcedhides.jpg') no-repeat center;
  background-size: cover;
}

.btnimprovedspikedbarricades {
  background: url('~@/assets/images/hotkeys/icons/all/btnimprovedspikedbarricades.jpg') no-repeat center;
  background-size: cover;
}

.btnimprovedstrengthofthemoon {
  background: url('~@/assets/images/hotkeys/icons/all/btnimprovedstrengthofthemoon.jpg') no-repeat center;
  background-size: cover;
}

.btnimprovedstrengthofthewild {
  background: url('~@/assets/images/hotkeys/icons/all/btnimprovedstrengthofthewild.jpg') no-repeat center;
  background-size: cover;
}

.btnimprovedunholyarmor {
  background: url('~@/assets/images/hotkeys/icons/all/btnimprovedunholyarmor.jpg') no-repeat center;
  background-size: cover;
}

.btnimprovedunholystrength {
  background: url('~@/assets/images/hotkeys/icons/all/btnimprovedunholystrength.jpg') no-repeat center;
  background-size: cover;
}

.btnincinerate {
  background: url('~@/assets/images/hotkeys/icons/all/btnincinerate.jpg') no-repeat center;
  background-size: cover;
}

.btnincinerateoff {
  background: url('~@/assets/images/hotkeys/icons/all/btnincinerateoff.jpg') no-repeat center;
  background-size: cover;
}

.btninfernal {
  background: url('~@/assets/images/hotkeys/icons/all/btninfernal.jpg') no-repeat center;
  background-size: cover;
}

.btninfernalcannon {
  background: url('~@/assets/images/hotkeys/icons/all/btninfernalcannon.jpg') no-repeat center;
  background-size: cover;
}

.btninfernalflamecannon {
  background: url('~@/assets/images/hotkeys/icons/all/btninfernalflamecannon.jpg') no-repeat center;
  background-size: cover;
}

.btninfernalmachine {
  background: url('~@/assets/images/hotkeys/icons/all/btninfernalmachine.jpg') no-repeat center;
  background-size: cover;
}

.btninfernalstone {
  background: url('~@/assets/images/hotkeys/icons/all/btninfernalstone.jpg') no-repeat center;
  background-size: cover;
}

.btninnerfire {
  background: url('~@/assets/images/hotkeys/icons/all/btninnerfire.jpg') no-repeat center;
  background-size: cover;
}

.btninnerfireoff {
  background: url('~@/assets/images/hotkeys/icons/all/btninnerfireoff.jpg') no-repeat center;
  background-size: cover;
}

.btninvisibility {
  background: url('~@/assets/images/hotkeys/icons/all/btninvisibility.jpg') no-repeat center;
  background-size: cover;
}

.btninvulnerable {
  background: url('~@/assets/images/hotkeys/icons/all/btninvulnerable.jpg') no-repeat center;
  background-size: cover;
}

.btnjailorkassan {
  background: url('~@/assets/images/hotkeys/icons/all/btnjailorkassan.jpg') no-repeat center;
  background-size: cover;
}

.btnjaina {
  background: url('~@/assets/images/hotkeys/icons/all/btnjaina.jpg') no-repeat center;
  background-size: cover;
}

.btnjanggo {
  background: url('~@/assets/images/hotkeys/icons/all/btnjanggo.jpg') no-repeat center;
  background-size: cover;
}

.btnjuggernaut {
  background: url('~@/assets/images/hotkeys/icons/all/btnjuggernaut.jpg') no-repeat center;
  background-size: cover;
}

.btnjunglebeast {
  background: url('~@/assets/images/hotkeys/icons/all/btnjunglebeast.jpg') no-repeat center;
  background-size: cover;
}

.btnjunkgolem {
  background: url('~@/assets/images/hotkeys/icons/all/btnjunkgolem.jpg') no-repeat center;
  background-size: cover;
}

.btnkeep {
  background: url('~@/assets/images/hotkeys/icons/all/btnkeep.jpg') no-repeat center;
  background-size: cover;
}

.btnkeeperofthegrove {
  background: url('~@/assets/images/hotkeys/icons/all/btnkeeperofthegrove.jpg') no-repeat center;
  background-size: cover;
}

.btnkelthuzad {
  background: url('~@/assets/images/hotkeys/icons/all/btnkelthuzad.jpg') no-repeat center;
  background-size: cover;
}

.btnknight {
  background: url('~@/assets/images/hotkeys/icons/all/btnknight.jpg') no-repeat center;
  background-size: cover;
}

.btnkobold {
  background: url('~@/assets/images/hotkeys/icons/all/btnkobold.jpg') no-repeat center;
  background-size: cover;
}

.btnkoboldgeomancer {
  background: url('~@/assets/images/hotkeys/icons/all/btnkoboldgeomancer.jpg') no-repeat center;
  background-size: cover;
}

.btnkoboldtaskmaster {
  background: url('~@/assets/images/hotkeys/icons/all/btnkoboldtaskmaster.jpg') no-repeat center;
  background-size: cover;
}

.btnkoboldtunneler {
  background: url('~@/assets/images/hotkeys/icons/all/btnkoboldtunneler.jpg') no-repeat center;
  background-size: cover;
}

.btnkodobeast {
  background: url('~@/assets/images/hotkeys/icons/all/btnkodobeast.jpg') no-repeat center;
  background-size: cover;
}

.btnladyvashj {
  background: url('~@/assets/images/hotkeys/icons/all/btnladyvashj.jpg') no-repeat center;
  background-size: cover;
}

.btnlavaspawn {
  background: url('~@/assets/images/hotkeys/icons/all/btnlavaspawn.jpg') no-repeat center;
  background-size: cover;
}

.btnlavaspawnlv2 {
  background: url('~@/assets/images/hotkeys/icons/all/btnlavaspawnlv2.jpg') no-repeat center;
  background-size: cover;
}

.btnlavaspawnlv3 {
  background: url('~@/assets/images/hotkeys/icons/all/btnlavaspawnlv3.jpg') no-repeat center;
  background-size: cover;
}

.btnleatherupgradeone {
  background: url('~@/assets/images/hotkeys/icons/all/btnleatherupgradeone.jpg') no-repeat center;
  background-size: cover;
}

.btnleatherupgradethree {
  background: url('~@/assets/images/hotkeys/icons/all/btnleatherupgradethree.jpg') no-repeat center;
  background-size: cover;
}

.btnleatherupgradetwo {
  background: url('~@/assets/images/hotkeys/icons/all/btnleatherupgradetwo.jpg') no-repeat center;
  background-size: cover;
}

.btnlesserclaritypotion {
  background: url('~@/assets/images/hotkeys/icons/all/btnlesserclaritypotion.jpg') no-repeat center;
  background-size: cover;
}

.btnlesserdarkminion {
  background: url('~@/assets/images/hotkeys/icons/all/btnlesserdarkminion.jpg') no-repeat center;
  background-size: cover;
}

.btnlesserinvisibility {
  background: url('~@/assets/images/hotkeys/icons/all/btnlesserinvisibility.jpg') no-repeat center;
  background-size: cover;
}

.btnlesserinvulneralbility {
  background: url('~@/assets/images/hotkeys/icons/all/btnlesserinvulneralbility.jpg') no-repeat center;
  background-size: cover;
}

.btnlesserrejuvpotion {
  background: url('~@/assets/images/hotkeys/icons/all/btnlesserrejuvpotion.jpg') no-repeat center;
  background-size: cover;
}

.btnlesserrejuvscroll {
  background: url('~@/assets/images/hotkeys/icons/all/btnlesserrejuvscroll.jpg') no-repeat center;
  background-size: cover;
}

.btnlesserspiritbeast {
  background: url('~@/assets/images/hotkeys/icons/all/btnlesserspiritbeast.jpg') no-repeat center;
  background-size: cover;
}

.btnlesservoidwalker {
  background: url('~@/assets/images/hotkeys/icons/all/btnlesservoidwalker.jpg') no-repeat center;
  background-size: cover;
}

.btnlichversion2 {
  background: url('~@/assets/images/hotkeys/icons/all/btnlichversion2.jpg') no-repeat center;
  background-size: cover;
}

.btnlifedrain {
  background: url('~@/assets/images/hotkeys/icons/all/btnlifedrain.jpg') no-repeat center;
  background-size: cover;
}

.btnlightninglizard {
  background: url('~@/assets/images/hotkeys/icons/all/btnlightninglizard.jpg') no-repeat center;
  background-size: cover;
}

.btnlightningrevenant {
  background: url('~@/assets/images/hotkeys/icons/all/btnlightningrevenant.jpg') no-repeat center;
  background-size: cover;
}

.btnlightningshield {
  background: url('~@/assets/images/hotkeys/icons/all/btnlightningshield.jpg') no-repeat center;
  background-size: cover;
}

.btnlionhorn {
  background: url('~@/assets/images/hotkeys/icons/all/btnlionhorn.jpg') no-repeat center;
  background-size: cover;
}

.btnliquidfire {
  background: url('~@/assets/images/hotkeys/icons/all/btnliquidfire.jpg') no-repeat center;
  background-size: cover;
}

.btnload {
  background: url('~@/assets/images/hotkeys/icons/all/btnload.jpg') no-repeat center;
  background-size: cover;
}

.btnloaddwarf {
  background: url('~@/assets/images/hotkeys/icons/all/btnloaddwarf.jpg') no-repeat center;
  background-size: cover;
}

.btnloadpeon {
  background: url('~@/assets/images/hotkeys/icons/all/btnloadpeon.jpg') no-repeat center;
  background-size: cover;
}

.btnlobstrokkblue {
  background: url('~@/assets/images/hotkeys/icons/all/btnlobstrokkblue.jpg') no-repeat center;
  background-size: cover;
}

.btnlobstrokkdeepseer {
  background: url('~@/assets/images/hotkeys/icons/all/btnlobstrokkdeepseer.jpg') no-repeat center;
  background-size: cover;
}

.btnlobstrokkgreen {
  background: url('~@/assets/images/hotkeys/icons/all/btnlobstrokkgreen.jpg') no-repeat center;
  background-size: cover;
}

.btnlobstrokkred {
  background: url('~@/assets/images/hotkeys/icons/all/btnlobstrokkred.jpg') no-repeat center;
  background-size: cover;
}

.btnlobstrokkredpooldweller {
  background: url('~@/assets/images/hotkeys/icons/all/btnlobstrokkredpooldweller.jpg') no-repeat center;
  background-size: cover;
}

.btnlobstrokkredsnapper {
  background: url('~@/assets/images/hotkeys/icons/all/btnlobstrokkredsnapper.jpg') no-repeat center;
  background-size: cover;
}

.btnlocustswarm {
  background: url('~@/assets/images/hotkeys/icons/all/btnlocustswarm.jpg') no-repeat center;
  background-size: cover;
}

.btnlordnicholasbuzan {
  background: url('~@/assets/images/hotkeys/icons/all/btnlordnicholasbuzan.jpg') no-repeat center;
  background-size: cover;
}

.btnmagetower {
  background: url('~@/assets/images/hotkeys/icons/all/btnmagetower.jpg') no-repeat center;
  background-size: cover;
}

.btnmagicalsentry {
  background: url('~@/assets/images/hotkeys/icons/all/btnmagicalsentry.jpg') no-repeat center;
  background-size: cover;
}

.btnmagicimmunity {
  background: url('~@/assets/images/hotkeys/icons/all/btnmagicimmunity.jpg') no-repeat center;
  background-size: cover;
}

.btnmagiclariet {
  background: url('~@/assets/images/hotkeys/icons/all/btnmagiclariet.jpg') no-repeat center;
  background-size: cover;
}

.btnmagnataur {
  background: url('~@/assets/images/hotkeys/icons/all/btnmagnataur.jpg') no-repeat center;
  background-size: cover;
}

.btnmagnataurbrown {
  background: url('~@/assets/images/hotkeys/icons/all/btnmagnataurbrown.jpg') no-repeat center;
  background-size: cover;
}

.btnmagroththedefender {
  background: url('~@/assets/images/hotkeys/icons/all/btnmagroththedefender.jpg') no-repeat center;
  background-size: cover;
}

.btnmagtheridon {
  background: url('~@/assets/images/hotkeys/icons/all/btnmagtheridon.jpg') no-repeat center;
  background-size: cover;
}

.btnmaidenofpain {
  background: url('~@/assets/images/hotkeys/icons/all/btnmaidenofpain.jpg') no-repeat center;
  background-size: cover;
}

.btnmalfurion {
  background: url('~@/assets/images/hotkeys/icons/all/btnmalfurion.jpg') no-repeat center;
  background-size: cover;
}

.btnmalfurionwithoutstag {
  background: url('~@/assets/images/hotkeys/icons/all/btnmalfurionwithoutstag.jpg') no-repeat center;
  background-size: cover;
}

.btnmalganis {
  background: url('~@/assets/images/hotkeys/icons/all/btnmalganis.jpg') no-repeat center;
  background-size: cover;
}

.btnmammoth {
  background: url('~@/assets/images/hotkeys/icons/all/btnmammoth.jpg') no-repeat center;
  background-size: cover;
}

.btnmanaburn {
  background: url('~@/assets/images/hotkeys/icons/all/btnmanaburn.jpg') no-repeat center;
  background-size: cover;
}

.btnmanadrain {
  background: url('~@/assets/images/hotkeys/icons/all/btnmanadrain.jpg') no-repeat center;
  background-size: cover;
}

.btnmanaflare {
  background: url('~@/assets/images/hotkeys/icons/all/btnmanaflare.jpg') no-repeat center;
  background-size: cover;
}

.btnmanaflareoff {
  background: url('~@/assets/images/hotkeys/icons/all/btnmanaflareoff.jpg') no-repeat center;
  background-size: cover;
}

.btnmanarecharge {
  background: url('~@/assets/images/hotkeys/icons/all/btnmanarecharge.jpg') no-repeat center;
  background-size: cover;
}

.btnmanarechargeoff {
  background: url('~@/assets/images/hotkeys/icons/all/btnmanarechargeoff.jpg') no-repeat center;
  background-size: cover;
}

.btnmanashield {
  background: url('~@/assets/images/hotkeys/icons/all/btnmanashield.jpg') no-repeat center;
  background-size: cover;
}

.btnmanastone {
  background: url('~@/assets/images/hotkeys/icons/all/btnmanastone.jpg') no-repeat center;
  background-size: cover;
}

.btnmannoroth {
  background: url('~@/assets/images/hotkeys/icons/all/btnmannoroth.jpg') no-repeat center;
  background-size: cover;
}

.btnmantleofintelligence {
  background: url('~@/assets/images/hotkeys/icons/all/btnmantleofintelligence.jpg') no-repeat center;
  background-size: cover;
}

.btnmanual {
  background: url('~@/assets/images/hotkeys/icons/all/btnmanual.jpg') no-repeat center;
  background-size: cover;
}

.btnmanual2 {
  background: url('~@/assets/images/hotkeys/icons/all/btnmanual2.jpg') no-repeat center;
  background-size: cover;
}

.btnmanual3 {
  background: url('~@/assets/images/hotkeys/icons/all/btnmanual3.jpg') no-repeat center;
  background-size: cover;
}

.btnmarketplace {
  background: url('~@/assets/images/hotkeys/icons/all/btnmarketplace.jpg') no-repeat center;
  background-size: cover;
}

.btnmarkoffire {
  background: url('~@/assets/images/hotkeys/icons/all/btnmarkoffire.jpg') no-repeat center;
  background-size: cover;
}

.btnmarksmanship {
  background: url('~@/assets/images/hotkeys/icons/all/btnmarksmanship.jpg') no-repeat center;
  background-size: cover;
}

.btnmaskofdeath {
  background: url('~@/assets/images/hotkeys/icons/all/btnmaskofdeath.jpg') no-repeat center;
  background-size: cover;
}

.btnmassteleport {
  background: url('~@/assets/images/hotkeys/icons/all/btnmassteleport.jpg') no-repeat center;
  background-size: cover;
}

.btnmathog {
  background: url('~@/assets/images/hotkeys/icons/all/btnmathog.jpg') no-repeat center;
  background-size: cover;
}

.btnmeatapult {
  background: url('~@/assets/images/hotkeys/icons/all/btnmeatapult.jpg') no-repeat center;
  background-size: cover;
}

.btnmeatwagon {
  background: url('~@/assets/images/hotkeys/icons/all/btnmeatwagon.jpg') no-repeat center;
  background-size: cover;
}

.btnmechanicalcritter {
  background: url('~@/assets/images/hotkeys/icons/all/btnmechanicalcritter.jpg') no-repeat center;
  background-size: cover;
}

.btnmedalionofcourage {
  background: url('~@/assets/images/hotkeys/icons/all/btnmedalionofcourage.jpg') no-repeat center;
  background-size: cover;
}

.btnmedivh {
  background: url('~@/assets/images/hotkeys/icons/all/btnmedivh.jpg') no-repeat center;
  background-size: cover;
}

.btnmedivhravenform {
  background: url('~@/assets/images/hotkeys/icons/all/btnmedivhravenform.jpg') no-repeat center;
  background-size: cover;
}

.btnmercenarycamp {
  background: url('~@/assets/images/hotkeys/icons/all/btnmercenarycamp.jpg') no-repeat center;
  background-size: cover;
}

.btnmerchant {
  background: url('~@/assets/images/hotkeys/icons/all/btnmerchant.jpg') no-repeat center;
  background-size: cover;
}

.btnmetamorphosis {
  background: url('~@/assets/images/hotkeys/icons/all/btnmetamorphosis.jpg') no-repeat center;
  background-size: cover;
}

.btnmilitia {
  background: url('~@/assets/images/hotkeys/icons/all/btnmilitia.jpg') no-repeat center;
  background-size: cover;
}

.btnminorrejuvpotion {
  background: url('~@/assets/images/hotkeys/icons/all/btnminorrejuvpotion.jpg') no-repeat center;
  background-size: cover;
}

.btnmirrorimage {
  background: url('~@/assets/images/hotkeys/icons/all/btnmirrorimage.jpg') no-repeat center;
  background-size: cover;
}

.btnmishalv1 {
  background: url('~@/assets/images/hotkeys/icons/all/btnmishalv1.jpg') no-repeat center;
  background-size: cover;
}

.btnmishalv2 {
  background: url('~@/assets/images/hotkeys/icons/all/btnmishalv2.jpg') no-repeat center;
  background-size: cover;
}

.btnmishalv3 {
  background: url('~@/assets/images/hotkeys/icons/all/btnmishalv3.jpg') no-repeat center;
  background-size: cover;
}

.btnmishalv4 {
  background: url('~@/assets/images/hotkeys/icons/all/btnmishalv4.jpg') no-repeat center;
  background-size: cover;
}

.btnmonsoon {
  background: url('~@/assets/images/hotkeys/icons/all/btnmonsoon.jpg') no-repeat center;
  background-size: cover;
}

.btnmonsterlure {
  background: url('~@/assets/images/hotkeys/icons/all/btnmonsterlure.jpg') no-repeat center;
  background-size: cover;
}

.btnmoonarmor {
  background: url('~@/assets/images/hotkeys/icons/all/btnmoonarmor.jpg') no-repeat center;
  background-size: cover;
}

.btnmoonstone {
  background: url('~@/assets/images/hotkeys/icons/all/btnmoonstone.jpg') no-repeat center;
  background-size: cover;
}

.btnmoonwell {
  background: url('~@/assets/images/hotkeys/icons/all/btnmoonwell.jpg') no-repeat center;
  background-size: cover;
}

.btnmortarteam {
  background: url('~@/assets/images/hotkeys/icons/all/btnmortarteam.jpg') no-repeat center;
  background-size: cover;
}

.btnmountaingiant {
  background: url('~@/assets/images/hotkeys/icons/all/btnmountaingiant.jpg') no-repeat center;
  background-size: cover;
}

.btnmove {
  background: url('~@/assets/images/hotkeys/icons/all/btnmove.jpg') no-repeat center;
  background-size: cover;
}

.btnmudgolem {
  background: url('~@/assets/images/hotkeys/icons/all/btnmudgolem.jpg') no-repeat center;
  background-size: cover;
}

.btnmuradinbronzebeard {
  background: url('~@/assets/images/hotkeys/icons/all/btnmuradinbronzebeard.jpg') no-repeat center;
  background-size: cover;
}

.btnmurgalslave {
  background: url('~@/assets/images/hotkeys/icons/all/btnmurgalslave.jpg') no-repeat center;
  background-size: cover;
}

.btnmurgulbloodgill {
  background: url('~@/assets/images/hotkeys/icons/all/btnmurgulbloodgill.jpg') no-repeat center;
  background-size: cover;
}

.btnmurgulcliffrunner {
  background: url('~@/assets/images/hotkeys/icons/all/btnmurgulcliffrunner.jpg') no-repeat center;
  background-size: cover;
}

.btnmurgulmarauder {
  background: url('~@/assets/images/hotkeys/icons/all/btnmurgulmarauder.jpg') no-repeat center;
  background-size: cover;
}

.btnmurgulreaver {
  background: url('~@/assets/images/hotkeys/icons/all/btnmurgulreaver.jpg') no-repeat center;
  background-size: cover;
}

.btnmurgulshadowcaster {
  background: url('~@/assets/images/hotkeys/icons/all/btnmurgulshadowcaster.jpg') no-repeat center;
  background-size: cover;
}

.btnmurgulsnarecaster {
  background: url('~@/assets/images/hotkeys/icons/all/btnmurgulsnarecaster.jpg') no-repeat center;
  background-size: cover;
}

.btnmurgultidewarrior {
  background: url('~@/assets/images/hotkeys/icons/all/btnmurgultidewarrior.jpg') no-repeat center;
  background-size: cover;
}

.btnmurloc {
  background: url('~@/assets/images/hotkeys/icons/all/btnmurloc.jpg') no-repeat center;
  background-size: cover;
}

.btnmurlocflesheater {
  background: url('~@/assets/images/hotkeys/icons/all/btnmurlocflesheater.jpg') no-repeat center;
  background-size: cover;
}

.btnmurlochuntsman {
  background: url('~@/assets/images/hotkeys/icons/all/btnmurlochuntsman.jpg') no-repeat center;
  background-size: cover;
}

.btnmurlocmutant {
  background: url('~@/assets/images/hotkeys/icons/all/btnmurlocmutant.jpg') no-repeat center;
  background-size: cover;
}

.btnmurlocnightcrawler {
  background: url('~@/assets/images/hotkeys/icons/all/btnmurlocnightcrawler.jpg') no-repeat center;
  background-size: cover;
}

.btnmurlocplaguebearer {
  background: url('~@/assets/images/hotkeys/icons/all/btnmurlocplaguebearer.jpg') no-repeat center;
  background-size: cover;
}

.btnnagaarmorup1 {
  background: url('~@/assets/images/hotkeys/icons/all/btnnagaarmorup1.jpg') no-repeat center;
  background-size: cover;
}

.btnnagaarmorup2 {
  background: url('~@/assets/images/hotkeys/icons/all/btnnagaarmorup2.jpg') no-repeat center;
  background-size: cover;
}

.btnnagaarmorup3 {
  background: url('~@/assets/images/hotkeys/icons/all/btnnagaarmorup3.jpg') no-repeat center;
  background-size: cover;
}

.btnnagaburrow {
  background: url('~@/assets/images/hotkeys/icons/all/btnnagaburrow.jpg') no-repeat center;
  background-size: cover;
}

.btnnagamyrmidon {
  background: url('~@/assets/images/hotkeys/icons/all/btnnagamyrmidon.jpg') no-repeat center;
  background-size: cover;
}

.btnnagamyrmidonroyalguard {
  background: url('~@/assets/images/hotkeys/icons/all/btnnagamyrmidonroyalguard.jpg') no-repeat center;
  background-size: cover;
}

.btnnagaseawitch {
  background: url('~@/assets/images/hotkeys/icons/all/btnnagaseawitch.jpg') no-repeat center;
  background-size: cover;
}

.btnnagasummoner {
  background: url('~@/assets/images/hotkeys/icons/all/btnnagasummoner.jpg') no-repeat center;
  background-size: cover;
}

.btnnagaunburrow {
  background: url('~@/assets/images/hotkeys/icons/all/btnnagaunburrow.jpg') no-repeat center;
  background-size: cover;
}

.btnnagaweaponup1 {
  background: url('~@/assets/images/hotkeys/icons/all/btnnagaweaponup1.jpg') no-repeat center;
  background-size: cover;
}

.btnnagaweaponup2 {
  background: url('~@/assets/images/hotkeys/icons/all/btnnagaweaponup2.jpg') no-repeat center;
  background-size: cover;
}

.btnnagaweaponup3 {
  background: url('~@/assets/images/hotkeys/icons/all/btnnagaweaponup3.jpg') no-repeat center;
  background-size: cover;
}

.btnnaisha {
  background: url('~@/assets/images/hotkeys/icons/all/btnnaisha.jpg') no-repeat center;
  background-size: cover;
}

.btnnaturesblessing {
  background: url('~@/assets/images/hotkeys/icons/all/btnnaturesblessing.jpg') no-repeat center;
  background-size: cover;
}

.btnnaturetouchgrow {
  background: url('~@/assets/images/hotkeys/icons/all/btnnaturetouchgrow.jpg') no-repeat center;
  background-size: cover;
}

.btnnazgrel {
  background: url('~@/assets/images/hotkeys/icons/all/btnnazgrel.jpg') no-repeat center;
  background-size: cover;
}

.btnnecklace {
  background: url('~@/assets/images/hotkeys/icons/all/btnnecklace.jpg') no-repeat center;
  background-size: cover;
}

.btnnecromancer {
  background: url('~@/assets/images/hotkeys/icons/all/btnnecromancer.jpg') no-repeat center;
  background-size: cover;
}

.btnnecromanceradept {
  background: url('~@/assets/images/hotkeys/icons/all/btnnecromanceradept.jpg') no-repeat center;
  background-size: cover;
}

.btnnecromancermaster {
  background: url('~@/assets/images/hotkeys/icons/all/btnnecromancermaster.jpg') no-repeat center;
  background-size: cover;
}

.btnnecropolis {
  background: url('~@/assets/images/hotkeys/icons/all/btnnecropolis.jpg') no-repeat center;
  background-size: cover;
}

.btnnerubian {
  background: url('~@/assets/images/hotkeys/icons/all/btnnerubian.jpg') no-repeat center;
  background-size: cover;
}

.btnnerubianqueen {
  background: url('~@/assets/images/hotkeys/icons/all/btnnerubianqueen.jpg') no-repeat center;
  background-size: cover;
}

.btnnerubianseer {
  background: url('~@/assets/images/hotkeys/icons/all/btnnerubianseer.jpg') no-repeat center;
  background-size: cover;
}

.btnnerubianspiderlord {
  background: url('~@/assets/images/hotkeys/icons/all/btnnerubianspiderlord.jpg') no-repeat center;
  background-size: cover;
}

.btnnerubianwarrior {
  background: url('~@/assets/images/hotkeys/icons/all/btnnerubianwarrior.jpg') no-repeat center;
  background-size: cover;
}

.btnnerubianwebspinner {
  background: url('~@/assets/images/hotkeys/icons/all/btnnerubianwebspinner.jpg') no-repeat center;
  background-size: cover;
}

.btnnerubianziggurat {
  background: url('~@/assets/images/hotkeys/icons/all/btnnerubianziggurat.jpg') no-repeat center;
  background-size: cover;
}

.btnnetherdragon {
  background: url('~@/assets/images/hotkeys/icons/all/btnnetherdragon.jpg') no-repeat center;
  background-size: cover;
}

.btnnetherdragonroost {
  background: url('~@/assets/images/hotkeys/icons/all/btnnetherdragonroost.jpg') no-repeat center;
  background-size: cover;
}

.btnnetherdragonwhelp {
  background: url('~@/assets/images/hotkeys/icons/all/btnnetherdragonwhelp.jpg') no-repeat center;
  background-size: cover;
}

.btnnetherdrake {
  background: url('~@/assets/images/hotkeys/icons/all/btnnetherdrake.jpg') no-repeat center;
  background-size: cover;
}

.btnneutralmanashield {
  background: url('~@/assets/images/hotkeys/icons/all/btnneutralmanashield.jpg') no-repeat center;
  background-size: cover;
}

.btnneutralmanashieldoff {
  background: url('~@/assets/images/hotkeys/icons/all/btnneutralmanashieldoff.jpg') no-repeat center;
  background-size: cover;
}

.btnnightelfbattlecruiser {
  background: url('~@/assets/images/hotkeys/icons/all/btnnightelfbattlecruiser.jpg') no-repeat center;
  background-size: cover;
}

.btnnightelfbuild {
  background: url('~@/assets/images/hotkeys/icons/all/btnnightelfbuild.jpg') no-repeat center;
  background-size: cover;
}

.btnnightelfdestroyer {
  background: url('~@/assets/images/hotkeys/icons/all/btnnightelfdestroyer.jpg') no-repeat center;
  background-size: cover;
}

.btnnightelfrunner {
  background: url('~@/assets/images/hotkeys/icons/all/btnnightelfrunner.jpg') no-repeat center;
  background-size: cover;
}

.btnnightelfshipyard {
  background: url('~@/assets/images/hotkeys/icons/all/btnnightelfshipyard.jpg') no-repeat center;
  background-size: cover;
}

.btnnightelftransport {
  background: url('~@/assets/images/hotkeys/icons/all/btnnightelftransport.jpg') no-repeat center;
  background-size: cover;
}

.btnobsidianstatue {
  background: url('~@/assets/images/hotkeys/icons/all/btnobsidianstatue.jpg') no-repeat center;
  background-size: cover;
}

.btnogre {
  background: url('~@/assets/images/hotkeys/icons/all/btnogre.jpg') no-repeat center;
  background-size: cover;
}

.btnogrelord {
  background: url('~@/assets/images/hotkeys/icons/all/btnogrelord.jpg') no-repeat center;
  background-size: cover;
}

.btnogremagi {
  background: url('~@/assets/images/hotkeys/icons/all/btnogremagi.jpg') no-repeat center;
  background-size: cover;
}

.btnogremauler {
  background: url('~@/assets/images/hotkeys/icons/all/btnogremauler.jpg') no-repeat center;
  background-size: cover;
}

.btnoneheadedogre {
  background: url('~@/assets/images/hotkeys/icons/all/btnoneheadedogre.jpg') no-repeat center;
  background-size: cover;
}

.btnoneheadedogremagi {
  background: url('~@/assets/images/hotkeys/icons/all/btnoneheadedogremagi.jpg') no-repeat center;
  background-size: cover;
}

.btnorbofcorruption {
  background: url('~@/assets/images/hotkeys/icons/all/btnorbofcorruption.jpg') no-repeat center;
  background-size: cover;
}

.btnorbofdarkness {
  background: url('~@/assets/images/hotkeys/icons/all/btnorbofdarkness.jpg') no-repeat center;
  background-size: cover;
}

.btnorbofdeath {
  background: url('~@/assets/images/hotkeys/icons/all/btnorbofdeath.jpg') no-repeat center;
  background-size: cover;
}

.btnorbofdeathoff {
  background: url('~@/assets/images/hotkeys/icons/all/btnorbofdeathoff.jpg') no-repeat center;
  background-size: cover;
}

.btnorboffire {
  background: url('~@/assets/images/hotkeys/icons/all/btnorboffire.jpg') no-repeat center;
  background-size: cover;
}

.btnorboffrost {
  background: url('~@/assets/images/hotkeys/icons/all/btnorboffrost.jpg') no-repeat center;
  background-size: cover;
}

.btnorboflightning {
  background: url('~@/assets/images/hotkeys/icons/all/btnorboflightning.jpg') no-repeat center;
  background-size: cover;
}

.btnorbofslowness {
  background: url('~@/assets/images/hotkeys/icons/all/btnorbofslowness.jpg') no-repeat center;
  background-size: cover;
}

.btnorbofvenom {
  background: url('~@/assets/images/hotkeys/icons/all/btnorbofvenom.jpg') no-repeat center;
  background-size: cover;
}

.btnorcdestroyer {
  background: url('~@/assets/images/hotkeys/icons/all/btnorcdestroyer.jpg') no-repeat center;
  background-size: cover;
}

.btnorclumberupgradetwo {
  background: url('~@/assets/images/hotkeys/icons/all/btnorclumberupgradetwo.jpg') no-repeat center;
  background-size: cover;
}

.btnorcmeleeupone {
  background: url('~@/assets/images/hotkeys/icons/all/btnorcmeleeupone.jpg') no-repeat center;
  background-size: cover;
}

.btnorcmeleeupthree {
  background: url('~@/assets/images/hotkeys/icons/all/btnorcmeleeupthree.jpg') no-repeat center;
  background-size: cover;
}

.btnorcmeleeuptwo {
  background: url('~@/assets/images/hotkeys/icons/all/btnorcmeleeuptwo.jpg') no-repeat center;
  background-size: cover;
}

.btnorcrallypoint {
  background: url('~@/assets/images/hotkeys/icons/all/btnorcrallypoint.jpg') no-repeat center;
  background-size: cover;
}

.btnorctower {
  background: url('~@/assets/images/hotkeys/icons/all/btnorctower.jpg') no-repeat center;
  background-size: cover;
}

.btnorctransport {
  background: url('~@/assets/images/hotkeys/icons/all/btnorctransport.jpg') no-repeat center;
  background-size: cover;
}

.btnorcwarlock {
  background: url('~@/assets/images/hotkeys/icons/all/btnorcwarlock.jpg') no-repeat center;
  background-size: cover;
}

.btnorcwarlockapprentice {
  background: url('~@/assets/images/hotkeys/icons/all/btnorcwarlockapprentice.jpg') no-repeat center;
  background-size: cover;
}

.btnorcwarlockhermit {
  background: url('~@/assets/images/hotkeys/icons/all/btnorcwarlockhermit.jpg') no-repeat center;
  background-size: cover;
}

.btnorcwarlocknecrolyte {
  background: url('~@/assets/images/hotkeys/icons/all/btnorcwarlocknecrolyte.jpg') no-repeat center;
  background-size: cover;
}

.btnorcwarlockred {
  background: url('~@/assets/images/hotkeys/icons/all/btnorcwarlockred.jpg') no-repeat center;
  background-size: cover;
}

.btnowlbear {
  background: url('~@/assets/images/hotkeys/icons/all/btnowlbear.jpg') no-repeat center;
  background-size: cover;
}

.btnowlscoutlv1 {
  background: url('~@/assets/images/hotkeys/icons/all/btnowlscoutlv1.jpg') no-repeat center;
  background-size: cover;
}

.btnowlscoutlv2 {
  background: url('~@/assets/images/hotkeys/icons/all/btnowlscoutlv2.jpg') no-repeat center;
  background-size: cover;
}

.btnowlscoutlv3 {
  background: url('~@/assets/images/hotkeys/icons/all/btnowlscoutlv3.jpg') no-repeat center;
  background-size: cover;
}

.btnpackbeast {
  background: url('~@/assets/images/hotkeys/icons/all/btnpackbeast.jpg') no-repeat center;
  background-size: cover;
}

.btnpandarenbrewmaster {
  background: url('~@/assets/images/hotkeys/icons/all/btnpandarenbrewmaster.jpg') no-repeat center;
  background-size: cover;
}

.btnpandataunt {
  background: url('~@/assets/images/hotkeys/icons/all/btnpandataunt.jpg') no-repeat center;
  background-size: cover;
}

.btnparasite {
  background: url('~@/assets/images/hotkeys/icons/all/btnparasite.jpg') no-repeat center;
  background-size: cover;
}

.btnparasiteoff {
  background: url('~@/assets/images/hotkeys/icons/all/btnparasiteoff.jpg') no-repeat center;
  background-size: cover;
}

.btnpatrol {
  background: url('~@/assets/images/hotkeys/icons/all/btnpatrol.jpg') no-repeat center;
  background-size: cover;
}

.btnpeasant {
  background: url('~@/assets/images/hotkeys/icons/all/btnpeasant.jpg') no-repeat center;
  background-size: cover;
}

.btnpendantofenergy {
  background: url('~@/assets/images/hotkeys/icons/all/btnpendantofenergy.jpg') no-repeat center;
  background-size: cover;
}

.btnpendantofmana {
  background: url('~@/assets/images/hotkeys/icons/all/btnpendantofmana.jpg') no-repeat center;
  background-size: cover;
}

.btnpeon {
  background: url('~@/assets/images/hotkeys/icons/all/btnpeon.jpg') no-repeat center;
  background-size: cover;
}

.btnperiapt {
  background: url('~@/assets/images/hotkeys/icons/all/btnperiapt.jpg') no-repeat center;
  background-size: cover;
}

.btnperiapt1 {
  background: url('~@/assets/images/hotkeys/icons/all/btnperiapt1.jpg') no-repeat center;
  background-size: cover;
}

.btnphaseshift {
  background: url('~@/assets/images/hotkeys/icons/all/btnphaseshift.jpg') no-repeat center;
  background-size: cover;
}

.btnphaseshiftoff {
  background: url('~@/assets/images/hotkeys/icons/all/btnphaseshiftoff.jpg') no-repeat center;
  background-size: cover;
}

.btnphoenix {
  background: url('~@/assets/images/hotkeys/icons/all/btnphoenix.jpg') no-repeat center;
  background-size: cover;
}

.btnphoenixegg {
  background: url('~@/assets/images/hotkeys/icons/all/btnphoenixegg.jpg') no-repeat center;
  background-size: cover;
}

.btnpigfarm {
  background: url('~@/assets/images/hotkeys/icons/all/btnpigfarm.jpg') no-repeat center;
  background-size: cover;
}

.btnpillage {
  background: url('~@/assets/images/hotkeys/icons/all/btnpillage.jpg') no-repeat center;
  background-size: cover;
}

.btnpipeofinsight {
  background: url('~@/assets/images/hotkeys/icons/all/btnpipeofinsight.jpg') no-repeat center;
  background-size: cover;
}

.btnpitlord {
  background: url('~@/assets/images/hotkeys/icons/all/btnpitlord.jpg') no-repeat center;
  background-size: cover;
}

.btnplaguecloud {
  background: url('~@/assets/images/hotkeys/icons/all/btnplaguecloud.jpg') no-repeat center;
  background-size: cover;
}

.btnplagueent {
  background: url('~@/assets/images/hotkeys/icons/all/btnplagueent.jpg') no-repeat center;
  background-size: cover;
}

.btnpocketfactory {
  background: url('~@/assets/images/hotkeys/icons/all/btnpocketfactory.jpg') no-repeat center;
  background-size: cover;
}

.btnpocketfactorylv2 {
  background: url('~@/assets/images/hotkeys/icons/all/btnpocketfactorylv2.jpg') no-repeat center;
  background-size: cover;
}

.btnpocketfactorylv3 {
  background: url('~@/assets/images/hotkeys/icons/all/btnpocketfactorylv3.jpg') no-repeat center;
  background-size: cover;
}

.btnpoisonarrow {
  background: url('~@/assets/images/hotkeys/icons/all/btnpoisonarrow.jpg') no-repeat center;
  background-size: cover;
}

.btnpoisonent {
  background: url('~@/assets/images/hotkeys/icons/all/btnpoisonent.jpg') no-repeat center;
  background-size: cover;
}

.btnpoisonsting {
  background: url('~@/assets/images/hotkeys/icons/all/btnpoisonsting.jpg') no-repeat center;
  background-size: cover;
}

.btnpolarfurbolg {
  background: url('~@/assets/images/hotkeys/icons/all/btnpolarfurbolg.jpg') no-repeat center;
  background-size: cover;
}

.btnpolarfurbolgchampion {
  background: url('~@/assets/images/hotkeys/icons/all/btnpolarfurbolgchampion.jpg') no-repeat center;
  background-size: cover;
}

.btnpolarfurbolgelder {
  background: url('~@/assets/images/hotkeys/icons/all/btnpolarfurbolgelder.jpg') no-repeat center;
  background-size: cover;
}

.btnpolarfurbolgeldershaman {
  background: url('~@/assets/images/hotkeys/icons/all/btnpolarfurbolgeldershaman.jpg') no-repeat center;
  background-size: cover;
}

.btnpolarfurbolgshaman {
  background: url('~@/assets/images/hotkeys/icons/all/btnpolarfurbolgshaman.jpg') no-repeat center;
  background-size: cover;
}

.btnpolarfurbolgtracker {
  background: url('~@/assets/images/hotkeys/icons/all/btnpolarfurbolgtracker.jpg') no-repeat center;
  background-size: cover;
}

.btnpolymorph {
  background: url('~@/assets/images/hotkeys/icons/all/btnpolymorph.jpg') no-repeat center;
  background-size: cover;
}

.btnpossession {
  background: url('~@/assets/images/hotkeys/icons/all/btnpossession.jpg') no-repeat center;
  background-size: cover;
}

.btnpotionblue {
  background: url('~@/assets/images/hotkeys/icons/all/btnpotionblue.jpg') no-repeat center;
  background-size: cover;
}

.btnpotionbluebig {
  background: url('~@/assets/images/hotkeys/icons/all/btnpotionbluebig.jpg') no-repeat center;
  background-size: cover;
}

.btnpotionbluesmall {
  background: url('~@/assets/images/hotkeys/icons/all/btnpotionbluesmall.jpg') no-repeat center;
  background-size: cover;
}

.btnpotiongreen {
  background: url('~@/assets/images/hotkeys/icons/all/btnpotiongreen.jpg') no-repeat center;
  background-size: cover;
}

.btnpotiongreensmall {
  background: url('~@/assets/images/hotkeys/icons/all/btnpotiongreensmall.jpg') no-repeat center;
  background-size: cover;
}

.btnpotionofclarity {
  background: url('~@/assets/images/hotkeys/icons/all/btnpotionofclarity.jpg') no-repeat center;
  background-size: cover;
}

.btnpotionofdivinity {
  background: url('~@/assets/images/hotkeys/icons/all/btnpotionofdivinity.jpg') no-repeat center;
  background-size: cover;
}

.btnpotionofomniscience {
  background: url('~@/assets/images/hotkeys/icons/all/btnpotionofomniscience.jpg') no-repeat center;
  background-size: cover;
}

.btnpotionofrestoration {
  background: url('~@/assets/images/hotkeys/icons/all/btnpotionofrestoration.jpg') no-repeat center;
  background-size: cover;
}

.btnpotionofvampirism {
  background: url('~@/assets/images/hotkeys/icons/all/btnpotionofvampirism.jpg') no-repeat center;
  background-size: cover;
}

.btnpotionpurple {
  background: url('~@/assets/images/hotkeys/icons/all/btnpotionpurple.jpg') no-repeat center;
  background-size: cover;
}

.btnpotionred {
  background: url('~@/assets/images/hotkeys/icons/all/btnpotionred.jpg') no-repeat center;
  background-size: cover;
}

.btnpriest {
  background: url('~@/assets/images/hotkeys/icons/all/btnpriest.jpg') no-repeat center;
  background-size: cover;
}

.btnpriestadept {
  background: url('~@/assets/images/hotkeys/icons/all/btnpriestadept.jpg') no-repeat center;
  background-size: cover;
}

.btnpriestessofthemoon {
  background: url('~@/assets/images/hotkeys/icons/all/btnpriestessofthemoon.jpg') no-repeat center;
  background-size: cover;
}

.btnpriestmaster {
  background: url('~@/assets/images/hotkeys/icons/all/btnpriestmaster.jpg') no-repeat center;
  background-size: cover;
}

.btnpriestv0 {
  background: url('~@/assets/images/hotkeys/icons/all/btnpriestv0.jpg') no-repeat center;
  background-size: cover;
}

.btnproudmoore {
  background: url('~@/assets/images/hotkeys/icons/all/btnproudmoore.jpg') no-repeat center;
  background-size: cover;
}

.btnpurge {
  background: url('~@/assets/images/hotkeys/icons/all/btnpurge.jpg') no-repeat center;
  background-size: cover;
}

.btnpurpledragonspawn {
  background: url('~@/assets/images/hotkeys/icons/all/btnpurpledragonspawn.jpg') no-repeat center;
  background-size: cover;
}

.btnpurplefelhound {
  background: url('~@/assets/images/hotkeys/icons/all/btnpurplefelhound.jpg') no-repeat center;
  background-size: cover;
}

.btnqueenofsuffering {
  background: url('~@/assets/images/hotkeys/icons/all/btnqueenofsuffering.jpg') no-repeat center;
  background-size: cover;
}

.btnquillbeast {
  background: url('~@/assets/images/hotkeys/icons/all/btnquillbeast.jpg') no-repeat center;
  background-size: cover;
}

.btnquillbeastlv2 {
  background: url('~@/assets/images/hotkeys/icons/all/btnquillbeastlv2.jpg') no-repeat center;
  background-size: cover;
}

.btnquillbeastlv3 {
  background: url('~@/assets/images/hotkeys/icons/all/btnquillbeastlv3.jpg') no-repeat center;
  background-size: cover;
}

.btnquillbeastlv4 {
  background: url('~@/assets/images/hotkeys/icons/all/btnquillbeastlv4.jpg') no-repeat center;
  background-size: cover;
}

.btnquillboar {
  background: url('~@/assets/images/hotkeys/icons/all/btnquillboar.jpg') no-repeat center;
  background-size: cover;
}

.btnquillboarhunter {
  background: url('~@/assets/images/hotkeys/icons/all/btnquillboarhunter.jpg') no-repeat center;
  background-size: cover;
}

.btnquillspray {
  background: url('~@/assets/images/hotkeys/icons/all/btnquillspray.jpg') no-repeat center;
  background-size: cover;
}

.btnquillsprayoff {
  background: url('~@/assets/images/hotkeys/icons/all/btnquillsprayoff.jpg') no-repeat center;
  background-size: cover;
}

.btnragingbear {
  background: url('~@/assets/images/hotkeys/icons/all/btnragingbear.jpg') no-repeat center;
  background-size: cover;
}

.btnraider {
  background: url('~@/assets/images/hotkeys/icons/all/btnraider.jpg') no-repeat center;
  background-size: cover;
}

.btnraisedead {
  background: url('~@/assets/images/hotkeys/icons/all/btnraisedead.jpg') no-repeat center;
  background-size: cover;
}

.btnraisedeadoff {
  background: url('~@/assets/images/hotkeys/icons/all/btnraisedeadoff.jpg') no-repeat center;
  background-size: cover;
}

.btnrallypoint {
  background: url('~@/assets/images/hotkeys/icons/all/btnrallypoint.jpg') no-repeat center;
  background-size: cover;
}

.btnrallypointnightelf {
  background: url('~@/assets/images/hotkeys/icons/all/btnrallypointnightelf.jpg') no-repeat center;
  background-size: cover;
}

.btnrallypointundead {
  background: url('~@/assets/images/hotkeys/icons/all/btnrallypointundead.jpg') no-repeat center;
  background-size: cover;
}

.btnravenform {
  background: url('~@/assets/images/hotkeys/icons/all/btnravenform.jpg') no-repeat center;
  background-size: cover;
}

.btnrazorback {
  background: url('~@/assets/images/hotkeys/icons/all/btnrazorback.jpg') no-repeat center;
  background-size: cover;
}

.btnrazorbackbrute {
  background: url('~@/assets/images/hotkeys/icons/all/btnrazorbackbrute.jpg') no-repeat center;
  background-size: cover;
}

.btnrazormanechief {
  background: url('~@/assets/images/hotkeys/icons/all/btnrazormanechief.jpg') no-repeat center;
  background-size: cover;
}

.btnrazormanemedicineman {
  background: url('~@/assets/images/hotkeys/icons/all/btnrazormanemedicineman.jpg') no-repeat center;
  background-size: cover;
}

.btnreddragon {
  background: url('~@/assets/images/hotkeys/icons/all/btnreddragon.jpg') no-repeat center;
  background-size: cover;
}

.btnreddragondevour {
  background: url('~@/assets/images/hotkeys/icons/all/btnreddragondevour.jpg') no-repeat center;
  background-size: cover;
}

.btnreddragonwhelp {
  background: url('~@/assets/images/hotkeys/icons/all/btnreddragonwhelp.jpg') no-repeat center;
  background-size: cover;
}

.btnreddrake {
  background: url('~@/assets/images/hotkeys/icons/all/btnreddrake.jpg') no-repeat center;
  background-size: cover;
}

.btnreefelemental {
  background: url('~@/assets/images/hotkeys/icons/all/btnreefelemental.jpg') no-repeat center;
  background-size: cover;
}

.btnregenerate {
  background: url('~@/assets/images/hotkeys/icons/all/btnregenerate.jpg') no-repeat center;
  background-size: cover;
}

.btnregeneration {
  background: url('~@/assets/images/hotkeys/icons/all/btnregeneration.jpg') no-repeat center;
  background-size: cover;
}

.btnregenerationaura {
  background: url('~@/assets/images/hotkeys/icons/all/btnregenerationaura.jpg') no-repeat center;
  background-size: cover;
}

.btnreincarnation {
  background: url('~@/assets/images/hotkeys/icons/all/btnreincarnation.jpg') no-repeat center;
  background-size: cover;
}

.btnreinforcedburrows {
  background: url('~@/assets/images/hotkeys/icons/all/btnreinforcedburrows.jpg') no-repeat center;
  background-size: cover;
}

.btnreinforcedhides {
  background: url('~@/assets/images/hotkeys/icons/all/btnreinforcedhides.jpg') no-repeat center;
  background-size: cover;
}

.btnrejuvenation {
  background: url('~@/assets/images/hotkeys/icons/all/btnrejuvenation.jpg') no-repeat center;
  background-size: cover;
}

.btnrejuvenationpotion {
  background: url('~@/assets/images/hotkeys/icons/all/btnrejuvenationpotion.jpg') no-repeat center;
  background-size: cover;
}

.btnrejuvpotion {
  background: url('~@/assets/images/hotkeys/icons/all/btnrejuvpotion.jpg') no-repeat center;
  background-size: cover;
}

.btnrenegadewizard {
  background: url('~@/assets/images/hotkeys/icons/all/btnrenegadewizard.jpg') no-repeat center;
  background-size: cover;
}

.btnrepair {
  background: url('~@/assets/images/hotkeys/icons/all/btnrepair.jpg') no-repeat center;
  background-size: cover;
}

.btnrepairoff {
  background: url('~@/assets/images/hotkeys/icons/all/btnrepairoff.jpg') no-repeat center;
  background-size: cover;
}

.btnreplenishhealth {
  background: url('~@/assets/images/hotkeys/icons/all/btnreplenishhealth.jpg') no-repeat center;
  background-size: cover;
}

.btnreplenishhealthoff {
  background: url('~@/assets/images/hotkeys/icons/all/btnreplenishhealthoff.jpg') no-repeat center;
  background-size: cover;
}

.btnreplenishmana {
  background: url('~@/assets/images/hotkeys/icons/all/btnreplenishmana.jpg') no-repeat center;
  background-size: cover;
}

.btnreplenishmanaoff {
  background: url('~@/assets/images/hotkeys/icons/all/btnreplenishmanaoff.jpg') no-repeat center;
  background-size: cover;
}

.btnresistantskin {
  background: url('~@/assets/images/hotkeys/icons/all/btnresistantskin.jpg') no-repeat center;
  background-size: cover;
}

.btnresurrection {
  background: url('~@/assets/images/hotkeys/icons/all/btnresurrection.jpg') no-repeat center;
  background-size: cover;
}

.btnreveal {
  background: url('~@/assets/images/hotkeys/icons/all/btnreveal.jpg') no-repeat center;
  background-size: cover;
}

.btnrevenant {
  background: url('~@/assets/images/hotkeys/icons/all/btnrevenant.jpg') no-repeat center;
  background-size: cover;
}

.btnrexxar {
  background: url('~@/assets/images/hotkeys/icons/all/btnrexxar.jpg') no-repeat center;
  background-size: cover;
}

.btnriderlesshorse {
  background: url('~@/assets/images/hotkeys/icons/all/btnriderlesshorse.jpg') no-repeat center;
  background-size: cover;
}

.btnriderlesskodo {
  background: url('~@/assets/images/hotkeys/icons/all/btnriderlesskodo.jpg') no-repeat center;
  background-size: cover;
}

.btnrifleman {
  background: url('~@/assets/images/hotkeys/icons/all/btnrifleman.jpg') no-repeat center;
  background-size: cover;
}

.btnringgreen {
  background: url('~@/assets/images/hotkeys/icons/all/btnringgreen.jpg') no-repeat center;
  background-size: cover;
}

.btnringjadefalcon {
  background: url('~@/assets/images/hotkeys/icons/all/btnringjadefalcon.jpg') no-repeat center;
  background-size: cover;
}

.btnringlionhead {
  background: url('~@/assets/images/hotkeys/icons/all/btnringlionhead.jpg') no-repeat center;
  background-size: cover;
}

.btnringpurple {
  background: url('~@/assets/images/hotkeys/icons/all/btnringpurple.jpg') no-repeat center;
  background-size: cover;
}

.btnringskull {
  background: url('~@/assets/images/hotkeys/icons/all/btnringskull.jpg') no-repeat center;
  background-size: cover;
}

.btnringvioletspider {
  background: url('~@/assets/images/hotkeys/icons/all/btnringvioletspider.jpg') no-repeat center;
  background-size: cover;
}

.btnrobeofthemagi {
  background: url('~@/assets/images/hotkeys/icons/all/btnrobeofthemagi.jpg') no-repeat center;
  background-size: cover;
}

.btnrobogoblin {
  background: url('~@/assets/images/hotkeys/icons/all/btnrobogoblin.jpg') no-repeat center;
  background-size: cover;
}

.btnrockgolem {
  background: url('~@/assets/images/hotkeys/icons/all/btnrockgolem.jpg') no-repeat center;
  background-size: cover;
}

.btnrocktower {
  background: url('~@/assets/images/hotkeys/icons/all/btnrocktower.jpg') no-repeat center;
  background-size: cover;
}

.btnrodofnecromancy {
  background: url('~@/assets/images/hotkeys/icons/all/btnrodofnecromancy.jpg') no-repeat center;
  background-size: cover;
}

.btnrogue {
  background: url('~@/assets/images/hotkeys/icons/all/btnrogue.jpg') no-repeat center;
  background-size: cover;
}

.btnroguewizard {
  background: url('~@/assets/images/hotkeys/icons/all/btnroguewizard.jpg') no-repeat center;
  background-size: cover;
}

.btnrokhan {
  background: url('~@/assets/images/hotkeys/icons/all/btnrokhan.jpg') no-repeat center;
  background-size: cover;
}

.btnroot {
  background: url('~@/assets/images/hotkeys/icons/all/btnroot.jpg') no-repeat center;
  background-size: cover;
}

.btnrune {
  background: url('~@/assets/images/hotkeys/icons/all/btnrune.jpg') no-repeat center;
  background-size: cover;
}

.btnrunedbracers {
  background: url('~@/assets/images/hotkeys/icons/all/btnrunedbracers.jpg') no-repeat center;
  background-size: cover;
}

.btnsacrifice {
  background: url('~@/assets/images/hotkeys/icons/all/btnsacrifice.jpg') no-repeat center;
  background-size: cover;
}

.btnsacrificialdagger {
  background: url('~@/assets/images/hotkeys/icons/all/btnsacrificialdagger.jpg') no-repeat center;
  background-size: cover;
}

.btnsacrificialpit {
  background: url('~@/assets/images/hotkeys/icons/all/btnsacrificialpit.jpg') no-repeat center;
  background-size: cover;
}

.btnsacrificialskull {
  background: url('~@/assets/images/hotkeys/icons/all/btnsacrificialskull.jpg') no-repeat center;
  background-size: cover;
}

.btnsalamanderhatchling {
  background: url('~@/assets/images/hotkeys/icons/all/btnsalamanderhatchling.jpg') no-repeat center;
  background-size: cover;
}

.btnsalamanderlord {
  background: url('~@/assets/images/hotkeys/icons/all/btnsalamanderlord.jpg') no-repeat center;
  background-size: cover;
}

.btnsamuro {
  background: url('~@/assets/images/hotkeys/icons/all/btnsamuro.jpg') no-repeat center;
  background-size: cover;
}

.btnsapphironliving {
  background: url('~@/assets/images/hotkeys/icons/all/btnsapphironliving.jpg') no-repeat center;
  background-size: cover;
}

.btnsapphironundead {
  background: url('~@/assets/images/hotkeys/icons/all/btnsapphironundead.jpg') no-repeat center;
  background-size: cover;
}

.btnsasquatch {
  background: url('~@/assets/images/hotkeys/icons/all/btnsasquatch.jpg') no-repeat center;
  background-size: cover;
}

.btnsasquatchancient {
  background: url('~@/assets/images/hotkeys/icons/all/btnsasquatchancient.jpg') no-repeat center;
  background-size: cover;
}

.btnsasquatchoracle {
  background: url('~@/assets/images/hotkeys/icons/all/btnsasquatchoracle.jpg') no-repeat center;
  background-size: cover;
}

.btnsasquatchshaman {
  background: url('~@/assets/images/hotkeys/icons/all/btnsasquatchshaman.jpg') no-repeat center;
  background-size: cover;
}

.btnsatyr {
  background: url('~@/assets/images/hotkeys/icons/all/btnsatyr.jpg') no-repeat center;
  background-size: cover;
}

.btnsatyrhellcaller {
  background: url('~@/assets/images/hotkeys/icons/all/btnsatyrhellcaller.jpg') no-repeat center;
  background-size: cover;
}

.btnsatyrshadowdancer {
  background: url('~@/assets/images/hotkeys/icons/all/btnsatyrshadowdancer.jpg') no-repeat center;
  background-size: cover;
}

.btnsatyrsoulstealer {
  background: url('~@/assets/images/hotkeys/icons/all/btnsatyrsoulstealer.jpg') no-repeat center;
  background-size: cover;
}

.btnsatyrtrickster {
  background: url('~@/assets/images/hotkeys/icons/all/btnsatyrtrickster.jpg') no-repeat center;
  background-size: cover;
}

.btnscatterrockets {
  background: url('~@/assets/images/hotkeys/icons/all/btnscatterrockets.jpg') no-repeat center;
  background-size: cover;
}

.btnscepterofmastery {
  background: url('~@/assets/images/hotkeys/icons/all/btnscepterofmastery.jpg') no-repeat center;
  background-size: cover;
}

.btnscourgebuild {
  background: url('~@/assets/images/hotkeys/icons/all/btnscourgebuild.jpg') no-repeat center;
  background-size: cover;
}

.btnscout {
  background: url('~@/assets/images/hotkeys/icons/all/btnscout.jpg') no-repeat center;
  background-size: cover;
}

.btnscroll {
  background: url('~@/assets/images/hotkeys/icons/all/btnscroll.jpg') no-repeat center;
  background-size: cover;
}

.btnscrollofhaste {
  background: url('~@/assets/images/hotkeys/icons/all/btnscrollofhaste.jpg') no-repeat center;
  background-size: cover;
}

.btnscrollofhealing {
  background: url('~@/assets/images/hotkeys/icons/all/btnscrollofhealing.jpg') no-repeat center;
  background-size: cover;
}

.btnscrollofprotection {
  background: url('~@/assets/images/hotkeys/icons/all/btnscrollofprotection.jpg') no-repeat center;
  background-size: cover;
}

.btnscrollofregeneration {
  background: url('~@/assets/images/hotkeys/icons/all/btnscrollofregeneration.jpg') no-repeat center;
  background-size: cover;
}

.btnscrollofregenerationgreen {
  background: url('~@/assets/images/hotkeys/icons/all/btnscrollofregenerationgreen.jpg') no-repeat center;
  background-size: cover;
}

.btnscrolloftownportal {
  background: url('~@/assets/images/hotkeys/icons/all/btnscrolloftownportal.jpg') no-repeat center;
  background-size: cover;
}

.btnscrolluber {
  background: url('~@/assets/images/hotkeys/icons/all/btnscrolluber.jpg') no-repeat center;
  background-size: cover;
}

.btnseaelemental {
  background: url('~@/assets/images/hotkeys/icons/all/btnseaelemental.jpg') no-repeat center;
  background-size: cover;
}

.btnseagiant {
  background: url('~@/assets/images/hotkeys/icons/all/btnseagiant.jpg') no-repeat center;
  background-size: cover;
}

.btnseagiantbehemoth {
  background: url('~@/assets/images/hotkeys/icons/all/btnseagiantbehemoth.jpg') no-repeat center;
  background-size: cover;
}

.btnseagiantgreen {
  background: url('~@/assets/images/hotkeys/icons/all/btnseagiantgreen.jpg') no-repeat center;
  background-size: cover;
}

.btnseagiantpulverize {
  background: url('~@/assets/images/hotkeys/icons/all/btnseagiantpulverize.jpg') no-repeat center;
  background-size: cover;
}

.btnseagiantwarstomp {
  background: url('~@/assets/images/hotkeys/icons/all/btnseagiantwarstomp.jpg') no-repeat center;
  background-size: cover;
}

.btnsearingarrows {
  background: url('~@/assets/images/hotkeys/icons/all/btnsearingarrows.jpg') no-repeat center;
  background-size: cover;
}

.btnsearingarrowsoff {
  background: url('~@/assets/images/hotkeys/icons/all/btnsearingarrowsoff.jpg') no-repeat center;
  background-size: cover;
}

.btnseasrevenant {
  background: url('~@/assets/images/hotkeys/icons/all/btnseasrevenant.jpg') no-repeat center;
  background-size: cover;
}

.btnseaturtlegreen {
  background: url('~@/assets/images/hotkeys/icons/all/btnseaturtlegreen.jpg') no-repeat center;
  background-size: cover;
}

.btnseaturtlegreengargantuan {
  background: url('~@/assets/images/hotkeys/icons/all/btnseaturtlegreengargantuan.jpg') no-repeat center;
  background-size: cover;
}

.btnseaturtlegreengiant {
  background: url('~@/assets/images/hotkeys/icons/all/btnseaturtlegreengiant.jpg') no-repeat center;
  background-size: cover;
}

.btnseaturtlegreenhatchling {
  background: url('~@/assets/images/hotkeys/icons/all/btnseaturtlegreenhatchling.jpg') no-repeat center;
  background-size: cover;
}

.btnseaturtlered {
  background: url('~@/assets/images/hotkeys/icons/all/btnseaturtlered.jpg') no-repeat center;
  background-size: cover;
}

.btnseawitch {
  background: url('~@/assets/images/hotkeys/icons/all/btnseawitch.jpg') no-repeat center;
  background-size: cover;
}

.btnseersden {
  background: url('~@/assets/images/hotkeys/icons/all/btnseersden.jpg') no-repeat center;
  background-size: cover;
}

.btnseigeengine {
  background: url('~@/assets/images/hotkeys/icons/all/btnseigeengine.jpg') no-repeat center;
  background-size: cover;
}

.btnseigeenginewithmissles {
  background: url('~@/assets/images/hotkeys/icons/all/btnseigeenginewithmissles.jpg') no-repeat center;
  background-size: cover;
}

.btnselectunit {
  background: url('~@/assets/images/hotkeys/icons/all/btnselectunit.jpg') no-repeat center;
  background-size: cover;
}

.btnselfdestruct {
  background: url('~@/assets/images/hotkeys/icons/all/btnselfdestruct.jpg') no-repeat center;
  background-size: cover;
}

.btnselfdestructoff {
  background: url('~@/assets/images/hotkeys/icons/all/btnselfdestructoff.jpg') no-repeat center;
  background-size: cover;
}

.btnsentinel {
  background: url('~@/assets/images/hotkeys/icons/all/btnsentinel.jpg') no-repeat center;
  background-size: cover;
}

.btnsentry {
  background: url('~@/assets/images/hotkeys/icons/all/btnsentry.jpg') no-repeat center;
  background-size: cover;
}

.btnsentryward {
  background: url('~@/assets/images/hotkeys/icons/all/btnsentryward.jpg') no-repeat center;
  background-size: cover;
}

.btnserpentward {
  background: url('~@/assets/images/hotkeys/icons/all/btnserpentward.jpg') no-repeat center;
  background-size: cover;
}

.btnserpentwardlv2 {
  background: url('~@/assets/images/hotkeys/icons/all/btnserpentwardlv2.jpg') no-repeat center;
  background-size: cover;
}

.btnserpentwardlv3 {
  background: url('~@/assets/images/hotkeys/icons/all/btnserpentwardlv3.jpg') no-repeat center;
  background-size: cover;
}

.btnserpentwardlv4 {
  background: url('~@/assets/images/hotkeys/icons/all/btnserpentwardlv4.jpg') no-repeat center;
  background-size: cover;
}

.btnshade {
  background: url('~@/assets/images/hotkeys/icons/all/btnshade.jpg') no-repeat center;
  background-size: cover;
}

.btnshadowhunter {
  background: url('~@/assets/images/hotkeys/icons/all/btnshadowhunter.jpg') no-repeat center;
  background-size: cover;
}

.btnshadowmeld {
  background: url('~@/assets/images/hotkeys/icons/all/btnshadowmeld.jpg') no-repeat center;
  background-size: cover;
}

.btnshadowpact {
  background: url('~@/assets/images/hotkeys/icons/all/btnshadowpact.jpg') no-repeat center;
  background-size: cover;
}

.btnshadowstrike {
  background: url('~@/assets/images/hotkeys/icons/all/btnshadowstrike.jpg') no-repeat center;
  background-size: cover;
}

.btnshadowwolflv3 {
  background: url('~@/assets/images/hotkeys/icons/all/btnshadowwolflv3.jpg') no-repeat center;
  background-size: cover;
}

.btnshaman {
  background: url('~@/assets/images/hotkeys/icons/all/btnshaman.jpg') no-repeat center;
  background-size: cover;
}

.btnshamanadept {
  background: url('~@/assets/images/hotkeys/icons/all/btnshamanadept.jpg') no-repeat center;
  background-size: cover;
}

.btnshamanmaster {
  background: url('~@/assets/images/hotkeys/icons/all/btnshamanmaster.jpg') no-repeat center;
  background-size: cover;
}

.btnshandris {
  background: url('~@/assets/images/hotkeys/icons/all/btnshandris.jpg') no-repeat center;
  background-size: cover;
}

.btnsheep {
  background: url('~@/assets/images/hotkeys/icons/all/btnsheep.jpg') no-repeat center;
  background-size: cover;
}

.btnshockwave {
  background: url('~@/assets/images/hotkeys/icons/all/btnshockwave.jpg') no-repeat center;
  background-size: cover;
}

.btnshrineofaszhara {
  background: url('~@/assets/images/hotkeys/icons/all/btnshrineofaszhara.jpg') no-repeat center;
  background-size: cover;
}

.btnsiegegolem {
  background: url('~@/assets/images/hotkeys/icons/all/btnsiegegolem.jpg') no-repeat center;
  background-size: cover;
}

.btnsilence {
  background: url('~@/assets/images/hotkeys/icons/all/btnsilence.jpg') no-repeat center;
  background-size: cover;
}

.btnsirenadept {
  background: url('~@/assets/images/hotkeys/icons/all/btnsirenadept.jpg') no-repeat center;
  background-size: cover;
}

.btnsirenmaster {
  background: url('~@/assets/images/hotkeys/icons/all/btnsirenmaster.jpg') no-repeat center;
  background-size: cover;
}

.btnsirgregoryedmunson {
  background: url('~@/assets/images/hotkeys/icons/all/btnsirgregoryedmunson.jpg') no-repeat center;
  background-size: cover;
}

.btnskeletallongevity {
  background: url('~@/assets/images/hotkeys/icons/all/btnskeletallongevity.jpg') no-repeat center;
  background-size: cover;
}

.btnskeletalmarskman {
  background: url('~@/assets/images/hotkeys/icons/all/btnskeletalmarskman.jpg') no-repeat center;
  background-size: cover;
}

.btnskeletalorc {
  background: url('~@/assets/images/hotkeys/icons/all/btnskeletalorc.jpg') no-repeat center;
  background-size: cover;
}

.btnskeletalorcchampion {
  background: url('~@/assets/images/hotkeys/icons/all/btnskeletalorcchampion.jpg') no-repeat center;
  background-size: cover;
}

.btnskeletalorcgrunt {
  background: url('~@/assets/images/hotkeys/icons/all/btnskeletalorcgrunt.jpg') no-repeat center;
  background-size: cover;
}

.btnskeletonarcher {
  background: url('~@/assets/images/hotkeys/icons/all/btnskeletonarcher.jpg') no-repeat center;
  background-size: cover;
}

.btnskeletonmage {
  background: url('~@/assets/images/hotkeys/icons/all/btnskeletonmage.jpg') no-repeat center;
  background-size: cover;
}

.btnskeletonminion {
  background: url('~@/assets/images/hotkeys/icons/all/btnskeletonminion.jpg') no-repeat center;
  background-size: cover;
}

.btnskeletonwarrior {
  background: url('~@/assets/images/hotkeys/icons/all/btnskeletonwarrior.jpg') no-repeat center;
  background-size: cover;
}

.btnskillz {
  background: url('~@/assets/images/hotkeys/icons/all/btnskillz.jpg') no-repeat center;
  background-size: cover;
}

.btnskyfurytower {
  background: url('~@/assets/images/hotkeys/icons/all/btnskyfurytower.jpg') no-repeat center;
  background-size: cover;
}

.btnslaughterhouse {
  background: url('~@/assets/images/hotkeys/icons/all/btnslaughterhouse.jpg') no-repeat center;
  background-size: cover;
}

.btnsleep {
  background: url('~@/assets/images/hotkeys/icons/all/btnsleep.jpg') no-repeat center;
  background-size: cover;
}

.btnslow {
  background: url('~@/assets/images/hotkeys/icons/all/btnslow.jpg') no-repeat center;
  background-size: cover;
}

.btnslowoff {
  background: url('~@/assets/images/hotkeys/icons/all/btnslowoff.jpg') no-repeat center;
  background-size: cover;
}

.btnslowpoison {
  background: url('~@/assets/images/hotkeys/icons/all/btnslowpoison.jpg') no-repeat center;
  background-size: cover;
}

.btnsludgecreature {
  background: url('~@/assets/images/hotkeys/icons/all/btnsludgecreature.jpg') no-repeat center;
  background-size: cover;
}

.btnsludgeflinger {
  background: url('~@/assets/images/hotkeys/icons/all/btnsludgeflinger.jpg') no-repeat center;
  background-size: cover;
}

.btnsludgemontrosity {
  background: url('~@/assets/images/hotkeys/icons/all/btnsludgemontrosity.jpg') no-repeat center;
  background-size: cover;
}

.btnsmash {
  background: url('~@/assets/images/hotkeys/icons/all/btnsmash.jpg') no-repeat center;
  background-size: cover;
}

.btnsnapdragon {
  background: url('~@/assets/images/hotkeys/icons/all/btnsnapdragon.jpg') no-repeat center;
  background-size: cover;
}

.btnsnazzypotion {
  background: url('~@/assets/images/hotkeys/icons/all/btnsnazzypotion.jpg') no-repeat center;
  background-size: cover;
}

.btnsnazzyscroll {
  background: url('~@/assets/images/hotkeys/icons/all/btnsnazzyscroll.jpg') no-repeat center;
  background-size: cover;
}

.btnsnazzyscrollgreen {
  background: url('~@/assets/images/hotkeys/icons/all/btnsnazzyscrollgreen.jpg') no-repeat center;
  background-size: cover;
}

.btnsobimask {
  background: url('~@/assets/images/hotkeys/icons/all/btnsobimask.jpg') no-repeat center;
  background-size: cover;
}

.btnsorceress {
  background: url('~@/assets/images/hotkeys/icons/all/btnsorceress.jpg') no-repeat center;
  background-size: cover;
}

.btnsorceressadept {
  background: url('~@/assets/images/hotkeys/icons/all/btnsorceressadept.jpg') no-repeat center;
  background-size: cover;
}

.btnsorceressmaster {
  background: url('~@/assets/images/hotkeys/icons/all/btnsorceressmaster.jpg') no-repeat center;
  background-size: cover;
}

.btnsorceressv0 {
  background: url('~@/assets/images/hotkeys/icons/all/btnsorceressv0.jpg') no-repeat center;
  background-size: cover;
}

.btnsoulburn {
  background: url('~@/assets/images/hotkeys/icons/all/btnsoulburn.jpg') no-repeat center;
  background-size: cover;
}

.btnspawninggrounds {
  background: url('~@/assets/images/hotkeys/icons/all/btnspawninggrounds.jpg') no-repeat center;
  background-size: cover;
}

.btnspellbreaker {
  background: url('~@/assets/images/hotkeys/icons/all/btnspellbreaker.jpg') no-repeat center;
  background-size: cover;
}

.btnspellbreakermagicdefend {
  background: url('~@/assets/images/hotkeys/icons/all/btnspellbreakermagicdefend.jpg') no-repeat center;
  background-size: cover;
}

.btnspellbreakermagicundefend {
  background: url('~@/assets/images/hotkeys/icons/all/btnspellbreakermagicundefend.jpg') no-repeat center;
  background-size: cover;
}

.btnspellshieldamulet {
  background: url('~@/assets/images/hotkeys/icons/all/btnspellshieldamulet.jpg') no-repeat center;
  background-size: cover;
}

.btnspellsteal {
  background: url('~@/assets/images/hotkeys/icons/all/btnspellsteal.jpg') no-repeat center;
  background-size: cover;
}

.btnspellstealoff {
  background: url('~@/assets/images/hotkeys/icons/all/btnspellstealoff.jpg') no-repeat center;
  background-size: cover;
}

.btnspider {
  background: url('~@/assets/images/hotkeys/icons/all/btnspider.jpg') no-repeat center;
  background-size: cover;
}

.btnspiderblack {
  background: url('~@/assets/images/hotkeys/icons/all/btnspiderblack.jpg') no-repeat center;
  background-size: cover;
}

.btnspiderblue {
  background: url('~@/assets/images/hotkeys/icons/all/btnspiderblue.jpg') no-repeat center;
  background-size: cover;
}

.btnspidercrab {
  background: url('~@/assets/images/hotkeys/icons/all/btnspidercrab.jpg') no-repeat center;
  background-size: cover;
}

.btnspidercrabbehemoth {
  background: url('~@/assets/images/hotkeys/icons/all/btnspidercrabbehemoth.jpg') no-repeat center;
  background-size: cover;
}

.btnspidercrablimbripper {
  background: url('~@/assets/images/hotkeys/icons/all/btnspidercrablimbripper.jpg') no-repeat center;
  background-size: cover;
}

.btnspidergreen {
  background: url('~@/assets/images/hotkeys/icons/all/btnspidergreen.jpg') no-repeat center;
  background-size: cover;
}

.btnspiderling {
  background: url('~@/assets/images/hotkeys/icons/all/btnspiderling.jpg') no-repeat center;
  background-size: cover;
}

.btnspidersilkbroach {
  background: url('~@/assets/images/hotkeys/icons/all/btnspidersilkbroach.jpg') no-repeat center;
  background-size: cover;
}

.btnspikedbarricades {
  background: url('~@/assets/images/hotkeys/icons/all/btnspikedbarricades.jpg') no-repeat center;
  background-size: cover;
}

.btnspiritbear {
  background: url('~@/assets/images/hotkeys/icons/all/btnspiritbear.jpg') no-repeat center;
  background-size: cover;
}

.btnspiritbeast {
  background: url('~@/assets/images/hotkeys/icons/all/btnspiritbeast.jpg') no-repeat center;
  background-size: cover;
}

.btnspirithawk {
  background: url('~@/assets/images/hotkeys/icons/all/btnspirithawk.jpg') no-repeat center;
  background-size: cover;
}

.btnspiritlink {
  background: url('~@/assets/images/hotkeys/icons/all/btnspiritlink.jpg') no-repeat center;
  background-size: cover;
}

.btnspiritlodge {
  background: url('~@/assets/images/hotkeys/icons/all/btnspiritlodge.jpg') no-repeat center;
  background-size: cover;
}

.btnspiritofvengeance {
  background: url('~@/assets/images/hotkeys/icons/all/btnspiritofvengeance.jpg') no-repeat center;
  background-size: cover;
}

.btnspiritpig {
  background: url('~@/assets/images/hotkeys/icons/all/btnspiritpig.jpg') no-repeat center;
  background-size: cover;
}

.btnspiritwalker {
  background: url('~@/assets/images/hotkeys/icons/all/btnspiritwalker.jpg') no-repeat center;
  background-size: cover;
}

.btnspiritwalkeradepttraining {
  background: url('~@/assets/images/hotkeys/icons/all/btnspiritwalkeradepttraining.jpg') no-repeat center;
  background-size: cover;
}

.btnspiritwalkermastertraining {
  background: url('~@/assets/images/hotkeys/icons/all/btnspiritwalkermastertraining.jpg') no-repeat center;
  background-size: cover;
}

.btnspiritwolf {
  background: url('~@/assets/images/hotkeys/icons/all/btnspiritwolf.jpg') no-repeat center;
  background-size: cover;
}

.btnspiritwyvern {
  background: url('~@/assets/images/hotkeys/icons/all/btnspiritwyvern.jpg') no-repeat center;
  background-size: cover;
}

.btnstaffofnegation {
  background: url('~@/assets/images/hotkeys/icons/all/btnstaffofnegation.jpg') no-repeat center;
  background-size: cover;
}

.btnstaffofpreservation {
  background: url('~@/assets/images/hotkeys/icons/all/btnstaffofpreservation.jpg') no-repeat center;
  background-size: cover;
}

.btnstaffofpurification {
  background: url('~@/assets/images/hotkeys/icons/all/btnstaffofpurification.jpg') no-repeat center;
  background-size: cover;
}

.btnstaffofsanctuary {
  background: url('~@/assets/images/hotkeys/icons/all/btnstaffofsanctuary.jpg') no-repeat center;
  background-size: cover;
}

.btnstaffofsilence {
  background: url('~@/assets/images/hotkeys/icons/all/btnstaffofsilence.jpg') no-repeat center;
  background-size: cover;
}

.btnstaffofteleportation {
  background: url('~@/assets/images/hotkeys/icons/all/btnstaffofteleportation.jpg') no-repeat center;
  background-size: cover;
}

.btnstampede {
  background: url('~@/assets/images/hotkeys/icons/all/btnstampede.jpg') no-repeat center;
  background-size: cover;
}

.btnstarfall {
  background: url('~@/assets/images/hotkeys/icons/all/btnstarfall.jpg') no-repeat center;
  background-size: cover;
}

.btnstarwand {
  background: url('~@/assets/images/hotkeys/icons/all/btnstarwand.jpg') no-repeat center;
  background-size: cover;
}

.btnstasistrap {
  background: url('~@/assets/images/hotkeys/icons/all/btnstasistrap.jpg') no-repeat center;
  background-size: cover;
}

.btnstatup {
  background: url('~@/assets/images/hotkeys/icons/all/btnstatup.jpg') no-repeat center;
  background-size: cover;
}

.btnsteelarmor {
  background: url('~@/assets/images/hotkeys/icons/all/btnsteelarmor.jpg') no-repeat center;
  background-size: cover;
}

.btnsteelmelee {
  background: url('~@/assets/images/hotkeys/icons/all/btnsteelmelee.jpg') no-repeat center;
  background-size: cover;
}

.btnsteelranged {
  background: url('~@/assets/images/hotkeys/icons/all/btnsteelranged.jpg') no-repeat center;
  background-size: cover;
}

.btnstone {
  background: url('~@/assets/images/hotkeys/icons/all/btnstone.jpg') no-repeat center;
  background-size: cover;
}

.btnstonearchitecture {
  background: url('~@/assets/images/hotkeys/icons/all/btnstonearchitecture.jpg') no-repeat center;
  background-size: cover;
}

.btnstoneform {
  background: url('~@/assets/images/hotkeys/icons/all/btnstoneform.jpg') no-repeat center;
  background-size: cover;
}

.btnstop {
  background: url('~@/assets/images/hotkeys/icons/all/btnstop.jpg') no-repeat center;
  background-size: cover;
}

.btnstormbolt {
  background: url('~@/assets/images/hotkeys/icons/all/btnstormbolt.jpg') no-repeat center;
  background-size: cover;
}

.btnstormbrewmaster {
  background: url('~@/assets/images/hotkeys/icons/all/btnstormbrewmaster.jpg') no-repeat center;
  background-size: cover;
}

.btnstormearthfire {
  background: url('~@/assets/images/hotkeys/icons/all/btnstormearthfire.jpg') no-repeat center;
  background-size: cover;
}

.btnstormhammer {
  background: url('~@/assets/images/hotkeys/icons/all/btnstormhammer.jpg') no-repeat center;
  background-size: cover;
}

.btnstormwyrm {
  background: url('~@/assets/images/hotkeys/icons/all/btnstormwyrm.jpg') no-repeat center;
  background-size: cover;
}

.btnstrengthofthemoon {
  background: url('~@/assets/images/hotkeys/icons/all/btnstrengthofthemoon.jpg') no-repeat center;
  background-size: cover;
}

.btnstrengthofthewild {
  background: url('~@/assets/images/hotkeys/icons/all/btnstrengthofthewild.jpg') no-repeat center;
  background-size: cover;
}

.btnstrongdrink {
  background: url('~@/assets/images/hotkeys/icons/all/btnstrongdrink.jpg') no-repeat center;
  background-size: cover;
}

.btnstronghold {
  background: url('~@/assets/images/hotkeys/icons/all/btnstronghold.jpg') no-repeat center;
  background-size: cover;
}

.btnstun {
  background: url('~@/assets/images/hotkeys/icons/all/btnstun.jpg') no-repeat center;
  background-size: cover;
}

.btnsummonwaterelemental {
  background: url('~@/assets/images/hotkeys/icons/all/btnsummonwaterelemental.jpg') no-repeat center;
  background-size: cover;
}

.btnsunderingblades {
  background: url('~@/assets/images/hotkeys/icons/all/btnsunderingblades.jpg') no-repeat center;
  background-size: cover;
}

.btnswordsman {
  background: url('~@/assets/images/hotkeys/icons/all/btnswordsman.jpg') no-repeat center;
  background-size: cover;
}

.btnswordsman_v1 {
  background: url('~@/assets/images/hotkeys/icons/all/btnswordsman_v1.jpg') no-repeat center;
  background-size: cover;
}

.btnsylvanas {
  background: url('~@/assets/images/hotkeys/icons/all/btnsylvanas.jpg') no-repeat center;
  background-size: cover;
}

.btnsylvanasghost {
  background: url('~@/assets/images/hotkeys/icons/all/btnsylvanasghost.jpg') no-repeat center;
  background-size: cover;
}

.btnsylvanuswindrunner {
  background: url('~@/assets/images/hotkeys/icons/all/btnsylvanuswindrunner.jpg') no-repeat center;
  background-size: cover;
}

.btntalisman {
  background: url('~@/assets/images/hotkeys/icons/all/btntalisman.jpg') no-repeat center;
  background-size: cover;
}

.btntamehippogriff {
  background: url('~@/assets/images/hotkeys/icons/all/btntamehippogriff.jpg') no-repeat center;
  background-size: cover;
}

.btntaunt {
  background: url('~@/assets/images/hotkeys/icons/all/btntaunt.jpg') no-repeat center;
  background-size: cover;
}

.btntauren {
  background: url('~@/assets/images/hotkeys/icons/all/btntauren.jpg') no-repeat center;
  background-size: cover;
}

.btntaurentotem {
  background: url('~@/assets/images/hotkeys/icons/all/btntaurentotem.jpg') no-repeat center;
  background-size: cover;
}

.btntavern {
  background: url('~@/assets/images/hotkeys/icons/all/btntavern.jpg') no-repeat center;
  background-size: cover;
}

.btntelescope {
  background: url('~@/assets/images/hotkeys/icons/all/btntelescope.jpg') no-repeat center;
  background-size: cover;
}

.btntempleofthedamned {
  background: url('~@/assets/images/hotkeys/icons/all/btntempleofthedamned.jpg') no-repeat center;
  background-size: cover;
}

.btntempleoftides {
  background: url('~@/assets/images/hotkeys/icons/all/btntempleoftides.jpg') no-repeat center;
  background-size: cover;
}

.btntheblackarrow {
  background: url('~@/assets/images/hotkeys/icons/all/btntheblackarrow.jpg') no-repeat center;
  background-size: cover;
}

.btntheblackarrowoff {
  background: url('~@/assets/images/hotkeys/icons/all/btntheblackarrowoff.jpg') no-repeat center;
  background-size: cover;
}

.btnthecaptain {
  background: url('~@/assets/images/hotkeys/icons/all/btnthecaptain.jpg') no-repeat center;
  background-size: cover;
}

.btnthickfur {
  background: url('~@/assets/images/hotkeys/icons/all/btnthickfur.jpg') no-repeat center;
  background-size: cover;
}

.btnthoriumarmor {
  background: url('~@/assets/images/hotkeys/icons/all/btnthoriumarmor.jpg') no-repeat center;
  background-size: cover;
}

.btnthoriummelee {
  background: url('~@/assets/images/hotkeys/icons/all/btnthoriummelee.jpg') no-repeat center;
  background-size: cover;
}

.btnthoriumranged {
  background: url('~@/assets/images/hotkeys/icons/all/btnthoriumranged.jpg') no-repeat center;
  background-size: cover;
}

.btnthorns {
  background: url('~@/assets/images/hotkeys/icons/all/btnthorns.jpg') no-repeat center;
  background-size: cover;
}

.btnthornshield {
  background: url('~@/assets/images/hotkeys/icons/all/btnthornshield.jpg') no-repeat center;
  background-size: cover;
}

.btnthornyshieldoff {
  background: url('~@/assets/images/hotkeys/icons/all/btnthornyshieldoff.jpg') no-repeat center;
  background-size: cover;
}

.btnthrall {
  background: url('~@/assets/images/hotkeys/icons/all/btnthrall.jpg') no-repeat center;
  background-size: cover;
}

.btnthunderclap {
  background: url('~@/assets/images/hotkeys/icons/all/btnthunderclap.jpg') no-repeat center;
  background-size: cover;
}

.btnthunderhawk {
  background: url('~@/assets/images/hotkeys/icons/all/btnthunderhawk.jpg') no-repeat center;
  background-size: cover;
}

.btnthunderlizard {
  background: url('~@/assets/images/hotkeys/icons/all/btnthunderlizard.jpg') no-repeat center;
  background-size: cover;
}

.btnthunderlizardsalamander {
  background: url('~@/assets/images/hotkeys/icons/all/btnthunderlizardsalamander.jpg') no-repeat center;
  background-size: cover;
}

.btnthunderlizardvizier {
  background: url('~@/assets/images/hotkeys/icons/all/btnthunderlizardvizier.jpg') no-repeat center;
  background-size: cover;
}

.btntichondrius {
  background: url('~@/assets/images/hotkeys/icons/all/btntichondrius.jpg') no-repeat center;
  background-size: cover;
}

.btntidalguardian {
  background: url('~@/assets/images/hotkeys/icons/all/btntidalguardian.jpg') no-repeat center;
  background-size: cover;
}

.btntidesrevenant {
  background: url('~@/assets/images/hotkeys/icons/all/btntidesrevenant.jpg') no-repeat center;
  background-size: cover;
}

.btntimberwolf {
  background: url('~@/assets/images/hotkeys/icons/all/btntimberwolf.jpg') no-repeat center;
  background-size: cover;
}

.btntinycastle {
  background: url('~@/assets/images/hotkeys/icons/all/btntinycastle.jpg') no-repeat center;
  background-size: cover;
}

.btntombofrelics {
  background: url('~@/assets/images/hotkeys/icons/all/btntombofrelics.jpg') no-repeat center;
  background-size: cover;
}

.btntome {
  background: url('~@/assets/images/hotkeys/icons/all/btntome.jpg') no-repeat center;
  background-size: cover;
}

.btntomebrown {
  background: url('~@/assets/images/hotkeys/icons/all/btntomebrown.jpg') no-repeat center;
  background-size: cover;
}

.btntomeofretraining {
  background: url('~@/assets/images/hotkeys/icons/all/btntomeofretraining.jpg') no-repeat center;
  background-size: cover;
}

.btntomered {
  background: url('~@/assets/images/hotkeys/icons/all/btntomered.jpg') no-repeat center;
  background-size: cover;
}

.btntornado {
  background: url('~@/assets/images/hotkeys/icons/all/btntornado.jpg') no-repeat center;
  background-size: cover;
}

.btntownhall {
  background: url('~@/assets/images/hotkeys/icons/all/btntownhall.jpg') no-repeat center;
  background-size: cover;
}

.btntranquility {
  background: url('~@/assets/images/hotkeys/icons/all/btntranquility.jpg') no-repeat center;
  background-size: cover;
}

.btntransmute {
  background: url('~@/assets/images/hotkeys/icons/all/btntransmute.jpg') no-repeat center;
  background-size: cover;
}

.btntransport {
  background: url('~@/assets/images/hotkeys/icons/all/btntransport.jpg') no-repeat center;
  background-size: cover;
}

.btntreant {
  background: url('~@/assets/images/hotkeys/icons/all/btntreant.jpg') no-repeat center;
  background-size: cover;
}

.btntreeofages {
  background: url('~@/assets/images/hotkeys/icons/all/btntreeofages.jpg') no-repeat center;
  background-size: cover;
}

.btntreeofeternity {
  background: url('~@/assets/images/hotkeys/icons/all/btntreeofeternity.jpg') no-repeat center;
  background-size: cover;
}

.btntreeoflife {
  background: url('~@/assets/images/hotkeys/icons/all/btntreeoflife.jpg') no-repeat center;
  background-size: cover;
}

.btntrollbatrider {
  background: url('~@/assets/images/hotkeys/icons/all/btntrollbatrider.jpg') no-repeat center;
  background-size: cover;
}

.btntrollburrow {
  background: url('~@/assets/images/hotkeys/icons/all/btntrollburrow.jpg') no-repeat center;
  background-size: cover;
}

.btntrueshot {
  background: url('~@/assets/images/hotkeys/icons/all/btntrueshot.jpg') no-repeat center;
  background-size: cover;
}

.btntuskaarblack {
  background: url('~@/assets/images/hotkeys/icons/all/btntuskaarblack.jpg') no-repeat center;
  background-size: cover;
}

.btntuskaarbrown {
  background: url('~@/assets/images/hotkeys/icons/all/btntuskaarbrown.jpg') no-repeat center;
  background-size: cover;
}

.btntuskaarbrownhealer {
  background: url('~@/assets/images/hotkeys/icons/all/btntuskaarbrownhealer.jpg') no-repeat center;
  background-size: cover;
}

.btntuskaargold {
  background: url('~@/assets/images/hotkeys/icons/all/btntuskaargold.jpg') no-repeat center;
  background-size: cover;
}

.btntuskaarnomad {
  background: url('~@/assets/images/hotkeys/icons/all/btntuskaarnomad.jpg') no-repeat center;
  background-size: cover;
}

.btntuskaarsorcerer {
  background: url('~@/assets/images/hotkeys/icons/all/btntuskaarsorcerer.jpg') no-repeat center;
  background-size: cover;
}

.btntuskaartrapper {
  background: url('~@/assets/images/hotkeys/icons/all/btntuskaartrapper.jpg') no-repeat center;
  background-size: cover;
}

.btntuskaarwarrior {
  background: url('~@/assets/images/hotkeys/icons/all/btntuskaarwarrior.jpg') no-repeat center;
  background-size: cover;
}

.btntyrande {
  background: url('~@/assets/images/hotkeys/icons/all/btntyrande.jpg') no-repeat center;
  background-size: cover;
}

.btnultravision {
  background: url('~@/assets/images/hotkeys/icons/all/btnultravision.jpg') no-repeat center;
  background-size: cover;
}

.btnunbroken {
  background: url('~@/assets/images/hotkeys/icons/all/btnunbroken.jpg') no-repeat center;
  background-size: cover;
}

.btnunbrokendarkweaver {
  background: url('~@/assets/images/hotkeys/icons/all/btnunbrokendarkweaver.jpg') no-repeat center;
  background-size: cover;
}

.btnunbrokenrager {
  background: url('~@/assets/images/hotkeys/icons/all/btnunbrokenrager.jpg') no-repeat center;
  background-size: cover;
}

.btnundeadairbarge {
  background: url('~@/assets/images/hotkeys/icons/all/btnundeadairbarge.jpg') no-repeat center;
  background-size: cover;
}

.btnundeadbattleship {
  background: url('~@/assets/images/hotkeys/icons/all/btnundeadbattleship.jpg') no-repeat center;
  background-size: cover;
}

.btnundeaddestroyer {
  background: url('~@/assets/images/hotkeys/icons/all/btnundeaddestroyer.jpg') no-repeat center;
  background-size: cover;
}

.btnundeadload {
  background: url('~@/assets/images/hotkeys/icons/all/btnundeadload.jpg') no-repeat center;
  background-size: cover;
}

.btnundeadloadoff {
  background: url('~@/assets/images/hotkeys/icons/all/btnundeadloadoff.jpg') no-repeat center;
  background-size: cover;
}

.btnundeadshipyard {
  background: url('~@/assets/images/hotkeys/icons/all/btnundeadshipyard.jpg') no-repeat center;
  background-size: cover;
}

.btnundeadtransport {
  background: url('~@/assets/images/hotkeys/icons/all/btnundeadtransport.jpg') no-repeat center;
  background-size: cover;
}

.btnundeadunload {
  background: url('~@/assets/images/hotkeys/icons/all/btnundeadunload.jpg') no-repeat center;
  background-size: cover;
}

.btnunholyarmor {
  background: url('~@/assets/images/hotkeys/icons/all/btnunholyarmor.jpg') no-repeat center;
  background-size: cover;
}

.btnunholyaura {
  background: url('~@/assets/images/hotkeys/icons/all/btnunholyaura.jpg') no-repeat center;
  background-size: cover;
}

.btnunholyfrenzy {
  background: url('~@/assets/images/hotkeys/icons/all/btnunholyfrenzy.jpg') no-repeat center;
  background-size: cover;
}

.btnunholystrength {
  background: url('~@/assets/images/hotkeys/icons/all/btnunholystrength.jpg') no-repeat center;
  background-size: cover;
}

.btnunload {
  background: url('~@/assets/images/hotkeys/icons/all/btnunload.jpg') no-repeat center;
  background-size: cover;
}

.btnunloaddwarf {
  background: url('~@/assets/images/hotkeys/icons/all/btnunloaddwarf.jpg') no-repeat center;
  background-size: cover;
}

.btnunloadpeon {
  background: url('~@/assets/images/hotkeys/icons/all/btnunloadpeon.jpg') no-repeat center;
  background-size: cover;
}

.btnunstableconcoction {
  background: url('~@/assets/images/hotkeys/icons/all/btnunstableconcoction.jpg') no-repeat center;
  background-size: cover;
}

.btnunsummonbuilding {
  background: url('~@/assets/images/hotkeys/icons/all/btnunsummonbuilding.jpg') no-repeat center;
  background-size: cover;
}

.btnupgrademoonglaive {
  background: url('~@/assets/images/hotkeys/icons/all/btnupgrademoonglaive.jpg') no-repeat center;
  background-size: cover;
}

.btnuproot {
  background: url('~@/assets/images/hotkeys/icons/all/btnuproot.jpg') no-repeat center;
  background-size: cover;
}

.btnuther {
  background: url('~@/assets/images/hotkeys/icons/all/btnuther.jpg') no-repeat center;
  background-size: cover;
}

.btnvampiricaura {
  background: url('~@/assets/images/hotkeys/icons/all/btnvampiricaura.jpg') no-repeat center;
  background-size: cover;
}

.btnvarimathras {
  background: url('~@/assets/images/hotkeys/icons/all/btnvarimathras.jpg') no-repeat center;
  background-size: cover;
}

.btnvengeanceincarnate {
  background: url('~@/assets/images/hotkeys/icons/all/btnvengeanceincarnate.jpg') no-repeat center;
  background-size: cover;
}

.btnviletemptress {
  background: url('~@/assets/images/hotkeys/icons/all/btnviletemptress.jpg') no-repeat center;
  background-size: cover;
}

.btnvoidwalker {
  background: url('~@/assets/images/hotkeys/icons/all/btnvoidwalker.jpg') no-repeat center;
  background-size: cover;
}

.btnvolcano {
  background: url('~@/assets/images/hotkeys/icons/all/btnvolcano.jpg') no-repeat center;
  background-size: cover;
}

.btnvoljin {
  background: url('~@/assets/images/hotkeys/icons/all/btnvoljin.jpg') no-repeat center;
  background-size: cover;
}

.btnvoodoolounge {
  background: url('~@/assets/images/hotkeys/icons/all/btnvoodoolounge.jpg') no-repeat center;
  background-size: cover;
}

.btnvorpalblades {
  background: url('~@/assets/images/hotkeys/icons/all/btnvorpalblades.jpg') no-repeat center;
  background-size: cover;
}

.btnwalloffire {
  background: url('~@/assets/images/hotkeys/icons/all/btnwalloffire.jpg') no-repeat center;
  background-size: cover;
}

.btnwand {
  background: url('~@/assets/images/hotkeys/icons/all/btnwand.jpg') no-repeat center;
  background-size: cover;
}

.btnwandofcyclone {
  background: url('~@/assets/images/hotkeys/icons/all/btnwandofcyclone.jpg') no-repeat center;
  background-size: cover;
}

.btnwandofmanasteal {
  background: url('~@/assets/images/hotkeys/icons/all/btnwandofmanasteal.jpg') no-repeat center;
  background-size: cover;
}

.btnwandofneutralization {
  background: url('~@/assets/images/hotkeys/icons/all/btnwandofneutralization.jpg') no-repeat center;
  background-size: cover;
}

.btnwandofshadowsight {
  background: url('~@/assets/images/hotkeys/icons/all/btnwandofshadowsight.jpg') no-repeat center;
  background-size: cover;
}

.btnwandskull {
  background: url('~@/assets/images/hotkeys/icons/all/btnwandskull.jpg') no-repeat center;
  background-size: cover;
}

.btnwarden2 {
  background: url('~@/assets/images/hotkeys/icons/all/btnwarden2.jpg') no-repeat center;
  background-size: cover;
}

.btnwareagle {
  background: url('~@/assets/images/hotkeys/icons/all/btnwareagle.jpg') no-repeat center;
  background-size: cover;
}

.btnwargolem {
  background: url('~@/assets/images/hotkeys/icons/all/btnwargolem.jpg') no-repeat center;
  background-size: cover;
}

.btnwarriorarachnathid {
  background: url('~@/assets/images/hotkeys/icons/all/btnwarriorarachnathid.jpg') no-repeat center;
  background-size: cover;
}

.btnwarstomp {
  background: url('~@/assets/images/hotkeys/icons/all/btnwarstomp.jpg') no-repeat center;
  background-size: cover;
}

.btnwatcherward {
  background: url('~@/assets/images/hotkeys/icons/all/btnwatcherward.jpg') no-repeat center;
  background-size: cover;
}

.btnwaterelemental {
  background: url('~@/assets/images/hotkeys/icons/all/btnwaterelemental.jpg') no-repeat center;
  background-size: cover;
}

.btnwaterelementallv2 {
  background: url('~@/assets/images/hotkeys/icons/all/btnwaterelementallv2.jpg') no-repeat center;
  background-size: cover;
}

.btnwaterelementallv3 {
  background: url('~@/assets/images/hotkeys/icons/all/btnwaterelementallv3.jpg') no-repeat center;
  background-size: cover;
}

.btnwateryminion {
  background: url('~@/assets/images/hotkeys/icons/all/btnwateryminion.jpg') no-repeat center;
  background-size: cover;
}

.btnwateryminioncaster {
  background: url('~@/assets/images/hotkeys/icons/all/btnwateryminioncaster.jpg') no-repeat center;
  background-size: cover;
}

.btnwateryminionlv2 {
  background: url('~@/assets/images/hotkeys/icons/all/btnwateryminionlv2.jpg') no-repeat center;
  background-size: cover;
}

.btnweb {
  background: url('~@/assets/images/hotkeys/icons/all/btnweb.jpg') no-repeat center;
  background-size: cover;
}

.btnweboff {
  background: url('~@/assets/images/hotkeys/icons/all/btnweboff.jpg') no-repeat center;
  background-size: cover;
}

.btnwellspring {
  background: url('~@/assets/images/hotkeys/icons/all/btnwellspring.jpg') no-repeat center;
  background-size: cover;
}

.btnwendigo {
  background: url('~@/assets/images/hotkeys/icons/all/btnwendigo.jpg') no-repeat center;
  background-size: cover;
}

.btnwendigoancient {
  background: url('~@/assets/images/hotkeys/icons/all/btnwendigoancient.jpg') no-repeat center;
  background-size: cover;
}

.btnwendigoelder {
  background: url('~@/assets/images/hotkeys/icons/all/btnwendigoelder.jpg') no-repeat center;
  background-size: cover;
}

.btnwendigoshaman {
  background: url('~@/assets/images/hotkeys/icons/all/btnwendigoshaman.jpg') no-repeat center;
  background-size: cover;
}

.btnwhirlwind {
  background: url('~@/assets/images/hotkeys/icons/all/btnwhirlwind.jpg') no-repeat center;
  background-size: cover;
}

.btnwindserpent {
  background: url('~@/assets/images/hotkeys/icons/all/btnwindserpent.jpg') no-repeat center;
  background-size: cover;
}

.btnwindwalkoff {
  background: url('~@/assets/images/hotkeys/icons/all/btnwindwalkoff.jpg') no-repeat center;
  background-size: cover;
}

.btnwindwalkon {
  background: url('~@/assets/images/hotkeys/icons/all/btnwindwalkon.jpg') no-repeat center;
  background-size: cover;
}

.btnwisp {
  background: url('~@/assets/images/hotkeys/icons/all/btnwisp.jpg') no-repeat center;
  background-size: cover;
}

.btnwisphealoff {
  background: url('~@/assets/images/hotkeys/icons/all/btnwisphealoff.jpg') no-repeat center;
  background-size: cover;
}

.btnwispsplode {
  background: url('~@/assets/images/hotkeys/icons/all/btnwispsplode.jpg') no-repeat center;
  background-size: cover;
}

.btnwitchdoctor {
  background: url('~@/assets/images/hotkeys/icons/all/btnwitchdoctor.jpg') no-repeat center;
  background-size: cover;
}

.btnwitchdoctoradept {
  background: url('~@/assets/images/hotkeys/icons/all/btnwitchdoctoradept.jpg') no-repeat center;
  background-size: cover;
}

.btnwitchdoctormaster {
  background: url('~@/assets/images/hotkeys/icons/all/btnwitchdoctormaster.jpg') no-repeat center;
  background-size: cover;
}

.btnworkshop {
  background: url('~@/assets/images/hotkeys/icons/all/btnworkshop.jpg') no-repeat center;
  background-size: cover;
}

.btnwraith {
  background: url('~@/assets/images/hotkeys/icons/all/btnwraith.jpg') no-repeat center;
  background-size: cover;
}

.btnwyvern {
  background: url('~@/assets/images/hotkeys/icons/all/btnwyvern.jpg') no-repeat center;
  background-size: cover;
}

.btnwyvernrider {
  background: url('~@/assets/images/hotkeys/icons/all/btnwyvernrider.jpg') no-repeat center;
  background-size: cover;
}

.btnzergling {
  background: url('~@/assets/images/hotkeys/icons/all/btnzergling.jpg') no-repeat center;
  background-size: cover;
}

.btnziggurat {
  background: url('~@/assets/images/hotkeys/icons/all/btnziggurat.jpg') no-repeat center;
  background-size: cover;
}

.btnzigguratupgrade {
  background: url('~@/assets/images/hotkeys/icons/all/btnzigguratupgrade.jpg') no-repeat center;
  background-size: cover;
}

.btnzombie {
  background: url('~@/assets/images/hotkeys/icons/all/btnzombie.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnadvancedspikedbarricades {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnadvancedspikedbarricades.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnanimalwartraining {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnanimalwartraining.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnbash {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnbash.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnbattleroar {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnbattleroar.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnberserk {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnberserk.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnbrilliance {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnbrilliance.jpg') no-repeat center;
  background-size: cover;
}

.pasbtncleavingattack {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtncleavingattack.jpg') no-repeat center;
  background-size: cover;
}

.pasbtncommand {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtncommand.jpg') no-repeat center;
  background-size: cover;
}

.pasbtncorrosivebreath {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtncorrosivebreath.jpg') no-repeat center;
  background-size: cover;
}

.pasbtncriticalstrike {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtncriticalstrike.jpg') no-repeat center;
  background-size: cover;
}

.pasbtndemolish {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtndemolish.jpg') no-repeat center;
  background-size: cover;
}

.pasbtndevotion {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtndevotion.jpg') no-repeat center;
  background-size: cover;
}

.pasbtndrum {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtndrum.jpg') no-repeat center;
  background-size: cover;
}

.pasbtndrunkendodge {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtndrunkendodge.jpg') no-repeat center;
  background-size: cover;
}

.pasbtndwarvenlongrifle {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtndwarvenlongrifle.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnelunesblessing {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnelunesblessing.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnengineeringupgrade {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnengineeringupgrade.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnenvenomedspear {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnenvenomedspear.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnevasion {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnevasion.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnexhumecorpses {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnexhumecorpses.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnfeedback {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnfeedback.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnfirerocks {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnfirerocks.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnflakcannons {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnflakcannons.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnflyingmachinetruesight {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnflyingmachinetruesight.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnfragmentationbombs {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnfragmentationbombs.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnfreezingbreath {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnfreezingbreath.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnfrost {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnfrost.jpg') no-repeat center;
  background-size: cover;
}

.pasbtngenericspellimmunity {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtngenericspellimmunity.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnghoulfrenzy {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnghoulfrenzy.jpg') no-repeat center;
  background-size: cover;
}

.pasbtngnollcommandaura {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtngnollcommandaura.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnhardenedskin {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnhardenedskin.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnheadhunterberserker {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnheadhunterberserker.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnhumanartilleryupone {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnhumanartilleryupone.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnhumanlumberupgrade1 {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnhumanlumberupgrade1.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnhumanlumberupgrade2 {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnhumanlumberupgrade2.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnimmolation {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnimmolation.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnimpalingbolt {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnimpalingbolt.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnimprovedbows {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnimprovedbows.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnimprovedspikedbarricades {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnimprovedspikedbarricades.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnliquidfire {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnliquidfire.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnmagicalsentry {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnmagicalsentry.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnmagicimmunity {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnmagicimmunity.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnmarkoffire {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnmarkoffire.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnmarksmanship {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnmarksmanship.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnpillage {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnpillage.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnplaguecloud {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnplaguecloud.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnpoisonsting {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnpoisonsting.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnregenerate {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnregenerate.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnreincarnation {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnreincarnation.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnreinforcedburrows {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnreinforcedburrows.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnresistantskin {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnresistantskin.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnscatterrockets {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnscatterrockets.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnscout {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnscout.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnseagiantpulverize {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnseagiantpulverize.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnshade {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnshade.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnshadetruesight {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnshadetruesight.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnskeletonmage {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnskeletonmage.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnslowpoison {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnslowpoison.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnsmash {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnsmash.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnspikedbarricades {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnspikedbarricades.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnspiritofvengeance {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnspiritofvengeance.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnstatup {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnstatup.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnstormhammer {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnstormhammer.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnsunderingblades {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnsunderingblades.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnthickfur {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnthickfur.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnthorns {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnthorns.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnthornshield {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnthornshield.jpg') no-repeat center;
  background-size: cover;
}

.pasbtntrueshot {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtntrueshot.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnunholyaura {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnunholyaura.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnupgrademoonglaive {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnupgrademoonglaive.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnvampiricaura {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnvampiricaura.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnvorpalblades {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnvorpalblades.jpg') no-repeat center;
  background-size: cover;
}

.pasbtnwellspring {
  background: url('~@/assets/images/hotkeys/icons/all/pasbtnwellspring.jpg') no-repeat center;
  background-size: cover;
}
</style>
