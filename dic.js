const { writeFileSync } = require('fs')
const {resolve} = require('path')
const master = require(resolve(process.cwd(), './data/pub.json'))

let dic = {}
master.forEach(article => {
  dic[article.title] = article.id
})

writeFileSync('./data/dic.json', JSON.stringify(dic))
