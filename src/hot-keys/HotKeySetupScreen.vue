<template>
  <div>
    <div>
      {{hotkeyState}}
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class HotKeySetupScreen extends Vue {
  get hotkeyState() {
    return this.$store.direct.state.hotKeys.hotKeyStateMachine.constructor.name
  }
}

</script>
