
"use client";

import { File, Shield, Upload, Newspaper } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";

function SideNav() {
  const { user, isLoaded, isSignedIn } = useUser();
  const pathname = usePathname();

  if (!isLoaded || !isSignedIn) return null;

  const menuList = [
    { id: 1, name: "Upload", icon: Upload, path: "/upload" },
    { id: 2, name: "Files", icon: File, path: "/files" },
    { id: 3, name: "Upgrade", icon: Shield, path: "/upgrade" },
    { id: 4, name: "Newsletter", icon: Newspaper, path: "/newsletter" },
  ];

  return (
    <div className="h-screen w-[25%] flex flex-col border-r shadow-lg bg-white fixed left-0 top-0">

      {/* LOGO */}
      <div className="p-5 border-b">
        <Image
          src="/logo-frnt.svg"
          alt="Logo"
          width={150}
          height={50}
          style={{ width: "150px", height: "auto" }}
        />
      </div>

      {/* MENU */}
      <div className="flex flex-col mt-6 gap-2 px-6">
        {menuList.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.id}
              href={item.path}
              className={`flex items-center gap-4 p-4 text-lg font-medium w-full rounded-md transition-all
                ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-red-100 text-rose-500"
                }`}
            >
              <Icon size={30} />
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* PROFILE */}
      <div className="mt-auto p-5 border-t">
        <h3 className="text-lg font-semibold">
          {user.fullName}
        </h3>
        <p className="text-sm text-rose-600 break-all">
          {user.primaryEmailAddress?.emailAddress}
        </p>
      </div>
    </div>
  );
}

export default SideNav;
