import initialState from '~/store/initial_state';
import toggleMobile from '~/store/actions/toggle_mobile';
import toggleMobile$ from '~/store/mutations/toggle_mobile';
import responsiveClasses from '~/store/actions/responsive_classes';
import defaultClasses$ from '~/store/mutations/default_classes';
import mobileClasses$ from '~/store/mutations/mobile_classes';
import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: initialState,
    mutations: {
      toggleMobile: toggleMobile$,
      defaultClasses: defaultClasses$,
      mobileClasses: mobileClasses$,
    },
    actions: {
      toggleMobile,
      responsiveClasses,
    }
  });
}

export default createStore;
