const getters = {
  setloading: state => state.app.loading,
  token: state => state.user.token,
  name: state => state.user.name,
  CollapseState: state => state.header.isCollapse,
  AsideTitle: state => state.header.asideTitle,
  active: state => state.header.activeIndex,
  Count: state => state.header.count,
  Crumbs: state => state.header.Crumbs,
  Navs: state => state.header.nav
};
export default getters;
