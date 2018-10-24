export default function responsiveClasses ({ commit, state }) {
  commit(state.isMobile ? 'mobileClasses' : 'defaultClasses');
}

