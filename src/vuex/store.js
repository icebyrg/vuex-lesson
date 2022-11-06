import { reactive } from 'vue'
import { forEachValue } from './utils'
import { storeKey } from './injectKey'

class Module {
  constructor(rawModule) {
    this._raw = rawModule
    this._children = {}
    this.state = rawModule.state
  }
  addChild(key, module) {
    this._children[key] = module
  }
}

class moduleCollection {
  constructor(rootModule) {
    this.root = null
    this.register(rootModule, [])
  }
  register(rawModule, path) {
    const newModule = new Module(rawModule)
    if (path.length == 0) {
      this.root = newModule
    } else {
      const parent = this.root
      parent.addChild(path[path.length - 1], newModule)
    }
    if (rawModule.modules) {
      forEachValue(rawModule.modules, (rawChildModule, key) => {
        this.register(rawChildModule, path.concat(key))
      })
    }
    console.log(this.root)
  }
}
export default class Store {
  constructor(options) {
    this._modules = new moduleCollection()
  }
  install(app, injectKey) {
    app.provide(injectKey || storeKey, this)
    app.config.globalProperties.$store = this
  }
}

// 格式化用户的参数
// root = {
//   _raw: { state, actions, mutations, getter, modules },
//   state: rootModule.state,
//   _children: {
//     aCount: {
//       _raw: aModule,
//       state: aModule.state,
//       _children: {},
//     },
//     bCount: {
//       _raw: bModule,
//       state: bModule.state,
//       _children: {},
//     },
//   },
// }
