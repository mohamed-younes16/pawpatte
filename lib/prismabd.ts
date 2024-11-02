import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

// declare global {
//   var prisma: PrismaClient | undefined;
// }
const prismadb = new PrismaClient().$extends(withAccelerate());

// const prismadb = globalThis.prisma || new PrismaClient().$extends(withAccelerate());
// if (process.env.NODE_ENV !== "production") {
//   globalThis.prisma = prismadb;
// }

export default prismadb;
