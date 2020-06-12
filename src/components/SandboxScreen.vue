<template>
  <CursorFrame>
    <template v-slot="sprops">
      <Canvas :sprops="sprops" />
    </template>
  </CursorFrame>
</template>

<script>
import CursorFrame from "./CursorFrame";
import Canvas from "./Canvas";
export default {
  name: "SandboxScreen",
  components: {
    CursorFrame,
    Canvas,
  },
};
</script>
