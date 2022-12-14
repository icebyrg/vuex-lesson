import { createStore } from '@/vuex'

export default createStore({
  state: {
    count: 0,
  },
  getters: {
    double(state) {
      return state.count * 2
    },
  },
  mutations: {
    add(state, payload) {
      state.count += payload
    },
  },
  actions: {
    asyncAdd({ commit }, payload) {
      setTimeout(() => {
        commit('add', payload)
      }, 1000)
    },
  },
  modules: {
    aCount: {
      namespaced: true,
      state: { count: 0 },
      mutations: {
        add(state, payload) {
          state.count += payload
        },
      },
      modules: {
        cCount: {
          state: { count: 0 },
          mutations: {
            add(state, payload) {
              state.count += payload
            },
          },
        },
      },
    },
    bCount: {
      namespaced: true,
      state: { count: 0 },
      mutations: {
        add(state, payload) {
          state.coun += payload
        },
      },
    },
  },
})
