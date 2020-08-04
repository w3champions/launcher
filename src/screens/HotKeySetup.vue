<template>
  <button @click="registerKey">
    register-test key
  </button>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {ItemHotkeyRegisterer} from "@/hot-keys/ItemHotkeyRegisterer";
import Button from "@/components/Button.vue";
@Component({
  components: {Button}
})
export default class HotKeySetup extends Vue {
  public hotkeys: ItemHotkeyRegisterer;

  public registerKey() {
    this.hotkeys.register()
  }

  constructor() {
    super();
    this.hotkeys = new ItemHotkeyRegisterer()
  }

}

</script>
