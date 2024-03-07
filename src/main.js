import { createApp } from 'vue'
import App from './App.vue'
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
      faculties: null,
      courses: null,
      groups: null,
      currentErrorInfo: "error",
      turnToCreate:{
        "name": null,
        "description": null,
        "turnType":null,
        "creator":null,
        "turnAccess":null,
        "allowedGroups":null,
        "allowedFaculties":null,
        "allowedDepartments":null,
        "allowedCourses":null
      },
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
    DELETE_TOKEN(state){
      state.authToken = null;
    },
    SET_ERROR(state, error){
      state.errors[error.name] = error.value;
    },
    SET_LOADING(state, loading){
      state.loadings[loading.name]=loading.value;
    },
    setCreateTurnProperty(state, property){
      state.turnToCreate[property.name]=property.value
    },
    setFaculties(state, f){
      state.faculties = f;
    },
    setGroups(state, g){
      state.groups = g;
    },
    setCourses(state, s){
      state.courses = s;
    }
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
    getterRoleUser:(state)=>{
      return state.users.role;
    },
    // getterCourses:(state)=>{
    //   return state.courses;
    // },
    // getterFaculties:(state)=>{
    //   return state.faculties;
    // },
    // getterGroups:(state)=>{
    //   return state.groups;
    // },
    getterParam:(state)=>(param)=>{
      switch(param){
        case 0:
          return state.groups
        case 1:
          return state.faculties
        case 2:
          return state.courses
      }
    }
  },
  actions: {
    changeTurnId({commit}, id) {
      commit("changeCurrentTurnId", id);
    },
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
      commit('SET_LOADING', {name:'auth_loading', value: true});
      axios.post('/auth/sign-in?login='+login+"&password="+password).then(result=>{
        commit('SAVE_TOKEN', result.data.token);
        router.push('/main').then(r => console.log("yes!"));
        let date = new Date();
        date.setTime(date.getTime() + (60*60*24 * 60 * 60));
        const expires = "expires=" + date.toUTCString();
        document.cookie = "auth=" + result.data.token + "; " + expires + "; path=/";
      }).catch(error => {
        commit('SET_LOADING', {name:'auth_loading', value: false});
        commit('SET_ERROR', {name:'auth_error', value: true});
      })
    },
    redirectStart({commit}){
      if (document.cookie.indexOf("auth") === 0) {
        let name = "auth"
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        let token = matches ? decodeURIComponent(matches[1]) : undefined;
        if (token !== undefined) {
          commit('SAVE_TOKEN', token)
          router.push('/main').then(r => console.log('Authorization was successful'))
        }
      }
    },
    logout({commit}){
      commit("DELETE_TOKEN")
      document.cookie = "auth=;" +
        ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
      router.push('/').then(r=>console.log('Logout was successful'))
    },
    checkToken({commit}){
      if (document.cookie.indexOf("auth") === 0) {
        let name = "auth"
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        let token = matches ? decodeURIComponent(matches[1]) : undefined;
        if (token !== undefined){
          commit('SAVE_TOKEN', token)
        }
        else{
          router.push('/').then(r=>console.log('You need to log in'))
        }
      }else{
        router.push('/').then(r=>console.log('You need to log in'))
      }
    },
    saveTurnProperty({commit}, {nameP, valueP}){
      commit('setCreateTurnProperty', {name:nameP, value: valueP})
    },
    loadListTurn({commit}, {token, type, access}) {
      commit('SAVE_TURN', null);
      commit('SET_ERROR', {name:'turn_error', value: false});
      axios.get('/turn?type=' + type + '&access=' + access, {
        headers: {
          'Authorization': `${token}`
        }
      }).then(result => {
        commit('SAVE_TURN', result.data);
        commit('SET_LOADING', {name:"turn_loading", value: false});
      }).catch(error => {
        commit('SET_ERROR', {name:'turn_error', value: true})
        commit('SET_LOADING', {name:"turn_loading", value: false});
      })
    },
    changeAccessTurn({commit}, {token, access, type}){
      commit('SAVE_TURN', null);
      commit('SET_LOADING', {name:"turn_loading", value: true});
      commit('SET_ERROR', {name:'turn_error', value: false});
      // alert("hes");
      if (access==="memberOut" || access==="memberIn"){
        axios.get('/turn?type=' + type + '&access=' + access, {
          headers: {
            'Authorization': `${token}`
          }
        }).then(result => {
          let info = {"access": access, "turns": result.data};
          commit("setTurnAccess", info);
          commit('SET_LOADING', {name:"turn_loading", value: false});
        }).catch(error => {
          commit('SAVE_TURN', null);
          commit('SET_ERROR', {name:'turn_error', value: true})
          commit('SET_LOADING', {name:"turn_loading", value: false});
        })
      }
      else{
        throw new Error("type error")
      }

    },
    changeTypeTurn({commit}, {token, access, type}){
      commit('SAVE_TURN', null);
      commit('SET_LOADING', {name:"turn_loading", value: true});
      commit('SET_ERROR', {name:'turn_error', value: false});
      if (type==="org" || type==="edu"){
            axios.get('/turn?type=' + type + '&access=' + access, {
              headers: {
                'Authorization': `${token}`
              }
            }).then(result => {
              let info = {"type": type, "turns": result.data};
              commit("setTurnType", info);
              commit('SET_LOADING', {name:"turn_loading", value: false});
            }).catch(error => {
              commit('SAVE_TURN', null);
              commit('SET_ERROR', {name:'turn_error', value: true})
              commit('SET_LOADING', {name:"turn_loading", value: false});
            })
        }
        else{
            throw new Error("type error")
        }
    },
    loadFaculties({commit}, {token}){
      axios.get('/faculty',{
        headers: {
          'Authorization': `${token}`
        }
      }).then(result=>{
        console.log(result.data)
        commit('setFaculties', result.data)
      }).catch(error=>{
        throw new Error("EMPTY LIST")
      })
    },
    loadGroups({commit}, {token, facultyId}){
      axios.get('/group?facultyId='+facultyId,{
        headers: {
          'Authorization': `${token}`
        }
      }).then(result2=>{
        commit('setGroups', result2.data)
      }).catch(error2=>{
        throw new Error("EMPTY LIST")
      })
    },
    loadCourses({commit}, {token}){
      axios.get('/course',{
        headers: {
          'Authorization': `${token}`
        }
      }).then(result=>{
        commit('setCourses', result.data)
      }).catch(error=>{
        throw new Error("EMPTY LIST")
      })
    }
  }
})
const app1 = createApp(App).use(router).use(store).use(createMetaManager()).use(VueAxios, axios)

axios.defaults.baseURL = 'http://eturn.ru/api'
await router.isReady()
app1.mount('#app')

