import "dotenv";
import { createClient } from "supabase";
import { Database } from "../lib/database.types.ts";
import pub from "./data/pub.json" assert { type: "json" };

const supabase = createClient<Database>(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SECRET")!,
);

type RawPage = {
  id: string;
  title: string;
  created: number;
  updated: number;
  image: string | null;
};

const { data, error } = await supabase.from("pages").upsert(
  (pub as RawPage[]).map(({ id, title, created, updated, image }) => ({
    id,
    title,
    created: new Date(created * 1000),
    updated: new Date(updated * 1000),
    image,
  })),
);

console.log(data, error);
