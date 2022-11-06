计数器：{{ count }} {{ $store.state.count }}
<hr />
double:{{ double }} {{ $store.getters.double }}
<button @click="$store.state.count++">错误修改</button>
<button @click="add">同步修改</button>
<button @click="asyncAdd">异步修改</button>
