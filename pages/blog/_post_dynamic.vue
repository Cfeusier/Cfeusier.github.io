<template>
  <section>
    <template v-if="!isLoading && !!currentPost">
      <div key="blog-post-container">
        <h1 :class="titleClass">{{ currentPost.title }}</h1>
      </div>
    </template>
    <template v-else-if="!isLoading && !currentPost">
      <div key="blog-post-404-container">
        <h1 :class="titleClass">{{ type }} not found</h1>
        <h2 :class="subtitleClass">Check out my writings instead</h2>
        <v-btn nuxt to="/writings">View Writings</v-btn>
      </div>
    </template>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data () {
    return {
      type: 'Post'
    };
  },
  computed: mapState(['titleClass', 'subtitleClass', 'currentPost', 'isLoading']),
  mounted () {
    this.$store.dispatch('fetchCurrentPost', { route: this.$route })
      .then(() => this.type = !!this.currentPost ? 'Post' : 'Page')
      .catch(err => {
        console.error(err);
        this.type = 'Post';
      })
      .finally(() => this.$store.commit('toggleLoading', false));
  }
}
</script>

