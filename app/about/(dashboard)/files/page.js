
"use client";

import React, { useEffect, useState } from "react";
import SideNav from "../_section/SideNav";
import { UserButton } from "@clerk/nextjs";

export default function Files() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("/api/files");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch files");
        }

        setFiles(data.files || []);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <SideNav />

      <div className="ml-[25%] p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Shared Files
            </h1>
            <p className="text-gray-500 mt-2">
              Notes and study materials shared by everyone.
            </p>
          </div>

          <UserButton />
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Total uploaded files: <strong>{files.length}</strong>
          </p>
        </div>

        {loading ? (
          <p className="text-center py-10">Loading files...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-10">{error}</p>
        ) : files.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border">
            <div className="text-5xl mb-4">📚</div>
            <h2 className="text-xl font-semibold">
              No files uploaded yet
            </h2>
            <p className="text-gray-500 mt-2">
              Be the first to share your study materials!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {files.map((file) => (
              <div
                key={file._id}
                className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg text-2xl">
                    📄
                  </div>

                  <div className="min-w-0">
                    <h2 className="font-semibold text-gray-800 truncate">
                      {file.title}
                    </h2>
                    <p className="text-xs text-gray-500">
                      Shared by a community member
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-4">
                  Uploaded:{" "}
                  {file.createdAt
                    ? new Date(file.createdAt).toLocaleDateString("en-IN")
                    : "Recently"}
                </p>

                <a
                  href={file.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700"
                >
                  View / Download
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
