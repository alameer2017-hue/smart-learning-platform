"use client";

import { useEffect, useState } from "react";
import type { MediaAsset } from "@/types";
import { supabase } from "@/lib/supabase";

interface Props {
  asset: MediaAsset;
  onComplete?: () => void;
  onSimData?: (data: Record<string, string>) => void;
  isTeacher?: boolean;
}

export default function MediaViewer({
  asset,
  onComplete,
  isTeacher = true,
}: Props) {
  const [currentUrl, setCurrentUrl] = useState(asset.fileUrl || "");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const folder = asset.kind === "VIDEO" ? "videos" : "images";

  useEffect(() => {
    const loadSavedMedia = async () => {
      const { data, error } = await supabase
        .from("media_assets")
        .select("public_url")
        .eq("media_id", asset.id)
        .maybeSingle();

      if (!error && data?.public_url) {
        setCurrentUrl(data.public_url);
      }
    };

    loadSavedMedia();
  }, [asset.id]);

  const handleUpload = async () => {
    if (!file) {
      alert("اختر ملفًا أولًا");
      return;
    }

    const filePath = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

    setUploading(true);

    const { error } = await supabase.storage
      .from("lesson-media")
      .upload(filePath, file, { upsert: true });

    if (error) {
      setUploading(false);
      alert(`فشل رفع الملف: ${error.message}`);
      console.error("Supabase upload error:", error);
      return;
    }

    const { data } = supabase.storage
      .from("lesson-media")
      .getPublicUrl(filePath);

    setCurrentUrl(data.publicUrl);

    const { error: dbError } = await supabase
      .from("media_assets")
      .upsert(
        {
          media_id: asset.id,
          lesson_id: "L1-1",
          kind: asset.kind,
          file_path: filePath,
          public_url: data.publicUrl,
        },
        { onConflict: "media_id" }
      );

    setUploading(false);

    if (dbError) {
      alert(`تم رفع الملف لكن فشل حفظ الرابط: ${dbError.message}`);
      console.error("Supabase DB error:", dbError);
      return;
    }

    alert("تم رفع الملف وحفظه بنجاح");
  };

  const handleDelete = async () => {
    const { data } = await supabase
      .from("media_assets")
      .select("file_path")
      .eq("media_id", asset.id)
      .maybeSingle();

    if (data?.file_path) {
      await supabase.storage.from("lesson-media").remove([data.file_path]);
    }

    await supabase.from("media_assets").delete().eq("media_id", asset.id);

    setCurrentUrl("");
    setFile(null);
    alert("تم حذف الوسيط");
  };

  const renderMedia = () => {
    if (asset.kind === "VIDEO") {
      if (currentUrl) {
        return (
          <video
            src={currentUrl}
            controls
            style={{
              width: "100%",
              maxWidth: 500,
              display: "block",
              margin: "0 auto 16px",
              borderRadius: 14,
              background: "#000",
            }}
            onEnded={onComplete}
          />
        );
      }

      return (
        <div
          style={{
            background: "#1a1a2e",
            color: "#fff",
            borderRadius: 14,
            aspectRatio: "16/9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: 500,
            margin: "0 auto 16px",
            fontFamily: "Tajawal, sans-serif",
          }}
        >
          ▶ لا يوجد فيديو مرفوع بعد
        </div>
      );
    }

    if (asset.kind === "IMAGE" || asset.kind === "GIF") {
      if (currentUrl) {
        return (
          <img
            src={currentUrl}
            alt={asset.title}
            style={{
              width: "100%",
              maxWidth: 500,
              display: "block",
              margin: "8px auto",
              borderRadius: 12,
            }}
          />
        );
      }

      return (
        <div
          style={{
            background: "#f0f0f0",
            borderRadius: 12,
            padding: 20,
            textAlign: "center",
            margin: "8px 0",
            fontFamily: "Tajawal, sans-serif",
          }}
        >
          🖼️ لا توجد صورة مرفوعة بعد
        </div>
      );
    }

    if (asset.kind === "SIMULATION") {
      return (
        <div
          style={{
            background: "#f0f7ff",
            borderRadius: 16,
            padding: 20,
            border: "2px solid #b8d8e8",
            marginTop: 16,
            textAlign: "center",
            fontFamily: "Tajawal, sans-serif",
          }}
        >
          ⚡ {asset.title}
        </div>
      );
    }

    return null;
  };

  return (
    <div style={{ marginBottom: 16 }}>
      {renderMedia()}

      {isTeacher && asset.kind !== "SIMULATION" && (
        <div
          dir="rtl"
          style={{
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: 12,
            padding: 12,
            maxWidth: 500,
            margin: "0 auto",
            fontFamily: "Tajawal, sans-serif",
          }}
        >
          <div style={{ fontWeight: "bold", marginBottom: 8 }}>
            إدارة الوسيط: {asset.title}
          </div>

          <input
            type="file"
            accept={asset.kind === "VIDEO" ? "video/*" : "image/*"}
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            style={{ marginBottom: 10, display: "block" }}
          />

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              onClick={handleUpload}
              disabled={uploading}
              style={{
                padding: "8px 14px",
                background: "#2980b9",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              {uploading ? "جارٍ الرفع..." : currentUrl ? "استبدال الملف" : "رفع الملف"}
            </button>

            <button
              onClick={handleDelete}
              style={{
                padding: "8px 14px",
                background: "#c0392b",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              حذف
            </button>
          </div>

          {currentUrl && (
            <div
              style={{
                marginTop: 10,
                fontSize: 12,
                color: "#555",
                wordBreak: "break-all",
              }}
            >
              الرابط الحالي: {currentUrl}
            </div>
          )}
        </div>
      )}
    </div>
  );
}