import bcrypt from "bcryptjs";
import prismadb from "@/lib/prismabd";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      email,
      name,
      password,
      address,
      phoneNumber,
    }: {
      name: string;
      email: string;
      password: string;
      address: string;
      phoneNumber: string;
    } = await req.json();

    if (!name || !email || !password)
      return new NextResponse("no Name Provided", { status: 401 });

    try {
      const hashedpassword = await bcrypt.hash(password, 12);

      const userupsert = await prismadb.user.create({
        data: { email, hashedpassword, name, address, phoneNumber },
      });
      return NextResponse.json(
        { message: "account created", userupsert },
        { status: 200 }
      );
    } catch (error) {
      console.log(error, "##########user create ###############");
      return NextResponse.json({ message: "error in server" }, { status: 500 });
    }
  } catch (error) {
    console.log(error, "##########user create###############");
    return NextResponse.json({ message: "error in server" }, { status: 500 });
  }
}
