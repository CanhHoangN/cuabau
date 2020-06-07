<template>
  <div class="map">  
    <div class="cop">
      <div
      v-if="getPlayerChoicesTiger.length > 0" 
      class="player-wapper"
      >
      <div
      v-for="(tiger,index) in getPlayerChoicesTiger" 
      :key="index"
      :style= "{background: randomColor(),width: setSize ,height: setSize}"
      class="player-choice"
      >
        {{tiger.quantity}}
      </div>
      </div>
    </div>
    <div class="bau">
      <div
      v-if="getPlayerChoicesGourd.length > 0" 
      class="player-wapper"
      >
      <div
      
      v-for="(gourd,index) in getPlayerChoicesGourd" 
      :key="index"
      :style= "{background: randomColor() }"
      
      class="player-choice"
      >
        {{gourd.quantity}}
        
      </div>
      </div>
    </div>
    <div class="ga">
        <div
      v-if="getPlayerChoicesCock.length > 0" 
      class="player-wapper"
      >
      <div
      
      v-for="(cock,index) in getPlayerChoicesCock" 
      :key="index"
      :style= "{background: randomColor() }"
      
      class="player-choice"
      >
        {{cock.quantity}}
        
      </div>
      </div>
    </div>
    <div class="tom">
        <div
      v-if="getPlayerChoicesShrimp.length > 0" 
      class="player-wapper"
      >
      <div
      
      v-for="(shrimp,index) in getPlayerChoicesShrimp" 
      :key="index"
      :style= "{background: randomColor() }"
      
      class="player-choice"
      >
        {{shrimp.quantity}}
        
      </div>
      </div>
    </div>
    <div class="ca">
        <div
      v-if="getPlayerChoicesFish.length > 0" 
      class="player-wapper"
      >
      <div
      
      v-for="(fish,index) in getPlayerChoicesFish" 
      :key="index"
      :style= "{background: randomColor() }"
      
      class="player-choice"
      >
        {{fish.quantity}}
        
      </div>
      </div>
    </div>
    <div class="cua">
        <div
      v-if="getPlayerChoicesCrab.length > 0" 
      class="player-wapper"
      >
      <div
      
      v-for="(crab,index) in getPlayerChoicesCrab" 
      :key="index"
      :style= "{background: randomColor() }"
      
      class="player-choice"
      >
        {{crab.quantity}}
        
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      choicesFireBase : [],
      listColor: ['#00b894', '#0984e3', '#ff7675', '#e84393', '#2d3436', '#636e72', '#fdcb6e', '#05c46b', '#05c46b', '#0be881']
    }
  },
  computed: {
    ...mapGetters({
        getPlayerChoicesTiger:'getPlayerChoicesTiger',
        getPlayerChoicesGourd: 'getPlayerChoicesGourd',
        getPlayerChoicesCrab: 'getPlayerChoicesCrab',
        getPlayerChoicesShrimp: 'getPlayerChoicesShrimp',
        getPlayerChoicesFish: 'getPlayerChoicesFish',
        getPlayerChoicesCock: 'getPlayerChoicesCock'
    }),
    setSize() {
      if(this.getPlayerChoicesTiger.length > 20 ){
        return "20px";
      }
      //return null;
      return "20px";
    }
  },
  watch: {
    getPlayerChoicesTiger: () => {
        console.log("changed!!!")
    }
  },
  methods: {
    
    randomColor() {
        return this.listColor[Math.floor(Math.random() * this.listColor.length)];
    },
  },
  
}
</script>
<style scoped>
.map {
    width: 600px;
    height: 400px;
    display: flex;
    flex-wrap: wrap;
    
}
.map > div {
    width: 200px;
    height: 200px;
    
}
.cop {
    background-image: url('../assets/1-cop.jpg');
    background-repeat: none;
    background-size: cover;
}
.player-wapper{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.player-choice{
    text-align: center;
    color:#ffff;
}
.bau {
    background-image: url('../assets/2-bau.jpg');
    background-repeat: none;
    background-size: cover;
}
.ga {
    background-image: url('../assets/3-ga.jpg');
    background-repeat: none;
    background-size: cover;
}
.tom {
    background-image: url('../assets/4-tom.jpg');
    background-repeat: none;
    background-size: cover;
}
.ca {
    background-image: url('../assets/5-ca.jpg');
    background-repeat: none;
    background-size: cover;
}
.cua {
    background-image: url('../assets/6-cua.jpg');
    background-repeat: none;
    background-size: cover;
}
p{
    color:#ffff;
}
.player-choice {
    background: darksalmon;
    width: 25px;
    height: 25px;
    border-radius: 50%;
}
.map img {
    width: 200px;
    height: 200px;
}
</style>