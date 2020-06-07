<template>
  <div id="app">
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script>
// import Map from './components/Map'
// // import Rule from './components/Rule'
// import Roll from './components/Roll'
// import Player from './components/Player'
export default {
  name: 'App',
  // components: {
  //   Map,
  //   Roll,
  //   Player
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height:100vh;



}
.map-rule {
  display: flex;
  justify-content: space-between;
}
</style>
