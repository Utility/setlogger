/**
  All the reducers needed for the database.

  The database simply delegates to a bucket based on the schema.

  A database schema will describe how resource paths get mapped to
  buckets. A bucket schema will describe the types and properties of
  the nodes in that bucket.

  If no schema is defined there will only be one bucket and every id will
  map directly into it. In this example the following two items will map to a
  single bucket with bucketId "/" and containging "/foo" and "/asdf/blah"
  /foo
  /blah/asdf

  If a schema is defined with a length of 1, the bucket identifier will
  be built as  "/:token". If a length of 2 is specified the bucket id will be
  "/:token1/:token2"

  In the case of bucket length 1 - the following two will be mapped to separate
  buckets:

  /foo/someval
  /blah/someval
*/

import * from '../actions'
import * from '../utils/helpers'
import DEFAULT_SCHEMA from '../utils/schema'


const bucketSchema = (state) => {
  if (state.schema) return state.schema
  return DEFAULT_SCHEMA
}

// TODO provide method for checking against schema
const applySchema = (schema) => {}


const node = (schema, state = {}, action) => {
  let returnState = {}

  switch(action.type) {
    case SET_PROPERTY:
      Object.keys(action.properties).forEach((key) => {
        if (Array.isArray(key)) {
          recursiveApplyState(state, returnState, key, action.properties[key])
        } else {
          returnState[key] = action.properties[key]
        }
      })
      return revisedNode(state, returnState)

    case REMOVE_PROPERTY:
      return revisedNode(state, returnState)

    case ARRAY_INSERT:
      let arr = state[action.property]
      let arr2 = action.value
      if (!Array.isArray(arr2)) arr2 = [arr2];

      if (action.index === 0) {
        returnState[action.property] = [
            ...arr2,
            ...arr
        ]
      } else if (action.index === arr.length) {
        returnState[action.property] = [
          ...arr,
          ...arr2
        ]
      } else {
        returnState[action.property] = [
          ...arr.slice(0, action.index),
          arr2
          ...arr.slice(action.index, arr.length),
        ]
      }
      return revisedNode(state, returnState)

    case ARRAY_REMOVE:
      let arr = state[action.property]
      count = action.count || 1

      returnState[action.property] = [
        ...arr.slice(0, action.index),
        ...arr.slice(action.index + count, arr.length)
      ]
      return revisedNode(state, returnState)

    default: return state
  }
}

const bucket = (bucketId, state = {}, action) => {
  let schema = bucketSchema(state)
  let nodeId = null
  if (action.id)
    nodeId = getRelativeNodeId(bucketId, action.id)

  switch(action.type) {
    case CREATE_NODE:
      return Object.assign({}, state,
        wrapObject(nodeId, node(schema, state[nodeId], action)))

    case DELETE_NODE:
      let newState = {}
      Object.keys(state).forEach((key) => {
        if (key !== nodeId) newState[key] = state[key]
      })
      return newState

    case SET_PROPERTY:
      return Object.assign({}, state,
        wrapObject(nodeId, node(schema, state[nodeId], action)))

    case REMOVE_PROPERTY:
      return Object.assign({}, state,
        wrapObject(nodeId, node(schema, state[nodeId], action)))

    case ARRAY_INSERT:
      return Object.assign({}, state,
        wrapObject(nodeId, node(schema, state[nodeId], action)))

    case ARRAY_REMOVE:
      return Object.assign({}, state,
        wrapObject(nodeId, node(schema, state[nodeId], action)))

    case SET_SCHEMA:
      return Object.assign({}, state, {schema: action.schema})

    default:
      return state
  }
}

/**
  Provide a schema and an optional function to resolve bucketId
  and get back a databaseReducer
*/
const database = (schema, bucketRouter = getBucketId) => {

  return (state = {}, action) => {
    let bucketId = null
    if (action.id)
      bucketId = bucketRouter(schema, state, action.id)

    switch(action.type) {
      case CREATE_NODE:
        return Object.assign({}, state,
          wrapObject(bucketId, bucket(bucketId, state[bucketId], action)))

      case DELETE_NODE:
        return Object.assign({}, state,
          wrapObject(bucketId, bucket(bucketId, state[bucketId], action)))

      case SET_PROPERTY:
        return Object.assign({}, state,
          wrapObject(bucketId, bucket(bucketId, state[bucketId], action)))

      case REMOVE_PROPERTY:
        return Object.assign({}, state,
          wrapObject(bucketId, bucket(bucketId, state[bucketId], action)))

      case ARRAY_INSERT:
        return Object.assign({}, state,
          wrapObject(bucketId, bucket(bucketId, state[bucketId], action)))

      case ARRAY_REMOVE:
        return Object.assign({}, state,
          wrapObject(bucketId, bucket(bucketId, state[bucketId], action)))

      case SET_SCHEMA:
        return Object.assign({}, state,
          wrapObject(bucketId, bucket(bucketId, state[bucketId], action)))

      default: return state
    }
  }
}

export default database
