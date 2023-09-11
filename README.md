<div align="center">

  # React extension packages for [@watchable/store-react](https://watchable.dev/api/modules/_watchable_store_react.html)
   [![Coverage Status](https://coveralls.io/repos/github/marcusletric/watchable-react/badge.svg?branch=main)](https://coveralls.io/github/marcusletric/watchable-react?branch=main)
</div>


## About watchable-react

This monorepo holds some utilities to streamline app development when using [@watchable/store](https://watchable.dev/api/modules/_watchable_store.html).
**Read the API documentation [here](https://marcusletric.github.io/watchable-react/)**

### @watchable-react/request

![npm (scoped)](https://img.shields.io/npm/v/%40watchable-react/request)
![npm](https://img.shields.io/npm/dt/%40watchable-react%2Frequest)
![NPM](https://img.shields.io/npm/l/%40watchable-react%2Frequest)

This package has the [useRequest](https://marcusletric.github.io/watchable-react/functions/_watchable_react_request.useRequest.html) hook that tries to simplify HTTP request management in a watchable store. It deals with caching and status management out of the box.

### @watchable-react/store-hooks

![npm (scoped)](https://img.shields.io/npm/v/%40watchable-react/store-hooks)
![npm](https://img.shields.io/npm/dt/%40watchable-react%2Fstore-hooks)
![NPM](https://img.shields.io/npm/l/%40watchable-react%2Fstore-hooks)

This package is a collection of React hooks that takes away some of the boilerplate associated with writing the store. 
- [usePartition](https://marcusletric.github.io/watchable-react/functions/_watchable_react_store_hooks.usePartition.html) creates a new partition and returns with it's watched value and setter function


