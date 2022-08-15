import { zpad } from "./zpad.ts";

const start = new Date("2020/01/01");
let res = "";

const main = (d: Date) => {
  const next = new Date(d.getTime() + 86400000);
  const cm = next.getMonth();
  const cd = next.getDate();
  res += `#${zpad(cm + 1)}${zpad(cd)}\n`;
  const py = d.getFullYear();
  const cy = next.getFullYear();
  if (py === cy) {
    main(next);
  } else {
    const tmp = res.split("\n");
    console.log(tmp.slice(-2).join("\n") + tmp.slice(0, -2).join("\n"));
  }
};

main(start);

export {};
