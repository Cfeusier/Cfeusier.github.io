const contentful = require('contentful');

// only run on client -- do not commit this contentClient to
// the store when on server because it doesn't serialize well
export default ({ app, store }) => {
  if (!store.state.contentClient) {
    store.commit(
      'contentClient',
      contentful.createClient({
        space: process.env.contentfulSpace,
        accessToken: process.env.contentfulToken
      })
    );
  }
};

