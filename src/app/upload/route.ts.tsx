import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File | null;
    const folder = (data.get("folder") as string | null) || "misc";

    if (!file) {
      return NextResponse.json({ error: "لم يتم اختيار ملف" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
    await fs.mkdir(uploadDir, { recursive: true });

    const safeName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const filePath = path.join(uploadDir, safeName);

    await fs.writeFile(filePath, buffer);

    const url = `/uploads/${folder}/${safeName}`;

    return NextResponse.json({
      success: true,
      fileName: safeName,
      url,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "فشل رفع الملف" },
      { status: 500 }
    );
  }
}