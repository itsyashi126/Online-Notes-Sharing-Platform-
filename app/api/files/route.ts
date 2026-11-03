
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Upload from "@/app/models/Upload";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();

    // Fetch files uploaded by all users
    const files = await Upload.find({})
      .select("title fileUrl notesUrl createdAt")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      files: files.map((file) => ({
        ...file,
        _id: file._id.toString(),
      })),
    });
  } catch (error) {
    console.error("FETCH FILES ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to fetch files",
      },
      { status: 500 }
    );
  }
}
