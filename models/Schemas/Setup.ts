import * as z from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(4).max(16),
    email: z.string().min(4).email(),
    phoneNumber: z.string().min(4).max(16),
    address: z.string().min(4).max(16),
    password: z.string().min(4).max(14),
    confirm: z.string().min(4).max(14),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
export const Loginschema = z.object({
  email: z.string().min(4).email(),
  password: z.string().min(4).max(14),
});

export const reviewSchema = z.object({
  message: z.string().min(4),
  stars: z.number().min(1),
});

export const SetupSchema = z.object({
  name: z.string().min(4),
  phoneNumber: z.string().min(1),
  address: z.string().min(1),
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
