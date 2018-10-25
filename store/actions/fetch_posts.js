export default function fetchPosts (
  { commit, state },
  options = { limit: 10, order: 'sys.createdAt' }
) {
  return new Promise((resolve, reject) => {
    state.contentClient
      .getEntries(options)
      .then(entries => {
        commit('postsCount', entries.total);
        resolve();
      });
  });
}

