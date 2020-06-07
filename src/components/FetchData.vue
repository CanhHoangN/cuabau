<template>
  <div>
    <img v-if="loading" src="https://flevix.com/wp-content/uploads/2019/07/Ring-Preloader.gif" alt="">
    <ul v-else>
      <li v-for="({id,choice,quantity},index) in listChoices" :key="index">
          {{id}} - {{choice}} - {{quantity}}
      </li>
    </ul>
  </div>
</template>
<script>
import db from '../firebase/init';
import choices from '../player/choice'
export default {
    data() {
      return {
        loading:false,
        listChoices:[],
        choices :choices
      }
    },
    methods: {
       addToChoices() {
         this.loading = true;

         return new Promise((reslove) => {
           choices.forEach(chocice => {
            db.collection('choices').add({
              id: chocice.id,
              quantity: chocice.quantity,
              choice: chocice.choice
              
              });
            })

            reslove();
         })
       }
    },
    created() {
      
      this.addToChoices().then(() => {
        this.loading = false;
        db.collection('choices').orderBy('id').onSnapshot(query => {
        let listChoices = [];
        query.forEach(doc => {
          listChoices.push(doc.data());
        })

        this.listChoices = listChoices;
      });
      
       
       })
       
      
    }
}
</script>