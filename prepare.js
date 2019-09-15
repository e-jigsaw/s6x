const { writeFileSync } = require('fs')
const fetch = require('isomorphic-unfetch')

let pages = []
let skip = 0
let count = 0

const main = async () => {
  while (1) {
    const res = await fetch(
      `https://scrapbox.io/api/pages/jigsaw?skip=${skip}&limit=${100}`
    )
    const json = await res.json()
    count = json.count
    pages = pages.concat(json.pages)
    console.log(skip, pages.length)
    skip += 100
    if (skip > count) {
      break
    }
  }
  writeFileSync('./data/pub.json', JSON.stringify(pages))
}

main()
