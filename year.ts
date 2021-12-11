const year = '2022'
const start = new Date(`${year}/01/01`)
let res = ''

const zpad = (n: number) => n.toString().length === 1 ? `0${n}` : n

const main = (d: Date) => {
  const next = new Date(d.getTime() + 86400000)
  const pm = d.getMonth()
  const cm = next.getMonth()
  if (pm !== cm) res += `\n[*** [${year}${zpad(cm + 1)}]]\n`
  const cd = next.getDate()
  res += `#${year}${zpad(cm + 1)}${zpad(cd)}\n`
  const py = d.getFullYear()
  const cy = next.getFullYear()
  if (py === cy) {
    main(next)
  } else {
    const tmp = res.split('\n')
    console.log(tmp.slice(-3).join('\n') + tmp.slice(0, -3).join('\n'))
  }
}

main(start)
