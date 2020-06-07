<template>
  <v-app>
    <div class="welcome-panel blue-grey lighten-5">
      <div class="welcome">
          <h1>welcome</h1>
      </div>
      <div>
        <v-text-field @keyup.enter="onUpload()" color="#38ada9" label="Enter name" :rules="getRules" v-model="name"></v-text-field>

      <div>
    </div>
      </div>
      <div class="text-center">
        <v-btn rounded color="#38ada9" dark @click="onUpload()">Click</v-btn>
      </div>
      <v-alert v-if="already" type="error">
        Username already used by another user.
      </v-alert>
    </div>
  </v-app>
</template>
<script>
import Vue from 'vue'
import db from '../firebase/init'
// import firebase from 'firebase'
import {mapGetters} from 'vuex'
export default {
  name: 'Welcome',
  data() {
    return {
      name : null,
      id: 0,
      listUsers: [],
      already:false
    }
  },
  computed : {
    ...mapGetters({
      getRules : 'getRules',
      getIdUser: 'getIdUser'
    })
  },
  methods:{
    // ...mapActions({
    //    updateIdUser: 'updateIdUser'
    // }),
    getLastId() {
      return new Promise(resolve => {
        db.collection('users').orderBy('id').onSnapshot((query)=>{
            let data = [];
            query.forEach(doc=>{
                data.push(doc.data())
            })
           this.listUsers = data;
           this.id = (data[data.length-1].id + 1);
           resolve();
        })
       
      })
    },
    onUpload (){
      this.getLastId().then(() => {
        let user = this.listUsers.find(user => user.name === this.name);
        if(!user) {
          db.collection('users').add({
            id: this.id,
            name: this.name,
            money: 100
          })
          .then(function(docRef) {
              console.log("Document written with ID: ", docRef.id);
          })
          .catch(function(error) {
              console.error("Error adding document: ", error);
          });
        } else {
          this.id = user.id;
        } 

        this.$router.push({name:'Chat',params:{name : this.name,id: this.id}});
        
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    if(Vue.$cookies.isKey('login')){
        Vue.$cookies.remove('login');
    }
      next();
  },


}
</script>
<style scoped>
.welcome-panel{
  max-width: 30%;
  margin-top: 10%;
  margin-left: 35%;
  padding: 30px;
  border-radius: 15px;
}
.welcome-panel h1{
  text-align: center;
  font-weight: 300;
  color: #38ada9 !important;

}
.welcome-panel button{
  margin: 20px auto;
}
</style>
