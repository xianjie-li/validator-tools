# 
## 在[field-form](https://github.com/react-component/field-form)中使用

```ts
import tpl, { createMessagesTemplate } from '@lxjx/async-filed-cn-template';

// 可直接使用的模板对象，包含name
console.log(tpl); 

// 自行指定name对应的模板变量名
console.log(createMessagesTemplate({ nameKey: 'label' }));

// 禁用name显示
console.log(createMessagesTemplate({ hasName: false, nameKey: 'label' }));
```

<br>


## 在[async-validator](https://github.com/yiminghe/async-validator/)中使用 [暂未实现]
```ts
// 导出一个对async-validator的简单封装, 省去Schema实例创建等繁琐步骤
import validator from '@lxjx/async-filed-cn-template/original';

validator.hasName = false; // 通过静态属性进行一些简单的配置

validator.Schema.warning = function(){}; // 访问async-validator的Schema对象

const target = {
  name: 'lxj',
}

const schema = {
  name: {
    type: 'string',
    min: 2,
    required: true,
    label: '姓名', // 在内部进行处理
  }
}

// API暂定
validator(target, schema, options?, cb?(pass, errors, fields)): Promise<[pass, errors, fields]>;

// Options为传递给原始Validate的配置

```