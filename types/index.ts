import { schoolSchema } from "@/ZodSchemas";
import z from "zod";


export type SchoolFormValues = z.infer<typeof schoolSchema>;

export type School = {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    contact: string;
    email: string;
    imageUrl: string;
};
