# @watchable-react/cache

Adds a cache utility that stores data in [@watchable/store](https://www.npmjs.com/package/@watchable/store)

Read the [API Reference](https://watchable.dev/api/modules/_watchable_request.html) or the reference usages below, or [browse the source on Github](https://github.com/cefn/watchable/tree/main/packages/request).

## Getting Started

### Install

```zsh
npm install @watchable-react/cache
```

### Create a cache, insert/update then read values from it. 

```typescript
// With the store
const appStore: Store<AppState> = useAppStore();

// you can create a new cache instance. This instance will be named "testCache"
const cache = new Cache<string>(store, "testCache");

// then use it to store or read data.
// One cache instance groups entries by the "CacheFolderID" and identifies entries by CacheEntryID
cache.addEntry("CacheFolderID", "CacheEntryID", "String data");
cache.getEntry("CacheFolderID", "CacheEntryID");

// F.E. you can use the same cache to store multiple group of entries
cache.addEntry("Customer", user1.id, user1);
cache.addEntry("Customer", user2.id, user2);
cache.addEntry("Customer", user3.id, user3);
cache.addEntry("Admin", user4.id, user4);
cache.addEntry("Admin", user5.id, user5);

// Static methods are also provided that can manipulate multiple cache instances

```



