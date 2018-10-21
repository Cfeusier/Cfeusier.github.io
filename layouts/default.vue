<template>
  <v-app>
    <nav-menu :items="navItems"></nav-menu>
    <v-content>
      <v-container fluid>
      <nuxt/>
      </v-container>
    </v-content>
  </v-app>
</template>

<style>
.nav-drawer-border-bottom {
  border-bottom-style: solid;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  border-bottom-width: thin;
  border-bottom-color: rgba(0, 0, 0, 0.12) !important;
}
.hover {
  cursor: pointer;
}
.nuxt-link-active {
  // TODO
  color: var(--v-primary-darken1);
  background-color: var(--v-secondary-base);
}
</style>

<script>
import NavMenu from '~/components/NavMenu.vue';

export default {
  components: { NavMenu },
  data () {
    return {
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
  }
}
</script>

