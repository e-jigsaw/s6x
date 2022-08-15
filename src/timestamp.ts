import type { Scrapbox } from "scrapbox";

declare const scrapbox: Scrapbox;

scrapbox.TimeStamp.addFormat("#YYYYMMDD #MMDD");
scrapbox.TimeStamp.addFormat("#YYYYMMDD");
scrapbox.TimeStamp.addFormat("#MMDD");
