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
export const getRelativeNodeId(schema, id) => {
  return id.split('/').slice(0, schema.bucketIdentifierLength + 1).join('/') + '/'
}

export const getGlobalNodeId(schema, id) => {
  return id.split('/').slice(0, schema.bucketIdentifierLength + 1).join('/') + '/'
}
