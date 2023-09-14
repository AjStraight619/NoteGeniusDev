// import { getServerSession } from "next-auth";
// import { NextResponse } from "next/server";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// export async function GET(request: Request) {
//   const session = await getServerSession(authOptions);
//   console.log("GET API", session);
//   return NextResponse.json({ authenticated: !!session });
// }

import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const hashed = await hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
    },
  });

  return NextResponse.json({
    user: {
      email: user.email,
    },
  });
}
