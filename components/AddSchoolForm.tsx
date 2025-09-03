"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SchoolFormValues } from "@/types";
import { schoolSchema } from "@/ZodSchemas";
import { addSchool, uploadSchoolImage } from "@/lib/actions/schoolActions";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AddSchoolForm() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm<SchoolFormValues>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      contact: "",
      email: "",
      image: null,
    },
  });

  const onSubmit = async (values: SchoolFormValues) => {
    try {
      setLoading(true);
      const file = values.image[0];
      const imageUrl = await uploadSchoolImage(file);

      await addSchool({
        name: values.name,
        address: values.address,
        city: values.city,
        state: values.state,
        contact: values.contact,
        email: values.email,
        imageUrl,
      });
      toast.success("School added successfully!");
      router.push("/");
      form.reset();
      setPreview(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add school");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl p-6 border rounded-2xl shadow-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-6"
        >
          <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-gray-600 dark:text-gray-300">
                    School Image
                  </FormLabel>
                  <FormControl>
                    <label className="w-full h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-indigo-500 transition-colors duration-300 relative overflow-hidden group">
                      {!preview && (
                        <span className="text-gray-400 dark:text-gray-500 text-center transition-all duration-300 group-hover:text-indigo-500">
                          Click or drag to upload
                        </span>
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => {
                          field.onChange(e.target.files);
                          if (e.target.files && e.target.files[0]) {
                            const reader = new FileReader();
                            reader.onload = (ev) =>
                              setPreview(ev.target?.result as string);
                            reader.readAsDataURL(e.target.files[0]);
                          }
                        }}
                      />
                      {preview && (
                        <Image
                          src={preview}
                          alt="Preview"
                          width={400}
                          height={250}
                          className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                        />
                      )}
                    </label>
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-1" />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full md:w-2/3 space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 dark:text-gray-300">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter school name"
                      {...field}
                      className="mt-1 w-full rounded-md bg-transparent border-0 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-transform duration-200 hover:scale-[1.01]"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 dark:text-gray-300">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter address"
                      {...field}
                      className="mt-1 w-full rounded-md bg-transparent border-0 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm resize-none transition-transform duration-200 hover:scale-[1.01]"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-gray-600 dark:text-gray-300">
                      City
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="City"
                        {...field}
                        className="mt-1 w-full rounded-md bg-transparent border-0 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-transform duration-200 hover:scale-[1.01]"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-gray-600 dark:text-gray-300">
                      State
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="State"
                        {...field}
                        className="mt-1 w-full rounded-md bg-transparent border-0 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-transform duration-200 hover:scale-[1.01]"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 mt-1" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 dark:text-gray-300">
                    Contact
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="1234567890"
                      {...field}
                      className="mt-1 w-full rounded-md bg-transparent border-0 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-transform duration-200 hover:scale-[1.01]"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 dark:text-gray-300">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="school@example.com"
                      {...field}
                      className="mt-1 w-full rounded-md bg-transparent border-0 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-transform duration-200 hover:scale-[1.01]"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-md transition-transform duration-200 hover:scale-[1.02] shadow-lg"
            >
              {loading ? "Adding..." : "Add School"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
