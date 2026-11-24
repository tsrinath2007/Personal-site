import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const TOKEN_VALUE = "ses_authenticated_session_93817";
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

function isAuthorized(req: NextRequest): boolean {
  const token = req.cookies.get("ses_admin_token")?.value;
  return token === TOKEN_VALUE;
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename and create unique timestamp
    const ext = path.extname(file.name) || ".jpg";
    const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueFileName = `${Date.now()}_${baseName}${ext}`;

    let uploadedUrl = "";

    // 1. Try uploading to Supabase Storage if bucket exists
    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("portfolio")
        .upload(`uploads/${uniqueFileName}`, buffer, {
          contentType: file.type || "image/jpeg",
          upsert: true
        });

      if (!uploadError && uploadData) {
        const { data: publicUrlData } = supabase.storage
          .from("portfolio")
          .getPublicUrl(`uploads/${uniqueFileName}`);
        if (publicUrlData?.publicUrl) {
          uploadedUrl = publicUrlData.publicUrl;
        }
      }
    } catch {
      // Supabase storage bucket not created or permission error - fallback to local uploads
    }

    // 2. Fallback: Save to local public/uploads directory (or base64 Data URL if serverless read-only)
    if (!uploadedUrl) {
      try {
        if (!fs.existsSync(UPLOADS_DIR)) {
          fs.mkdirSync(UPLOADS_DIR, { recursive: true });
        }
        const localFilePath = path.join(UPLOADS_DIR, uniqueFileName);
        fs.writeFileSync(localFilePath, buffer);
        uploadedUrl = `/uploads/${uniqueFileName}`;
      } catch {
        // Read-only filesystem on Vercel: encode as base64 Data URL so upload succeeds 100% without error!
        const mime = file.type || "image/jpeg";
        uploadedUrl = `data:${mime};base64,${buffer.toString("base64")}`;
      }
    }

    return NextResponse.json({
      success: true,
      url: uploadedUrl,
      filename: uniqueFileName,
      size: file.size
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to upload file";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
