<template>
  <div class="status-container">
    <template v-if="floStatus">
      <div class="w3font">Player</div>
      <table v-if="floStatus" class="status-table">
        <tbody>
          <tr>
            <td class="prop-key">Player</td>
            <td>{{floStatus.name}} (FLO ID: {{floStatus.player_id}})</td>
          </tr>
        </tbody>
      </table>
      <div class="w3font">Game</div>
      <table v-if="floStatus.game" class="status-table">
        <tbody>
            <tr>
              <td class="prop-key">FLO ID</td>
              <td>{{floStatus.game.id}}</td>
            </tr>
            <tr>
              <td class="prop-key">Name</td>
              <td>{{floStatus.game.name}}</td>
            </tr>
            <tr>
              <td class="prop-key">Status</td>
              <td>{{floStatus.game.status}}</td>
            </tr>
            <tr>
              <td class="prop-key">Map</td>
              <td>{{floStatus.game.map.path}}</td>
            </tr>
            <tr>
              <td class="prop-key">Server</td>
              <td>{{floStatus.game.node.name}}</td>
            </tr>
            <tr>
              <td class="prop-key">Slots</td>
              <td>
                <table class="slot-table">
                  <thead>
                    <tr>
                      <td class="prop-key">Player</td>
                      <td class="prop-key">Team</td>
                      <td class="prop-key">Race</td>
                      <td class="prop-key">Status</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(slot, index) in usedSlots" :key="index">
                      <td>{{slot.player.name}}</td>
                      <td>{{slot.settings.team}}</td>
                      <td>{{slot.settings.race}}</td>
                      <td>{{slot.client_status}}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
        </tbody>
      </table>
      <p v-else>Waiting for game data...</p>
    </template>
    <p v-else>Waiting for data...</p>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import LoadingSpinner from "@/home/LoadingSpinner.vue";

@Component({
  components: {LoadingSpinner}
})
export default class StatusScreen extends Vue {
  async mounted() {
  }

  get floStatus() {
    return this.$store.direct.state.floStatus
  }

  get usedSlots() {
    const slots = (this.floStatus?.game?.slots ?? []).filter(v => v.settings.status === 'Occupied')
    return slots
  }
}
</script>

<style scoped type="text/css">
.status-container{
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  top: 19vh;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 90vw;
  height: 70vh;
  overflow-y: auto;
  padding: 16px;
}

.prop-key {
  font-weight: bold;
  width: 120px;
  text-align: left;
}

table.slot-table {
  border-collapse: collapse;
  border: 1px solid;
}

table.slot-table tr {
  border: 1px solid;
}

.slot-table td {
   padding: 4px 8px;
}
</style>
