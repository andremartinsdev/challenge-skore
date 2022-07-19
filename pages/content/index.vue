<template>
  <div>
    <ListContents />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  created() {
    console.log(this.$route.params.id)
  },
})
</script>

<style lang="scss"></style>
