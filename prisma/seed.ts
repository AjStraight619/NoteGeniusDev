import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create a hashed password
  await prisma.refinedNote.deleteMany({});
  await prisma.note.deleteMany({});
  await prisma.folder.deleteMany({});
  await prisma.chat.deleteMany({});

  await prisma.user.deleteMany({});
  const password = await hash('alice', 10);

  // Upsert user
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      password,
      name: 'Alice',
    },
  });

  // Create a chat for Alice
  const chat = await prisma.chat.create({
    data: {
      title: 'Sample Chat',
      content: 'This is a sample chat',
      userId: alice.id,
    },
  });

  // Create a folder for Alice
  const folder = await prisma.folder.create({
    data: {
      name: 'Sample Folder',
      userId: alice.id,
    },
  });

  // Create a note in the folder for Alice
  const note = await prisma.note.create({
    data: {
      title: 'Sample Note',
      content: 'This is a sample note',
      folderId: folder.id,
    },
  });

  const note2 = await prisma.note.create({
    data: {
      title: 'Sample Note 2',
      content: 'This is the second sample note',
      folderId: folder.id,
    },
  });

  // Create a refined note for Alice
  const refinedNote = await prisma.refinedNote.create({
    data: {
      original: 'Original Sample Note',
      refined: 'Refined Sample Note',
      folderId: folder.id,
      userId: alice.id,
      noteId: note.id,
    },
  });

  console.log({ alice, chat, folder, note, refinedNote });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
