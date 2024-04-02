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
      currentTurn: null,
      currentMembers: null,
      userId: 1,
      faculties: [],
      courses: [],
      groups: [],
      currentErrorInfo: "error",
      turnToCreate:{
        "name": null,
        "description": null,
        "turnType":null,
        "creator":null,
        "turnAccess":null,
        "allowedGroups":[],
        "allowedFaculties":[],
        "allowedDepartments":[],
        "allowedCourses":[]
      },
      errors: {
        'auth_error': false,
        'turn_error': false,
        'member_error':false,
      },
      loadings:{
        'auth_loading': false,
        'turn_loading': true,
        'position_loading': true,
        'allposition_loading': true
      },
      authToken: null,
      typeTurn: "edu",
      accessTurn: "memberIn",
      users: [],
      positionsCurrentTurn: [],
      currentPosition: null,
      firstPosition:null,
      currentMember:null,
      memberBlockShow: [false, false, false],
      memberList: []
    }
  },
  mutations: {
    setPositionsList(state, positions){
      state.positionsCurrentTurn=positions;
    },
    setTurnId(state, turnid){
      state.turnId=turnid;
    },
    deletePosition(state, id){
      state.positionsCurrentTurn = state.positionsCurrentTurn.filter((obj)=>{
        return obj.id!==id;
      })
    },
    deleteMember(state, id){
      state.memberList = state.memberList.filter((obj)=>{
        return obj.id!==id;
      })
    },
    setCurrentMember(state, member){
      state.currentMember = member;
    },
    setCurrentTurn(state, turn){
      state.currentTurn = turn;
    },
    setCurrentMembers(state, member){
      state.currentMembers = member;
    },
    setCurrentPosition(state, position){
      state.currentPosition = position;
    },
    setFirstPosition(state, position){
      state.firstPosition = position;
    },
    setCurrentPositionStatus(state, status) {
      state.currentPosition.start = status;
    },
    setFirstPositionStatus(state, status) {
      state.firstPosition.start = status;
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
      document.cookie = "auth=; path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
      router.push('/').then(r=>console.log('Logout was successful'))
    },
    SET_ERROR(state, error){
      state.errors[error.name] = error.value;
    },
    SET_LOADING(state, loading){
      state.loadings[loading.name]=loading.value;
    },
    setCreateTurnProperty(state, property){
      if(state.turnToCreate[property.name]!==[] && state.turnToCreate[property.name]!==null){
        if (!state.turnToCreate[property.name].some(e=> e.id===property.value.id)){
          state.turnToCreate[property.name].push(property.value)
        }
      }
      else{
        state.turnToCreate[property.name].push(property.value)
      }
      // console.log('turn', state.turnToCreate[property.name])
    },
    setCreateTurnPropertyText(state, property){
      state.turnToCreate[property.name]=property.value
    },
    setNullCreateTurnProperty(state){
      state.turnToCreate["allowedGroups"]=[]
      state.turnToCreate["allowedFaculties"]=[]
      state.turnToCreate["allowedCourses"]=[]
      state.turnToCreate["allowedDepartments"]=[]
    },
    setFaculties(state, f){
      state.turnToCreate["allowedGroups"]=[]
      state.turnToCreate["allowedFaculties"]=[]
      state.turnToCreate["allowedCourses"]=[]
      state.turnToCreate["allowedDepartments"]=[]
      state.faculties = [];
      state.faculties = f;
    },
    setGroups(state, g){
      state.groups = g;
    },
    setCourses(state, s){
      state.turnToCreate["allowedGroups"]=[]
      state.turnToCreate["allowedFaculties"]=[]
      state.turnToCreate["allowedCourses"]=[]
      state.turnToCreate["allowedDepartments"]=[]
      state.courses = [];
      state.courses = s;
    },
    CLEAR_ALL_GROUPS_FOREVER(state){
      state.groups=[];
    },
    deleteElementTurnCreate(state, element){
      state.turnToCreate[element.name] = state.turnToCreate[element.name].filter((obj)=>{
        return obj.id!==element.value.id
      })
    },
    setNullTurnToCreate(state) {
      state.turnToCreate.name = null;
      state.turnToCreate.description = null;
      state.turnToCreate.turnType = null;
      state.turnToCreate.creator = null;
      state.turnToCreate.turnAccess = null;
      state.turnToCreate.allowedCourses = [];
      state.turnToCreate.allowedDepartments = [];
      state.turnToCreate.allowedFaculties = [];
      state.turnToCreate.allowedGroups = [];
    },
    setMemberBlockShow(state, param) {
      state.errors["member_error"]=false;
      let currentParam = state.memberBlockShow[param];
      state.memberBlockShow[0] = false;
      state.memberBlockShow[1] = false;
      state.memberBlockShow[2] = false;
      state.memberBlockShow[param] = !currentParam;
    },
    setMemberList(state, list) {
      state.memberList = list;
    },
    setNullPosition(state) {
      state.currentPosition = null;
      state.positionsCurrentTurn = null;
    }
  },
  getters: {
    getterUserId: (state) => {
      return state.users.id;
    },
    getterTurnId: (state)=>{
      return state.turnId;
    },
    getterPositionsList:(state)=>{
      return state.positionsCurrentTurn;
    },
    getCurrentPosition: (state)=>{
      return state.currentPosition;
    },
    // getCurrentTurnId:(state)=>{
    //   return state.turnId;
    // },
    getCurrentTurn: (state)=>{
      return state.currentTurn
    },
    getCurrentMembers: (state)=>{
      return state.currentMembers
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
    getterParam:(state)=>(param)=>{
      switch(param){
        case 0:
          return state.groups
        case 1:
          return state.faculties
        case 2:
          return state.courses
      }
    },
    getCurrentMember:(state)=>{
      return state.currentMember;
    },
    getterCreateTurnParamText:(state)=>(param)=>{
      return state.turnToCreate[param];
    },
    getterCreateTurn:(state)=>{
      return state.turnToCreate;
    },
    getterCreateTurnAllParams:(state)=>(param)=>{
      switch(param){
        case 0:
        {
          return state.turnToCreate['allowedGroups']
        }
        case 1:
        {
          return state.turnToCreate['allowedFaculties']
        }
        case 2:
        {
          return state.turnToCreate['allowedCourses']
        }
      }
    },
    getterCreateTurnParam:(state)=>(param)=>{
      switch(param.id){
        case 0:
        {
         if (state.turnToCreate['allowedGroups']!==[]){
           return state.turnToCreate['allowedGroups'].some(e=> e.id===param.data.id)
         }
         else{
           return false
         }
        }
        case 1:
        {
          if (state.turnToCreate['allowedFaculties']!==[]){
            return state.turnToCreate['allowedFaculties'].some(e=> e.id===param.data.id)
          }
          else{
            return false
          }
        }
        case 2:
        {
          if (state.turnToCreate['allowedCourses']!==[]){
            return state.turnToCreate['allowedCourses'].some(e=> e.id===param.data.id)
          }
          else{
            return false
          }
        }
      }
    },
    getterMemberBlockShow: (state)=>(param)=> {
      return state.memberBlockShow[param]
    },
    getterMemberList: (state) => {
      return state.memberList;
    },
    getFirstPosition:(state)=>{
      return state.firstPosition;
    }
  },
  actions: {
    loadCurrentTurn({commit}, {id, token}){
      // console.log('token: ',token);
      axios.get('/turn/'+id, {
        headers: {
          'Authorization': `${token}`
        }
      }).then(result=>{
        commit('setCurrentTurn', result.data)
        console.log(result)
      }).catch(error=>{
        console.log(error)
        router.push('/error')
      })
    },
    deletePosition({commit}, {token, id, turnId}){
      axios.delete("/position/"+id, {
        headers: {
          'Authorization': `${token}`
        }
      }).then(result=>{
        commit("deletePosition", id);

        // getFirstPosition
        axios.get("/position/first?turnId="+turnId, {
          headers:{
            'Authorization': `${token}`
          }
        }).then(result=>{
          console.log(result.data);
          commit("setCurrentPosition", result.data)
        }).catch(error=>{
          console.log(error);
          commit("setCurrentPosition", null)
        })

      })
    },
    deleteFirstPosition({commit}, {token, id, turnId}){
      axios.delete("/position/"+id, {
        headers: {
          'Authorization': `${token}`
        }
      }).then(result=>{
        commit("deletePosition", id);

        // getFirstPosition
        axios.get("/position/first/in?turnId="+turnId, {
          headers:{
            'Authorization': `${token}`
          }
        }).then(result=>{
          console.log(result.data);
          commit("setFirstPosition", result.data)
        }).catch(error=>{
          console.log(error);
          commit("setFirstPosition", null)
        })

      })
    },
    deleteMember({commit}, {token, id}){
      alert(id)
      axios.delete("/turn/member/"+id, {
        headers:{
          'Authorization': `${token}`
        }
      }).then(result => {
        commit("deleteMember", id)
      })
    },
    updateMember({commit}, {token, id, type}){
      axios.put("/turn/member/access?id="+id+"&type="+type, null,  {
        headers:{
          'Authorization': `${token}`
        }
      }).then(result => {
        commit("deleteMember", id)
      })
    },
    setTurnIdValue({commit}, {turnId}){
      commit("setTurnId", turnId)
    },
    createPosition({commit}, {token, turn}){
      console.log("AAA",turn);
      axios.post("/position?idTurn="+turn, null,{
        headers:{
          'Authorization': `${token}`
        },
      }).then(result=>{
        console.log("result", result);
        commit("setPositionsList", null);
        commit("setCurrentPosition", null);
        // loadPositionList
        axios.get('/position/all/'+turn, {
          headers:{
            'Authorization': `${token}`
          }
        }).then(result=>{
          commit("setPositionsList", result.data);
        }).catch(error=>{
          console.log(error);
          commit("setPositionsList", null);
        })

        // getFirstPosition
        axios.get("/position/first?turnId="+turn, {
          headers:{
            'Authorization': `${token}`
          }
        }).then(result=>{
          console.log(result.data);
          commit("setCurrentPosition", result.data)
        }).catch(error=>{
          console.log(error);
          commit("setCurrentPosition", null)
        })

      }).catch(error=>{
        console.log('error', error)
      })
    },
    checkRootUser({commit}, {token, turn}){
      // commit("setCurrentMember", null);
      axios.get("/turn/member?turnId="+turn, {
        headers:{
          'Authorization': `${token}`
        }
      }).then(result=>{
        console.log(result.data);
        commit("setCurrentMember", result.data);
      }).catch(error=>{
        router.push('/403')
      })
    },
    addNewMember({commit}, {token, turn}){
      axios.put("/turn/member?turnId="+turn, null, {
        headers:{
          'Authorization': `${token}`
        }
      }).then(result=>{
        router.push("/turn/"+turn)
      })
    },
    loadPositionList({commit}, {token, turn}){
      // commit("setPositionsList", null);
      axios.get('/position/all/'+turn, {
        headers:{
          'Authorization': `${token}`
        }
      }).then(result=>{
        commit("setPositionsList", result.data);
        commit('SET_LOADING',{name:"allposition_loading",value: false});
      }).catch(error=>{
        console.log(error);
        commit("setPositionsList", null);
        commit('SET_LOADING',{name:"allposition_loading",value: false});
      })
    },
    loadFirstPosition({commit}, {token, turn}){
      // commit("setCurrentPosition", null)
      axios.get("/position/first?turnId="+turn, {
        headers:{
          'Authorization': `${token}`
        }
      }).then(result=>{
        console.log(result.data);
        commit("setCurrentPosition", result.data);
        commit('SET_LOADING',{name:"position_loading",value: false});
      }).catch(error=>{
        console.log(error);
        commit("setCurrentPosition", null)
        commit('SET_LOADING',{name:"position_loading",value: false});
      })
    },
    loadFirstTurnPosition({commit}, {token, turn}){
      // commit("setCurrentPosition", null)
      axios.get("/position/first/in?turnId="+turn, {
        headers:{
          'Authorization': `${token}`
        }
      }).then(result=>{
        console.log(result.data);
        commit("setFirstPosition", result.data);
      }).catch(error=>{
        console.log(error);
        commit("setFirstPosition", null)
      })
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
        commit("DELETE_TOKEN")
        commit("setTurnAccess", "memberIn");
        document.cookie = "auth=;" +
          ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
        router.push('/').then(r=>console.log('Logout was successful'))
        throw new Error(`API ${error}`);
      })
    },

    authUser({commit}, {login, password}){
      commit('SET_LOADING', {name:'auth_loading', value: true});
      axios.post('/auth/sign-in?login='+login+"&password="+password).then(result=>{
        commit('SAVE_TOKEN', result.data.token);
        commit('SET_LOADING', {name:"auth_loading", value: false});
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
    createTurn({commit}, {turn, token}){
      axios.post("/turn",turn,{
          headers: {
            'Authorization': `${token}`
          }
        }
        ).then(result=>{
        router.push('/turn/'+result.data)
        commit("setNullTurnToCreate")
        commit("setNullPosition")
      }).catch(error=>{
        console.log(error)
      })
    },
    redirectStart({commit}){
      console.log(document.cookie.indexOf("auth"))
      if (document.cookie.indexOf("auth") >= 0) {
        // console.log('hello')
        let name = "auth"
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        let token = matches ? decodeURIComponent(matches[1]) : undefined;
        if (token !== undefined && token !=="") {
          commit('SAVE_TOKEN', token)
          router.push('/main').then(r => console.log('Authorization was successful'))
        }
      }
    },
    logout({commit}){
      commit("DELETE_TOKEN")
      document.cookie = "auth=; path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
      commit("setTurnAccess", "memberIn");
    },
    checkToken({commit}){
      if (document.cookie.indexOf("auth") >= 0) {
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
    loadListTurn({commit}, {token, type, access}) {
      commit('SAVE_TURN', null);
      commit('SET_ERROR', {name:'turn_error', value: false});
      axios.get('/turn?type=' + type + '&access=' + access, {
        headers: {
          'Authorization': `${token}`
        }
      }).then(result => {
        commit('SAVE_TURN', result.data);
        commit('SET_ERROR', {name:'turn_error', value: false})
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
      commit("setNullCreateTurnProperty")
      axios.get('/faculty',{
        headers: {
          'Authorization': `${token}`
        }
      }).then(result=>{
        commit('setFaculties', result.data)
      }).catch(error=>{
        throw new Error("EMPTY LIST")
      })
    },
    loadGroups({commit}, {token, facultyId}){
      commit("CLEAR_ALL_GROUPS_FOREVER")
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
      commit("setNullCreateTurnProperty")
      axios.get('/course',{
        headers: {
          'Authorization': `${token}`
        }
      }).then(result=>{
        commit('setCourses', result.data)
      }).catch(error=>{
        throw new Error("EMPTY LIST")
      })
    },
    saveTurnProperty({commit}, {nameP, valueP}){
      commit(
        'setCreateTurnPropertyText',
        {name:nameP, value: valueP}
      )
    },
    setParam({commit}, {type, data}){
      let t;
      if (type===0){
        t = "allowedGroups"
      }
      if (type===1){
        t = "allowedFaculties"
      }
      if (type===2){
        t = "allowedCourses"
      }
      commit("setCreateTurnProperty", {name: t, value: data})
    },
    deleteParam({commit}, {type,data}){
      let t;
      if (type===0){
        t = "allowedGroups"
      }
      if (type===1){
        t = "allowedFaculties"
      }
      if (type===2){
        t = "allowedCourses"
      }
      commit("deleteElementTurnCreate", {name: t, value: data})
    },
    changeMemberShow({commit}, {param}) {
      commit("setMemberBlockShow", param)
    },
    loadMemberList({commit}, {token, type, turnId, param}) {
      // commit('SET_ERROR', {name:'member_error', value: false});
      axios.get('/turn/members?type='+type+'&turnId='+turnId,{
        headers: {
          'Authorization': `${token}`
        }
      }).then(result=>{
        commit("setMemberBlockShow", param)
        if (result.data.length===0){
          commit('SET_ERROR', {name:'member_error', value: true});
        }
        commit("setMemberList", result.data)
      }).catch(error=>{
        console.log(error)
      })
    },
    changePositionStatus({commit}, {token, posId, status, turnId}) {
      console.log(status)
      if (status === false) {
        axios.put('/position?id=' + posId, null,{
          headers: {
            'Authorization': `${token}`
          }
        }).then(result => {
          commit("setCurrentPositionStatus", true)
        }).catch(error => {
          console.log(error)
        })
      } else {
        axios.put('/position?id=' + posId, null,{
          headers: {
            'Authorization': `${token}`
          }
        }).then(result => {
          commit("setCurrentPosition", null)
          commit("deletePosition", posId)
          axios.get("/position/first?turnId="+turnId, {
            headers:{
              'Authorization': `${token}`
            }
          }).then(result => {
            commit("setCurrentPosition", result.data)
          }).catch(error => {
            console.log(error)
          })
        }).catch(error => {
          console.log(error)
        })
      }
    },
    changeFirstPositionStatus({commit}, {token, posId, status, turnId}) {
      console.log(status)
      if (status === false) {
        axios.put('/position?id=' + posId, null,{
          headers: {
            'Authorization': `${token}`
          }
        }).then(result => {
          commit("setFirstPositionStatus", true)
        }).catch(error => {
          console.log(error)
        })
      } else {
        axios.put('/position?id=' + posId, null,{
          headers: {
            'Authorization': `${token}`
          }
        }).then(result => {
          commit("setFirstPosition", null)
          commit("deletePosition", posId)
          axios.get("/position/first/in?turnId="+turnId, {
            headers:{
              'Authorization': `${token}`
            }
          }).then(result => {
            commit("setFirstPosition", result.data)
          }).catch(error => {
            console.log(error)
          })
        }).catch(error => {
          console.log(error)
        })
      }
    },
    cleanData({commit}, type) {
      commit("")
    },
    cleanListTurn({commit}) {
      commit("SAVE_TURN", null)
    },
    cleanTurnAndPosition({commit}) {
      commit("setNullPosition");
      commit("setNullTurnToCreate");
    }
  }
})


const app1 = createApp(App).use(router).use(store).use(createMetaManager()).use(VueAxios, axios)

axios.defaults.baseURL = 'http://eturn.ru/api'
await router.isReady()
app1.mount('#app')

