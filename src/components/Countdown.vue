<template>
<div class="count-down">
  <v-app>
    
    <!-- <v-avatar  color="teal" size="48">
        <span class="white--text headline">{{getCountdown}}</span>
    </v-avatar> -->
    <!-- <v-btn class="ma-2" tile color="#00ACC1" @click="close" dark>
    <v-icon left>mdi-window-close</v-icon>CLOSE</v-btn> -->
    <!-- <v-btn class="ma-2" tile color="#00ACC1" @click="start" dark>
    <v-icon left>mdi-play</v-icon> PLAY</v-btn> -->
    <template>
  <v-timeline>
    <v-timeline-item>
        <v-btn class="ma-2" tile color="#00ACC1" @click="start" dark>
        <v-icon left>mdi-play</v-icon> PLAY</v-btn>
    </v-timeline-item>
    <v-timeline-item class="text-right">
        <v-avatar  color="teal" size="48">
        <span class="white--text headline">{{getCountdown}}</span>
    </v-avatar>
    </v-timeline-item>
    <v-timeline-item>
        <v-btn class="ma-2" tile color="#00ACC1" @click="close" dark>
        <v-icon left>mdi-window-close</v-icon>CLOSE</v-btn>
    </v-timeline-item>
  </v-timeline>
</template>
</v-app>
</div>
    <!-- <div class="count-down">
        <p>{{ getCountdown }}</p>
    </div> -->
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
// import db from '../firebase/init';
export default {
  data() {
      return {
          run:false
      }
  },
  computed: {
      ...mapGetters({
          getCountdown: 'getCountdown',
          alert: 'getAlert',
          getIdDocument: 'getIdDocument'
      }),

  },
  methods: {
      ...mapActions({
        updateCountdown: 'updateCountdown',
        fetchDataPlayerChoices: 'fetchDataPlayerChoices',
        updateMoneyToPlayers: 'updateMoneyToPlayers',
        updatePlayerChoices: 'updatePlayerChoices',
        updateAlert : 'updateAlert',
        resetPlayerChoices: 'resetPlayerChoices',
        getDataChoices: 'getDataChoices',
        fetchDataChoices: 'fetchDataChoices',
        deleteIdDocument: 'deleteIdDocument',
        play: 'playGame',
        sortBXH: 'sortBXH',
        initTime: 'initTime',
        playGame: 'playGame',
        closeGame: 'closeGame',
      }),
      start() {
          this.run = true;
          this.letCountDown();
      },
      close() {
          this.run = false;
          this.closeGame();
      },
      letCountDown() {
            // console.log(this.getCountdown)
            if(this.run) {
                if(this.getCountdown == 0) {
                this.play();
                this.updateAlert(true);
                this.fetchDataChoices();
                this.deleteIdDocument();
                setTimeout(() => {
                    //console.log("before")
                    this.updateAlert(false);
                    this.sortBXH();
                    this.resetPlayerChoices();
                    this.initTime(30);
                    this.letCountDown();
                    
                },5000);
            }
            //console.log("after")
            if (this.getCountdown > 0) {
                this.updateCountdown()
                setTimeout(() => {
                    this.letCountDown();
                }, 1000);
            }
            }
           // console.log("after")
        }
  },
  created() {
    //   this.letCountDown();
      this.getDataChoices();
  }
}
</script>
<style scoped>

p {
    text-align: center;
    color: #ffffff;
}
.alert {
  position: relative;
  top:-100px;
}
</style>