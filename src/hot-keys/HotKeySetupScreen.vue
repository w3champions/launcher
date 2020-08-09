<template>
  <div>
    <button @click="registerKeys">
      register-test keys
    </button>
    <div>
      {{hotkeyState}}
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class HotKeySetupScreen extends Vue {
  public registerKeys() {
    this.$store.direct.dispatch.hotKeys.setHotkeys();
  }

  get hotkeyState() {
    return this.$store.direct.state.hotKeys.hotKeyStateMachine.constructor.name
  }

  async mounted() {
    await this.$store.direct.dispatch.hotKeys.loadHotKeys();
  }
}

</script>
