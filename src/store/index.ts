import { createStore } from 'vuex'
import {UserDetail} from "@/models/user/user.detail";
import BookItem from "@/models/book/books"

export const TOKEN = 'TOKEN'
export const BOOK = 'BOOK'
export const SET_BOOK = 'SET_BOOK'
export const SET_TOKEN = 'SET_TOKEN'
export const CLEAR_TOKEN = 'CLEAR_TOKEN'
export const SET_USER = 'SET_USER'

export interface StoreState {
  token: string;
  user: UserDetail | null;
  book: BookItem | null
}

function createDefaultState(): StoreState {
  return {
    token: localStorage.getItem(TOKEN) || '',
    user: null,
    book: null,
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
      state.user = user
    },
    [SET_BOOK] (state: StoreState, book: BookItem){
      state.book = book
    }
  },
  actions: {
    [CLEAR_TOKEN]: ({ commit }) => commit(CLEAR_TOKEN),
    [SET_TOKEN]: ({ commit }, token: string) => commit(SET_TOKEN, token),
    [SET_USER]: async ({ commit }, user: UserDetail) => commit(SET_USER, user),
    [SET_USER]: async ({ commit }, book: BookItem) => commit(SET_BOOK, book),
  },
  modules: {
  }
})
