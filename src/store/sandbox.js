const state = () => ({
  point_list: [],
});

const mutations = {
  increment(state) {
    state.count++;
  },
  add_point(state, prm) {
    for (let p of state.point_list) {
      if (p.x === prm.x && p.y === prm.y) {
        return;
      }
    }
    state.point_list.push({
      x: prm.x,
      y: prm.y,
      key: state.point_list.length,
    });
  },
  del_point(state, key) {
    for (let i = key + 1; i < state.point_list.length; i++) {
      state.point_list[i].key--;
    }
    state.point_list.splice(key, 1);
  },
  move_point(state, prm) {
    state.point_list[prm.key].x = Math.min(396, Math.max(4, prm.x));
    state.point_list[prm.key].y = Math.min(396, Math.max(4, prm.y));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
