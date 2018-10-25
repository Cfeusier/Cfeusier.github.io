import initialState from '~/store/initial_state';
import toggleMobile from '~/store/actions/toggle_mobile';
import toggleMobile$ from '~/store/mutations/toggle_mobile';
import responsiveClasses from '~/store/actions/responsive_classes';
import fetchPosts from '~/store/actions/fetch_posts';
import defaultClasses$ from '~/store/mutations/default_classes';
import mobileClasses$ from '~/store/mutations/mobile_classes';
import contentClient$ from '~/store/mutations/content_client';
import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: initialState,
    mutations: {
      toggleMobile: toggleMobile$,
      defaultClasses: defaultClasses$,
      mobileClasses: mobileClasses$,
      // TODO: remove counter, example purposes only
      postsCount: (state, count) => state.postsCount = count,
      contentClient: contentClient$
    },
    actions: {
      toggleMobile,
      responsiveClasses,
      fetchPosts
    }
  });
}

export default createStore;

