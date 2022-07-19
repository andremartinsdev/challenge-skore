import { Store } from 'vuex'
import MyModule from './Contents/index'

export function createStore() {
  return new Store({
    modules: {
      MyModule,
    },
  })
}
