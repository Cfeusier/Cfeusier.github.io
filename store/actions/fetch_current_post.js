import BasePost from '~/models/base_post.model';

export default function fetchCurrentPost (
  { state, commit },
  { route } = {}
) {
  const { path, params: { post_dynamic } } = route;
  if (path.includes('.')) return;
  if (!post_dynamic || !post_dynamic.length) return;
  return new Promise((resolve, reject) => {
    state.contentClient.getEntries({
      content_type: 'post',
      'fields.slug[in]': path
    }).then(entries => {
      if (!entries.items[0]) {
        commit('currentPost', null);
        return reject('No post at the provided slug');
      }
      commit('currentPost', new BasePost(entries.items[0]));
      resolve();
    });
  });
}

