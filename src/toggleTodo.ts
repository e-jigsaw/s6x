import type { Scrapbox } from "scrapbox";
import { caret, getLine, replaceLines } from "scrapbox-std";

declare const scrapbox: Scrapbox;

const currentProject = scrapbox.Project.name;
scrapbox.on("project:changed", () => {
  if (scrapbox.Project.name !== currentProject) cleanup();
  else setup();
});

const handle = (event: KeyboardEvent) => {
  if (event.metaKey && event.key === "Enter") {
    const targetLine = caret().position.line;
    const line = getLine(targetLine);
    if (line) {
      if (/\[todo\]/.test(line.text)) {
        replaceLines(
          targetLine,
          targetLine,
          line.text.replace(/\[todo\]/, "[done]"),
        );
      } else if (/\[done\]/.test(line.text)) {
        replaceLines(
          targetLine,
          targetLine,
          line.text.replace(/\[done\]\s/, ""),
        );
      } else {
        replaceLines(
          targetLine,
          targetLine,
          `${line.text.match(/^\s*/)}[todo] ${line.text.replace(/^\s*/, "")}`,
        );
      }
    }
  }
};

function setup() {
  document.addEventListener("keydown", handle);
}

function run() {}

function cleanup() {
  document.removeEventListener("keydown", handle);
}

setup();
