<template>
  <div class="main">
    <Roll></Roll>
    <div class="map-rule">
      <Countdown></Countdown>
      <Map></Map>
      <Player></Player> 
    </div>
  </div>
</template>

<script>
import Map from './Map'
import Countdown from './Countdown';
// import Rule from './components/Rule'
import Roll from './Roll'
import Player from './Player'
export default {
  components: {
    Map,
    Roll,
    Player,
    Countdown
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.map-rule {
  display: flex;
  justify-content: space-between;
}
</style>
