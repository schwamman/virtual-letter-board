<template>
  <div id="header">
    <span>Letter Board</span>
  </div>
</template>

<script>
  export default {
    name: 'Header'
  }
</script>

<style lang="scss" scoped>
  #header {
    position: absolute;
    width: 100%;
    background-color: #493843;
    color: #FFFDED;
    height: 60px;

    span {
      display: block;
      font-size: 32px;
      padding-top: 10px;
    }
  }
</style>