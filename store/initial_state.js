import {
  DEFAULT_TITLE_CLASS,
  DEFAULT_SUBTITLE_CLASS,
  DEFAULT_CONTAINER_CLASS,
} from '~/assets/constants/classes';

export default function initialState () {
  return {
    isMobile: false,
    isLoading: false,
    titleClass: DEFAULT_TITLE_CLASS,
    subtitleClass: DEFAULT_SUBTITLE_CLASS,
    containerClass: DEFAULT_CONTAINER_CLASS,
    postsCount: 0,
    contentClient: null,
    currentPost: null
  };
}
