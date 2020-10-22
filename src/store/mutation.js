const mutations = {
  changeLayout: (state, layout) => {
    if (layout) state.layout = layout;
  },
  changeHeader: (state, header) => {
    if (header) state.header = header;
  },
  changeTagsBar: (state, tagsBar) => {
    if (tagsBar) state.tagsBar = tagsBar;
  },
  changeCollapse: (state) => {
    state.collapse = !state.collapse;
  },
  foldSideBar: (state) => {
    state.collapse = true;
  },
  openSideBar: (state) => {
    state.collapse = false;
  },
  toggleDevice: (state, device) => {
    state.device = device;
  },
  setRouters: (state, payload) => {
    state.routes = payload;
  },
  setVisitedRoutes: (state, payload) => {
    state.visitedRoutes = payload;
  },
  setAuthData: (state, payload) => {
    state.authData = payload;
  },
  setConfigData: (state, payload) => {
    state.configData = payload;
  },

}

export default mutations
