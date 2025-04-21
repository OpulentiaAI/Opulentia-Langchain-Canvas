import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const mockSupabaseClient = {
  auth: {
    getUser: async () => ({
      data: {
        user: {
          id: "mock-user-id",
          app_metadata: {},
          user_metadata: {},
          aud: "authenticated",
          created_at: new Date().toISOString(),
        },
      },
      error: null,
    }),
    getSession: async () => ({
      data: {
        session: {
          access_token: "mock-access-token",
          refresh_token: "mock-refresh-token",
          expires_at: Date.now() + 3600000,
          user: {
            id: "mock-user-id",
            app_metadata: {},
            user_metadata: {},
            aud: "authenticated",
            created_at: new Date().toISOString(),
          },
        },
      },
      error: null,
    }),
  },
};

export function createClient() {
  console.log("Auth route disabled: Using mock Supabase server client");
  return mockSupabaseClient;
}
