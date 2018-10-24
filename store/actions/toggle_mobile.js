export default function toggleMobile ({ commit, dispatch }, flag) {
  commit('toggleMobile', flag);
  dispatch('responsiveClasses');
}

