<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style>
  #app{
    @apply bg-gray-50 text-gray-600
  }
  
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }
  input[type=number] { -moz-appearance:textfield; }
</style>

