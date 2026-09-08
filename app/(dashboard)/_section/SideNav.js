"use client";

import { File, Shield, Upload, Newspaper } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";

function SideNav() {
  // ✅ ALL HOOKS AT TOP
  const { user, isLoaded, isSignedIn } = useUser();
  const [activeIndex, setActiveIndex] = useState(0);

  // ✅ Conditional rendering AFTER hooks
  if (!isLoaded) return null;
  if (!isSignedIn) return null;

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
          width={300}
          height={200}
          alt="Logo"
          className="mx-auto"
        />
      </div>

      {/* MENU */}
      <div className="flex flex-col mt-6 gap-2 px-6">
        {menuList.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveIndex(index)}
              className={`flex items-center gap-4 p-4 text-lg font-medium w-full rounded-md transition-all 
                ${activeIndex === index
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-red-300 text-rose-500"
                }`}
            >
              <Icon size={30} />
              {item.name}
            </button>
          );
        })}
      </div>

      {/* PROFILE */}
      {/* <div className="mt-auto p-5 border-t flex items-center gap-4 bg-gray-50">
        <Image
          src={user.imageUrl}
          alt="Profile Photo"
          width={50}
          height={50}
          className="rounded-full"
        /> */}

      <div>
        <h3 className="text-[25px] font-semibold">{user.fullName}</h3>
        <p className="text-rose-600 text-[20px]">
          {user.primaryEmailAddress?.emailAddress}
        </p>
      </div>
    </div>

    
  );
}

export default SideNav;
