
"use client";

import { useState } from "react";

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const allowedExtensions = [
    "pdf", "doc", "docx", "ppt", "pptx",
    "jpg", "jpeg", "png", "webp",
  ];

  const validateFile = (selectedFile: File) => {
    const extension = selectedFile.name.split(".").pop()?.toLowerCase();

    if (!extension || !allowedExtensions.includes(extension)) {
      setMessage("Please select PDF, DOC, DOCX, PPT, PPTX, JPG, PNG or WEBP.");
      return false;
    }

    if (selectedFile.size > MAX_SIZE) {
      setMessage("File size must not exceed 10MB.");
      return false;
    }

    setMessage("");
    setFile(selectedFile);
    return true;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile) validateFile(droppedFile);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) validateFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!title.trim()) {
      setMessage("Please enter a title.");
      return;
    }

    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed.");
      }

      setMessage("File uploaded successfully!");
      setFile(null);
      setTitle("");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">

      <h1 className="text-2xl font-bold mb-2 text-gray-900">
        Upload Your Notes
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        Share your study materials with other students.
      </p>

      {/* Title */}
      <label className="block text-sm font-medium mb-2">
        Notes Title
      </label>

      <input
        type="text"
        placeholder="e.g. JavaScript Complete Notes"
        value={title}
        maxLength={150}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-5 outline-none focus:border-blue-500"
      />

      {/* Drag and Drop */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="h-48 border-2 border-dashed border-blue-300 rounded-xl flex flex-col items-center justify-center mb-5 bg-blue-50 hover:bg-blue-100 transition"
      >
        <span className="text-4xl mb-3">📁</span>

        <p className="font-medium text-gray-800">
          {file ? file.name : "Drag and drop your file here"}
        </p>

        <p className="text-sm text-gray-500 my-2">
          or select a file from your device
        </p>

        <input
          type="file"
          accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.webp"
          onChange={handleFileSelect}
          className="text-sm max-w-full"
        />

        <p className="text-xs text-gray-500 mt-3">
          Maximum file size: 10MB
        </p>
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg w-full font-semibold disabled:opacity-50 transition"
      >
        {loading ? "Uploading..." : "Upload Notes"}
      </button>

      {/* Message */}
      {message && (
        <p className="mt-4 text-center text-sm font-medium">
          {message}
        </p>
      )}
    </div>
  );
}
