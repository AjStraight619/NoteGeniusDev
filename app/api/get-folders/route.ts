import { getServerSession } from 'next-auth';
import { NextResponse, NextRequest } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { type User } from '@prisma/client';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
    });
  } else {
    const user = session.user as User;
    if (user && user.id) {
      const userId = user.id;
      const folders = await prisma.folder.findMany({
        where: {
          id: userId,
        },
      });
      return NextResponse.json({ folders });
    }
  }
}
