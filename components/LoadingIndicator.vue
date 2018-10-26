<template>
  <div class="navbar" key="loading-container">
    <template v-if="isLoading">
      <v-progress-linear
        background-color="secondary darken-1"
        color="secondary lighten-1"
        indeterminate>
      </v-progress-linear>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState(['isLoading'])
}
</script>

<style scoped>
.navbar {
  overflow: hidden;
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
}

.v-progress-linear {
  margin: 0 0;
}
</style>

