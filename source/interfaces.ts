import { ErrorList, FieldErrorList, Rules, ValidateOption, ValidateSource } from 'async-validator';

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

/** 自定义验证消息定制函数 */
export interface ValidateMessagesCustomer {
  (meta: MessageMetas): string;
}

/** 自定义验证消息的对象格式 */
export type ValidateMessagesStructure = {
  [key: string]: ValidateMessagesCustomer | ValidateMessagesStructure;
};

/** 由validator函数接收的配置对象，是原装ValidateOption的扩展 */
export interface Options extends ValidateOption, CreateMessagesTemplateConfig {
  // validateMessages?: {
  //   [key: string]: (meta: MessageMetas) => string;
  // };
}

/** 允许rules中包含任意字段 */
export interface ValidatorRules extends Rules {
  [key: string]: any;
}

/** validator的回调，reject时返回包含同样参数值的对象 */
export interface Callback {
  (errors?: ErrorList, fields?: FieldErrorList): void;
}

export interface Validator {
  /**
   * 验证器, 不带options用法
   * @param source - 待验证的对象
   * @param rules - 验证规则，详情见`async-validator`
   * @param callback - 验证回调，和Promise用法二选一
   * @return Promise - 走resolve表示验证成功，reject表示验证失败，参数为callback参数组成的对象
   * */
  (source: ValidateSource, rules: ValidatorRules, callback?: Callback): Promise<void>;
  /**
   * 验证器, 带options
   * @param source - 待验证的对象
   * @param rules - 验证规则，详情见`async-validator`
   * @param options - 配置对象
   * @param callback - 验证回调，和Promise用法二选一
   * @return Promise - 走resolve表示验证成功，reject表示验证失败，参数为callback参数组成的对象
   * */
  (source: ValidateSource, rules: Rules, options?: Options, callback?: Callback): Promise<void>;
  /**
   * 自定义消息提示模板
   * @param messagesTpl - 详情见`validateMessages.ts`
   * */
  messages(messagesTpl: ValidateMessagesStructure): void;
}
