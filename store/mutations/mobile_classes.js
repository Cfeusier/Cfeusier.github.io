import {
  MOBILE_TITLE_CLASS,
  MOBILE_SUBTITLE_CLASS,
  MOBILE_CONTAINER_CLASS
} from '~/assets/constants/classes';

export default function mobileClasses$ (state) {
  state.titleClass = MOBILE_TITLE_CLASS;
  state.subtitleClass = MOBILE_SUBTITLE_CLASS;
  state.containerClass = MOBILE_CONTAINER_CLASS;
}

