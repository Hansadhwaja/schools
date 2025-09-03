'use server'

import { prisma } from "@/lib/prisma";
import { cloudinary } from "../cloudinary";

export async function addSchool(data: {
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email: string;
  imageUrl: string;
}) {
  try {
    const school = await prisma.school.create({
      data,
    });
    return school;
  } catch (error) {
    console.error("Error adding school:", error);
    throw new Error("Failed to add school");
  }
}

export async function getSchools() {
  try {
    const schools = await prisma.school.findMany({
      orderBy: { createdAt: "desc" },
    });
    return schools;
  } catch (error) {
    console.error("Error fetching schools:", error);
    throw new Error("Failed to fetch schools");
  }
}

export async function uploadSchoolImage(file: File) {

  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");

  const result = await cloudinary.uploader.upload(`data:${file.type};base64,${base64}`, {
    folder: "schoolImages",
  });

  return result.secure_url;
}