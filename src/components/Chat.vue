<template>
<div id="particles-js">
        <div class="wrapper rainbow">
            <div class="head_">
                <h3>Welcome to Sòng</h3>
            </div>
            <div class="main_">
                <ul>
                    <li v-for="mess in messages" :key="mess.id" class="message">
                        <img :src="require(`@/assets/default.png`)" alt="">
                        <div class="content">
                            <p id="name">{{mess.name}}</p>
                            <p id="mess">{{mess.message}}</p>
                        </div>

                    </li>
                </ul>
            </div>
            <div class="enter_">
                <input @keyup.enter="addMessage()" v-model="newMessage" type="text" name="message" placeholder="input here...." value="">
                <button @click="addMessage()"><i class="far fa-paper-plane"></i></button>
            </div>
        </div>
    </div>
</template>
<script>
import db from '../firebase/init'
import {mapActions,mapGetters} from 'vuex'
// import $ from 'jquery'
import Vue from 'vue'
Vue.use(require('vue-cookies'))
export default {
  name: 'Chat',
  props: {
    name: {
      type:String,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  data(){
    return {
        newMessage: null,
        messages : [],
        username: null
    }
  },
  mounted() {
    this.scrollEnd();
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.name || Vue.$cookies.isKey('login')) {
       if(!Vue.$cookies.isKey('login') ){
          Vue.$cookies.set('login',to.params.name);
       }
       next();
    } else {
      next({ name: 'Welcome' });
    }
  },
  computed: {
    ...mapGetters({
      getNewChoice: 'getNewChoice',
      getIdDocument: 'getIdDocument'
    })
  },
  methods:{
    ...mapActions({
      addNewChoice: 'addNewChoice',
    }),
    addMessage(){
      let data = {
        id: this.id,
        data: this.newMessage
      }
      this.addNewChoice(data);
      db.collection('choices').add(
        // message: this.newMessage,
        // name: this.name,
        // timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })
        this.getNewChoice
      )
      .then((docRef) => {
          this.scrollEnd();
         // this.updateIdDocument(docRef.id);
          //console.log(this);
          console.log("Document written with ID: ", docRef.id);
          //this.getIdDocument();
          
      })
      .catch(function(error) {

          console.error("Error adding document: ", error);
      });
      db.collection('messsages').add(
        {
          message: this.newMessage,
          name: this.name,
          timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })
        }
      )
      .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });

      this.newMessage = null;



    },
    scrollEnd() {
      var main_ = this.$el.querySelector('.main_');
      main_.scrollTop = main_.scrollHeight;
    },
    fetchMessage(){
      db.collection('messsages').orderBy('timestamp').onSnapshot((query)=>{
          let listMessage = [];
          query.forEach(doc=>{
              listMessage.push(doc.data())
          })
          this.messages = listMessage;

          // $(".msg_history").animate({ scrollTop: 4000  }, 1000);
      })
    },
  },
  created(){
    if(Vue.$cookies.isKey('login')){
      this.name = Vue.$cookies.get('login');
    }
    this.fetchMessage();
    
  }
}
</script>
<style scoped>
/*---- ------------ */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
}

body {
    font-family: 'Montserrat', sans-serif;
    background-color: #21D4FD;
    background-image: linear-gradient(291deg, #21D4FD 0%, #B721FF 100%);
}

#particles-js {
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: #21D4FD;
    background-image: linear-gradient(291deg, #21D4FD 0%, #B721FF 100%);
}

.wrapper {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 350px;
    height: 80%;
    border-radius: 1rem 1rem 0 0;
    background: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.wrapper .head_ {
    height: 10%;
    border-radius: 1rem 1rem 0 0;
    width: 100%;
    background-color: #21D4FD;
    background-image: linear-gradient(291deg, #21D4FD 0%, #B721FF 100%);
    text-align: center;
}

.wrapper .head_ h3 {
    font-weight: bold;
    line-height: 55px;
    color: #fff;
}

.wrapper .main_ {
    height: 80%;
    overflow: auto !important;
}

.wrapper .main_ ul {
    list-style: none;
}

.wrapper .main_ ul li {
    display: flex;
    width: 100%;
    margin-bottom: 8px;
}

.wrapper .main_ ul li:first-child {
    margin-top: 10px;
}

.wrapper .main_ ul li:last-child {
    margin-bottom: 0;
}

.wrapper .main_ ul li img {
    max-width: 100%;
    height: 40px;
    border-radius: 51%;
    background-repeat: no-repeat;
    background-size: cover;
}

.wrapper .main_ ul li.message .content {
    display: flex;
    flex-direction: column;
    padding-left: 14px;
    width: auto;
}

.wrapper .main_ ul li.message .content p#name {
    letter-spacing: 2px;
    font-weight: 800;
}

.wrapper .main_ ul li.message .content p#mess {
    background: #cccc;
    padding: 5px 10px 5px 5px;
    border-radius: 5px;
    font-size: 12px;
}

.wrapper .enter_ {
    display: flex;
    justify-content: space-between;
    width: 100%;
    position: absolute;
    border-top: 1px solid black;
    bottom: 0;
}

.wrapper .enter_ input[type="text"] {
    width: 90%;
    padding: 10px 5px;
    border: none;
    background: none;
    outline: none;
}

.wrapper .enter_ button {
    border: none;
    outline: none;
    cursor: pointer;
}

.wrapper .enter_ button i.far {
    font-size: 24px;
    padding-right: 5px;
}


/*----------- border ---------------- */
</style>
