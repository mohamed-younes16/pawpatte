import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismabd";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "unauthorized" }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const userdata = await prismadb.user.findFirst({
      where: { id: user.id },
    });

    return new NextResponse(
      JSON.stringify({ message: "user found ✅", user: userdata }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.log(error, "##########user__###############");
    return new NextResponse(
      JSON.stringify({ message: "error in server" }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
