# @watchable-react/request

Adds a utility to handle requests wit cached responses stored in [@watchable/store](https://www.npmjs.com/package/@watchable/store)

Read the [API Reference](https://marcusletric.github.io/watchable-react/) or the reference usages below, or [browse the source on Github](https://github.com/marcusletric/watchable-react/tree/main/packages/request).

## Getting Started

### Install

```zsh
npm install @watchable-react/request
```

### Get handle on result and a function reference to re-load data in cache. 

```typescript
// with the store
const appStore: Store<AppState> = useAppStore();

// and the request function
const findUser = async (userName: string, email: string, role: string):Promise<User> => { 
  return await new Promise((resolve) => {
    let timeout = setTimeout(() => {
      clearTimeOut(timeout);
      resolve({
        name: "dummyUser",
        id: "123456789"
      });
    }, 1000)
  }) 
}


// You can use the hook like this:
const [result, refreshUser] = useRequest<User>(store, findUser, "nickname", "nickname@mail.org", "customer")

// Get request state and data from the result object like this:
const { isLoading, loadingState } = result;

if(loadingState === "LOADED") {
  const { data } = result 
}

// changing the params in the hook will retreive a different entity

// Reload the cache if needed:
refreshUser();
```



