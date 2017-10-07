<template lang="pug">
#disk
  transition
    router-view
  div(style='padding:0;margin:0;display:block')
    iframe#helperdownloadiframe(src='javascript:void(0)', style='display:none')
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