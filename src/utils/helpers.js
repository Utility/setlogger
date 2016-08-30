/**
  some helper functions to ease the pain
*/

export const getBucketId = (schema, id) => {
  return id.split('/')
    .slice(0, schema.bucketIdentifierLength + 1)
    .join('/') + '/'
}

/**
  getRelativeNodeId will always return a relative path from the
  bucketId. While getGlobalNodeId will return a global path.
*/
export const getRelativeNodeId = (bucketId, id) => {
  return id.replace(bucketId, '')
}

export const getGlobalNodeId = (bucketId, id) => {
  return bucketId + id.replace(bucketId, '')
}


/**
  return a new object with {id: object}
*/
export const wrapObject = (id, object) => {
  let newState = {}
  newState[id] = object
  return newState
}


/**
  Allow a node to support an array key like:
  ['data', 'foo', 'blah']: 'newValue'

  Which will set a deeply nested value
  {data: {foo: {blah: 'newValue'}}}
*/

export const recursiveApplyState = (state, newState, keys, val) => {
  key = keys[0]
  newState[key] = newState[key] || state[key]

  keys = keys.slice(1, keys.length)
  if (keys.length === 0) {
    newState[key] = val
  } else {
    newState[key] = recursiveApplyState(newState, newState[key], keys, val)
  }

}





function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}


// not an actual guid, but looks like one
export const guid = (len = 32) => {
  if (len === 8) return s4() + s4();
  if (len === 16) return s4() + s4() + s4() + s4();
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
