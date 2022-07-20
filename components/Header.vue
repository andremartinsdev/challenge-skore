<!-- Please remove this file from your project -->
<template>
  <div>
    <header class="header-conteiner">
      <div>
        <span class="header-content fw-300">Conteúdos</span>
        <span class="header-content fw-600">LGPD</span>
      </div>
      <div>
        <img
          src="~/assets/images/lgpd.png"
          class="header-imagen"
          alt=""
          srcset=""
        />
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'TutorialTeste',
})
</script>

<style lang="scss" scoped>
header {
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1e3c72;

  .header-content {
    font-size: 45px;
    margin: 10px;
  }

  img {
    width: 150px;
  }
}

@include for-phone-only {
  header {
    width: 100%;
    img {
      width: 100px;
    }
    .header-content {
      font-size: 25px;
      margin: 5px;
    }
  }
}
</style>
