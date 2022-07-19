<template>
  <div class="spinner">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'SpinnerLoading',
})
</script>

<style lang="scss" scoped>
.spinner {
    width: 70px;
    height: 70px;
    position: absolute;
    top: 45%;
}

.spinner .dot {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-end;
    justify-content: center;
}

.spinner .dot::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #fff;
}

.spinner .dot{
    animation: spin 1.8s infinite;
}

@keyframes spin {
    to{
        transform: rotate(360deg);
    }
}

.spinner .dot:nth-child(2){
    animation-delay: 100ms;
}

.spinner .dot:nth-child(3){
    animation-delay: 200ms;
}

.spinner .dot:nth-child(4){
    animation-delay: 300ms;
}

.spinner .dot:nth-child(5){
    animation-delay: 400ms;
}

</style>
