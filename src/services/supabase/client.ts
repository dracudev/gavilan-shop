import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      realtime: {
        // Completely disable realtime - not used in this app
        params: {
          eventsPerSecond: 0,
        },
      },
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      global: {
        headers: {
          "X-Client-Info": "gavilan-shop@1.0.0",
        },
      },
    }
  );
}
