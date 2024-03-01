import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'
import router from "@/router";
import { createStore } from "vuex";
import app from "@/App.vue";
import Turn from "@/views/turn.vue";
import {getUser} from "@/api/users";
import axios from 'axios'
import { createMetaManager } from 'vue-meta'
import VueAxios from 'vue-axios'
import turnList from "@/components/mainPage/turnList";

const store = createStore({
  state () {
    return {
      listTurn: [],
      turnId: 0,
      userId: 1,
      currentErrorInfo: "error",
      errors: {
        'auth_error': false,
        'turn_error': false
      },
      loadings:{
        'auth_loading': false,
        'turn_loading': true
      },
      authToken: null,
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
    SAVE_TOKEN(state,token){
      state.authToken = token;
    },
    SET_ERROR(state, error){
      state.errors[error.name] = error.value;
    },
    SET_LOADING(state, loading){
      state.loadings[loading.name]=loading.value;
    },
    // changeLoaderShow(state) {
    //   if (state.loaderShow === true)
    //     state.loaderShow = false;
    //   else
    //     state.loaderShow = true;
    // }
  },
  getters: {
    getterUserId: (state) => {
      return state.userId;
    },
    getCurrentError:(state)=>(type) => {
      return state.errors[type];
    },
    getLoading:(state)=>(loading)=>{
      return state.loadings[loading];
    },
    getterToken: (state)=>{
      return state.authToken;
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
    },
    // getterLoaderShow:(state)=> {
    //   return state.loaderShow;
    // }
  },
  actions: {
    changeError({commit}, error){
      commit("SET_ERROR", error);
    },
    loadUsers({commit}, token) {
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
    authUser({commit}, {login, password}){
      axios.post('/auth/sign-in?login='+login+"&password="+password).then(result=>{
        commit('SAVE_TOKEN', result.data.token);
        router.push('turn').then(r => console.log("yes!"));
      }).catch(error=> {

        console.log(error.response.data);
        commit('SET_ERROR', {name:'auth_error', value: true});
      })
    },
    loadListTurn({commit}, {token, type, access}) {
      axios.get('/turn?type=' + type + '&access=' + access, {
        headers: {
          'Authorization': `${token}`
        }
      }).then(result => {
        commit('SAVE_TURN', result.data);
        commit('SET_LOADING', {name:"turn_loading", value: true});
      }).catch(error => {
        // commit
      })
    },
    changeAccessTurn({commit}, {token, access, type}){
      // alert("hes");
      if (access==="memberOut" || access==="memberIn"){
        axios.get('/turn?type=' + type + '&access=' + access, {
          headers: {
            'Authorization': `${token}`
          }
        }).then(result => {
          let info = {"access": access, "turns": result.data}
          commit("setTurnAccess", info)
        }).catch(error => {
          console.log(error);
          throw new Error(`API ${error}`);
        })
      }
      else{
        throw new Error("type error")
      }

    },
    changeTypeTurn({commit}, {token, access, type}){
      if (type==="org" || type==="edu"){
            axios.get('/turn?type=' + type + '&access=' + access, {
              headers: {
                'Authorization': `${token}`
              }
            }).then(result => {
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
const app1 = createApp(App).use(router).use(store).use(createMetaManager()).use(VueAxios, axios)

axios.defaults.baseURL = 'http://eturn.ru/api'
await router.isReady()
app1.mount('#app')

