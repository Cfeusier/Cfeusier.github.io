<template>
  <section>
    <h1 :class="titleClass">Portfolio, in progress</h1>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState(['titleClass'])
}
</script>

