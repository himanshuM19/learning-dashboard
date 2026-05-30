import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Course } from "@/types";

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error("Supabase environment variables are not configured.");
    }
    _client = createClient(url, key);
  }
  return _client;
}

export async function getCourses(): Promise<Course[]> {
  const { data, error } = await getClient()
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch courses: ${error.message}`);
  }

  return data ?? [];
}
