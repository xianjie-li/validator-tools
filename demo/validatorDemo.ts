import validator from '../dist/validator';
import Schema, { Rules } from 'async-validator';
import { ValidatorRules } from '../source/validator';

const source = {
  date: [2, 3],
  age: 18,
  desc: 'safsaf',
  like: 'safsaf',
};

const rules: ValidatorRules = {
  date: {
    required: true,
    type: 'array',
    min: 3,
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

validator(source, rules)
  .then(() => {
    console.log('验证通过');
  })
  .catch(({ errors, fields }) => {
    console.log('错误', errors, fields);
  });
