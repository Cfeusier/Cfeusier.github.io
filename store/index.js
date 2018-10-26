import Vuex from 'vuex';

import initialState from '~/store/initial_state';
import toggleMobile from '~/store/actions/toggle_mobile';
import toggleMobile$ from '~/store/mutations/toggle_mobile';
import toggleLoading$ from '~/store/mutations/toggle_loading';
import responsiveClasses from '~/store/actions/responsive_classes';
import fetchPosts from '~/store/actions/fetch_posts';
import fetchCurrentPost from '~/store/actions/fetch_current_post';
import defaultClasses$ from '~/store/mutations/default_classes';
import mobileClasses$ from '~/store/mutations/mobile_classes';
import contentClient$ from '~/store/mutations/content_client';
import currentPost$ from '~/store/mutations/current_post';

const createStore = () => {
  return new Vuex.Store({
    state: initialState,
    mutations: {
      toggleMobile: toggleMobile$,
      toggleLoading: toggleLoading$,
      defaultClasses: defaultClasses$,
      mobileClasses: mobileClasses$,
      // TODO: remove counter, example purposes only
      postsCount: (state, count) => state.postsCount = count,
      contentClient: contentClient$,
      currentPost: currentPost$
    },
    actions: {
      toggleMobile,
      responsiveClasses,
      fetchPosts,
      fetchCurrentPost
    }
  });
}

export default createStore;

