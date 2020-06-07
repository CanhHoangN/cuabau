import Vue from 'vue'
import VueRouter from 'vue-router'
import Game from '../components/Game.vue'
import Chat from '../components/Chat.vue'
import Welcome from '../components/Welcome.vue'
import Register from '../components/Register.vue'
Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Game',
            component: Game
        },
        {
            path: '/welcome',
            name: 'Welcome',
            component: Welcome,
            props: true,
        },
        {
            path: '/chat',
            name: 'Chat',
            component: Chat,
            props: true,
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        }

    ]

})