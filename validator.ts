import Schema, { ErrorList, FieldErrorList, Rules, ValidateOption, ValidateSource } from 'async-validator';
import { isFunction, isObject } from '@lxjx/utils';
import { CreateMessagesTemplateConfig } from "./index";

interface ValidateMessagesCustomer {
  (meta: MessageMetas): string;
}

type ValidateMessagesStructure = {
  [key: string]: ValidateMessagesCustomer | ValidateMessagesStructure;
}

interface Options extends ValidateOption, CreateMessagesTemplateConfig {
  validateMessages?: {
    [key: string]: (meta: MessageMetas) => string;
  };
}

const validateMessages: ValidateMessagesStructure = {
  required: (meta) => {
    return `该项必填`;
  },
  string: {
    len: (meta) => {
      console.log(meta)
      return '字符长度不匹配';
    },
    min: () => '字符过短',
    max: () => '字符过长',
  }
}

interface MessageMetas {
  /** 字段key */
  name: string;
  /** 接收至async-validator的其他参数，可能是enum、len、max、min、range等 */
  args: any[],
  /** 当前验证规则 */
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

function msgHandler({rules, source, options}: { rules: any, source: any, options: any }, cb: (meta: MessageMetas) => string) {
  return (name: string, ...args: any) => {
    const meta = {
      name,
      args,
      rule: rules?.[name] || null,
      rules,
      current: source?.[name],
      source: source,
      options,
      label: name,
    };

    return cb(meta);
  }
}

function createMeg(source: any, rules: any, options?: any) {
  const opt = {rules, source, options};

  const msgTpl: any = {};

  Object.entries(validateMessages).forEach(([key, val]) => {
    const isFn = isFunction(val);

    if (isFn) {
      msgTpl[key] = msgHandler(opt, val as ValidateMessagesCustomer);
    } else {
      msgTpl[key] = {};

      Object.entries(val).forEach(([iKey, iVal]) => {
        msgTpl[key][iKey] = msgHandler(opt, iVal);
      });
    }

  });

  console.log(2222, msgTpl);

  return msgTpl;
}

interface Callback {
  (errors?: ErrorList, fields?: FieldErrorList): void
}

const defaultOpt: Options = {
  suppressWarning: true,
  nameKey: 'label',
}

function validator(source: ValidateSource, rules: Rules, callback?: Callback): Promise<void>;
function validator(source: ValidateSource, rules: Rules, options?: ValidateOption, callback?: Callback): Promise<void>;
function validator(source: ValidateSource, rules: Rules, options?: any, callback?: any): Promise<void> {
  const hasOptions = isObject(options);
  const opt: ValidateOption = hasOptions ? {...options, ...options} : defaultOpt;
  const cb: Callback = hasOptions ? callback : options;

  const schema = new Schema(rules);

  const msg = createMeg(source, rules, options);

  console.log(msg)

  // @ts-ignore
  schema.messages(msg);

  return schema.validate(source, opt, cb);
}

export default validator;
