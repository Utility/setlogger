/*
 * action types
 */

// create and delete a graph node
export const CREATE_NODE = 'CREATE_NODE'
export const DELETE_NODE = 'DELETE_NODE'

// the only thing you can do on a node is set a property
// if the property is a list there are separate transforms
export const SET_PROPERTY = 'SET_PROPERTY'
export const REMOVE_PROPERTY = 'REMOVE_PROPERTY'

// insert and remove from an array property
export const ARRAY_INSERT = 'ARRAY_INSERT'
export const ARRAY_REMOVE = 'ARRAY_REMOVE'

// used to set type info
export const SET_SCHEMA = 'SET_SCHEMA'

// database actions that are stored in the main log
export const DB_ACTIONS = [
  CREATE_NODE,
  DELETE_NODE,
  SET_PROPERTY,
  REMOVE_PROPERTY,
  ARRAY_INSERT,
  ARRAY_REMOVE,
  SET_SCHEMA
]

// actions to fetch and merge existing nodes
// these should not sync to the
export const FETCH_NODES = 'FETCH_NODES'
export const MERGE_NODES = 'MERGE_NODES'
export const UPDATE_NODE = 'UPDATE_NODE'
export const CREATE_PLACEHOLDER_NODE = 'CREATE_PLACEHOLDER_NODE'

// create a default node
export createNode(properties={}){
  return {type: CREATE_NODE, properties: properties}
}
