import type { Scrapbox } from "scrapbox";
import { takeCursor } from "scrapbox-std";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { tw } from "twind";
import { useKey, useToggle } from "react-use";
import { Events } from "./events.ts";

declare const scrapbox: Scrapbox;

const App: React.FC = () => {
  const [isOpen, toggle] = useToggle(false);
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  useKey(
    "Escape",
    () => {
      if (isOpen) {
        toggle(false);
        takeCursor().focus();
        setSelect(-1);
        setValue("");
      }
    },
    undefined,
    [isOpen]
  );
  useKey(
    (event) => event.key === "p" && event.metaKey,
    (event) => {
      event.preventDefault();
      toggle(true);
      setTimeout(() => {
        if (ref.current) {
          ref.current.focus();
        }
      }, 1);
    }
  );
  const commands = useRef<Set<string>>(new Set());
  useEffect(() => {
    scrapbox.on(Events.Command.Register, (name) => {
      commands.current.add(name);
    });
    scrapbox.emit(Events.Command.Wait);
  }, []);
  const candidates = useMemo(() => {
    return [...commands.current.values()].filter(
      (command) => command.indexOf(value) > -1
    );
  }, [isOpen, value]);
  const [select, setSelect] = useState(-1);
  return (
    <div
      className={tw`fixed top-4 z-[999999] w-full ${!isOpen ? "hidden" : ""}`}
    >
      <div className={tw`w-[40rem] mx-auto text-[30px]`}>
        <input
          className={tw`p-2 w-full`}
          ref={ref}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              setSelect((st) => st + 1);
            }
            if (event.key === "ArrowUp") {
              setSelect((st) => st - 1);
            }
            if (event.key === "Enter") {
              event.preventDefault();
              toggle(false);
              takeCursor().focus();
              scrapbox.emit(Events.Command.Run, candidates[select]);
              setSelect(-1);
              setValue("");
            }
          }}
        ></input>
        <div className={tw`w-full bg-white text-[24px]`}>
          {candidates.map((command, index) => (
            <div
              key={command}
              className={tw`border-t-1 ${
                select === index ? "bg-yellow-200" : ""
              }`}
            >
              {command}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ID = "__S6X_SLASH_ROOT";

const currentProject = scrapbox.Project.name;
scrapbox.on("project:changed", () => {
  if (scrapbox.Project.name !== currentProject) cleanup();
  else setup();
});

function setup() {
  const root = document.createElement("div");
  root.id = ID;
  document.body.appendChild(root);
  const dom = document.getElementById(ID);
  if (dom) {
    const root = createRoot(dom);
    root.render(<App></App>);
  }
}

function run() {}

function cleanup() {}

setup();
