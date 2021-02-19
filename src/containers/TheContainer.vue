<template>
  <div id="app">
    <LetterBoard />
  </div>
</template>

<script>
import LetterBoard from '../components/LetterBoard'

export default {
  name: 'TheContainer',
  components: {
    LetterBoard
  },
  data() {
    return {
      
    }
  },
  mounted() {
    console.log('Mounted Container');
  }
}

</script>