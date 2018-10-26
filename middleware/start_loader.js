export default function startLoader ({ store }) {
  store.commit('toggleLoading', true);
}

