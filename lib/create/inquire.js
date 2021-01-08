const prompts = require('prompts')

const questions = [
  {
    type: 'select',
    name: 'script',
    message: '您怎样写脚本？',
    choices: [
      { title: 'JavaScript', value: 'js' },
      { title: 'TypeScript', value: 'ts' }
    ]
  },
  {
    type: 'select',
    name: 'style',
    message: '您怎样写样式？',
    choices: [
      { title: 'wxss', value: 'wxss' },
      { title: 'less', value: 'less' },
      { title: 'scss', value: 'scss' }
    ]
  }
]

async function inquire () {
  const answer = await prompts(questions)
  return answer
}

module.exports = inquire
