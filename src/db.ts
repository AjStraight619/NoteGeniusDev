import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// api for create
// create an api route for fetching note id from prisma

// import { prisma } from '@/db'

// export default async (req, res) => {
//     const { id } = req.query
//     const note = await prisma.note.findUnique({
//         where: {
//         id: id
//         }
//     })
//     res.json(note)
// }
