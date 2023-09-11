import { prisma } from "@/db";

type UserProps = {
  id: string;
};

export default async function getUser(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
}
