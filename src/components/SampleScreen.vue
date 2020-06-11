<template>
  <div>
    <h1>Sample Canvas</h1>
    <router-link to="/">Home</router-link>
    <Canvas />
  </div>
</template>

<script>
import Canvas from "./Canvas";
export default {
  name: "SampleScreen",
  components: {
    Canvas,
  },
};
</script>
