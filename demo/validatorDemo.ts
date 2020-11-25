import validator, { ValidatorRules, messagesTemplate, createMessagesTemplate } from '../dist';
import Schema, { Rules } from 'async-validator';

const source = {
  name: '',
  age: 18,
  desc: 'safsaf',
  like: 'safsaf',
};

const rules: ValidatorRules = {
  name: {
    required: true,
    // min: 3,
    label: '姓名',
  },
  age: {
    required: true,
  },
  desc: {
    required: true,
    min: 6,
  },
};

console.log(222, createMessagesTemplate({ hasName: false }));

validator(source, rules, (err, errObj) => {
  // ...
});

validator.messages({
  required: meta => `${meta.label}该项必填`,
  string: {
    len: meta => `长度必须为${meta.args[1]}`,
  },
});

validator(source, rules, { hasName: false })
  .then(() => {
    console.log('验证通过');
  })
  .catch(({ errors, fields }) => {
    console.log('错误', errors, fields);
  });
