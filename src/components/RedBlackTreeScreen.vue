<template>
  <div>
    <h1>Red-Black Trees</h1>
    <router-link to="/">Home</router-link>
    <br />
    <svg height="400" width="1400">
      <line
        v-for="node in $store.state.redblacktrees.tree.nodes"
        :key="node.item + 'l1'"
        :x1="30 + node.pos * 40"
        :y1="50 + node.depth * 60"
        :x2="
          node.left.item === null ? 10 + node.pos * 40 : 30 + node.left.pos * 40
        "
        :y2="
          node.left.item === null
            ? 70 + node.depth * 60
            : 50 + node.left.depth * 60
        "
        stroke="black"
        stroke-width="4"
      />
      <line
        v-for="node in $store.state.redblacktrees.tree.nodes"
        :key="node.item + 'l2'"
        :x1="30 + node.pos * 40"
        :y1="50 + node.depth * 60"
        :x2="
          node.right.item === null
            ? 50 + node.pos * 40
            : 30 + node.right.pos * 40
        "
        :y2="
          node.right.item === null
            ? 70 + node.depth * 60
            : 50 + node.right.depth * 60
        "
        stroke="black"
        stroke-width="4"
      />
      <circle
        v-for="node in $store.state.redblacktrees.tree.nodes"
        :key="node.item"
        :cx="30 + node.pos * 40"
        :cy="50 + node.depth * 60"
        :stroke="node.color === 'r' ? 'red' : 'black'"
        r="20"
        stroke-width="5"
        fill="white"
      />
      <text
        v-for="node in $store.state.redblacktrees.tree.nodes"
        :key="node.item + 't'"
        :x="30 + node.pos * 40"
        :y="50 + node.depth * 60"
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
      this.new_node = "";
    },
  },
};
</script>
<style>
svg {
  border: 1px solid black;
}
</style>
