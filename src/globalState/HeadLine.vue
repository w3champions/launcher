<template>
  <div class="header-stuff">
    <HeadItem target="/" text="Home"/>
    <HeadItem target="/Settings" text="Settings"/>
    <HeadItem target="/HotKeys" text="Hot Keys"/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import HeadItem from "@/globalState/HeadItem.vue";

@Component({
  components: {HeadItem}
})
export default class HeadLine extends Vue {
}
</script>

<style scoped type="text/css">
.header-stuff {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 10vh;
}

</style>
