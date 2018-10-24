<template>
  <v-app v-resize="onResize">
    <nav-menu :items="navItems"></nav-menu>
    <v-content>
      <v-container fluid :class="containerClass">
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NavMenu from '~/components/NavMenu.vue';
import { mapState } from 'vuex';

export default {
  components: { NavMenu },
  mounted () {
    this.onResize();
  },
  data () {
    return {
      isMobile: false,
      navItems: [
        {
          title: 'Home',
          route: '/',
          icon: 'home'
        },
        {
          title: 'About',
          route: '/about',
          icon: 'account_circle'
        },
        {
          title: 'Writings',
          route: '/writings',
          icon: 'edit'
        },
        {
          title: 'Portfolio',
          route: '/portfolio',
          icon: 'code'
        }
      ]
    };
  },
  methods: {
    onResize () {
      this.$store.dispatch('toggleMobile', window.outerWidth < 645);
    }
  },
  computed: mapState(['containerClass'])
}
</script>

