import { createStore } from 'vuex'
import {UserDetail} from "@/models/user/user.detail";

export const TOKEN = 'TOKEN'
export const SET_TOKEN = 'SET_TOKEN'
export const CLEAR_TOKEN = 'CLEAR_TOKEN'
export const SET_USER = 'SET_USER'
export const CLEAR_USER = 'CLEAR_USER'

export interface StoreState {
  token: string;
  user: UserDetail | null;
}

function createDefaultState(): StoreState {
  return {
    token: localStorage.getItem(TOKEN) || '',
    user: null,
  }
}

export default createStore({
  state: {
    ... createDefaultState()
  },
  mutations: {
    [CLEAR_TOKEN] (state: StoreState) {
      state.token = ''
      localStorage.removeItem(TOKEN)
    },
    [SET_TOKEN] (state: StoreState, token: string) {
      state.token = token
      localStorage.setItem(TOKEN, token)
    },
    [SET_USER] (state: StoreState, user: UserDetail) {
      localStorage.setItem('role', user.role);
      state.user = user
    },
    [CLEAR_USER] (state: StoreState) {
      state.user = null
      localStorage.removeItem('role')
    },
  },
  actions: {
    [CLEAR_TOKEN]: ({ commit }) => commit(CLEAR_TOKEN),
    [SET_TOKEN]: ({ commit }, token: string) => commit(SET_TOKEN, token),
    [SET_USER]: async ({ commit }, user: UserDetail) => commit(SET_USER, user),
    [CLEAR_USER]: ({ commit }) => commit(CLEAR_USER),
  },
  modules: {
  }
})
