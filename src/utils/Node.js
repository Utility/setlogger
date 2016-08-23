import shallowEqual from './shallowEqual'

export default class Node {

  constructor(db) {
    this.db = db
  }

  // define set / get interface
  set = (prop, value) => {
    return
  }

  get = (prop) => {
    return this[prop];
  }
}
