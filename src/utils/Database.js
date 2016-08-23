import shallowEqual from './shallowEqual'
import warning from './warning'

import databaseReducer from '../reducers/database'

export default class Database {
  getChildContext() {
    return { store: this.store }
  }

  constructor(store) {
    this.store = store
  }

  // "db" is the top level object in state
  getDB = () => this.store.getState().db

  // define set / get interface
  set = (id, value) => {
    return null
  }

  //
  get = (id) => {

  }
}
