

const actions = {
  changeLayout({ commit }, layout) {
    commit("changeLayout", layout);
  },
  changeHeader({ commit }, header) {
    commit("changeHeader", header);
  },
  changeTagsBar({ commit }, tagsBar) {
    commit("changeTagsBar", tagsBar);
  },
  changeCollapse({ commit }) {
    commit("changeCollapse");
  },
  foldSideBar({ commit }) {
    commit("foldSideBar");
  },
  openSideBar({ commit }) {
    commit("openSideBar");
  },
  toggleDevice({ commit }, device) {
    commit("toggleDevice", device);
  },
  setRouters({ commit }, payload) {
    commit("setRouters", payload);
  },
  setVisitedRoutes({ commit }, payload) {
    commit("setVisitedRoutes", payload);
  },
  setAuthData({ commit }, payload) {
    commit("setAuthData", payload);
  },
  setConfigData({ commit }, payload) {
    commit("setConfigData", payload);
  },


}

export default actions
