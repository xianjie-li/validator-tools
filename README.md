`async-validator`使用简化,  消息模板定制能力增强; `rc-field-form`中文消息模板



##  🌟feature

* [async-validator](https://github.com/yiminghe/async-validator/)的上层封装，简化了使用以及增强消息模板的定制能力
* 一个生成[rc-field-form](https://github.com/react-component/field-form) 中文消息模板的工具函数



## 使用

```ts
import validator, { ValidatorRules } from '@lxjx/validate-tools';

const source = {
  name: 'lxj',
  age: 18,
};

const rules: ValidatorRules = {
  name: {
    required: true,
    min: 2,
    label: '姓名',
  },
  age: {
    required: true,
    label: '年龄',
  },
};

// 回调方式使用
validator(source, rules, (errors, errfields) => {
  if (err) {
      console.log('错误', errors, errfields);
      return;
  }
    
  console.log('验证通过');
});

// Promise方式使用
validator(source, rules)
  .then(() => {
    console.log('验证通过');
  })
  .catch(({ errors, errfields }) => {
    console.log('错误', errors, errfields);
  });

// 传配置
validator(source, rules, { hasName: false, first: true }, (errors, errfields) => {});
```



## 配置

通过`validator`第三个参数传入

```ts
interface Options extends ValidateOption, CreateMessagesTemplateConfig;

interface CreateMessagesTemplateConfig {
  /** true | 是否包含${name}变量 */
  hasName?: boolean;
  /** 'name' | 将${name}指定为指定的变量 */
  nameKey?: string;
}

interface ValidateOption {
  // 是否不显示有关无效值的内部警告
  suppressWarning?: boolean;
  // 当第一个验证规则生成错误时调用回调，不再处理任何验证规则。 如果您的验证涉及多个异步调用（例如，数据库查询），而您只需要第一个错误，请使用此选项。
  first?: boolean;
  // 当指定字段的第一个验证规则生成错误时调用回调，不再处理同一字段的验证规则。 true表示所有字段。
  firstFields?: boolean | string[];
}
```



## 定制消息模板

与内置模板深合并, 内置模板见[validateMessages.ts](https://github.com/Iixianjie/validator-tools/blob/master/source/validateMessages.ts)

```ts
validator.messages({
  required: meta => `${meta.label}该项必填`,
  string: {
    len: meta => `长度必须为${meta.args[1]}`,
  },
});
```





## 生成[field-form](https://github.com/react-component/field-form)中文验证模板

```ts
import { messagesTemplate, createMessagesTemplate } from '@lxjx/validate-tools';

// 可在rc-field-form中直接使用的消息模板对象，默认包含name
console.log(messagesTemplate); 

// 自行指定name对应的模板变量名
console.log(createMessagesTemplate({ nameKey: 'label' }));

// 关闭name显示
console.log(createMessagesTemplate({ hasName: false }));
```



