<template>
  <v-app>
    <v-navigation-drawer stateless
      :mini-variant.sync="mini"
      value="true"
      hide-overlay
      class="transparent">
      <v-toolbar flat class="primary">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="secondary--text text--lighten-1">Clark Feusier</v-list-tile-title>
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
          @click="">
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
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      mini: true,
      right: null,
      navItems: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ]
    };
  }
}
</script>

