import { NextRequest, NextResponse } from "next/server";

const mockUser = {
  id: "mock-user-id",
  app_metadata: {},
  user_metadata: {},
  aud: "authenticated",
  created_at: new Date().toISOString(),
};

export async function updateSession(request: NextRequest) {
  console.log("Auth route disabled: Bypassing Supabase middleware authentication");
  
  const response = NextResponse.next({
    request,
  });

  return response;
}
