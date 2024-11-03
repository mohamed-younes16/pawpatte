import * as z from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: "must be at least 4 characters long" })
      .max(16),
    email: z.string().min(4).email(),
    password: z
      .string()
      .min(4, { message: "must be at least 8 characters long" })
      .max(14),
    confirm: z
      .string()
      .min(4, { message: "must be at least 8 characters long" })
      .max(14),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
export const Loginschema = z.object({
  email: z.string().min(4).email(),
  password: z
    .string()
    .min(4, { message: "must be at least 8 characters long" })
    .max(14),
});

export const reviewSchema = z.object({
  message: z
    .string()
    .min(4, { message: "message must at least be 5 letters long" }),
  stars: z.number().min(1),
});

export const SetupSchema = z.object({
  name: z.string().min(4),
  username: z.string().min(4),
  bio: z.string(),
  imageUrl: z.string().min(1),
});
export const checkoutSchema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
  address: z.string().min(1),
  phoneNumber: z.string().min(1),
  discountCode: z.string().default("").optional(),
});
export const GuaranteeSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  productName: z.string().min(1, "Product name is required"),
  serialNumber: z.string().min(1, "Serial number is required"),
  notes: z.string().default(""),
});
