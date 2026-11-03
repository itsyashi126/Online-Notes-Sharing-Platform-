
"use client";

import React from "react";
import Link from "next/link";

import { AlignJustify, Upload, Info } from "lucide-react";

function TopHeader() {
  return (
    <div className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      {/* Mobile Menu */}
      <AlignJustify className="md:hidden cursor-pointer" />

      <div className="flex items-center gap-3 ml-auto">

        {/* About Us Button */}
        <Link
          href="/about"
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition"
        >
          <Info size={20} />
          About Us
        </Link>

        {/* Upload Button */}
        <Link
          href="/upload"
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          <Upload size={20} />
          Upload
        </Link>

      </div>
    </div>
  );
}

export default TopHeader;
