import shallowEqual from '../utils/shallowEqual'
import warning from '../utils/warning'

export default class Database {
  getChildContext() {
    return { store: this.store }
  }

  constructor(store) {
    this.store = store
  }

  // define set / get interface
  set() {
    return
  }
}
