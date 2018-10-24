import {
  DEFAULT_TITLE_CLASS,
  DEFAULT_SUBTITLE_CLASS,
  DEFAULT_CONTAINER_CLASS,
} from '~/assets/constants/classes';

export default function defaultClasses$ (state) {
  state.titleClass = DEFAULT_TITLE_CLASS;
  state.subtitleClass = DEFAULT_SUBTITLE_CLASS;
  state.containerClass = DEFAULT_CONTAINER_CLASS;
}

