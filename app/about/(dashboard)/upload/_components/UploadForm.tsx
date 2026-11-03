
"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

const UploadForm = () => {
  const { user } = useUser();

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadBtnClick = async () => {
    if (!user) return alert("Please sign in to upload files");
    if (!title.trim()) return alert("Please enter a title");
    if (!file) return alert("Please select a file first");

    if (file.size > MAX_SIZE) {
      return alert("File size must be less than 10MB");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title.trim());

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      alert("File uploaded successfully!");

      setFile(null);
      setTitle("");

      // Refresh server-rendered data if the page uses it.
      window.location.reload();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full gap-6">

      {/* Title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter notes title"
        maxLength={150}
        className="w-[75%] border rounded-lg p-3 outline-none focus:border-blue-500"
      />

      {/* Dropzone */}
      <div className="flex items-center justify-center w-[75%]">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64
          border-2 border-dashed border-blue-400 rounded-xl
          bg-blue-100 cursor-pointer hover:bg-blue-200 transition"
        >
          <div className="flex flex-col items-center justify-center pt-6 pb-8">
            <svg
              className="w-10 h-10 mb-4 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 19V9m0 0-3 3m3-3 3 3M5 17a4 4 0 0 1 0-8"
              />
            </svg>

            <p className="text-lg font-semibold">
              Click to upload or drag & drop
            </p>

            <p className="text-sm text-rose-500 mt-1">
              PDF, DOC, DOCX, PPT, PPTX, PNG, JPG, WEBP (Max 10MB)
            </p>
          </div>

          <input
            id="dropzone-file"
            type="file"
            accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg,.webp"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>
      </div>

      {/* File Preview */}
      {file && (
        <div className="flex items-center gap-4 w-[75%] p-4 border rounded-lg bg-white shadow">
          <Image
            src="/files.png"
            alt="File icon"
            width={50}
            height={50}
          />
          <p className="font-medium truncate">{file.name}</p>
        </div>
      )}

      {/* Upload Button */}
  <button
  type="button"
  onClick={uploadBtnClick}
  disabled={loading}
  className="px-8 py-3 bg-blue-600 text-white rounded-lg disabled:opacity-50"
>
  {loading ? "Uploading..." : "Upload File"}
</button>    
    </div>
  );
};

export default UploadForm;
