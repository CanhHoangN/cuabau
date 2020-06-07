<template>
  <div class="player">
    <v-app>
    <v-simple-table fixed-header height="300px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">STT</th>
          <th class="text-left">Name</th>
          <th class="text-left">Point</th>
        </tr>
      </thead>
      <tbody >
        <tr v-for="({name,money},index) in getPlayer" :key="index">
          <td>{{ index + 1}}</td>
          <td>{{ name }}</td>
          <td>{{ money }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
    </v-app>
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex';
import db from '../firebase/init';
export default {
  computed: {
    ...mapGetters({
        getPlayer: 'getPlayer',
    })
  },
  methods: {
    ...mapActions({
        updatePlayer : 'updatePlayer',
        updateIdUsers: 'updateIdUsers'
    }),
    getPlayerFireBase() {
      db.collection('users').orderBy('money','desc').onSnapshot(query => {
        let players = []
        let idUsers = []
        query.forEach(doc => {
          idUsers.push(doc.id);
          players.push(doc.data())
        })
        this.updateIdUsers(idUsers);
        this.updatePlayer(players);
      })
    }
  },
  created() {
    this.getPlayerFireBase(); 
  }
}
</script>
<style scoped>  
.flip-list-move {
  transition: transform 1s;
}
</style>