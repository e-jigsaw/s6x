const text = await Deno.readTextFile("./data/pub.json");
const master = JSON.parse(text);

let dic: any = {};
master.forEach((article: any) => {
  dic[article.title] = article.id;
});

await Deno.writeTextFile("./data/dic.json", JSON.stringify(dic));
