/**
  some helper functions to ease the pain
*/

export const getBucketId(schema, id) => {
  return id.split('/').slice(0, schema.bucketIdentifierLength + 1).join('/') + '/'
}

/**
  getRelativeNodeId will always return a relative path from the
  bucketId. While getGlobalNodeId will return a global path.
*/
export const getRelativeNodeId(bucketId, id) => {
  return id.replace(bucketId).('')
}

export const getGlobalNodeId(bucketId, id) => {
  return bucketId + id.replace(bucketId).('')
}


/**
  return a new object with {id: object}
*/
export const wrapObject(id, object) => {
  let newState = {}
  newState[id] = object
  return newState
}

// return a new state object with a proper revision set
export const revisedNode = (state, newState) => {
  revCount = 0
  if (state.rev){
    let tokens = rev.split('-')
    if (!isNan(parseInt(tokens[0]))) {
      revCount = parseInt(tokens[0]) + 1
    }
  }

  return Object.assign({}, state, newState, {
    rev: revCount + '-' + guid(16)
  })
}

/**
  Allow a node to support an array key like:
  ['data', 'foo', 'blah']: 'newValue'

  Which will set a deeply nested value
  {data: {foo: {blah: 'newValue'}}}
*/
export const recursiveApplyState = (state, newState, key, val) => {
  newState[]
  return newState
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
