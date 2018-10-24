<template>
  <v-navigation-drawer app
    stateless
    :mini-variant="mini"
    value="true"
    hide-overlay
    class="transparent nav-drawer-border-bottom"
    width="225"
    height="100%">
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
    <v-list subheader dense>
      <v-divider></v-divider>
      <v-list-tile v-for="item in navItems"
        :key="item.title"
        :class="item.selected ? 'nuxt-link-active hover' : 'hover'"
        @click="routeOrOpen(item)">
        <v-list-tile-action>
          <v-icon class="primary--text">{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="primary--text text--darken-1">{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
    </v-list>
    <v-list subheader dense v-if="!mini">
      <v-subheader class="primary--text text--lighten-1">Contact</v-subheader>
      <v-list-tile ripple href="mailto:cfeusier+web@gmail.com">
        <v-list-tile-action>
          <v-icon class="secondary--text text--darken-2">mail_outline</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="primary--text">Email</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile ripple href="http://linkedin.com/in/clarkfeusier" target="_blank" rel="noopener">
        <v-list-tile-action>
          <v-icon class="secondary--text text--darken-2">work_outline</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="primary--text">LinkedIn</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile ripple href="https://github.com/Cfeusier" target="_blank" rel="noopener">
        <v-list-tile-action>
          <v-icon class="secondary--text text--darken-2">build</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="primary--text">GitHub</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-footer fixed class="transparent">
      <v-flex text-xs-center>
        <v-menu
          v-model="copyright"
          :close-on-content-click="false"
          right
          offset-x
          transition="scale-transition">
          <v-btn icon slot="activator">
            <v-icon small class="primary--text">copyright</v-icon>
          </v-btn>
          <v-card tile width="220">
            <v-toolbar color="primary" flat card dense height="20"></v-toolbar>
            <v-toolbar color="secondary" flat card dense height="5"></v-toolbar>
            <v-card-text class="primary--text text--darken-1">Copyright, Clark Feusier 2018</v-card-text>
          </v-card>
        </v-menu>
      </v-flex>
    </v-footer>
  </v-navigation-drawer>
</template>

<script>
export default {
  mounted () {
    this.updateSelection();
    this.mobileWatch = this.$store.watch(
      () => this.$store.state.isMobile,
      isMobile => {
        this.isMobile = isMobile;
        this.mini = this.isMobile;
      }
    );
  },
  beforeDestroy () {
    this.mobileWatch();
  },
  props: ['items'],
  data () {
    return {
      mini: true,
      isMobile: false,
      copyright: false,
      navItems: this.items.slice(),
      mobileWatch: null
    };
  },
  methods: {
    updateSelection () {
      this.navItems = this.navItems.map((i) => {
        i.selected = (this.$route.path === i.route || this.$route.path === `${i.route}/`);
        return i;
      });
    },
    routeOrOpen (navItem) {
      this.$router.push({ path: navItem.route });
      if (this.isMobile) return;
      this.mini = false;
    }
  },
  watch: {
    '$route' () {
      this.updateSelection();
    },
  }
}
</script>

<style scoped>
.nav-drawer-border-bottom {
  border-bottom-style: solid;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  border-bottom-width: thin;
  border-bottom-color: rgba(0, 0, 0, 0.12) !important;
}
</style>

