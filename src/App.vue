<template>
  计数器：{{ count }}{{ $store.state.count }}
  <button @click="$store.state.count++">错误修改</button>
  <button @click="add">同步修改</button>
  <button @click="asyncAdd">异步修改</button>
  <hr />
  a模块：{{ aCount }}{{ bCount }}
  <button @click="$store.commit('aCount/add', 1)">改a</button>
  <button @click="$store.commit('bCount/add', 1)">改b</button>
</template>

<script>
import { computed } from 'vue'
import { useStore } from '@/vuex'

export default {
  name: 'App',
  setup() {
    const store = useStore()
    function add() {
      store.commit('add', 1)
    }
    function asyncAdd() {
      store.dispatch('asyncAdd', 1)
    }
    return {
      count: computed(() => store.state.count),
      double: computed(() => store.getters.double),
      aCount: computed(() => store.state.aCount.count),
      bCount: computed(() => store.state.bCount.count),
      add,
      asyncAdd,
    }
  },
}
</script>
