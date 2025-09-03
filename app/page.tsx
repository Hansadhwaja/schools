import { getSchools } from "@/lib/actions/schoolActions";
import { School } from "@/types";
import Image from "next/image";
import React from "react";

export const revalidate = 0;

export default async function HomePage() {
  const schools: School[] = await getSchools();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-lg md:text-2xl lg:text-4xl font-extrabold mb-8 text-foreground">
        All Schools
      </h1>

      {schools.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No schools found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {schools.map((school) => (
            <div
              key={school.id}
              className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={school.imageUrl}
                  alt={school.name}
                  fill
                  sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw,33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {school.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  {school.address}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {school.city}, {school.state}
                </p>
                <div className="mt-auto text-sm text-gray-700 dark:text-gray-300 flex flex-col gap-1">
                  <span>📞 {school.contact}</span>
                  <span>✉️ {school.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
