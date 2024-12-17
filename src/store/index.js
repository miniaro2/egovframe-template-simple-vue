import { createStore } from 'vuex'
import movie from './movie'
import menu from './menu'

// Vuex 스토어 생성
const store = createStore({
  modules: {
    movie,
    menu,
  }
})

export default store
