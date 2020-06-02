import { ErrorList, FieldErrorList, Rules, ValidateOption } from 'async-validator';

/** 创建消息模板的一些配置项 */

export interface CreateMessagesTemplateConfig {
  /** true | 是否包含${name}变量 */
  hasName?: boolean;
  /** 'name' | 将${name}指定为指定的变量 */
  nameKey?: string;
}

/** 由自定义验证msg的函数接收 */
export interface MessageMetas {
  /** 字段key */
  name: string;
  /** 接收至async-validator的其他参数，可能是enum、len、max、min、range等 */
  args: any[];
  /** 当前验证规则, 不要依赖此项来生成验证消息，因为它会根据用户传入值生成，可能是数组，也可能是对象。应该使用args */
  rule: any;
  /** 所有规则 */
  rules: any;
  /** 当前值 */
  current: any;
  /** 所有值 */
  source: any;
  /** 传入的配置 */
  options: Options;
  /** 根据option.nameKey获取到的label名, nameKey不存在时此值与name相同 */
  label: string;
}

/** 一个返回自定义验证msg的函数 */
export interface ValidateMessagesCustomer {
  (meta: MessageMetas): string;
}

/** 自定义验证消息的对象格式 */
export type ValidateMessagesStructure = {
  [key: string]: ValidateMessagesCustomer | ValidateMessagesStructure;
};

/** 由validator函数接收的配置对象，是原装ValidateOption的扩展 */
export interface Options extends ValidateOption, CreateMessagesTemplateConfig {
  validateMessages?: {
    [key: string]: (meta: MessageMetas) => string;
  };
}

/** 允许rules中包含任意字段 */
export interface ValidatorRules extends Rules {
  [key: string]: any;
}

/** validator的回调，reject时返回包含同样参数值的对象 */
export interface Callback {
  (errors?: ErrorList, fields?: FieldErrorList): void;
}
