<template>
  <section>
    <template v-if="!!currentPost">
      <div key="blog-post-container">
        <h1 :class="titleClass">{{ currentPost.title }}</h1>
      </div>
    </template>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  mounted () {
    //this.$store.dispatch('fetchCurrentPost', { route: this.$route })
  },
  computed: mapState(['titleClass', 'currentPost'])
}
</script>

