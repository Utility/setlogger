/**
  All the reducers needed for the database.

  The database simply delegates to a bucket based on the schema.

  A database schema will describe how resource paths get mapped to
  buckets. A bucket schema will describe the types and properties of
  the nodes in that bucket.
*/

import * from '../actions'

import {getBucketId} from '../utils/helpers'

/**
  The database schema defines how to break apart a path into buckets.

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
const databaseSchema = (state) => {
  if (state['schema']) {
    return state['schema']
  }

  return {
    bucketIdentifierLength: 0
  }
}

const bucketSchema = (state) => {

}



const node = (state = {}, action) => {
  switch(action.type) {
    case SET_PROPERTY:
      return {}
    default: return state
  }
}


/*
 * returns an object of the form {bucketId: bucket} so
 * that it can be passed through Object.assign
 */
const bucket = (bucketId, state = {}, action) => {
  let newState = {}
  let schema = bucketSchema(state)
  let nodeId = null
  if (action.id)
    nodeId = getNodeId()

  switch(action.type) {
    case CREATE_NODE:
      return Object.assign({}, state, node(state[bucketId], action))
    case DELETE_NODE:
      return Object.assign({}, state, bucket(bucketId, state[bucketId], action))
    case SET_PROPERTY:
      return Object.assign({}, state, bucket(bucketId, state[bucketId], action))
    case REMOVE_PROPERTY:
      return Object.assign({}, state, bucket(bucketId, state[bucketId], action))
    case ARRAY_INSERT:
      return Object.assign({}, state, bucket(bucketId, state[bucketId], action))
    case ARRAY_REMOVE:
      return Object.assign({}, state, bucket(bucketId, state[bucketId], action))
    case SET_BUCKET_SCHEMA:
      return Object.assign({}, state, bucket(bucketId, state[bucketId], action))
  }
}

const databaseReducer = (state = {}, action) => {
  let schema = databaseSchema(state)
  let bucketId = null
  if (action.id)
    bucketId = getBucketId(schema, state, action.id)

  switch(action.type) {
    case CREATE_NODE:
      return Object.assign({}, state, bucket(bucketId, state[bucketId], action))
    case DELETE_NODE:
      return Object.assign({}, state, bucket(bucketId, state[bucketId], action))
    case SET_PROPERTY:
      return Object.assign({}, state, bucket(bucketId, state[bucketId], action))
    case REMOVE_PROPERTY:
      return Object.assign({}, state, bucket(bucketId, state[bucketId], action))
    case ARRAY_INSERT:
      return Object.assign({}, state, bucket(bucketId, state[bucketId], action))
    case ARRAY_REMOVE:
      return Object.assign({}, state, bucket(bucketId, state[bucketId], action))
    case SET_BUCKET_SCHEMA:
      return Object.assign({}, state, bucket(bucketId, state[bucketId], action))
    case SET_SCHEMA:
      return Object.assign({}, state, {schema: action.schema})
    default: return state
  }
}

export default databaseReducer
