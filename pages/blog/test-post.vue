<template>
  <section>
    <h1 :class="titleClass">TEST POST</h1>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState(['titleClass'])
}
</script>

