<template>
  <v-app>
    <v-navigation-drawer app
      stateless
      :mini-variant.sync="mini"
      value="true"
      hide-overlay
      class="transparent nav-drawer-border-bottom"
      width="225"
      height="150">
      <v-toolbar flat class="primary">
        <v-list class="pa-0">
          <v-list-tile>
            <v-list-tile-avatar>
              <img src="/up_close_headshot.jpg">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="secondary--text text--lighten-1">
                Clark Feusier
              </v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon
                @click.stop="mini = !mini">
                <v-icon class="secondary--text text--lighten-4">chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in navItems"
          :key="item.title"
          :class="item.selected ? 'nuxt-link-active hover' : 'hover'"
          @click="routeOrOpen(item)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid>
      <nuxt/>
      </v-container>
    </v-content>
  </v-app>
</template>

<style scoped>
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
  //color: var(--v-primary-darken1);
  //background-color: var(--v-secondary-base);
}
</style>

<script>
export default {
  mounted () {
    this.updateSelection();
  },
  data () {
    return {
      mini: true,
      right: null,
      navItems: [
        {
          title: 'Home',
          route: '/',
          icon: 'dashboard'
        },
        {
          title: 'About',
          route: '/about',
          icon: 'question_answer'
        }
      ]
    };
  },
  methods: {
    updateSelection () {
      this.navItems = this.navItems.map((i) => {
        i.selected = this.$route.path === i.route;
        console.log(this.mini, this.$route.path, i)
        return i;
      });
    },
    routeOrOpen (navItem) {
      //this.$router.push({ path: navItem.route });
      //setTimeout(() => this.updateSelection());
    }
  }
}
</script>

