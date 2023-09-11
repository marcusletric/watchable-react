<div align="center">
  # React extension packages for ![@watchable/store-react](https://watchable.dev/api/modules/_watchable_store_react.html)

</div>

**Read the API documentation ![here](https://marcusletric.github.io/watchable-react/)**


 [![Coverage Status](https://coveralls.io/repos/github/marcusletric/watchable-react/badge.svg?branch=main)](https://coveralls.io/github/marcusletric/watchable-react?branch=main)

## About watchable-react

This monorepo holds some utilities to streamline app development when using ![@watchable/store](https://watchable.dev/api/modules/_watchable_store.html).

### @watchable-react/request

[![npm](http://img.shields.io/npm/v/@watchable-react_request.svg)](https://www.npmjs.com/package/@watchable-react_request)
[![npm](https://img.shields.io/npm/dm/@watchable-react/request.svg)](https://www.npmjs.com/package/@watchable-react_request)
[![License](https://img.shields.io/npm/l/watchable-react.svg)](https://github.com/marcusletric/watchable-react/blob/main/LICENSE)

This package has the ![useRequest](https://marcusletric.github.io/watchable-react/functions/_watchable_react_request.useRequest.html) hook that tries to simplify and streamline HTTP request management in a watchable store. It deals with caching and status management out of the box.

### @watchable-react/store-hooks

[![npm](http://img.shields.io/npm/v/@watchable-react_store-hooks.svg)](https://www.npmjs.com/package/@watchable-react_store-hooks)
[![npm](https://img.shields.io/npm/dm/@watchable-react_store-hooks.svg)](https://www.npmjs.com/package/@watchable-react_store-hooks)
[![License](https://img.shields.io/npm/l/watchable-react.svg)](https://github.com/marcusletric/watchable-react/blob/main/LICENSE)

This package is a collection of React hooks that takes away some of the boilerplate associated with writing the store. 
- ![usePartition](https://marcusletric.github.io/watchable-react/functions/_watchable_react_store_hooks.usePartition.html) creates a new partition and returns with it's watched value and setter function


