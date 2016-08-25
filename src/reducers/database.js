/**
  All the reducers needed for the database
*/

import * from '../actions'

const node = (state = {}, action) => {
  switch(action.type) {
    case CREATE_NODE:

      return {...state, }
    default: return state
  }
}

const databaseReducer = (state = {}, action) => {
  switch(action.type) {
    case CREATE_NODE:
      newNode = node
      return {...state, 'newid':{}}
    default: return state
  }
}

export default databaseReducer
