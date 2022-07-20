<template>
  <div>
    <Header />
    <NuxtChild />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  transition: {
    name: 'test',
    mode: 'out-in',
  },
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
::-webkit-scrollbar {
  width: 3px;
}

::-webkit-scrollbar-track {
  background: #1e3c72;
}

::-webkit-scrollbar-thumb {
  background: #f3f3f35b;
  border-radius: 5px;
}
</style>
