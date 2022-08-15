import type { Scrapbox } from "scrapbox";
import format from "date-fns/format";

declare const scrapbox: Scrapbox;

const currentProject = scrapbox.Project.name;
scrapbox.on("project:changed", () => {
  if (scrapbox.Project.name !== currentProject) cleanup();
  else setup();
});

function setup() {
  const a = document.createElement("a");
  a.href = `/jgs/${format(new Date(), "yyyyMMdd")}`;
  a.innerHTML = "<button>Daily Note</button>";
  a.style.marginTop = "8px";
  a.style.marginLeft = "8px";
  document.querySelector(".global-menu-button")?.appendChild(a);
}
function run() {
}
function cleanup() {
}
setup();
