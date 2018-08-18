<template>
  <main>
    <alert-bar></alert-bar>
    <nuxt/>
  </main>
</template>

<style lang="scss">
</style>

<script>
  import AlertBar from '~/components/AlertBar';

  export default {
    components: {
      AlertBar
    },

  };
</script>
