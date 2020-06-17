let scale_x = 40;
let scale_y = 60;

class Node {
  constructor(parent = null, item = null, color = "b") {
    this.item = item;
    this.parent = parent;
    this.left = null;
    this.right = null;
    this.color = color;
    this.x = 0;
    this.y = 0;
    this.display_x = 0;
    this.display_y = 0;
    this.dx = 0;
    this.dy = 0;
  }
  shift_y(shift = 1) {
    if (this.item === null) {
      return;
    } else {
      this.y += shift;
    }
  }
  shift_y_rec(shift = 1) {
    if (this.item === null) {
      return;
    } else {
      this.y += shift;
      this.left.shift_y_rec(shift);
      this.right.shift_y_rec(shift);
    }
  }
  animate_init() {
    if (this.item === null) {
      return;
    } else {
      this.dy = Math.floor((this.y * scale_y - this.display_y) / 20);
      this.dx = Math.floor((this.x * scale_x - this.display_x) / 20);
      this.left.animate_init();
      this.right.animate_init();
    }
  }
  animate_x() {
    if (this.item === null) {
      return;
    } else {
      this.display_x += this.dx;
      this.left.animate_x();
      this.right.animate_x();
    }
  }
  animate_y() {
    if (this.item === null) {
      return;
    } else {
      this.display_y += this.dy;
      this.left.animate_y();
      this.right.animate_y();
    }
  }
  update() {
    if (this.item === null) {
      return;
    } else {
      this.display_x = this.x * scale_x;
      this.display_y = this.y * scale_y;
      this.left.update();
      this.right.update();
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
    if (isNaN(item)) {
      return;
    }
    let y = 0;
    let current = this.root;
    while (current.item !== null) {
      if (item < current.item) {
        current = current.left;
      } else if (item > current.item) {
        current = current.right;
      } else {
        return;
      }
      y += 1;
    }
    this.current_balance = current;
    current.item = item;
    current.color = "r";
    current.left = new Node(current);
    current.right = new Node(current);
    current.y = y;

    if (current.parent !== null) {
      current.display_x = current.parent.display_x;
      current.display_y = current.parent.display_y;
    }

    let i;
    for (i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].item > item) {
        break;
      }
    }
    this.nodes.splice(i, 0, current);
    current.x = i;
    for (i += 1; i < this.nodes.length; i++) {
      this.nodes[i].x += 1;
    }
  }
  recolor(node = this.current_balance) {
    if (this.current_balance === null) return true;
    // if root color black
    if (node.parent === null) {
      node.color = "b";
      this.current_balance = null;
      return true;
    }
    // if parent is black no action needed
    if (node.parent.color === "b") {
      this.current_balance = null;
      return true;
    }
    // if parent and uncle are red recolor them and grandfather
    if (node.parent.parent.left.color === node.parent.parent.right.color) {
      node.parent.parent.left.color = "b";
      node.parent.parent.right.color = "b";
      node.parent.parent.color = "r";
      this.current_balance = node.parent.parent;
      return false;
    }
    return true;
  }

  rotate(node = this.current_balance) {
    if (this.current_balance === null) return true;
    // helpful values
    let gparent = node.parent.parent;
    let parent = node.parent;
    let side = node.parent.left.item === node.item ? "left" : "right";
    let pside = gparent.left.item === parent.item ? "left" : "right";
    let gpside = null;
    if (gparent.parent !== null) {
      gpside = gparent.parent.left.item === gparent.item ? "left" : "right";
    }
    // CASE 1: currently balancing node 5
    // [] = black, () = red
    //      6                      6
    //      |                      |
    //     [2]        --->        [4]
    //    /   \       INTO       /   \
    //  [1]   (4)             (2)     (5)
    //  * *   / \             / \     * *
    //       3  (5)         [1]  3
    //          * *         * *
    //         west <--  --> east
    if (side === pside) {
      // determine orientation
      let east = side;
      let west = side === "left" ? "right" : "left";
      // recalculate depths
      gparent[west].shift_y_rec(1);
      gparent.shift_y(1);
      parent.shift_y(-1);
      node.shift_y_rec(-1);
      // in case gparent is root reset root
      if (gparent.item === this.root.item) this.root = parent;
      // recolor
      parent.color = "b";
      gparent.color = "r";
      // rotate
      // link node 4 (child) to node 6 (parent)
      if (gpside !== null) gparent.parent[gpside] = parent;
      parent.parent = gparent.parent;
      // link node 3 (child) to node 2 (parent)
      gparent[east] = parent[west];
      gparent[east].parent = gparent;
      // link node 2 (child) to node 4 (parent)
      parent[west] = gparent;
      gparent.parent = parent;
      this.current_balance = null;
      return true;
    }
    // CASE 2: currently balancing node 3
    // [] = black, () = red
    //       6                      6
    //       |                      |
    //      [2]        --->        [2]
    //    /     \      INTO      /     \
    //  [1]      (5)           [1]     (3)
    //  * *     /  *           * *     *  \
    //       (3)                           (5)
    //       * \                           / *
    //          4                         4
    //          west <--  --> east
    // this then reduces to case 1
    else {
      // determine orientation
      let east = pside;
      let west = side;
      // recalculate depths
      node.y.shift_y(-1);
      node[west].shift_y_rec(-1);
      parent.shift_y(1);
      parent[east].shift_y_rec(1);
      // rotate
      // link node 3 (child) to node 2 (parent)
      gparent[east] = node;
      node.parent = gparent;
      // link node 4 (child) to node 5 (parent)
      parent[west] = node[east];
      node[east].parent = parent;
      // link node 5 (child) to node 3 (parent)
      node[east] = parent;
      parent.parent = node;
      return false;
    }
  }
  balance() {
    let done = false;
    while (!done) {
      done = this.recolor();
    }
    done = false;
    while (!done) {
      done = this.rotate();
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
  balance(state) {
    state.tree.balance();
  },
  update(state) {
    state.tree.root.update();
  },
  animate(state) {
    state.tree.root.animate_x();
    state.tree.root.animate_y();
  },
  animate_init(state) {
    state.tree.root.animate_init();
  },
};

const actions = {
  animate({ commit }) {
    commit("animate_init");
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        commit("animate");
      }, 50 * i);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
