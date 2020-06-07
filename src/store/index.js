import Vue from 'vue'
import Vuex from 'vuex'
import db from '../firebase/init'
// import Choices from '../player/choice'
// import Player from '../player/player';
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading: false,
        timeRoll: 30,
        startRoll: true,
        alert: false,
        baucua: [
            '1-cop.jpg',
            '2-bau.jpg',
            '3-ga.jpg',
            '4-tom.jpg',
            '5-ca.jpg',
            '6-cua.jpg'
        ],
        listBc: ['cop', 'bau', 'ga', 'tom', 'ca', 'cua'],
        player: [],
        bau: [],
        cua: [],
        tom: [],
        ca: [],
        cop: [],
        ga: [],
        playerChoices: [],
        roll: [{
                index: 1,
                value: '2-bau.jpg'
            },
            {
                index: 1,
                value: '2-bau.jpg'
            },
            {
                index: 1,
                value: '2-bau.jpg'
            }
        ],
        countDown: 30,
        rules: [
            value => !!value || 'Required.',
            value => (value && value.length >= 3) || 'Min 3 characters',
        ],
        fetchMessage: [],
        newChoice: {},
        idUser: null,
        idUsers: [],
        idDocument: [],

    },
    getters: {
        getRoll(state) {
            return state.roll;
        },
        getStartRoll(state) {
            return state.startRoll;
        },
        getPlayer(state) {
            return state.player;
        },
        getPlayerChoicesCrab(state) {
            return state.cua
        },
        getPlayerChoicesTiger(state) {
            return state.cop
        },
        getPlayerChoicesShrimp(state) {
            return state.tom
        },
        getPlayerChoicesFish(state) {
            return state.ca
        },
        getPlayerChoicesGourd(state) {
            return state.bau
        },
        getPlayerChoicesCock(state) {
            return state.ga
        },
        getCountdown(state) {
            return state.countDown
        },
        getAlert(state) {
            return state.alert;
        },
        getRules(state) {
            return state.rules;
        },
        getIdUser(state) {
            return state.idUser;
        },
        getNewChoice(state) {
            return state.newChoice;
        },
        getIdDocument(state) {
            return state.idDocument;
        }


    },
    mutations: {
        start(state) {
            state.startRoll = false;
        },
        play(state) {
            state.roll = [];
            for (let i = 0; i < 3; i++) {
                let position = Math.floor(Math.random() * state.baucua.length);
                state.roll.push({
                    index: position,
                    value: state.baucua[position]
                });
            }
        },
        close(state) {
            state.startRoll = true;
        },
        fetchDataPlayerChoices(state) {
            state.bau = [];
            state.cop = [];
            state.ca = [];
            state.tom = [];
            state.ga = [];
            state.cua = [];
            state.playerChoices.map((player) => {
                state[`${player.choice}`].push({
                    id: player.id,
                    quantity: player.quantity
                });
            })

        },
        sortBXH(state) {
            state.player.sort((p1, p2) => p2.money - p1.money);
        },
        loading(state) {
            state.loading = !state.loading;
        },
        updatePlayerChoices(state, choices) {
            state.playerChoices = choices;
            // commit('fetchDataPlayerChoices')
        },
        updateMoneyToPlayers(state) {
            var listPlayerChoices = [];
            var saveIndexPlayerChoices = [];

            state.roll.map(bc => {
                listPlayerChoices = [];
                // listPlayerChoices = state.playerChoices.filter(player => player.choice === state.listBc[bc.index]);
                state.playerChoices.forEach((player, index) => {
                    if (player.choice === state.listBc[bc.index]) {
                        listPlayerChoices.push(player);
                        saveIndexPlayerChoices.push(index);
                    }
                })
                listPlayerChoices.map(({ id, quantity }) => {
                    let p = state.player.find(player => player.id === id);

                    p.money += (2 * quantity);
                })
            })
            let indexPlayerNoChoice = new Set(saveIndexPlayerChoices);
            indexPlayerNoChoice.forEach(value => {
                state.playerChoices.splice(value, 1);
            })

            state.playerChoices.forEach(({ id, quantity }) => {
                let p = state.player.find(player => player.id === id);
                p.money -= (2 * quantity);
            })

        },
        updateCountdown(state) {
            state.countDown = state.countDown - 1;
            return state.countDown;
        },
        initTime(state, time) {
            state.countDown = time;
        },
        resetPlayerChoices(state) {
            state.bau = [];
            state.cop = [];
            state.ca = [];
            state.tom = [];
            state.ga = [];
            state.cua = [];
            state.playerChoices = [];
        },
        updateAlert(state, data) {
            state.alert = data;
        },
        updateFetchMessage(state, { id, data }) {
            let fetch = data.trim().split(" ");
            let choice = fetch[1];
            let quantity = fetch[0];
            if (choice == 'cua' || choice == 'cop' || choice == 'ga' || choice == 'bau' || choice == 'tom' || choice == 'ca') {
                state.newChoice = {
                    id: id,
                    quantity: parseInt(quantity),
                    choice: choice
                }
            }
            // console.log(state.newChoice);

        },
        updateIdUser(state, data) {
            state.idUser = data;
        },
        updatePlayer(state, players) {
            state.player = players;
        },
        updateIdUsers(state, idUsers) {
            state.idUsers = idUsers;
        },
        updateIdDocument(state, idDocs) {
            state.idDocument = idDocs;
        }


    },
    actions: {
        startGame({ commit }) {
            commit('start')
        },
        playGame({ commit }) {
            commit('play')
        },
        closeGame({ state }) {
            //commit('close')
            state.idUsers.forEach(value => {
                db.collection('users').doc(value).delete().then(() => {
                    console.log('deleted User')
                }).catch(err => {
                    console.log(err);
                })
            })
            state.player.forEach(p => {
                db.collection('users').add(p)
            })

        },
        fetchDataPlayerChoices({ commit }) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    commit('fetchDataPlayerChoices');
                    resolve()
                }, 1000);
            })

        },
        loading({ commit }) {
            commit('loading')
        },
        updateMoneyToPlayers({ commit }) {
            commit('updateMoneyToPlayers');
        },
        testCommit({ commit }) {
            commit('fetchDataPlayerChoices');
        },
        initTime({ commit }, time) {
            commit('initTime', time);
        },
        updatePlayerChoices({ commit }, choices) {
            commit('updatePlayerChoices', choices);
            // commit('resetPlayerChoices')
            commit('fetchDataPlayerChoices');
        },
        updateCountdown({ commit }) {
            commit('updateCountdown');
        },
        updateAlert({ commit }, data) {
            commit('updateAlert', data);
        },
        sortBXH({ commit }) {
            commit('sortBXH');
        },
        resetPlayerChoices({ commit }) {
            commit('resetPlayerChoices');
        },
        letStartGame({ commit }, callback) {
            commit('initTime', 30);
            callback();
        },
        addNewChoice({ commit }, data) {
            commit('updateFetchMessage', data);
        },
        updateIdUser({ commit }, data) {
            commit('updateIdUser', data);
        },
        updatePlayer({ commit }, players) {
            commit('updatePlayer', players);
        },
        fetchDataChoices({ dispatch }) {
            dispatch('updateMoneyToPlayers');
            // dispatch('getDataChoices').then(() => {
            //     dispatch('updateMoneyToPlayers');
            //     // dispatch('fetchDataPlayerChoices').then(() => {
            //     //     dispatch('updateMoneyToPlayers');
            //     // });

            // })
        },
        updateMoney({ dispatch }) {
            dispatch('getDataChoices').then(() => {
                dispatch('updateMoneyToPlayers');

                // dispatch('fetchDataPlayerChoices').then(() => {
                //     dispatch('updateMoneyToPlayers');
                //     console.log("done!")
                // });

            })
        },
        getDataChoices({ dispatch }) {
            return new Promise(resovle => {
                db.collection('choices').onSnapshot(query => {
                        let data = [];
                        let idDoc = [];
                        query.forEach(doc => {
                                idDoc.push(doc.id)
                                data.push(doc.data())
                            })
                            //data.sort((p1, p2) => p2.money - p1.money);
                        dispatch('updateIdDocument', idDoc);
                        dispatch('updatePlayerChoices', data);

                        // dispatch('fetchDataChoices');
                    })
                    //dispatch('sortBXH');
                resovle();
            })
        },
        updateIdDocument({ commit }, idDoc) {
            commit('updateIdDocument', idDoc);
        },
        deleteIdDocument({ state }) {
            let idDocs = state.idDocument;
            idDocs.forEach(value => {
                db.collection('choices').doc(value).delete().then(() => {
                    console.log("deleted")
                }).catch(err => {
                    console.log(err)
                })
            })
        },
        updateIdUsers({ commit }, idUsers) {
            commit('updateIdUsers', idUsers);
        },
        async fetchApi() {
            const choices = await fetch("http://localhost:3000/api/choices");
            const data = await choices.json();

            console.log(data);
        }
    }
})