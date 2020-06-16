<template>
  <div>
    <svg
      @mousedown.left="svg_mouse_down_left"
      @mouseleave="svg_mouse_leave"
      @click.right.prevent
      height="400"
      width="400"
    >
      <circle
        v-for="p in $store.state.sandbox.point_list"
        :key="p.key"
        :cx="p.x"
        :cy="p.y"
        @mousedown.left="circle_mouse_down_left(p)"
        @mousedown.right="circle_mouse_down_right(p)"
        @mouseleave="circle_mouse_leave"
        r="8"
        :class="{
          moving: p.key === current_point_key && moving,
          deleting: p.key === current_point_key && deleting,
          point: true,
        }"
      />
      <circle
        v-if="creating"
        :cx="$props.sprops.rx"
        :cy="$props.sprops.ry"
        r="8"
        class="ghost"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "Canvas",
  data: function() {
    return {
      moving: false,
      creating: false,
      deleting: false,
      current_point_x: 0,
      current_point_y: 0,
      current_point_key: -1,
    };
  },
  props: ["sprops"],
  methods: {
    svg_mouse_down_left() {
      if (!this.moving) {
        this.creating = true;
      }
    },
    svg_mouse_leave() {
      this.creating = false;
    },
    circle_mouse_down_left(point) {
      this.current_point_x = point.x;
      this.current_point_y = point.y;
      this.current_point_key = point.key;
      this.moving = true;
    },
    circle_mouse_down_right(point) {
      if (!this.moving) {
        this.current_point_key = point.key;
        this.deleting = true;
      }
    },
    circle_mouse_leave() {
      if (this.deleting) {
        this.deleting = false;
        this.current_point_key = -1;
      }
    },
  },
  mounted() {
    let self = this;
    this.sprops.add_action("mouse_move", (e) => {
      if (self.moving) {
        self.$store.commit("sandbox/move_point", {
          x:
            self.current_point_x + self.$props.sprops.x - self.$props.sprops.ix,
          y:
            self.current_point_y + self.$props.sprops.y - self.$props.sprops.iy,
          key: self.current_point_key,
        });
      }
      e;
    });
    this.sprops.add_action("mouse_l_up", () => {
      self.moving = false;
      self.current_point_key = -1;
      if (self.creating) {
        self.$store.commit("sandbox/add_point", {
          x: self.$props.sprops.rx,
          y: self.$props.sprops.ry,
        });
        self.creating = false;
      }
    });
    this.sprops.add_action("mouse_r_up", () => {
      if (self.deleting) {
        self.$store.commit("sandbox/del_point", self.current_point_key);
        self.deleting = false;
      }
    });
  },
};
</script>

<style>
svg {
  border: 1px solid black;
}
.moving {
  fill: rgb(100, 180, 140) !important;
}
.deleting {
  fill: rgb(250, 100, 140) !important;
}
.point:hover {
  fill: rgb(200, 200, 200);
}
.ghost {
  fill: rgb(200, 200, 200);
}
</style>
