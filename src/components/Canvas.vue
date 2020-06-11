<template>
  <div>
    <svg @click="add_point($event.offsetX, $event.offsetY)">
      <circle
        r="10"
        v-for="p in this.$store.state.point_list"
        :key="p.x + ',' + p.y"
        :cx="p.x"
        :cy="p.y"
      />
    </svg>
    <br />
    x: <input v-model="new_x" />
    <br />
    y: <input v-model="new_y" />
    <br />
    <button @click="add_point(new_x, new_y)">add point</button>
  </div>
</template>

<script>
export default {
  name: "Canvas",
  data: function() {
    return {
      new_x: 0,
      new_y: 0,
    };
  },
  methods: {
    add_point(x, y) {
      x = parseInt(x, 10);
      y = parseInt(y, 10);
      this.$store.commit("add_point", { x, y });
    },
  },
};
</script>

<style>
svg {
  border: 1px solid black;
}
</style>
