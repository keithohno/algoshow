class Node {
  constructor(parent = null, item = null, color = "b") {
    this.item = item;
    this.parent = parent;
    this.left = null;
    this.right = null;
    this.color = color;
    this.depth = -1;
    this.pos = -1;
  }
  increment_depths(inc = 1) {
    if (this.item === null) {
      return;
    } else {
      this.depth += inc;
      this.left.increment_depths(inc);
      this.right.increment_depths(inc);
    }
  }
}

class RBTree {
  constructor() {
    this.root = new Node();
    this.nodes = [];
    this.current_balance = null;
  }
  insert(item) {
    item = parseInt(item, 10);
    let depth = 0;
    let current = this.root;
    while (current.item !== null) {
      if (item < current.item) {
        current = current.left;
      } else if (item > current.item) {
        current = current.right;
      } else {
        return;
      }
      depth += 1;
    }
    this.current_balance = current;
    current.item = item;
    current.color = "r";
    current.depth = depth;
    current.left = new Node(current);
    current.right = new Node(current);

    let i;
    for (i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].item > item) {
        break;
      }
    }
    this.nodes.splice(i, 0, current);
    current.pos = i;
    for (i += 1; i < this.nodes.length; i++) {
      this.nodes[i].pos += 1;
    }
  }
  balance_once(node = this.current_balance) {
    // if root color black
    if (node.parent === null) {
      node.color = "b";
      this.current_balance = null;
      return;
    }
    // if parent is black no action needed
    // note: this filters out case where parent is root
    if (node.parent.color === "b") {
      this.current_balance = null;
      return;
    }
    // if parent and uncle are red recolor them and grandfather
    if (node.parent.parent.left.color === node.parent.parent.right.color) {
      node.parent.parent.left.color = "b";
      node.parent.parent.right.color = "b";
      node.parent.parent.color = "r";
      this.current_balance = node.parent.parent;
      return;
    }
    // split into four cases and rotate based on node position
    let grandparent = node.parent.parent;
    let parent = node.parent;
    let side = node.parent.left.item === node.item ? "left" : "right";
    let pside = grandparent.left.item === parent.item ? "left" : "right";
    let gside = null;
    if (grandparent.parent !== null) {
      gside =
        grandparent.parent.left.item === grandparent.item ? "left" : "right";
    }
    if (side === "left" && pside === "left") {
      // re-evaluate depths and colors
      node.increment_depths(-1);
      grandparent.right.increment_depths();
      parent.depth -= 1;
      grandparent.depth += 1;
      parent.color = "b";
      grandparent.color = "r";
      if (this.root.item === grandparent.item) this.root = node.parent;
      // relink
      if (gside !== null) grandparent.parent[gside] = parent;
      parent.parent = grandparent.parent;
      grandparent.left = parent.right;
      grandparent.left.parent = grandparent;
      parent.right = grandparent;
      parent.right.parent = parent;
    } else if (side === "right" && pside === "left") {
      // re-evaluate depths and colors
      node.left.increment_depths(-1);
      node.right.increment_depths(-1);
      grandparent.right.increment_depths();
      node.depth -= 2;
      grandparent.depth += 1;
      node.color = "b";
      grandparent.color = "r";
      if (this.root.item === grandparent.item) this.root = node;
      // relink
      if (gside !== null) grandparent.parent[gside] = node;
      node.parent = grandparent.parent;
      parent.right = node.left;
      parent.right.parent = parent;
      node.left = parent;
      node.left.parent = node;
      grandparent.left = node.right;
      grandparent.left.parent = grandparent;
      node.right = grandparent;
      grandparent.parent = node;
    } else if (side === "right" && pside === "right") {
      // re-evaluate depths and colors
      node.increment_depths(-1);
      grandparent.left.increment_depths();
      parent.depth -= 1;
      grandparent.depth += 1;
      parent.color = "b";
      grandparent.color = "r";
      if (this.root.item === grandparent.item) this.root = node.parent;
      // relink
      if (gside !== null) grandparent.parent[gside] = parent;
      parent.parent = grandparent.parent;
      grandparent.right = parent.left;
      grandparent.right.parent = grandparent;
      parent.left = grandparent;
      parent.left.parent = parent;
    } else {
      // re-evaluate depths and colors
      node.left.increment_depths(-1);
      node.right.increment_depths(-1);
      grandparent.left.increment_depths();
      node.depth -= 2;
      grandparent.depth += 1;
      node.color = "b";
      grandparent.color = "r";
      if (this.root.item === grandparent.item) this.root = node;
      // relink
      if (gside !== null) grandparent.parent[gside] = node;
      node.parent = grandparent.parent;
      parent.left = node.right;
      parent.left.parent = parent;
      node.right = parent;
      node.right.parent = node;
      grandparent.right = node.left;
      grandparent.right.parent = grandparent;
      node.left = grandparent;
      grandparent.parent = node;
    }
    this.current_balance = null;
  }
  balance() {
    while (this.current_balance !== null) {
      this.balance_once();
    }
  }
  debug() {
    let ret = "";
    for (let node of this.nodes) {
      ret += node.item + ":  P=";
      ret += node.parent === null ? null : node.parent.item;
      ret += "  L=" + node.left.item + "  R=" + node.right.item + "\n";
    }
    return ret;
  }
}

const state = () => ({
  tree: new RBTree(),
});

const mutations = {
  insert(state, item) {
    state.tree.insert(item);
  },
  balance_once(state) {
    state.tree.balance_once();
  },
  balance(state) {
    state.tree.balance();
  },
  increment(state, inc) {
    state.tree.root.increment_depths(inc);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
