const start = new Date('2020/01/01')
let res = ''

const zpad = n => n.toString().length === 1 ? `0${n}` : n

const main = d => {
  const next = new Date(d.getTime() + 86400000)
  const cm = next.getMonth()
  const cd = next.getDate()
  res += `#${zpad(cm + 1)}${zpad(cd)}\n`
  const py = d.getYear()
  const cy = next.getYear()
  if (py === cy) {
    main(next)
  } else {
    res = res.split('\n')
    console.log(res.slice(-2).join('\n') + res.slice(0, -2).join('\n'))
  }
}

main(start)
