let pages: any[] = [];
let skip = 0;
let count = 0;

const main = async () => {
  while (1) {
    const res = await fetch(
      `https://scrapbox.io/api/pages/jigsaw?skip=${skip}&limit=${100}`,
    );
    const json = await res.json();
    count = json.count;
    pages = pages.concat(json.pages);
    console.log(skip, pages.length);
    skip += 100;
    if (skip > count) {
      break;
    }
  }
  await Deno.writeTextFile("./data/pub.json", JSON.stringify(pages));
};

main();
