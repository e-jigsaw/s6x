import type { Scrapbox } from "scrapbox";
import { Events } from "./events.ts";
import format from "date-fns/format";
import { insertText } from "scrapbox-std";

declare const scrapbox: Scrapbox;

const currentProject = scrapbox.Project.name;
scrapbox.on("project:changed", () => {
  if (scrapbox.Project.name !== currentProject) cleanup();
  else setup();
});

const CommandName = "today";

function setup() {
  scrapbox.on(Events.Command.Wait, () => {
    scrapbox.emit(Events.Command.Register, CommandName);
  });
  scrapbox.on(Events.Command.Run, (name) => {
    if (name === CommandName) {
      insertText(`#${format(new Date(), "yyyyMMdd")}`);
    }
  });
}
function run() {
}
function cleanup() {
}
setup();
