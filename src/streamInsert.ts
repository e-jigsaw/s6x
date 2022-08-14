import type { Scrapbox } from "scrapbox";
import { insertText, press, takeCursor } from "scrapbox-std";

declare const scrapbox: Scrapbox;

const currentProject = scrapbox.Project.name;
scrapbox.on("project:changed", () => {
  if (scrapbox.Project.name !== currentProject) cleanup();
  else setup();
});

const sleep = (n: number) => new Promise((resolve) => setTimeout(resolve, n));

function setup() {
  scrapbox.PageMenu.addMenu({
    title: "Stream Insert",
    image: "https://i.gyazo.com/4eebda6dc1639bb3ba168eed7416afd8.png",
    onClick: () => {
      const root = document.createElement("div");
      root.style.zIndex = "9999999";
      root.style.position = "fixed";
      root.style.top = "0";
      root.style.left = "0";
      const textarea = document.createElement("textarea");
      textarea.rows = 3;
      root.appendChild(textarea);
      const button = document.createElement("button");
      button.innerText = "insert";
      button.onclick = async () => {
        takeCursor().focus();
        for (let i = 0; i < textarea.value.length; i += 10000) {
          const text = textarea.value.slice(i, i + 10000);
          const splited = text.split("\n");
          for (let j = 0; j < splited.length; j++) {
            insertText(splited[j]);
            if (j !== splited.length - 1) {
              press("Enter");
            }
          }
          await sleep(1000);
          console.log(`${i}/${textarea.value.length}`);
        }
        alert("finished!");
      };
      root.appendChild(button);
      document.body.appendChild(root);
    },
  });
}
function run() {
}
function cleanup() {
}
setup();
