
import React from "react";
import Constants from "../_utils/Constants";
import Link from "next/link";

function Hero() {
  return (
    <section className="bg-white lg:grid lg:min-h-screen lg:place-content-center">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-prose text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            <span className="text-rose-500">Upload, Save</span> and Easily
            <span className="text-rose-500"> Share</span> your file in one place.
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
            {Constants.desc}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/about/upload"
              className="inline-block rounded-lg border-b-2 border-indigo-600 bg-rose-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              Get Started
            </Link>

            <Link
              href="/about"
              className="inline-block rounded-lg border border-blue-200 px-6 py-3 font-medium text-blue-700 shadow-sm transition-colors hover:bg-rose-600 hover:text-white"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;