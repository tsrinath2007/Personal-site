import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const TOKEN_VALUE = "ses_authenticated_session_93817";
const PHOTOS_FILE = path.join(process.cwd(), "content", "photos.json");

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
    // 1. Try Supabase first
    try {
      const { data: supaPhotos, error: supaError } = await supabase
        .from("photos")
        .select("*")
        .order("id", { ascending: true });

      if (!supaError && supaPhotos && supaPhotos.length > 0) {
        return NextResponse.json({ photos: supaPhotos }, { headers: NO_CACHE_HEADERS });
      }
    } catch {
      // Supabase table not created yet - fall through to local
    }

    // 2. Local fallback
    if (!fs.existsSync(PHOTOS_FILE)) {
      return NextResponse.json({ photos: [] }, { headers: NO_CACHE_HEADERS });
    }
    const photos = JSON.parse(fs.readFileSync(PHOTOS_FILE, "utf-8"));
    return NextResponse.json({ photos }, { headers: NO_CACHE_HEADERS });
  } catch {
    return NextResponse.json({ error: "Failed to read photos" }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: NO_CACHE_HEADERS });
  }

  try {
    const body = await req.json();

    // 1. Save to local photos.json
    fs.writeFileSync(PHOTOS_FILE, JSON.stringify(body, null, 2), "utf-8");

    // 2. Also sync to Supabase photos table if exists
    try {
      if (Array.isArray(body)) {
        for (const item of body) {
          await supabase.from("photos").upsert({
            id: String(item.id),
            src: item.src || null,
            alt: item.alt || "",
            caption: item.caption || "",
            description: item.description || null,
            location: item.location || null,
            tilt: item.tilt || "0deg"
          });
        }
      }
    } catch {
      // Supabase sync failure is non-fatal
    }

    return NextResponse.json({ success: true, photos: body }, { headers: NO_CACHE_HEADERS });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to update photos";
    return NextResponse.json({ error: errorMsg }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: NO_CACHE_HEADERS });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Photo id is required" }, { status: 400, headers: NO_CACHE_HEADERS });
    }

    // 1. Delete from local photos.json
    let updated = [];
    if (fs.existsSync(PHOTOS_FILE)) {
      const currentPhotos = JSON.parse(fs.readFileSync(PHOTOS_FILE, "utf-8"));
      updated = currentPhotos.filter((p: { id: string }) => p.id !== id);
      fs.writeFileSync(PHOTOS_FILE, JSON.stringify(updated, null, 2), "utf-8");
    }

    // 2. Also delete from Supabase photos table
    try {
      await supabase.from("photos").delete().eq("id", id);
    } catch {
      // Supabase delete failure is non-fatal
    }

    return NextResponse.json({ success: true, photos: updated }, { headers: NO_CACHE_HEADERS });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to delete photo";
    return NextResponse.json({ error: errorMsg }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}
