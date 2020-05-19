# 

`async-validator` 库的中文提示模板

```ts
const tpl = { createMessagesTemplate } from './dist/index';

console.log(tpl); // 可直接使用的模板对象，包含name

console.log(createMessagesTemplate({ hasName: true, nameKey: 'label' })); // 自行指定name对应的模板变量
```
