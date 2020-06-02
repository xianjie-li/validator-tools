import { ValidateMessagesCustomer, ValidateMessagesStructure } from './interfaces';

const gMsg: ValidateMessagesCustomer = ({ options, label }) =>
  options.hasName ? `\`${label}\` ` : '';

/** 内置验证消息模板 */
const validateMessages: ValidateMessagesStructure = {
  default: meta => `${gMsg(meta)}字段验证错误`,
  required: meta => `${gMsg(meta)}该项必填`,
  enum: meta => `${gMsg(meta)}必须是${meta.args[1]}中的一个`,
  whitespace: meta => `${gMsg(meta)}不能为空字符`,
  date: {
    format: meta => `${gMsg(meta)}不是有效的日期格式`,
    parse: meta => `${gMsg(meta)}不能解析为日期`,
    invalid: meta => `${gMsg(meta)}无效日期`,
  },
  types: {
    string: meta => `${gMsg(meta)}必须为字符类型`,
    method: meta => `${gMsg(meta)}必须为函数类型`,
    array: meta => `${gMsg(meta)}必须为数组类型`,
    object: meta => `${gMsg(meta)}必须为object类型`,
    number: meta => `${gMsg(meta)}必须为数字类型`,
    date: meta => `${gMsg(meta)}必须为日期类型`,
    boolean: meta => `${gMsg(meta)}必须为布尔类型`,
    integer: meta => `${gMsg(meta)}必须为整数`,
    float: meta => `${gMsg(meta)}必须为浮点数`,
    regexp: meta => `${gMsg(meta)}必须为正则类型`,
    email: meta => `${gMsg(meta)}不是合法的邮箱`,
    url: meta => `${gMsg(meta)}不是合法的url`,
    hex: meta => `${gMsg(meta)}不是合法的二进制值`,
  },
  string: {
    len: meta => `${gMsg(meta)}必须为${meta.args[1]}个字符`,
    min: meta => `meta => ${gMsg(meta)}最少${meta.args[1]}个字符`,
    max: meta => `${gMsg(meta)}最多${meta.args[1]}个字符`,
    range: meta => `${gMsg(meta)}必须在${meta.args[1]}-${meta.args[2]}个字符之间`,
  },
  number: {
    len: meta => `${gMsg(meta)}必须等于${meta.args[1]}`,
    min: meta => `${gMsg(meta)}最小值为${meta.args[1]}`,
    max: meta => `${gMsg(meta)}最大值为${meta.args[1]}`,
    range: meta => `${gMsg(meta)}必须在${meta.args[1]}-${meta.args[1]}之间`,
  },
  array: {
    len: meta => `${gMsg(meta)}必须为${meta.args[1]}项`,
    min: meta => `${gMsg(meta)}最少${meta.args[1]}项`,
    max: meta => `${gMsg(meta)}最多${meta.args[1]}项`,
    range: meta => `${gMsg(meta)}必须在${meta.args[1]} ~ ${meta.args[2]}项之间`,
  },
  pattern: {
    mismatch: meta => `${gMsg(meta)}格式错误`,
  },
};

export default validateMessages;
