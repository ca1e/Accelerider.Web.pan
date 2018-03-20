<template lang="pug">
#disk
  transition
    router-view
</template>

<script>
export default {
  name: 'disk',
  data () {
    return {
      discrimination: 'every web disk is here!'
    }
  }
}
</script>

<style scoped lang="scss">
#disk{
  top: 0px;
  bottom: 0px;
  width: 100%;
}
</style>