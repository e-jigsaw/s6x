import type { Line, Scrapbox } from "scrapbox";

declare const scrapbox: Scrapbox;

const currentProject = scrapbox.Project.name;
scrapbox.on("project:changed", () => {
  if (scrapbox.Project.name !== currentProject) cleanup();
  else setup();
});

const ID = "__S6X__BLOCK_EXPAND_STALKER";

const hover = async (event: any) => {
  if (event.target?.classList.contains("char-index")) {
    if (event.target.parentElement.classList.contains("page-link")) {
      if (event.target.parentElement.getAttribute("href").includes("#")) {
        const [page, id] = event.target.parentElement.getAttribute("href")
          .split("#");
        const res = await fetch(`/api/pages${page}`);
        const json = await res.json();
        const line = json.lines.filter((l: Line) => l.id === id)[0];
        const el = document.getElementById(ID);
        if (el) {
          el.innerText = line.text;
          el.style.display = "block";
          el.style.left = `${event.clientX}px`;
          el.style.top = `${event.clientY + 50}px`;
        }
      }
    }
  } else {
    const el = document.getElementById(ID);
    if (el) {
      el.style.display = "none";
    }
  }
};

function setup() {
  const stalker = document.createElement("div");
  stalker.id = ID;
  stalker.style.display = "none";
  stalker.style.position = "fixed";
  stalker.style.color = "#f00";
  stalker.style.backgroundColor = "#333";
  document.body.appendChild(stalker);
  document.querySelector("#editor")?.addEventListener("mouseover", hover, {
    capture: true,
  });
}
function run() {
}
function cleanup() {
  document.querySelector("#editor")?.removeEventListener("mouseover", hover);
  const el = document.getElementById(ID);
  if (el) {
    el.remove();
  }
}
setup();
