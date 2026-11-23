import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const TOKEN_VALUE = "ses_authenticated_session_93817";
const NOW_FILE = path.join(process.cwd(), "content", "now.json");

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0"
};

function isAuthorized(req: NextRequest): boolean {
  const token = req.cookies.get("ses_admin_token")?.value;
  return token === TOKEN_VALUE;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: NO_CACHE_HEADERS });
  }

  try {
    if (!fs.existsSync(NOW_FILE)) {
      return NextResponse.json({ error: "now.json not found" }, { status: 404, headers: NO_CACHE_HEADERS });
    }
    const data = JSON.parse(fs.readFileSync(NOW_FILE, "utf-8"));
    return NextResponse.json({ data }, { headers: NO_CACHE_HEADERS });
  } catch {
    return NextResponse.json({ error: "Failed to read now.json" }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: NO_CACHE_HEADERS });
  }

  try {
    const body = await req.json();
    fs.writeFileSync(NOW_FILE, JSON.stringify(body, null, 2), "utf-8");
    return NextResponse.json({ success: true, data: body }, { headers: NO_CACHE_HEADERS });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to update now.json";
    return NextResponse.json({ error: errorMsg }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}
