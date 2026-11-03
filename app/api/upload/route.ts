
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import Upload from "../../models/Upload";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const allowedTypes: Record<string, string[]> = {
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  "application/vnd.ms-powerpoint": [".ppt"],
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
};

export async function POST(req: Request) {
  let uploadedPublicId: string | null = null;
  let uploadedResourceType: string | null = null;

  try {
    // 1. Check authentication
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    // 2. Read form data
    const formData = await req.formData();

    const fileEntry = formData.get("file");
    const titleEntry = formData.get("title");
    const notesUrlEntry = formData.get("notesUrl");

    if (!(fileEntry instanceof File)) {
      return NextResponse.json(
        { success: false, error: "Please select a valid file." },
        { status: 400 }
      );
    }

    if (typeof titleEntry !== "string" || !titleEntry.trim()) {
      return NextResponse.json(
        { success: false, error: "Title is required." },
        { status: 400 }
      );
    }

    const title = titleEntry.trim();

    if (title.length > 150) {
      return NextResponse.json(
        { success: false, error: "Title cannot exceed 150 characters." },
        { status: 400 }
      );
    }

    const notesUrl =
      typeof notesUrlEntry === "string" ? notesUrlEntry.trim() : "";

    if (notesUrl) {
      try {
        const parsedUrl = new URL(notesUrl);

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          throw new Error("Invalid protocol");
        }
      } catch {
        return NextResponse.json(
          { success: false, error: "Please provide a valid notes URL." },
          { status: 400 }
        );
      }
    }

    // 3. Validate file size
    if (fileEntry.size === 0) {
      return NextResponse.json(
        { success: false, error: "The selected file is empty." },
        { status: 400 }
      );
    }

    if (fileEntry.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: "File size must not exceed 10 MB." },
        { status: 400 }
      );
    }

    // 4. Validate file type and extension
    const extension =
      "." + (fileEntry.name.split(".").pop() || "").toLowerCase();

    const validExtensions = allowedTypes[fileEntry.type];

    if (!validExtensions || !validExtensions.includes(extension)) {
      return NextResponse.json(
        {
          success: false,
          error: "Unsupported file type. Upload PDF, DOC, DOCX, PPT, PPTX, JPG, PNG or WEBP.",
        },
        { status: 400 }
      );
    }

    // 5. Connect to MongoDB
    await connectDB();

    // 6. Convert file into buffer
    const bytes = await fileEntry.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 7. Upload to Cloudinary
    const uploadResult = await new Promise<{
      secure_url: string;
      public_id: string;
      resource_type: string;
    }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "notes-uploads",
            resource_type: "auto",
          },
          (error, result) => {
            if (error) return reject(error);

            if (
              !result?.secure_url ||
              !result.public_id ||
              !result.resource_type
            ) {
              return reject(new Error("Invalid Cloudinary response"));
            }

            resolve({
              secure_url: result.secure_url,
              public_id: result.public_id,
              resource_type: result.resource_type,
            });
          }
        )
        .end(buffer);
    });

    uploadedPublicId = uploadResult.public_id;
    uploadedResourceType = uploadResult.resource_type;

    // 8. Save note details in MongoDB
    const savedData = await Upload.create({
      title,
      notesUrl,
      fileUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      userId,
    });

    return NextResponse.json(
      {
        success: true,
        message: "File uploaded successfully.",
        data: savedData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("UPLOAD API ERROR:", error);

    // 9. Clean up Cloudinary file if database saving fails
    if (uploadedPublicId && uploadedResourceType) {
      try {
        await cloudinary.uploader.destroy(uploadedPublicId, {
          resource_type: uploadedResourceType as "image" | "video" | "raw",
        });
      } catch (cleanupError) {
        console.error("CLOUDINARY CLEANUP ERROR:", cleanupError);
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while uploading your file.",
      },
      { status: 500 }
    );
  }
}
