interface Config {
  /** true | 是否包含${name}变量 */
  hasName?: boolean;
  /** 'name' | 将name指定为指定的变量 */
  nameKey?: string;
}

function createMessagesTemplate({ hasName = true, nameKey = 'name' }: Config) {
  const nameVar = hasName ? `'\${${nameKey}}'` : '';
  const nameVarRightSpace = hasName ? `${nameVar} ` : '';

  return {
    default: `字段验证错误${nameVar}`,
    required: hasName ? `${nameVarRightSpace}是必填项` : '该项必填',
    enum: `${nameVarRightSpace}必须是[\${enum}]中的一个`,
    whitespace: `${nameVarRightSpace}不能为空字符`,
    date: {
      format: `${nameVarRightSpace}不是有效的日期格式`,
      parse: `${nameVarRightSpace}不能解析为日期`,
      invalid: hasName ? `${nameVarRightSpace}是无效日期` : '无效日期',
    },
    types: {
      string: `${nameVarRightSpace}必须为字符类型`,
      method: `${nameVarRightSpace}必须为函数类型`,
      array: `${nameVarRightSpace}必须为数组类型`,
      object: `${nameVarRightSpace}必须为object类型`,
      number: `${nameVarRightSpace}必须为数字类型`,
      date: `${nameVarRightSpace}必须为日期类型`,
      boolean: `${nameVarRightSpace}必须为boolean类型`,
      integer: `${nameVarRightSpace}必须为整数`,
      float: `${nameVarRightSpace}必须为浮点数`,
      regexp: `${nameVarRightSpace}必须为正则类型`,
      email: `${nameVarRightSpace}不是合法的邮箱`,
      url: `${nameVarRightSpace}不是合法的url`,
      hex: `${nameVarRightSpace}不是合法的二进制值`,
    },
    string: {
      len: `${nameVarRightSpace}必须为\${len}个字符`,
      min: `${nameVarRightSpace}最少\${len}个字符`,
      max: `${nameVarRightSpace}最多\${len}个字符`,
      range: `${nameVarRightSpace}必须在\${min}-\${max}个字符之间`,
    },
    number: {
      len: `${nameVarRightSpace}必须等于\${len}`,
      min: `${nameVarRightSpace}最小值为\${min}`,
      max: `${nameVarRightSpace}最大值为\${max}`,
      range: `${nameVarRightSpace}必须在\${min}-\${max}之间`,
    },
    array: {
      len: `${nameVarRightSpace}必须为\${len}项`,
      min: `${nameVarRightSpace}最少\${min}项`,
      max: `${nameVarRightSpace}最多\${max}项`,
      range: `${nameVarRightSpace}必须在\${min}-\${max}项之间`,
    },
    pattern: {
      mismatch: `${nameVarRightSpace}与模式不匹配 \${pattern}`,
    },
  };
}

export { createMessagesTemplate };

export default createMessagesTemplate({ hasName: true });
