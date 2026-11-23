import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const VALID_USER = "myselfses";
const VALID_PASS = "Ses@2007";
const TOKEN_VALUE = "ses_authenticated_session_93817";

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0"
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (username === VALID_USER && password === VALID_PASS) {
      const response = NextResponse.json(
        { success: true, message: "Authenticated successfully" },
        { headers: NO_CACHE_HEADERS }
      );
      response.cookies.set("ses_admin_token", TOKEN_VALUE, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30 // 30 days
      });
      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid username or password" },
      { status: 401, headers: NO_CACHE_HEADERS }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Request error" },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("ses_admin_token")?.value;
  if (token === TOKEN_VALUE) {
    return NextResponse.json(
      { authenticated: true, user: VALID_USER },
      { headers: NO_CACHE_HEADERS }
    );
  }
  return NextResponse.json(
    { authenticated: false },
    { status: 401, headers: NO_CACHE_HEADERS }
  );
}

export async function DELETE() {
  const response = NextResponse.json(
    { success: true, message: "Logged out" },
    { headers: NO_CACHE_HEADERS }
  );
  response.cookies.delete("ses_admin_token");
  return response;
}
