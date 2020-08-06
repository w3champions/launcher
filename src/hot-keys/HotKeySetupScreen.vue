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
    this.hotkeys.itemTopLeft({ modifier: ModifierKey.None, hotKey: "q" })
    this.hotkeys.itemMiddleLeft({ modifier: ModifierKey.None, hotKey: "a" })
    this.hotkeys.itemBottomLeft({ modifier: ModifierKey.None, hotKey: "z" })
    this.hotkeys.itemTopRight({ modifier: ModifierKey.None, hotKey: "w" })
    this.hotkeys.itemMiddleRight({ modifier: ModifierKey.None, hotKey: "s" })
    this.hotkeys.itemBottomRight({ modifier: ModifierKey.None, hotKey: "x" })

    this.hotkeys.f1({ modifier: ModifierKey.None, hotKey: "h" })
    this.hotkeys.f2({ modifier: ModifierKey.None, hotKey: "j" })
    this.hotkeys.f3({ modifier: ModifierKey.None, hotKey: "k" })

    this.hotkeys.space({ modifier: ModifierKey.None, hotKey: "u" })
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
