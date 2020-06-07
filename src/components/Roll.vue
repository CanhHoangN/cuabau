<template>
  <div class="roll">

      <div class="res-roll">
        <img v-for="(el,index) in this.roll" :key="index" :src="require(`@/assets/${el.value}`)" alt="">
      </div>
      
    <!-- <v-app>
    <div class="text-center">
    <v-btn class="ma-2" tile color="#00ACC1" @click="close" dark>
      <v-icon left>mdi-window-close</v-icon>CLOSE</v-btn>
    <v-btn class="ma-2" tile color="#00ACC1" @click="start" dark>
      <v-icon left>mdi-play</v-icon> PLAY</v-btn>
    </div>
    
    </v-app> -->
    <div class="alert" v-if="alert">
      <p>Kết thúc thời gian đặt. Round mới sẽ bắt đầu trong 5s!</p>
    </div>
    <!-- <v-app>
      <v-alert class="alert" v-if="alert" type="success">
      Kết thúc thời gian đặt.Round mới sẽ bắt đầu trong 5s!
    </v-alert>
    </v-app> -->
    <!-- <button @click="fetchDataChoices">fetch</button> -->
  </div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex';
import db from '../firebase/init'
export default {
  data() {
    return {
      timeout : 5,
      choicesFireBase: [],
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      roll: 'getRoll',
      alert: 'getAlert',
      startRoll: 'getStartRoll'
    })
  },
  methods: {
    ...mapActions({
       start: 'startGame',
       play: 'playGame',
       close: 'closeGame',
       fetchDataPlayerChoices: 'fetchDataPlayerChoices',
       updateMoneyToPlayers: 'updateMoneyToPlayers',
       updatePlayerChoices: 'updatePlayerChoices',
       updateAlert: 'updateAlert',
       fetchApi: 'fetchApi'
    }),
    fetchDataChoices() {
      this.getDataChoices().then(()=> {
          this.fetchDataPlayerChoices().then(() => {
            this.updateMoneyToPlayers();
          });
          
      })
      // this.fetchDataPlayerChoices().then(() => {
        
      // })
    },
    getDataChoices() {
      return new Promise(resovle => {
        db.collection('choices').onSnapshot(query => {
          let data = [];
          query.forEach(doc => {
            data.push(doc.data())
          })
          
          this.updatePlayerChoices(data);
          
        })
        resovle();

      })
      
    },
    
  },
  created() {
    //this.getDataChoices();
  }
}
</script>
<style scoped>
.roll {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
}
.alert {
  width:auto;
  height: 60px;
  background-color:red;
  border-radius:10px;
  background-color: #FEE140;
  background-image: linear-gradient(90deg, #FEE140 0%, #FA709A 100%);


  
}
.alert p { 
  line-height:60px;
  padding: 0 10px;
  color:#fff;
}
.res-roll {
    width: 210px;
}
.res-roll img {
    width: 50px;
    height: 50px;
    border: 1px solid black;
    margin-right: 10px;
}

</style>