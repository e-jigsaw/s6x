import "dotenv";
import { createClient } from "supabase";
import { Database } from "../lib/database.types.ts";

const supabase = createClient<Database>(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SECRET")!,
);

type RawPage = {
  id: string;
  title: string;
  created: number;
  updated: number;
};
const res = await fetch(
  "https://raw.githubusercontent.com/e-jigsaw/s6x-data/main/data/pub.json",
);
const json = await res.json() as RawPage[];

const { data, error } = await supabase.from("pages").upsert(
  json.map(({ id, title, created, updated }) => ({
    id,
    title,
    created: new Date(created * 1000),
    updated: new Date(updated * 1000),
  })),
);

console.log(data, error);
