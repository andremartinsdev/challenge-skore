<template>
  <Content />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  middleware: [
    function ({ redirect }) {
      redirect('/content')
    },
  ],
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
body {
  height: 100vh;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  background: #1e3c72;
}

</style>
