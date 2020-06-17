<template>
  <div>
    <h1>Red-Black Trees</h1>
    <router-link to="/">Home</router-link>
    <br />
    <svg height="400" width="1400">
      <line
        v-for="node in $store.state.redblacktrees.tree.nodes"
        :key="node.item + 'l1'"
        :x1="30 + node.display_x"
        :y1="50 + node.display_y"
        :x2="
          node.left.item === null
            ? 10 + node.display_x
            : 30 + node.left.display_x
        "
        :y2="
          node.left.item === null
            ? 70 + node.display_y
            : 50 + node.left.display_y
        "
        stroke="black"
        stroke-width="4"
      />
      <line
        v-for="node in $store.state.redblacktrees.tree.nodes"
        :key="node.item + 'l2'"
        :x1="30 + node.display_x"
        :y1="50 + node.display_y"
        :x2="
          node.right.item === null
            ? 50 + node.display_x
            : 30 + node.right.display_x
        "
        :y2="
          node.right.item === null
            ? 70 + node.display_y
            : 50 + node.right.display_y
        "
        stroke="black"
        stroke-width="4"
      />
      <circle
        v-for="node in $store.state.redblacktrees.tree.nodes"
        :key="node.item"
        :opacity="node.opacity"
        :cx="30 + node.display_x"
        :cy="50 + node.display_y"
        :stroke="node.color === 'r' ? 'red' : 'black'"
        @click="hide(node.item)"
        r="20"
        stroke-width="5"
        fill="white"
      />
      <text
        v-for="node in $store.state.redblacktrees.tree.nodes"
        :key="node.item + 't'"
        :opacity="node.opacity"
        :x="30 + node.display_x"
        :y="50 + node.display_y"
        text-anchor="middle"
        dy=".3em"
      >
        {{ node.item }}
      </text>
    </svg>
    <br />
    <input v-model="new_node" @keyup.enter="insert" />
    <button @click="insert">INSERT</button>
  </div>
</template>

<script>
export default {
  name: "RedBlackTreeScreen",
  data: function() {
    return {
      new_node: 0,
      root: 0,
    };
  },
  methods: {
    insert() {
      this.$store.commit("redblacktrees/insert", this.new_node);
      this.$store.commit("redblacktrees/balance", this.new_node);
      this.$store.dispatch("redblacktrees/animate");
      this.new_node = "";
    },
    hide(item) {
      this.$store.commit("redblacktrees/toggle_hide", item);
    },
  },
};
</script>
<style>
svg {
  border: 1px solid black;
}
</style>
