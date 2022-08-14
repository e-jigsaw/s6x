import type { Scrapbox } from "scrapbox";
import { takeCursor } from "scrapbox-std";
import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { tw } from "twind";
import { useKey, useToggle } from "react-use";

declare const scrapbox: Scrapbox;

const App: React.FC = () => {
  const [isOpen, toggle] = useToggle(false);
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  useKey("Escape", () => {
    if (isOpen) {
      toggle(false);
      takeCursor().focus();
    }
  });
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
  return (
    <div
      className={tw`fixed top-0 z-[999999] w-full ${!isOpen ? "hidden" : ""}`}
    >
      <div className={tw`w-[40rem] mx-auto text-[30px]`}>
        <input
          className={tw`p-2`}
          ref={ref}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        ></input>
      </div>
    </div>
  );
};

const ID = "__SBS_SLASH_ROOT";

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
