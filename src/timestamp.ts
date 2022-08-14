import type { EventEmitter } from "scrapbox-types/src/deps_2/deno.land/std@0.131.0/node/_events";
import type { Scrapbox } from "scrapbox-types/types/userscript";

declare const scrapbox: Scrapbox & EventEmitter;

scrapbox.TimeStamp.addFormat("#YYYYMMDD");
scrapbox.TimeStamp.addFormat("#MMDD");
