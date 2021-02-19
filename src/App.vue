<template>
  <div id="app">
    <LetterBoard />
  </div>
</template>

<script>
import LetterBoard from './components/LetterBoard.vue'

export default {
  name: 'App',
  components: {
    LetterBoard
  }
}
</script>

<style>
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
