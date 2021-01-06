const year = '2019'
const start = new Date(`${year}/01/01`)
let res = ''

const zpad = n => n.toString().length === 1 ? `0${n}` : n

const main = d => {
  const next = new Date(d.getTime() + 86400000)
  const pm = d.getMonth()
  const cm = next.getMonth()
  if (pm !== cm) res += `\n[*** [${year}${zpad(cm + 1)}]]\n`
  const cd = next.getDate()
  res += `#${year}${zpad(cm + 1)}${zpad(cd)}\n`
  const py = d.getYear()
  const cy = next.getYear()
  if (py === cy) {
    main(next)
  } else {
    res = res.split('\n')
    console.log(res.slice(-3).join('\n') + res.slice(0, -3).join('\n'))
  }
}

main(start)
