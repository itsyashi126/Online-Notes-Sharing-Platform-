
"use client";

import React from "react";

import TopHeader from "./(dashboard)/_section/TopHeader";
import { UserButton } from "@clerk/nextjs";

export default function AboutUs() {
  const features = [
    {
      icon: "☁️",
      title: "Upload Notes",
      description: "Easily upload and share your study materials with others.",
      color: "bg-blue-50",
    },
    {
      icon: "👥",
      title: "Access Resources",
      description: "Explore notes and learning materials shared by the student community.",
      color: "bg-green-50",
    },
    {
      icon: "⬇️",
      title: "Easy Downloads",
      description: "View and download useful resources whenever you need them.",
      color: "bg-purple-50",
    },
    {
      icon: "🤝",
      title: "Community Learning",
      description: "Help others learn while improving your own understanding.",
      color: "bg-orange-50",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8faff]">
      
      <main className="min-h-screen w-full">

        {/* Top Header */}
        <header className="h-16 bg-white border-b flex justify-end items-center px-8">
          
        </header>

        <div className="max-w-7xl mx-auto px-8 py-10">

          {/* Hero Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-12">

            <div>
              <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                ℹ️ About Us
              </span>

              <h1 className="text-4xl md:text-5xl font-extrabold text-[#101b45] leading-tight mt-5">
                Making Learning
                <span className="block text-blue-600">
                  Easier, Together.
                </span>
              </h1>

              <div className="w-28 h-1 bg-orange-400 rounded-full mt-3 mb-6" />

              <p className="text-lg text-[#172044] font-medium mb-4">
                Welcome to <strong>Online Notes Sharing Platform</strong> –
                a place where learning meets collaboration.
              </p>

              <p className="text-gray-600 leading-7">
                We believe that knowledge becomes more valuable when it is
                shared. Our platform is designed to help students access,
                upload, and share study materials in one convenient place.
                Whether you're preparing for exams, learning a new subject,
                or looking for useful study resources, we make it easier
                to find the notes you need.
              </p>
            </div>

            {/* Hero Illustration */}
            <div className="relative bg-gradient-to-br from-blue-100 to-indigo-50 rounded-[35px] min-h-[320px] flex items-center justify-center overflow-hidden">

              <div className="absolute top-8 left-8 text-5xl">📖</div>
              <div className="absolute top-8 right-12 text-5xl">💡</div>
              <div className="absolute bottom-8 right-8 text-5xl">🎓</div>

              <div className="text-center relative z-10">
                <div className="text-8xl mb-4">👩‍🎓</div>
                <div className="bg-white rounded-2xl shadow-lg p-5 mx-5">
                  <div className="text-5xl mb-2">📚 💻</div>
                  <p className="text-blue-700 font-bold text-xl">
                    Learn Something New!
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Knowledge connects us.
                  </p>
                </div>
              </div>
            </div>

          </section>

          {/* Mission and Vision */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">

            <div className="bg-blue-100/70 rounded-2xl p-7 flex gap-5 items-start">
              <div className="text-5xl">🎯</div>
              <div>
                <h2 className="text-2xl font-bold text-[#101b45] mb-3">
                  Our Mission
                </h2>
                <p className="text-gray-700 leading-7">
                  Our mission is to make education more accessible by
                  creating a collaborative learning environment where
                  students can share knowledge, exchange resources,
                  and learn from one another.
                </p>
                <p className="text-gray-700 leading-7 mt-3">
                  We aim to reduce the struggle of finding quality study
                  materials and encourage students to grow together.
                </p>
              </div>
            </div>

            <div className="bg-purple-100/70 rounded-2xl p-7 flex gap-5 items-start">
              <div className="text-5xl">🔭</div>
              <div>
                <h2 className="text-2xl font-bold text-[#101b45] mb-3">
                  Our Vision
                </h2>
                <p className="text-gray-700 leading-7">
                  We envision a world where every student has access
                  to helpful learning resources without unnecessary
                  barriers.
                </p>
                <p className="text-gray-700 leading-7 mt-3">
                  By bringing students and their study materials together,
                  we hope to make learning simpler, smarter, and more
                  collaborative.
                </p>
              </div>
            </div>

          </section>

          {/* Features */}
          <section className="mb-14">

            <div className="flex items-center justify-center gap-5 mb-8">
              <div className="h-[2px] w-12 bg-blue-200" />
              <h2 className="text-3xl font-extrabold text-[#101b45]">
                What We Offer
              </h2>
              <div className="h-[2px] w-12 bg-blue-200" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`${feature.color} rounded-2xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300`}
                >
                  <div className="text-5xl mb-4">
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-bold text-[#101b45] mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 leading-6 text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}

            </div>
          </section>

          {/* Bottom Banner */}
          <section className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl px-6 py-7 text-center shadow-sm">

            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <span className="text-4xl">🏆</span>

              <h2 className="text-2xl md:text-3xl font-extrabold text-[#101b45]">
                Learn. Share. Grow.
              </h2>

              <div className="hidden md:block h-10 w-[2px] bg-green-400" />

              <p className="text-gray-700 italic">
                Every note shared can help someone understand better,
                prepare smarter, and achieve more.
              </p>
            </div>

            <p className="text-blue-700 font-bold mt-4">
              Be a part of our learning community.
              Share your knowledge and grow together!
            </p>

          </section>

        </div>
      </main>
    </div>
  );
}
