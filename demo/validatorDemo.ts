import validator from "../dist/validator";

const source = {
  name: '12',
  age: 18,
  desc: 'safsaf',
}

const rules = {
  name: [
    {
      required: true,
      len: 5,
      label: '姓名',
    }
  ],
  age: {
    required: true,
  },
  desc: {
    required: true,
    min: 6,
  },
}

validator(source, rules)
  .then(() => {
    console.log('验证通过')
  })
  .catch(({ errors, fields }) => {
    console.log('错误', errors);
  })
