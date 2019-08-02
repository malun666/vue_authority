<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import './lib/common.css';
#app {
  height: 100%;
}
</style>
<style>
html,
body {
  height: 100%;
}
</style>
