<template>
  <button @click="registerKeys">
    register-test keys
  </button>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {ItemHotkeyRegistrationService} from "@/hot-keys/ItemHotkeyRegistrationService";
import {ModifierKey} from "@/hot-keys/hotkeyTypes";

@Component
export default class HotKeySetupScreen extends Vue {
  public hotkeys: ItemHotkeyRegistrationService;

  public registerKeys() {
    this.hotkeys.itemTopLeft({ modifier: ModifierKey.CommandOrControl, hotKey: "q" })
    this.hotkeys.itemMiddleLeft({ modifier: ModifierKey.CommandOrControl, hotKey: "a" })
    this.hotkeys.itemBottomLeft({ modifier: ModifierKey.CommandOrControl, hotKey: "z" })
    this.hotkeys.itemTopRight({ modifier: ModifierKey.CommandOrControl, hotKey: "w" })
    this.hotkeys.itemMiddleRight({ modifier: ModifierKey.CommandOrControl, hotKey: "s" })
    this.hotkeys.itemBottomRight({ modifier: ModifierKey.CommandOrControl, hotKey: "x" })

    this.hotkeys.f1({ modifier: ModifierKey.CommandOrControl, hotKey: "h" })
    this.hotkeys.f2({ modifier: ModifierKey.CommandOrControl, hotKey: "j" })
    this.hotkeys.f3({ modifier: ModifierKey.CommandOrControl, hotKey: "k" })

    this.hotkeys.space({ modifier: ModifierKey.CommandOrControl, hotKey: "u" })
  }

  constructor() {
    super();
    this.hotkeys = new ItemHotkeyRegistrationService()
  }

  async mounted() {
    await this.$store.direct.dispatch.hotKeys.loadHotKeys();

  }

}

</script>
