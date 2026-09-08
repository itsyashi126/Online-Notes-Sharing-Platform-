import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import Upload from "../../models/Upload";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // ✅ Connect DB
    await connectDB();

    // ✅ Read form data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string;
    const notesUrl = formData.get("notesUrl") as string;

    if (!file) {
      return NextResponse.json(
        { error: "File is required" },
        { status: 400 }
      );
    }

    // ✅ Convert File → Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ✅ Upload to Cloudinary
    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "notes-uploads",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      ).end(buffer);
    });

    if (!uploadResult?.secure_url) {
      return NextResponse.json(
        { error: "Cloudinary upload failed" },
        { status: 500 }
      );
    }

    // ✅ Save to MongoDB
    const savedData = await Upload.create({
      title,
      notesUrl,
      fileUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });

    return NextResponse.json(
      {
        success: true,
        message: "File uploaded successfully",
        data: savedData,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("UPLOAD API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
