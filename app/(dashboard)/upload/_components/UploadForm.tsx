"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

const MAX_SIZE = 2 * 1024 * 1024; // 2MB

const UploadForm = () => {
  const { user } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const uploadBtnClick = async () => {
    if (!user) return alert("Please sign in to upload files");
    if (!file) return alert("Please select a file first");
    if (file.size > MAX_SIZE)
      return alert("File size must be less than 2MB");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      alert("File uploaded successfully!");
      setFile(null);
    } catch (err: any) {
      alert(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full gap-6">
      {/* Dropzone */}
      <div className="flex items-center justify-center w-[75%] h-[75%]">
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
              PNG, JPG, PDF (Max 2MB)
            </p>
          </div>

          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>
      </div>

      {/* File Preview */}
      {file && (
        <div className="flex items-center gap-4 w-[75%] p-4
        border rounded-lg bg-white shadow">
          <Image
            src="/files.png"   // place file.png inside /public folder
            alt="file icon"
            width={50}
            height={50}
          />
          <p className="font-medium truncate">{file.name}</p>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={uploadBtnClick}
        disabled={loading}
        className="px-8 py-3 bg-yellow-00 text-white rounded-lg
        hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload File"}
      </button>
    </div>
  );
};

export default UploadForm;
