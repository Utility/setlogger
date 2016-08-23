/**
  All the reducers needed for the database
*/

const nodeReducer = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_NODE':
      return {...state, }
    default: return state
  }
}

const databaseReducer = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_NODE':
      return {...state, foo: 'blah'}
    default: return state
  }
}

export default databaseReducer
