import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      isMobile: false
    }),
    mutations: {
      toggleMobile (state, flag) {
        state.isMobile = flag;
      }
    }
  });
}

export default createStore;
