## try-catch
[Back to Home](../index.md) |  [Back to List](./index.md)

### tryCatchR
<!-- 
JavaScriptに標準で使用できるtry-catchでは、try内部の戻り値を定義することはできません。このため、必然的にtry-catchの外部にミュータブルな変数を宣言することになり、イミュータブルに設定することができなくなります。
`tryCatchR` は、イミュータブルに扱えるように戻り値を返す関数としてtry-catchを内包する関数として機能します。
-->

In try-catch, which is standard for JavaScript, it is not possible to define a return value inside try. This inevitably leads to declaring mutable variables outside of try-catch, which cannot be set immutably.

`tryCatchR` acts as a function that encapsulates try-catch as a function that returns a return value so that it can be treated immutably.

```typescript
interface DataSomething {
  something1: string;
  something2: string;
}
interface Result {
  data: DataSomething | undefined;
  errors: string[];
}

// try-catch syntax makes apiResult mutable
let apiResult: Result;
try {
  const data = await fetchFuncSometimesError();
  apiResult = {
    data,
    errors: [],
  };
} catch(error) {
  apiResult = {
    data: undefined,
    errors: [String(error)],
  };
}

// tryCatchR realizes apiResult2 as immutable
import { tryCatchR } from "@y-walter/typescript-utils";

const apiResult2 = tryCatchR(() => {
  const data = await fetchFuncSometimesError();
  return {
    data,
    errors: [],
  }
}, {
  onError: (error) => {
    return {
      data: undefined,
      errors: [String(error)],
    }
  }
});
```

---
[Back to Home](../index.md) |  [Back to List](./index.md)
