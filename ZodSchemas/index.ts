import z from "zod";

export const schoolSchema = z.object({
    name: z.string().min(1, "Name is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    contact: z
        .string()
        .min(10, "Contact number must be 10 digits")
        .max(10, "Contact number must be 10 digits")
        .regex(/^\d+$/, "Contact number must contain only digits"),
    email: z.email("Invalid email"),
    image: z.any().refine((files) => files?.length > 0, "Image is required"),
});