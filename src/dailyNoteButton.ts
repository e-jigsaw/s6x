import type { Scrapbox } from "scrapbox";
import format from "date-fns/format";

declare const scrapbox: Scrapbox;

const currentProject = scrapbox.Project.name;
scrapbox.on("project:changed", () => {
  if (scrapbox.Project.name !== currentProject) cleanup();
  else setup();
});

function setup() {
  const button = document.createElement("button");
  button.id = "__S6X__DAILYNOTE";
  button.innerText = "Daily Note";
  button.style.marginTop = "8px";
  button.style.marginLeft = "8px";
  button.onclick = () => {
    location.href = `/jgs/${format(new Date(), "yyyyMMdd")}`;
  };
  document.querySelector(".global-menu-button")?.appendChild(button);
}
function run() {
}
function cleanup() {
  const el = document.getElementById("__S6X__DAILYNOTE");
  if (el) {
    el.remove();
  }
}
setup();
