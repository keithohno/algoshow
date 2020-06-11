<template>
  <div>
    <svg
      @mouseup.left="mouse_up_l($event.offsetX, $event.offsetY)"
      @mousemove.left="mouse_move_l($event.offsetX, $event.offsetY)"
      @mouseleave.left="mouse_leave_l"
      @click.right.prevent
    >
      <circle
        v-for="p in this.$store.state.point_list"
        :key="p.key"
        :cx="p.x"
        :cy="p.y"
        r="8"
        @click.right.prevent="mouse_click_r(p.key)"
        @mousedown.left="mouse_down_l(p.key)"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "Canvas",
  data: function() {
    return {
      clicking: false,
      current_point: 0,
      new_x: 0,
      new_y: 0,
    };
  },
  methods: {
    mouse_click_r(key) {
      this.$store.commit("del_point", key);
    },
    mouse_down_l(key) {
      this.dragging = true;
      this.current_point = key;
    },
    mouse_move_l(x, y) {
      if (this.dragging) {
        this.$store.commit("move_point", { key: this.current_point, x, y });
      }
    },
    mouse_up_l(x, y) {
      if (!this.dragging) {
        x = parseInt(x, 10);
        y = parseInt(y, 10);
        this.$store.commit("add_point", { x, y });
      }
      this.dragging = false;
    },
    mouse_leave_l() {
      this.dragging = false;
    },
  },
};
</script>

<style>
svg {
  border: 1px solid black;
}
circle:hover {
  fill: rgb(256, 150, 150);
  stroke: rgb(256, 100, 100);
  stroke-width: 3;
}
</style>
