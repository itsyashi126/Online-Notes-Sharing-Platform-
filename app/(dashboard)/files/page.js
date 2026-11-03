
"use client";

import React from "react";
import SideNav from "../_section/SideNav";
import TopHeader from "../_section/TopHeader";
import UploadForm from "../upload/_components/UploadForm";
import { UserButton } from "@clerk/nextjs";

export default function Files() {
  return (
    <div className="min-h-screen">
      <SideNav />

      <div className="p-10 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            Upload Files
          </h1>
          <UserButton />
        </div>

        <UploadForm />
      </div>
    </div>
  );
}
