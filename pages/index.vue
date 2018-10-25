<template>
  <section>
    <div>
      <h1 :class="titleClass">Clark Feusier</h1>
      <h2 :class="subtitleClass">Software Engineer and Metalogician</h2>
      <h3>{{ postsCount }}</h3>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState(['titleClass', 'subtitleClass', 'postsCount']),

  mounted () {
    this.$nextTick(() => this.$nuxt.$loading.start());
    this.$store
      .dispatch('fetchPosts', { limit: 10, order: 'sys.createdAt' })
      .then(() => console.log('first page of posts are fetched'))
      .then(() => this.$nuxt.$loading.finish());
  }
}
</script>

