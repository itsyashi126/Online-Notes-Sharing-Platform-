"use client"
import React from 'react'

import SideNav from '../_section/SideNav';
import TopHeader from "../_section/TopHeader"; 
import UploadForm from "../upload/_components/UploadForm";
 import { UserButton } from "@clerk/nextjs";



export default function files() {
  return (
     <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Upload Files
      </h1>
        
      <UserButton afterSignOutUrl="/" />
      <SideNav />
      <TopHeader />
       <UploadForm />
    </div>
  )
}
