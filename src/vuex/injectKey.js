import { inject } from 'vue'
export const storeKey = 'store'
// vue 内部已经将这些api导出来了
export function useStore(injectKey = null) {
  return inject(injectKey !== null ? injectKey : storeKey)
}
