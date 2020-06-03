import Schema, { Rules, ValidateOption, ValidateSource } from 'async-validator';
import { isArray, isFunction, isObject } from '@lxjx/utils';
import _defaultsDeep from 'lodash/defaultsDeep';
import {
  ValidateMessagesCustomer,
  MessageMetas,
  Options,
  Callback,
  Validator,
  ValidatorRules,
} from './interfaces';
import validateMessages from './validateMessages';

/** 根据配置抽取出`MessageMetas`然后注入并返回async-validator能理解的msg定制函数 */
function msgHandler(
  { rules, source, options }: { rules: ValidatorRules; source: ValidateSource; options: Options },
  cb: (meta: MessageMetas) => string,
) {
  const nameKey = options.nameKey;

  return (name: string, ...args: any) => {
    const rule = rules?.[name];

    let label: string = name;

    // 取label的规则:
    // 1. 当前rule直接包含nameKey指定的键值时
    // 2. 当前rule为rule数组时，取最后一个包含nameKey值的rule
    // 3. 默认取name
    if (options.hasName && nameKey && rule) {
      if (rule[nameKey]) {
        label = rule[nameKey];
      }

      if (isArray(rule)) {
        rule.forEach(r => {
          if (r[nameKey]) {
            label = r[nameKey];
          }
        });
      }
    }

    const meta = {
      name,
      args: [name, ...args],
      rule,
      rules,
      current: source?.[name],
      source: source,
      options,
      label,
    };

    return cb(meta);
  };
}

/** 接收待验证对象、rules、和配置，返回能够被async-validator的Schema.messages(msg)直接使用的msg对象 */
function createMsg(source: ValidateSource, rules: Rules, options: Options) {
  const opt = { rules, source, options };

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

  return msgTpl;
}

const defaultOpt: Options = {
  suppressWarning: true,
  nameKey: 'label',
  hasName: true,
};

const validator: Validator = (
  source: ValidateSource,
  rules: Rules,
  options?: any,
  callback?: any,
) => {
  const hasOptions = isObject(options);
  const opt: ValidateOption = hasOptions ? { ...defaultOpt, ...options } : defaultOpt;
  const cb: Callback = hasOptions ? callback : options;

  const schema = new Schema(rules);

  const msg = createMsg(source, rules, opt);

  // @ts-ignore
  schema.messages(msg);

  return schema.validate(source, opt, cb);
};

validator.messages = messagesTpl => {
  const deep = _defaultsDeep({}, messagesTpl, validateMessages);

  // 直接替换内置模板
  Object.assign(validateMessages, deep);
};

export default validator;
