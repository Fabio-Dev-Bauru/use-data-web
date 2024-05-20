
# `use-data-web`

React hook that manipulates request data from api. It give to you more productivity and you don't need every time create states in components in your application like isLoading, error and response data. Just pass the function to hook and you will have those states.

## Getting started
Install the library using npm:

```
npm install use-data-web
```

## Usage

```typescript
import { useData } from "use-data-web";

// call the hook function
const {
    isLoading, // boolean that indicates if is loading the request api.
    data: branchs, // response from api typed by the type passed to the function
    error, // returns string if there was some error during request api
    forceUpdateData, // function that forces call data again
  } = useData<Type>({
    fn: () => getBranchs(), // put the function that returns data from api
    deps: [] // you can put dependencies to callback the function like use effect
    shouldRun: true // a boolean variable to determine if the fn should be run
  });

if (error) {
    console.log(error);
}

If you need revalidate the data you can call forceUpdateData function, for example:

  const handleSomething = () => {
    // to do something
    // forceUpdateData(); // here the hook will be called again and the data would be updated.
  }

```

## Maintainers

* [Fabio Henrique](https://github.com/fabio-dev-bauru)

## License

The library is released under the MIT license. For more information see [`LICENSE`](/LICENSE).

If you has suggestion I'm open to talk about it.
