<template v-slot:default="sprops">
  <div id="cursor_frame">
    <h1>Cursor Frame</h1>
    <router-link to="/">Home</router-link>
    <slot
      :add_action="add_action"
      :x="x"
      :y="y"
      :rx="rx"
      :ry="ry"
      :ix="ix"
      :iy="iy"
      :fx="fx"
      :fy="fy"
    ></slot>
  </div>
</template>

<script>
export default {
  name: "CursorFrame",
  data: function() {
    return {
      x: 0,
      y: 0,
      rx: 0,
      ry: 0,
      ix: 0,
      iy: 0,
      fx: 0,
      fy: 0,
      mouse_l_down: () => {},
      mouse_l_up: () => {},
      mouse_r_down: () => {},
      mouse_r_up: () => {},
      mouse_move: () => {},
    };
  },
  methods: {
    add_action(action_name, func) {
      this[action_name] = func;
    },
  },
  mounted() {
    var self = this;
    window.addEventListener("mousedown", function(event) {
      if (event.button == 0) {
        self.ix = event.screenX;
        self.iy = event.screenY;
        self.mouse_l_down(event);
      } else if (event.button == 2) {
        self.mouse_r_down(event);
      }
    });
    window.addEventListener("mousemove", function(event) {
      self.x = event.screenX;
      self.y = event.screenY;
      self.rx = event.offsetX;
      self.ry = event.offsetY;
      self.mouse_move(event);
    });
    window.addEventListener("mouseup", function(event) {
      if (event.button == 0) {
        self.fx = event.screenX;
        self.fy = event.screenY;
        self.mouse_l_up(event);
      } else if (event.button == 2) {
        self.mouse_r_up(event);
      }
    });
  },
};
</script>
