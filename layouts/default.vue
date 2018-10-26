<template>
  <v-app v-resize="onResize">
    <nav-menu :items="navItems"></nav-menu>
    <loading-indicator></loading-indicator>
    <v-content>
      <v-container fluid :class="containerClass">
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NavMenu from '~/components/NavMenu.vue';
import LoadingIndicator from '~/components/LoadingIndicator.vue';
import { navItems } from '~/assets/constants/navigation_items';
import { mapState } from 'vuex';

export default {
  components: { NavMenu, LoadingIndicator },
  mounted () {
    this.onResize();
  },
  data () {
    return { navItems };
  },
  methods: {
    onResize () {
      this.$store.dispatch('toggleMobile', window.outerWidth < 645);
    }
  },
  computed: mapState(['containerClass'])
}
</script>

