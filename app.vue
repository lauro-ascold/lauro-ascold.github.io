<template>
  <div class="page-root">
    <NuxtPage />
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {}
  },
  methods: {}
}
</script>
<!--<style lang="scss">-->
<!--@import "/assets/common.scss";-->
<!--</style>-->
<style lang="scss" scoped>
.page-root {
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  padding: $spanM;
}
</style>
