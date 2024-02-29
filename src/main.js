import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from "vuex";
import app from "@/App.vue";
import Turn from "@/views/turn.vue";
import {getUser} from "@/api/users";
import axios from 'axios'
import { createMetaManager } from 'vue-meta'
import turnList from "@/components/mainPage/turnList";

const store = createStore({
  state () {
    return {
      listTurn: [],
      turnId: 0,
      userId: 1,
      typeTurn: "edu",
      accessTurn: "memberIn",
      users: [],
      positionsCurrentTurn: [
        {
          "id": 1,
          "name": "Васильев Андрей Антонович",
          "group": "2391",
          "start": false,
          "number": 1,
          "userId": 1
        }
      ]
    }
  },
  mutations: {
    changeCurrentTurnId(state, n) {
      state.turnId = n
    },
    setTurnType(state, info){
      state.typeTurn = info.type;
      state.listTurn = null;
      state.listTurn = info.turns;
    },
    setTurnAccess(state, info){
      state.accessTurn = info.access;
      state.listTurn = null
      state.listTurn = info.turns;
    },
    SAVE_USERS(state, users) {
      state.users = users;
    },
    SAVE_TURN(state, turn) {
      state.listTurn = turn;
    },
  },
  getters: {
    getterUserId: (state) => {
      return state.userId;
    },
    getterName: (state) => (id) => {
      return state.listTurn.find(listTurn => listTurn.id === id)
    },
    getterTurnAccess: (state)=>{
      return state.accessTurn;
      // return "participates"
    },
    getterTurnType: (state)=>{
      return state.typeTurn;
      // return "edu";
    },
    getterTurnList:(state)=>{
      return state.listTurn;
    }
  },
  actions: {
    loadUsers({commit}, id) {
      let token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU1RVREVOVCIsImlkIjoyLCJzdWIiOiJpdmFuIiwiaWF0IjoxNzA5MjM0NTYxLCJleHAiOjE3MDkzNzg1NjF9.Ss74WLPAZyPah0y4CQdXUh1Z-mXOqEvRVMhMM76og20";
      axios.get('/user', {
        headers: {
          'Authorization': `${token}`
        }
      }).then(result => {
        commit('SAVE_USERS', result.data);
      }).catch(error => {
        throw new Error(`API ${error}`);
      })
    },
    loadListTurn({commit}, {id, type, access}) {
      let token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU1RVREVOVCIsImlkIjoyLCJzdWIiOiJpdmFuIiwiaWF0IjoxNzA5MjM0NTYxLCJleHAiOjE3MDkzNzg1NjF9.Ss74WLPAZyPah0y4CQdXUh1Z-mXOqEvRVMhMM76og20";
      axios.get('/turn?type=' + type + '&access=' + access, {
        headers: {
          'Authorization': `${token}`
        }
      }).then(result => {
        commit('SAVE_TURN', result.data);
      }).catch(error => {
        throw new Error(`API ${error}`);
      })
    },
    changeAccessTurn({commit}, {access, type, id}){
      // alert("hes");

      if (access==="available" || access==="participates"){
        axios.get('/turn?userId=' + id + '&type=' + type + '&access=' + access).then(result => {
          let info = {"access": access, "turns": result.data}
          commit("setTurnAccess", info)
        }).catch(error => {
          throw new Error(`API ${error}`);
        })
      }
      else{
        throw new Error("type error")
      }

    },
    changeTypeTurn({commit}, {access, type, id}){
        if (type==="org" || type==="edu"){
            axios.get('/turn?userId=' + id + '&type=' + type + '&access=' + access).then(result => {
                let info = {"type": type, "turns": result.data}
                commit("setTurnType", info)
            }).catch(error => {
                throw new Error(`API ${error}`);
            })
        }
        else{
            throw new Error("type error")
        }
    },
    //loadPositions({commit}, {idTurn}){
    // TODO Для Риты: запрос авторизации
    // TODO сделать запрос для вывода позиций
    // TODO сделать запрос для удаления позиций
    // TODO сделать запрос для вывода текущей первой позиции
    //}
  }
})
const app1 = createApp(App).use(router).use(store).use(createMetaManager())

await router.isReady()
app1.mount('#app')

