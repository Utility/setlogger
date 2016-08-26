SetLogger
=========================

## About

A very simple database layer meant to sit inside a Redux store and be backed by any cloud Pub/Sub messaging service.

SetLogger is built to run inside the browser. Like [Samza](http://samza.apache.org) it exists as an immutable log of transforms that are stored as JSON messages and indexed into static files for end use. Each transform is a redux action. Every index can be generated on the client and stored on S3 or any cloud storage service.

This is by no means a real database. It is a purpose-built datastore for use cases where data can reside in self-contained buckets, with each bucket an in-memory store containing less than 1 million records.

The goal is a "serverless" datastore where every record that is needed can be streamed in from Amazon S3 or any file storage solution.

Beware:: this approach will fare poorly for heavily-connected architectures and applications that feature searching over a large dataset.

## Lifecycle

The typical lifecycle of a SetLogger db looks like the following:
1. Initialized on a client with schema
2. Database actions are published as a log via Pub/Sub API or simple log file
3. Once a certain size is reached, the database is indexed and stored as a JSON file chunk
4. Subsequent connections will read the index file + log stream since last index
5. When the log hits a size limit, another index chunk is split off and linked to previous chunks.
6. Repeat ad infinitum.

## An Example Use Case

The ideal use case is an application where every user has a collection of content that can be "paged-in", much like you would see in an infinite-scrolling window or paginated feed. Each collection would have its own separate database (bucket) and could have many users subscribing or able to modify it.

In many cases, if the collection was only a few hundred items it would be possible to serve the entire structure as a single JSON file. This is a dream for infrastructure because it introduces portability. You could store it anywhere: Amazon S3, Dropbox, WordPress, local disk etc.

But once synchronization for multiple users is introduced and collection sizes rise the static file database becomes tricky to manage.

This is where SetLogger comes in. Using a Pub/Sub message utility as a primary backend we can introduce custom indexing for static files anywhere. 

## License

MIT
