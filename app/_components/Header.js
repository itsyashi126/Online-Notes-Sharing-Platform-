
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo-frnt.svg"
              alt="Logo"
              width={150}
              height={50}
              style={{ width: "150px", height: "auto" }}
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-10 text-base font-lg text-[100%]">
            <Link href="/" className="text-blue-700 hover:text-rose-500">
              Home
            </Link>

            <Link href="/about" className="text-blue-700 hover:text-rose-500">
              About Us
            </Link>

            <Link href="/careers" className="text-blue-700 hover:text-rose-500">
              Careers
            </Link>

            <Link href="/contact" className="text-blue-700 hover:text-rose-500">
              Contact Us
            </Link>

            {/* UPLOAD BUTTON */}
            <Link
              href="/upload"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Upload
            </Link>
          </nav>

          {/* AUTH */}
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="rounded-md bg-rose-500 px-4 py-2 text-md font-medium hover:text-white">
                  Login
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="rounded-md bg-blue-500 px-4 py-2 text-md font-medium text-white">
                  Register
                </button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
