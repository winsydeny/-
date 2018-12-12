import Vue from 'vue'
import Vuex from 'vuex'

const types = {
  SET_AUTHENTICATED : 'AUTHENTICATED',
  SET_UESR: 'SET_USER'
}

Vue.use(Vuex)
const state = {
 isAuthenticated:false,
 user:{}
};
const getters = {
  isAuthenticated:state => state.isAuthenticated,
  user:state => state.user
};
const mutations = {
  [types.SET_AUTHENTICATED](state,isAuthenticated){
    if(isAuthenticated) state.isAuthenticated = isAuthenticated;
    else state.isAuthenticated = false;
  },  
  [types.SET_UESR](state,user){
    if(user) state.user = user;
    else state.user = {};
  },
};
const actions = {
  setAuthenticated:({commit},isAuthenticated) => {
    commit(types.SET_AUTHENTICATED,isAuthenticated);
  },
  setUser:({commit},user) => {
    commit(types.SET_UESR,user);
  },
  clearState:({commit}) => {
    commit(types.SET_AUTHENTICATED,false);
    commit(types.SET_UESR,null);
  } 
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
