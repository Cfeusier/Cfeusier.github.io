<template>
  <section>
    <div>
      <h1 :class="titleClass">Clark Feusier</h1>
      <h2 :class="subtitleClass">Software Engineer and Metalogician</h2>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState(['titleClass', 'subtitleClass'])
}
</script>

